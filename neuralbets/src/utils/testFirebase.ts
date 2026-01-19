// Test Firebase Connection
// Run this in browser console to debug Firebase issues

import { auth, db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  console.log('🔥 Testing Firebase Configuration...\n');
  
  // Test 1: Check if Firebase is initialized
  console.log('1️⃣ Firebase Auth initialized:', !!auth);
  console.log('2️⃣ Firestore initialized:', !!db);
  
  // Test 2: Check environment variables
  console.log('\n3️⃣ Environment Variables:');
  console.log('  - API Key:', process.env.REACT_APP_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('  - Project ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID || '❌ Missing');
  console.log('  - Auth Domain:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '❌ Missing');
  
  // Test 3: Try to connect to Firestore
  console.log('\n4️⃣ Testing Firestore Connection...');
  try {
    // Try to read from a test collection (will fail if Firestore not created)
    const testRef = collection(db, 'test');
    await getDocs(testRef);
    console.log('  ✅ Firestore is reachable!');
  } catch (error: any) {
    console.error('  ❌ Firestore connection failed:', error.code);
    
    if (error.code === 'unavailable') {
      console.error('\n❌ ERROR: Firestore database not created!');
      console.error('\n📝 Fix:');
      console.error('1. Go to https://console.firebase.google.com/');
      console.error('2. Select your project: "neural-bets"');
      console.error('3. Click "Firestore Database" in sidebar');
      console.error('4. Click "Create database"');
      console.error('5. Choose "Start in production mode"');
      console.error('6. Select a location and click "Enable"');
      console.error('7. Refresh this page after Firestore is created');
    } else if (error.message?.includes('offline')) {
      console.error('\n❌ ERROR: Network offline or blocked');
      console.error('Check your internet connection and firewall settings');
    } else {
      console.error('\n❌ Unexpected error:', error.message);
    }
  }
  
  // Test 4: Check Auth configuration
  console.log('\n5️⃣ Auth Configuration:');
  console.log('  - Current User:', auth.currentUser ? '✅ Logged in' : 'Not logged in (expected)');
  
  console.log('\n✅ Test complete! Check messages above for issues.');
};

// Auto-run on import (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('💡 Tip: Run testFirebaseConnection() in console to check Firebase setup');
}
