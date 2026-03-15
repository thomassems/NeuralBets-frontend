import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiveOdds from '../components/LiveOdds';
import WalletDisplay from '../components/WalletDisplay';
import ChallengeSelection from '../components/ChallengeSelection';
import LandingPage from '../components/LandingPage';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { live_game } from '../types/Livegame';
import { getLiveOdds } from '../api/liveOddsApi';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Bot, Receipt } from 'lucide-react';

const HomePage = () => {
    const { currentUser } = useAuth();
    const { wallet, loading: walletLoading, refreshWallet } = useWallet();
    const [games, setGames] = useState<live_game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const data = await getLiveOdds();
                setGames(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching live odds:', err);
                setError('Failed to load live odds. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (currentUser && walletLoading) {
        return (
            <div className='bg-mainblue min-h-screen flex flex-col'>
                <Header/>
                <div className='flex-grow flex items-center justify-center'>
                    <div className='flex flex-col items-center space-y-4'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400'></div>
                        <p className='text-white text-xl'>Loading your wallet...</p>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

    if (currentUser && !wallet) {
        return (
            <div className='bg-mainblue min-h-screen flex flex-col'>
                <Header/>
                <ChallengeSelection
                    userId={currentUser.uid}
                    onChallengeSelected={refreshWallet}
                />
                <Footer/>
            </div>
        );
    }

    if (currentUser && wallet) {
        return (
            <div className='bg-mainblue min-h-screen flex flex-col'>
                <Header/>

                <WalletDisplay wallet={wallet} onWalletUpdate={refreshWallet} />

                {/* Quick Actions */}
                <div className='mx-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Link to='/portal' className='group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='flex items-center gap-3 mb-2'>
                                    <BarChart3 className='w-6 h-6 text-cyan-400' />
                                    <h3 className='text-white font-bold text-lg'>Betting Portal</h3>
                                </div>
                                <p className='text-gray-400 text-sm'>Browse live odds and place bets</p>
                            </div>
                            <ArrowRight className='w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform' />
                        </div>
                    </Link>

                    <Link to='/my-bets' className='group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='flex items-center gap-3 mb-2'>
                                    <Receipt className='w-6 h-6 text-purple-400' />
                                    <h3 className='text-white font-bold text-lg'>My Bets</h3>
                                </div>
                                <p className='text-gray-400 text-sm'>Track your betting activity</p>
                            </div>
                            <ArrowRight className='w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform' />
                        </div>
                    </Link>

                    <Link to='/models' className='group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='flex items-center gap-3 mb-2'>
                                    <Bot className='w-6 h-6 text-orange-400' />
                                    <h3 className='text-white font-bold text-lg'>Models</h3>
                                </div>
                                <p className='text-gray-400 text-sm'>Build AI-powered betting strategies</p>
                            </div>
                            <ArrowRight className='w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform' />
                        </div>
                    </Link>
                </div>

                {/* Live Odds Preview */}
                <div className='mx-8 mb-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-white font-bold text-xl'>Live Odds</h2>
                        <Link to='/portal' className='text-cyan-400 text-sm hover:text-cyan-300 transition-colors flex items-center gap-1'>
                            View all <ArrowRight className='w-4 h-4' />
                        </Link>
                    </div>
                </div>

                <div className='flex-grow'>
                    <LiveOdds games={games} loading={loading} error={error}/>
                </div>
                <Footer/>
            </div>
        );
    }

    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header/>
            <LandingPage liveEventsCount={games.length} />
            <Footer/>
        </div>
    );
}
export default HomePage;