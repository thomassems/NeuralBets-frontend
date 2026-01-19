import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, AlertCircle } from 'lucide-react';

interface SignupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup, loginWithGoogle, currentUser } = useAuth();

  // Clear loading state if user is logged in (after redirect)
  useEffect(() => {
    if (currentUser) {
      setLoading(false);
      onClose();
    }
  }, [currentUser, onClose]);

  // Generate arrays for dropdowns
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Calculate age from date of birth
  const calculateAge = (birthMonth: string, birthDay: string, birthYear: string): number => {
    const today = new Date();
    const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    // Validate date of birth
    if (!month || !day || !year) {
      return setError('Please select your complete date of birth');
    }

    // Validate date is valid
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isNaN(birthDate.getTime())) {
      return setError('Please enter a valid date of birth');
    }

    // Calculate age
    const age = calculateAge(month, day, year);

    if (age < 18) {
      return setError('You must be 18 or older to create an account');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password, age);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Google signup error:', err);
      setLoading(false);
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Signup cancelled. Please try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('Domain not authorized. Please contact support.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // User clicked button multiple times, ignore
        setError('');
      } else {
        setError(err.message || 'Failed to sign up with Google');
      }
    }
  };

  return (
    <div className='w-full max-w-md p-8'>
      <div className='flex justify-center mb-6'>
        <div className='relative'>
          <div className='absolute inset-0 bg-purple-500/20 blur-2xl animate-pulse'></div>
          <div className='relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-500/50 flex items-center justify-center'>
            <UserPlus className='w-8 h-8 text-purple-400' />
          </div>
        </div>
      </div>

      <h2 className='text-3xl font-bold text-center mb-2'>
        <span className='bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent'>
          Create Account
        </span>
      </h2>
      <p className='text-gray-400 text-center mb-8'>Join us and start betting</p>

      {error && (
        <div className='mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 animate-fadeIn'>
          <AlertCircle className='w-5 h-5 text-red-400 flex-shrink-0 mt-0.5' />
          <p className='text-red-400 text-sm'>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='signup-email' className='block text-sm font-medium text-gray-300 mb-2'>
            Email
          </label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              id='signup-email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full pl-10 pr-4 py-3 bg-mainblue border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all'
              placeholder='your@email.com'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-300 mb-2'>
            Date of Birth <span className='text-xs text-gray-500'>(Must be 18+)</span>
          </label>
          <div className='flex gap-2'>
            <div className='flex-1'>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
                className='w-full px-3 py-3 bg-mainblue border-2 border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer'
              >
                <option value='' className='bg-mainblue'>Month</option>
                {months.map(m => (
                  <option key={m.value} value={m.value} className='bg-mainblue'>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-24'>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                className='w-full px-3 py-3 bg-mainblue border-2 border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer'
              >
                <option value='' className='bg-mainblue'>Day</option>
                {days.map(d => (
                  <option key={d} value={d} className='bg-mainblue'>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-28'>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className='w-full px-3 py-3 bg-mainblue border-2 border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer'
              >
                <option value='' className='bg-mainblue'>Year</option>
                {years.map(y => (
                  <option key={y} value={y} className='bg-mainblue'>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor='signup-password' className='block text-sm font-medium text-gray-300 mb-2'>
            Password
          </label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              id='signup-password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className='w-full pl-10 pr-4 py-3 bg-mainblue border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all'
              placeholder='••••••••'
            />
          </div>
        </div>

        <div>
          <label htmlFor='confirm-password' className='block text-sm font-medium text-gray-300 mb-2'>
            Confirm Password
          </label>
          <div className='relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              id='confirm-password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className='w-full pl-10 pr-4 py-3 bg-mainblue border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all'
              placeholder='••••••••'
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
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
        onClick={handleGoogleSignup}
        disabled={loading}
        className='w-full py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <svg className='w-5 h-5' viewBox='0 0 24 24'>
          <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
          <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
          <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
          <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
        </svg>
        Sign up with Google
      </button>

      <p className='mt-6 text-center text-sm text-gray-400'>
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className='text-purple-400 hover:text-purple-300 font-semibold transition-colors'
        >
          Log In
        </button>
      </p>

      <p className='mt-4 text-center text-xs text-gray-500'>
        By signing up, you agree that you are 18 years or older
      </p>
    </div>
  );
};

export default Signup;
