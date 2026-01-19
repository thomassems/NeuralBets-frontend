import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const FirebaseStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkFirebase = async () => {
      try {
        // Try to access Firestore
        const testRef = collection(db, 'test');
        await getDocs(testRef);
        setStatus('connected');
      } catch (error: any) {
        setStatus('error');
        if (error.code === 'unavailable') {
          setErrorMessage('Firestore database not created. Go to Firebase Console → Firestore Database → Create database');
        } else if (error.message?.includes('offline')) {
          setErrorMessage('Network offline or Firebase not configured properly');
        } else {
          setErrorMessage(`${error.code}: ${error.message}`);
        }
      }
    };

    checkFirebase();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className='fixed bottom-4 right-4 z-[9999] max-w-md'>
      {status === 'checking' && (
        <div className='bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2'>
          <AlertCircle className='w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5' />
          <div>
            <p className='text-yellow-400 text-sm font-semibold'>Checking Firebase...</p>
          </div>
        </div>
      )}

      {status === 'connected' && (
        <div className='bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-start gap-2'>
          <CheckCircle className='w-5 h-5 text-green-400 flex-shrink-0 mt-0.5' />
          <div>
            <p className='text-green-400 text-sm font-semibold'>Firebase Connected ✅</p>
            <p className='text-green-400/70 text-xs mt-1'>Firestore is working properly</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className='bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2'>
          <XCircle className='w-5 h-5 text-red-400 flex-shrink-0 mt-0.5' />
          <div>
            <p className='text-red-400 text-sm font-semibold'>Firebase Connection Error ❌</p>
            <p className='text-red-400/80 text-xs mt-1'>{errorMessage}</p>
            <a 
              href='https://console.firebase.google.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-red-400 underline text-xs mt-2 inline-block hover:text-red-300'
            >
              Open Firebase Console →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseStatus;
