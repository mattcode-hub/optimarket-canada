# Quick Start: Authentication System

## Getting Started in 5 Minutes

### What Was Built
A complete client-side authentication system for the OptiMarket marketplace with login, signup, and profile management.

### Test Immediately with Demo Accounts

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Visit the login page:**
   - Navigate to: `http://localhost:3000/auth/login`
   - Or click "Sign In" in the header

3. **Quick Login with Demo Accounts:**
   - Click any of the three demo buttons:
     - **Demo Buyer** (buyer@example.com)
     - **Demo Seller** (seller@example.com)
     - **Demo Admin** (admin@example.com)
   - All use password: `password123`

4. **See Authentication in Action:**
   - Notice the header changes to show your name and avatar
   - Click your avatar for the dropdown menu
   - Visit `/auth/profile` to see your profile

### Key Features to Test

#### Login Page (`/auth/login`)
- Enter email and password manually
- Click demo account buttons for instant login
- Try invalid credentials to see error messages
- Check "Remember me" checkbox

#### Signup Page (`/auth/signup`)
- Create a new account with:
  - Name: Your full name
  - Email: Any unique email
  - Password: 6+ characters
  - Location: City, Province
  - Phone: Optional
  - Toggle "Register as Seller" to create a seller account
- Accept terms and sign up
- You're automatically logged in after signup!

#### Profile Page (`/auth/profile`)
- View your account details
- Click "Edit Profile" to modify information
- Update name, phone, location, or bio
- Changes save immediately
- View account settings
- Sign out from here

#### Header Changes
- **Logged Out:** Shows "Sign In" and "Sign Up" buttons
- **Logged In:** Shows your avatar and name
  - Click avatar for dropdown menu
  - Desktop: Avatar with name
  - Mobile: Icon only
  - Seller accounts see "Seller Dashboard" link

### API Reference

#### Using the useAuth Hook

In any client component, use the `useAuth()` hook:

```typescript
'use client';
import { useAuth } from '@/context/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, login, signup, logout, updateProfile } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user?.name}!</div>;
}
```

#### Available Methods

**Login:**
```typescript
await login('buyer@example.com', 'password123');
// User is now authenticated
```

**Signup:**
```typescript
await signup({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secure123',
  location: 'Toronto, ON',
  phone: '(416) 555-0100',
  isSeller: true
});
// User is automatically logged in
```

**Logout:**
```typescript
logout();
// User is logged out and redirected
```

**Update Profile:**
```typescript
await updateProfile({
  name: 'Jane Doe',
  bio: 'Updated bio'
});
// Changes saved to localStorage
```

### File Locations

```
Core Files:
- src/context/AuthContext.tsx          ← Auth context & provider
- src/app/auth/login/page.tsx          ← Login page
- src/app/auth/signup/page.tsx         ← Signup page
- src/app/auth/profile/page.tsx        ← Profile page

Updated Files:
- src/components/Header.tsx            ← Auth integration in header
- src/app/layout.tsx                   ← AuthProvider wrapper
```

### Demo Accounts

| Type   | Email              | Password    | Features             |
|--------|-------------------|-------------|----------------------|
| Buyer  | buyer@example.com | password123 | Basic user features  |
| Seller | seller@example.com| password123 | Seller dashboard     |
| Admin  | admin@example.com | password123 | Full admin features  |

### What Persists

The authentication system saves to `localStorage`:
- User name, email, avatar, phone, location, bio
- Member since date
- Seller status
- User ID

The auth state persists across:
- Page refreshes
- Navigation between pages
- Browser restarts (within the same session)

### Customization

#### Change Demo Accounts
Edit `src/context/AuthContext.tsx` and modify the `DEMO_ACCOUNTS` array.

#### Change Colors
The system uses these Tailwind classes:
- `primary-500` → Teal (#0D7C66)
- `secondary-500` → Gold (#D4A84B)
- `accent-500` → Blue (#2E8B9A)

Edit `tailwind.config.ts` to change colors globally.

#### Change Storage
To switch from localStorage to a real backend:
1. Replace the login/signup/updateProfile functions in `AuthContext.tsx`
2. Call your API endpoints instead
3. Keep the same context interface for compatibility

### Routes at a Glance

| Route | Type | Description |
|-------|------|-------------|
| `/auth/login` | Public | Login page |
| `/auth/signup` | Public | Registration page |
| `/auth/profile` | Protected | User profile & settings |
| `/` | Public | Homepage (shows auth state) |
| `/dashboard` | Protected | Seller dashboard (if isSeller) |

### Troubleshooting

**Login not working?**
- Check the email and password match demo accounts exactly
- For manual signup, verify:
  - Email format is valid
  - Password is 6+ characters
  - Passwords match in confirmation field
  - Terms are accepted

**Can't edit profile?**
- Make sure you're logged in
- Click "Edit Profile" button, not directly on fields
- Click "Save Changes" to persist

**Can't see Seller Dashboard?**
- Log in as `seller@example.com` or create account with seller toggle
- The link only appears for seller accounts

**Data not persisting?**
- Check browser localStorage is enabled
- Try clearing browser cache
- Verify you're using the same browser

### Next Steps

1. Test all three demo accounts
2. Create a new account via signup
3. Edit your profile information
4. Log out and log back in
5. Verify data persists on page refresh
6. Customize colors and styling to match your brand
7. Connect to a real backend API when ready

### Need Help?

Refer to these documentation files:
- `AUTH_SYSTEM_GUIDE.md` - Comprehensive system documentation
- `AUTH_FILES_SUMMARY.txt` - File-by-file breakdown
- `IMPLEMENTATION_CHECKLIST.md` - Feature checklist

---

**That's it!** Your authentication system is ready to use. Start the dev server and explore.
