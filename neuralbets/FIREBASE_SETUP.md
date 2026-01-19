# Firebase Authentication Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select existing project
3. Name your project (e.g., "NeuralBets")
4. Follow the setup wizard

## Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Save
3. Enable **Google**:
   - Click on "Google"
   - Toggle "Enable"
   - Select a support email
   - Save

## Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create Database"
3. Start in **Production mode** (or Test mode for development)
4. Choose a location (e.g., us-central)

### Firestore Security Rules (for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 4: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the **Web icon** (`</>`)
4. Register your app (e.g., "NeuralBets Web")
5. Copy the `firebaseConfig` object

## Step 5: Configure Environment Variables

1. Create a `.env` file in `/NeuralBets-frontend/neuralbets/`:

```bash
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

2. Replace the values with your actual Firebase config
3. Add `.env` to `.gitignore` (should already be there)

## Step 6: Test Authentication

1. Start your app: `npm start`
2. Click "Register" in the header
3. Create an account with email/password and age (18+)
4. Or sign in with Google

## Features Implemented

✅ Email/Password Authentication
✅ Google Sign-in
✅ Age Verification (18+ requirement)
✅ User data stored in Firestore
✅ Persistent login state
✅ Login/Logout UI in header
✅ Beautiful auth modals with animations
✅ Protected bet placement (must be logged in)

## User Data Structure (Firestore)

```typescript
{
  uid: string;           // Firebase user ID
  email: string;         // User email
  displayName: string;   // User display name (optional)
  age: number;          // User age (verified 18+)
  createdAt: string;    // ISO timestamp
}
```

## Security Notes

- ⚠️ Never commit `.env` file to git
- ⚠️ Age is self-reported (consider additional verification for production)
- ⚠️ Set proper Firestore security rules in production
- ⚠️ Enable email verification in Firebase Console for additional security
