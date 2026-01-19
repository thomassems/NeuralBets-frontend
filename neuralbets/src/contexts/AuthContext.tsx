import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  age: number;
  createdAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  signup: (email: string, password: string, age: number) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Signup with email and password
  const signup = async (email: string, password: string, age: number) => {
    // Age verification
    if (age < 18) {
      throw new Error('You must be 18 or older to create an account');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore
    const userDocData: UserData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      age: age,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), userDocData);
    setUserData(userDocData);
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user document exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // New Google user - create profile with placeholder age
      const userDocData: UserData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        age: 0, // Needs verification
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', user.uid), userDocData);
      setUserData(userDocData);
    } else {
      setUserData(userDoc.data() as UserData);
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  // Load user data from Firestore
  const loadUserData = async (user: User) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (error: any) {
      console.error('Error loading user data:', error);
      // If offline or Firebase not configured, still allow the user to be logged in
      // They just won't have extended profile data
      if (error.code === 'unavailable' || error.message?.includes('offline')) {
        console.warn('Firebase is offline or not configured. User data not loaded.');
      }
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    let isSubscribed = true;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isSubscribed) return;
      
      setCurrentUser(user);
      
      if (user) {
        await loadUserData(user);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    }, (error) => {
      if (!isSubscribed) return;
      console.error('Auth state error:', error);
      setLoading(false);
    });

    // Quick timeout to show app even if auth is slow
    const timeout = setTimeout(() => {
      if (isSubscribed && loading) {
        setLoading(false);
      }
    }, 500);

    return () => {
      isSubscribed = false;
      clearTimeout(timeout);
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
