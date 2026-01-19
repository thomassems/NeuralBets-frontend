import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      if (err.message === 'AGE_VERIFICATION_REQUIRED') {
        setError('New Google users need to verify age. Please use Sign Up.');
      } else {
        setError(err.message || 'Failed to log in with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md p-8'>
      <div className='flex justify-center mb-6'>
        <div className='relative'>
          <div className='absolute inset-0 bg-cyan-500/20 blur-2xl animate-pulse'></div>
          <div className='relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50 flex items-center justify-center'>
            <LogIn className='w-8 h-8 text-cyan-400' />
          </div>
        </div>
      </div>

      <h2 className='text-3xl font-bold text-center mb-2'>
        <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
          Welcome Back
        </span>
      </h2>
      <p className='text-gray-400 text-center mb-8'>Log in to continue betting</p>

      {error && (
        <div className='mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 animate-fadeIn'>
          <AlertCircle className='w-5 h-5 text-red-400 flex-shrink-0 mt-0.5' />
          <p className='text-red-400 text-sm'>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
            Email
          </label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full pl-10 pr-4 py-3 bg-mainblue border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all'
              placeholder='your@email.com'
            />
          </div>
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
            Password
          </label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full pl-10 pr-4 py-3 bg-mainblue border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all'
              placeholder='••••••••'
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className='relative my-6'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-700'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-4 bg-gray-900 text-gray-400'>Or continue with</span>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className='w-full py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <svg className='w-5 h-5' viewBox='0 0 24 24'>
          <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
          <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
          <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
          <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
        </svg>
        Sign in with Google
      </button>

      <p className='mt-6 text-center text-sm text-gray-400'>
        Don't have an account?{' '}
        <button
          onClick={onSwitchToSignup}
          className='text-cyan-400 hover:text-cyan-300 font-semibold transition-colors'
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
