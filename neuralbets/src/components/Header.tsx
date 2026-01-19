import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import AuthModal from './AuthModal';

const Header = () => {
    const { currentUser, logout, userData } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const openLogin = () => {
        setAuthMode('login');
        setShowAuthModal(true);
    };

    const openSignup = () => {
        setAuthMode('signup');
        setShowAuthModal(true);
    };

    return (
        <>
            <AuthModal 
                isVisible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode={authMode}
            />
            
            <div className='sticky bg-black text-white top-0 flex justify-between items-center px-8 py-2 z-50'>
                <h1 className='bg-gradient-to-r from-[#22d3ee] to-[#c084fc] text-70px font-bold text-transparent
                bg-clip-text text-[20px]'>
                    Neural Bets
                </h1>
                <div className='flex items-center gap-4'>
                    {currentUser ? (
                        <>
                            <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30'>
                                <User className='w-4 h-4 text-cyan-400' />
                                <span className='text-sm text-gray-300'>
                                    {userData?.email || currentUser.email}
                                </span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className='flex items-center gap-2 rounded-full px-4 py-2 text-white font-semibold hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all'
                            >
                                <LogOut className='w-4 h-4' />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={openLogin}
                                className='rounded-full px-6 py-2 text-white font-bold hover:bg-white/5 transition-all'
                            >
                                Login
                            </button>
                            <button 
                                onClick={openSignup}
                                className='rounded-full bg-gradient-to-r from-[#22d3ee] to-[#c084fc] text-black font-bold py-2 px-6 shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105'
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;