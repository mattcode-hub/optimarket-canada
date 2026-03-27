# OptiMarket Canada - Deployment Guide

This guide covers deploying the OptiMarket Canada optometry marketplace to Vercel.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- GitHub account
- Vercel account (free tier available at vercel.com)

## Step 1: Prepare Your Code

Ensure all files are committed locally:

```bash
cd "Code Optometry Marketplace (1)"
git add .
git commit -m "Deployment configuration"
```

## Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

```bash
gh repo create optimarketcanada --public --source=. --push
```

This will:
- Create a public repository named `optimarketcanada`
- Push your local code to the remote
- Set the remote as `origin`

### Option B: Manual Setup

1. Visit [github.com/new](https://github.com/new)
2. Repository name: `optimarketcanada`
3. Description: "Canadian optometry marketplace connecting optometrists with equipment, parts, and services"
4. Choose public (recommended for open-source)
5. Click "Create repository"

Then, connect your local repo:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/optimarketcanada.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from project directory:
   ```bash
   vercel
   ```

3. Follow the CLI prompts:
   - Confirm project name: `optimarketcanada`
   - Confirm framework: `Next.js`
   - Use default settings for build/output

### Option B: Vercel Dashboard

1. Visit [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository (`optimarketcanada`)
3. Configure project:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `next build`
   - Output Directory: `.next`
4. Add environment variables (see below)
5. Click "Deploy"

## Step 4: Environment Variables

For the current MVP, no environment variables are required.

For future integrations, add these to Vercel project settings → Environment Variables:

- `EBAY_API_KEY` - eBay API integration
- `FACEBOOK_MARKETPLACE_TOKEN` - Facebook Marketplace integration
- `BIDMEDIS_API_KEY` - BidMedis API integration
- `DOTMED_API_KEY` - DotMed API integration
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - Authentication secret (if using NextAuth)
- `NEXTAUTH_URL` - Authentication URL (if using NextAuth)

## Step 5: Verify Deployment

1. Vercel will provide a deployment URL (e.g., `https://optimarketcanada.vercel.app`)
2. Click the link to verify the site loads correctly
3. Test key pages:
   - Home page
   - Optometrist directory
   - Equipment listings
   - Contact forms

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Navigation works across all pages
- [ ] Equipment listings display correctly
- [ ] Optometrist cards render properly
- [ ] Contact form is functional (will need backend setup)
- [ ] Mobile responsive design verified
- [ ] Security headers present in response
- [ ] No console errors in browser DevTools

## Production Considerations

### Security Headers

The `vercel.json` configuration includes security headers:
- `X-Content-Type-Options: nosniff` - Prevent MIME sniffing
- `X-Frame-Options: DENY` - Prevent clickjacking
- `X-XSS-Protection: 1; mode=block` - Enable XSS protection

### Region Selection

Currently configured to deploy to `cle1` (Cleveland, Ohio) region. Change in `vercel.json` if needed for different geographic location.

### Auto-Scaling

Vercel automatically scales your deployment based on traffic. No configuration needed.

## Deployment Updates

After initial deployment, future updates are automatic:

1. Push changes to your `main` branch on GitHub
2. Vercel automatically builds and deploys
3. Check deployment status in Vercel dashboard

## Rollback

To rollback to a previous deployment:

1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Deployments" tab
4. Click the three dots on a previous deployment
5. Select "Promote to Production"

## Support & Documentation

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

## Custom Domain (Optional)

To add a custom domain:

1. Visit your Vercel project settings
2. Go to "Domains"
3. Enter your domain and follow DNS configuration instructions
4. Update GitHub repository to reflect custom domain in README

Example: `https://optometry-marketplace.ca` instead of `vercel.app`
