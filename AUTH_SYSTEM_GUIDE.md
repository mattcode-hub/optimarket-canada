# OptiMarket Authentication System Guide

## Overview
A complete client-side authentication system has been implemented for the OptiMarket Next.js marketplace app. The system uses React Context for state management with localStorage persistence for demo accounts.

## Architecture

### Core Files Created

#### 1. **`src/context/AuthContext.tsx`**
React Context for authentication state management with localStorage persistence.

**Key Features:**
- `AuthProvider` component that wraps the app
- `useAuth()` hook for accessing auth state and methods
- Three pre-seeded demo accounts
- localStorage-based persistence (simulated backend)

**User Type:**
```typescript
{
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  bio: string;
  memberSince: string;
  isSeller: boolean;
}
```

**Available Methods:**
- `login(email: string, password: string)` - Authenticate user
- `signup(data)` - Register new account
- `logout()` - Clear auth state
- `updateProfile(data)` - Update user information

**Demo Accounts:**
1. **Buyer Account**
   - Email: `buyer@example.com`
   - Password: `password123`
   - Type: Regular buyer

2. **Seller Account**
   - Email: `seller@example.com`
   - Password: `password123`
   - Type: Verified seller with dashboard access

3. **Admin Account**
   - Email: `admin@example.com`
   - Password: `password123`
   - Type: Admin seller account

---

#### 2. **`src/app/auth/login/page.tsx`**
Professional login page with multiple authentication options.

**Features:**
- Clean, polished form design with teal/gold theme
- Email and password validation
- "Remember me" checkbox
- Quick-login demo account buttons
- Redirect to homepage on success
- Error message display
- Loading states with spinner

**URL:** `/auth/login`

---

#### 3. **`src/app/auth/signup/page.tsx`**
Complete registration form with validation and seller toggle.

**Features:**
- Full form validation with inline error messages
- Required fields: name, email, password, location
- Optional fields: phone
- "Register as Seller" toggle with description
- Terms & Privacy acceptance checkbox
- Password confirmation validation
- Real-time error clearing as user types

**URL:** `/auth/signup`

---

#### 4. **`src/app/auth/profile/page.tsx`**
Protected user profile/account management page.

**Features:**
- Displays user info with avatar initials
- Editable profile fields
- Recent activity placeholder
- Account settings section
- Seller Dashboard link (if seller)
- Sign out button
- Protected route (redirects to login if not authenticated)
- Success notifications on profile update

**URL:** `/auth/profile`
**Protection:** Redirects to `/auth/login` if not authenticated

---

### Files Modified

#### 5. **`src/components/Header.tsx`**
Updated to reflect authentication state in navigation.

**Changes:**
- Import `useAuth` hook
- Show/hide auth UI based on `isAuthenticated`
- **When Logged Out:**
  - "Sign In" button (desktop only)
  - "Sign Up" button (both desktop & mobile)
- **When Logged In:**
  - User avatar with initials
  - Dropdown menu with:
    - Profile link
    - Wishlist link
    - Seller Dashboard (if seller)
    - Sign Out button
- Mobile menu updated with auth options
- Loading state handling

---

#### 6. **`src/app/layout.tsx`**
Wrapped app with `AuthProvider`.

**Changes:**
- Import `AuthProvider` from context
- Wrap content with `<AuthProvider>` (outside `WishlistProvider`)
- Enables auth functionality globally

---

## Usage

### For Users

#### Login
1. Visit `/auth/login`
2. Enter email and password
3. Or click any demo account button for quick testing
4. Redirects to homepage on success

#### Signup
1. Visit `/auth/signup`
2. Fill in required fields
3. Optional: Enable "Register as Seller"
4. Accept terms & conditions
5. Account created and logged in automatically

#### Profile Management
1. Click user avatar in header → "My Profile"
2. View account details
3. Click "Edit Profile" to modify information
4. Changes saved to localStorage

#### Logout
1. Click user avatar dropdown → "Sign Out"
2. Redirected to homepage
3. Auth state cleared from localStorage

---

## Color Scheme

The system uses the marketplace's established color palette:

- **Primary (Teal):** `#0D7C66` - Main actions and highlights
- **Secondary (Gold):** `#D4A84B` - Accents and secondary actions
- **Accent (Blue):** `#2E8B9A` - Additional highlights
- **Neutral Grays:** For text and backgrounds
- **Error Red:** `#dc3545` - For validation errors

---

## Key Implementation Details

### localStorage Handling
- Uses `useEffect` to initialize auth state from localStorage on mount
- Prevents SSR hydration issues
- Persists user data between sessions

### Form Validation
- Email format validation
- Password strength requirements (6+ characters)
- Password confirmation matching
- Real-time error clearing
- Field-level error messages

### Protected Routes
Profile page automatically redirects to login if user not authenticated.

### Demo Data
Three pre-seeded accounts in `DEMO_ACCOUNTS` array allow immediate testing without backend setup.

### User Avatar
Initials generated from user's name (e.g., "SJ" for Sarah Johnson).

---

## Navigation Map

```
/auth/login          - Public login page
/auth/signup         - Public registration page
/auth/profile        - Protected profile/account page (redirects if not auth)
/dashboard           - Seller dashboard (accessible when isSeller = true)
/                    - Homepage (shows auth state in header)
```

---

## Future Enhancements

Potential additions for production:
- Real backend API integration
- JWT token-based authentication
- Email verification
- Password reset functionality
- Two-factor authentication
- Google/social login
- Session timeout handling
- Rate limiting on login attempts
- Seller verification workflow

---

## Testing Checklist

- [ ] Login with demo accounts
- [ ] Signup new account
- [ ] Edit profile and save
- [ ] Verify localStorage persistence across refresh
- [ ] Test mobile responsive design
- [ ] Check dropdown menu functionality
- [ ] Verify redirect to login on protected routes
- [ ] Test logout functionality
- [ ] Validate form error messages
- [ ] Check seller dashboard visibility for sellers
