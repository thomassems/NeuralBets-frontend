import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { LogOut, User, Wallet, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header = () => {
    const { currentUser, logout, userData } = useAuth();
    const { wallet } = useWallet();
    const location = useLocation();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setShowAuthModal(false);
        }
    }, [currentUser]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element;
            if (!target.closest('#user-menu-container')) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            setShowUserMenu(false);
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

    const isActive = (path: string) => location.pathname === path;

    const navLinkClasses = (path: string) =>
        `relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
            isActive(path)
                ? 'text-cyan-400 bg-cyan-500/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`;

    return (
        <>
            <AuthModal 
                isVisible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode={authMode}
            />
            
            <div className='sticky bg-black/95 backdrop-blur-md text-white top-0 flex justify-between items-center px-8 py-3 z-50 border-b border-white/5'>
                <div className='flex items-center gap-8'>
                    <Link to='/' className='bg-gradient-to-r from-[#22d3ee] to-[#c084fc] font-bold text-transparent bg-clip-text text-[20px] hover:opacity-80 transition-opacity'>
                        Neural Bets
                    </Link>

                    {currentUser && wallet && (
                        <nav className='hidden md:flex items-center gap-1'>
                            <Link to='/' className={navLinkClasses('/')}>
                                Home
                            </Link>
                            <Link to='/portal' className={navLinkClasses('/portal')}>
                                Betting Portal
                            </Link>
                            <Link to='/my-bets' className={navLinkClasses('/my-bets')}>
                                My Bets
                            </Link>
                            <Link to='/models' className={navLinkClasses('/models')}>
                                Models
                            </Link>
                        </nav>
                    )}
                </div>

                <div className='flex items-center gap-4'>
                    {currentUser && wallet && (
                        <Link to='/portal' className='hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-500/50 transition-all'>
                            <Wallet className='w-4 h-4 text-cyan-400' />
                            <span className='text-sm font-mono font-bold text-white'>
                                ${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </Link>
                    )}

                    {currentUser ? (
                        <div id='user-menu-container' className='relative'>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className='flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-500/50 transition-all'
                            >
                                <User className='w-4 h-4 text-cyan-400' />
                                <span className='text-sm text-gray-300 hidden sm:inline'>
                                    {userData?.displayName || userData?.email?.split('@')[0] || currentUser.email?.split('@')[0]}
                                </span>
                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {showUserMenu && (
                                <div className='absolute right-0 mt-2 w-56 rounded-xl bg-gray-900 border border-cyan-500/20 shadow-xl shadow-black/50 overflow-hidden animate-fadeIn'>
                                    <div className='px-4 py-3 border-b border-white/5'>
                                        <p className='text-xs text-gray-400'>Signed in as</p>
                                        <p className='text-sm text-white truncate'>{userData?.email || currentUser.email}</p>
                                    </div>

                                    <div className='py-1 md:hidden'>
                                        <Link to='/' onClick={() => setShowUserMenu(false)} className='block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors'>
                                            Home
                                        </Link>
                                        <Link to='/portal' onClick={() => setShowUserMenu(false)} className='block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors'>
                                            Betting Portal
                                        </Link>
                                        <Link to='/my-bets' onClick={() => setShowUserMenu(false)} className='block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors'>
                                            My Bets
                                        </Link>
                                        <Link to='/models' onClick={() => setShowUserMenu(false)} className='block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors'>
                                            Models
                                        </Link>
                                        <div className='border-t border-white/5'></div>
                                    </div>

                                    <div className='py-1'>
                                        <button
                                            onClick={handleLogout}
                                            className='w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2'
                                        >
                                            <LogOut className='w-4 h-4' />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
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