import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Check if Firebase is configured
const isConfigured = firebaseConfig.apiKey && 
                     firebaseConfig.projectId && 
                     !firebaseConfig.apiKey.includes('your_') &&
                     !firebaseConfig.apiKey.includes('here');

if (!isConfigured) {
  console.error(
    '🔥 Firebase Configuration Missing!\n\n' +
    'Follow these steps:\n' +
    '1. Go to https://console.firebase.google.com/\n' +
    '2. Create a project or select existing one\n' +
    '3. Enable Authentication (Email/Password & Google)\n' +
    '4. Create Firestore Database\n' +
    '5. Get your config from Project Settings > Your apps\n' +
    '6. Update your .env file with real values\n' +
    '7. Restart the dev server (npm start)\n\n' +
    'See FIREBASE_SETUP.md for detailed instructions.'
  );
} else {
  console.log('✅ Firebase config loaded:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase app initialized');

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

export default app;
