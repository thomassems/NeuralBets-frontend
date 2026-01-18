import { X, LogIn, UserPlus } from 'lucide-react';
import { useEffect } from 'react';

interface AuthNotificationProps {
    isVisible: boolean;
    onClose: () => void;
}

const AuthNotification = ({ isVisible, onClose }: AuthNotificationProps) => {
    // Auto-close after 5 seconds
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fadeIn'
                onClick={onClose}
            />
            
            {/* Notification Modal - Fixed positioning without transform initially */}
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
                    
                    <div className='relative p-8'>
                        {/* Icon */}
                        <div className='flex justify-center mb-6'>
                            <div className='relative'>
                                <div className='absolute inset-0 bg-cyan-500/20 blur-2xl animate-pulse'></div>
                                <div className='relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50 flex items-center justify-center animate-bounce'>
                                    <LogIn className='w-10 h-10 text-cyan-400' />
                                </div>
                            </div>
                        </div>
                        
                        {/* Title */}
                        <h2 className='text-2xl font-bold text-center mb-3'>
                            <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                                Login Required
                            </span>
                        </h2>
                        
                        {/* Message */}
                        <p className='text-gray-300 text-center mb-6 text-sm'>
                            You need to be logged in to place bets. Sign up now to start betting on live sports!
                        </p>
                        
                        {/* Action buttons */}
                        <div className='flex flex-col sm:flex-row gap-3'>
                            <button 
                                className='flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50'
                                onClick={() => {
                                    // TODO: Navigate to login page
                                    console.log('Navigate to login');
                                    onClose();
                                }}
                            >
                                <LogIn className='w-5 h-5' />
                                Login
                            </button>
                            
                            <button 
                                className='flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50'
                                onClick={() => {
                                    // TODO: Navigate to signup page
                                    console.log('Navigate to signup');
                                    onClose();
                                }}
                            >
                                <UserPlus className='w-5 h-5' />
                                Sign Up
                            </button>
                        </div>
                        
                        {/* Dismiss link */}
                        <button 
                            onClick={onClose}
                            className='w-full mt-4 text-sm text-gray-400 hover:text-gray-300 transition-colors'
                        >
                            Continue without logging in
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthNotification;
