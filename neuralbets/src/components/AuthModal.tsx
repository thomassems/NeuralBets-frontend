import { X } from 'lucide-react';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

interface AuthModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal = ({ isVisible, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fadeIn'
        onClick={onClose}
      />
      
      {/* Auth Modal */}
      <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none'>
        <div className='w-full max-w-md pointer-events-auto animate-scaleIn'>
          <div className='relative overflow-hidden rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-br from-gray-900 via-mainblue to-gray-900 shadow-2xl shadow-cyan-500/20'>
            {/* Animated gradient background */}
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse'></div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className='absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10'
            >
              <X className='w-5 h-5 text-gray-400 hover:text-white' />
            </button>
            
            <div className='relative'>
              {mode === 'login' ? (
                <Login 
                  onClose={onClose}
                  onSwitchToSignup={() => setMode('signup')}
                />
              ) : (
                <Signup 
                  onClose={onClose}
                  onSwitchToLogin={() => setMode('login')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
