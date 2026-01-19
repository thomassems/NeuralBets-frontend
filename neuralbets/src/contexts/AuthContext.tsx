import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
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
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user document exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // New Google user - need to collect age
      // This will be handled by the UI showing an age verification modal
      throw new Error('AGE_VERIFICATION_REQUIRED');
    }

    // Load existing user data
    setUserData(userDoc.data() as UserData);
  };

  // Complete Google signup with age verification
  const completeGoogleSignup = async (age: number) => {
    if (!currentUser) throw new Error('No user logged in');
    if (age < 18) {
      await signOut(auth);
      throw new Error('You must be 18 or older to create an account');
    }

    const userDocData: UserData = {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      age: age,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', currentUser.uid), userDocData);
    setUserData(userDocData);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  // Load user data from Firestore
  const loadUserData = async (user: User) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      setUserData(userDoc.data() as UserData);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await loadUserData(user);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
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
      {!loading && children}
    </AuthContext.Provider>
  );
};
