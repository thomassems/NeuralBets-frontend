import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiveOdds from '../components/LiveOdds';
import WalletDisplay from '../components/WalletDisplay';
import ChallengeSelection from '../components/ChallengeSelection';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { live_game } from '../types/Livegame';
import { getLiveOdds } from '../api/liveOddsApi';
import { Navigate } from 'react-router-dom';

const BettingPortal = () => {
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

    if (!currentUser) {
        return <Navigate to='/' replace />;
    }

    if (walletLoading) {
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

    if (!wallet) {
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

    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header/>

            {/* Portal Header */}
            <div className='mx-8 mt-8 mb-2'>
                <h1 className='text-3xl font-bold'>
                    <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                        Betting Portal
                    </span>
                </h1>
                <p className='text-gray-400 mt-2'>Browse live odds and place your simulated bets</p>
            </div>

            <WalletDisplay wallet={wallet} onWalletUpdate={refreshWallet} />

            <div className='flex-grow'>
                <LiveOdds games={games} loading={loading} error={error}/>
            </div>
            <Footer/>
        </div>
    );
};

export default BettingPortal;
