const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO_OWNER = 'mattcode-hub';
const REPO_NAME = 'optimarket-canada';
const TOKEN = process.argv[2];
const BRANCH = 'main';

if (!TOKEN) {
  console.error('Usage: node push-to-github.js <github-token>');
  process.exit(1);
}

const API_BASE = 'https://api.github.com';
const headers = {
  'Authorization': `token ${TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
};

// Directories to skip
const SKIP_DIRS = ['node_modules', '.next', '.git', '.vercel'];

// Binary file extensions
const BINARY_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.eot', '.ttf', '.woff', '.woff2', '.mp4', '.webm', '.zip'];

// Function to check if file is binary
function isBinaryFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.includes(ext);
}

// Function to get all files recursively
function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) {
        results = results.concat(getAllFiles(fullPath, baseDir));
      }
    } else {
      results.push({ fullPath, relativePath });
    }
  }
  return results;
}

async function githubAPI(endpoint, method = 'GET', body = null) {
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${endpoint}`, opts);
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }
  return text ? JSON.parse(text) : {};
}

// Create a blob and return its SHA
async function createBlob(filePath) {
  let content;
  let encoding = 'utf-8';

  if (isBinaryFile(filePath)) {
    content = fs.readFileSync(filePath).toString('base64');
    encoding = 'base64';
  } else {
    content = fs.readFileSync(filePath, 'utf-8');
    encoding = 'utf-8';
  }

  const response = await githubAPI(`/repos/${REPO_OWNER}/${REPO_NAME}/git/blobs`, 'POST', {
    content,
    encoding,
  });

  return response.sha;
}

// Create tree entry for a file
async function createTreeEntry(filePath, relativePath) {
  const sha = await createBlob(filePath);
  return {
    path: relativePath.replace(/\\/g, '/'),
    mode: '100644',
    type: 'blob',
    sha,
  };
}

// Main push function
async function pushToGithub() {
  try {
    console.log(`Pushing to ${REPO_OWNER}/${REPO_NAME}...`);
    console.log(`Using branch: ${BRANCH}`);

    // Get current branch ref to find the current commit
    console.log('\nFetching current branch information...');
    const refData = await githubAPI(`/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${BRANCH}`);
    const currentCommitSha = refData.object.sha;
    console.log(`Current commit SHA: ${currentCommitSha}`);

    // Get all files
    const projectDir = process.cwd();
    const files = getAllFiles(projectDir);
    console.log(`\nFound ${files.length} files to upload`);

    // Create blobs and tree entries
    console.log('\nCreating blobs and tree entries...');
    const treeEntries = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const entry = await createTreeEntry(file.fullPath, file.relativePath);
        treeEntries.push(entry);
        console.log(`  [${i + 1}/${files.length}] ${file.relativePath}`);
      } catch (err) {
        console.error(`  Error processing ${file.relativePath}: ${err.message}`);
      }
    }

    console.log(`\nSuccessfully created ${treeEntries.length} tree entries`);

    // Create tree
    console.log('\nCreating git tree...');
    const treeResponse = await githubAPI(`/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`, 'POST', {
      tree: treeEntries,
      base_tree: currentCommitSha,
    });
    const treeSha = treeResponse.sha;
    console.log(`Tree created with SHA: ${treeSha}`);

    // Create commit
    console.log('\nCreating commit...');
    const commitResponse = await githubAPI(
      `/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`,
      'POST',
      {
        message: `Auto-push: ${new Date().toISOString()}`,
        tree: treeSha,
        parents: [currentCommitSha],
      }
    );
    const newCommitSha = commitResponse.sha;
    console.log(`Commit created with SHA: ${newCommitSha}`);

    // Update branch ref
    console.log('\nUpdating branch reference...');
    await githubAPI(
      `/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${BRANCH}`,
      'PATCH',
      { sha: newCommitSha }
    );
    console.log(`Branch ${BRANCH} updated to commit ${newCommitSha.substring(0, 7)}`);

    console.log('\n✓ Push complete!');
    console.log(`  Repository: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
    console.log(`  Commit: https://github.com/${REPO_OWNER}/${REPO_NAME}/commit/${newCommitSha}`);
  } catch (err) {
    console.error('\n✗ Error during push:', err.message);
    process.exit(1);
  }
}

// Run the push
pushToGithub();
