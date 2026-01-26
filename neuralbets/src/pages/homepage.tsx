import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import WelcomeBanner from '../components/WelcomeBanner';
import Footer from '../components/Footer';
import LiveOdds from '../components/LiveOdds';
import { useAuth } from '../contexts/AuthContext';
import { live_game } from '../types/Livegame';
import { getLiveOdds } from '../api/liveOddsApi';
import { Construction } from 'lucide-react';

const HomePage = () => {
    const { currentUser } = useAuth();
    const [games, setGames] = useState<live_game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Only fetch games if user is not logged in
        if (!currentUser) {
            const fetchGames = async () => {
                try {
                    setLoading(true);
                    const data = await getLiveOdds();
                    console.log('Fetched live odds:', data);
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
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    // If user is logged in, show under construction page
    if (currentUser) {
        return (
            <div className='bg-mainblue min-h-screen flex flex-col'>
                <Header/>
                <div className='flex-grow flex items-center justify-center'>
                    <div className='text-center px-4 max-w-2xl'>
                        <div className='flex justify-center mb-6'>
                            <div className='relative'>
                                <div className='absolute inset-0 bg-cyan-500/20 blur-2xl animate-pulse'></div>
                                <div className='relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50 flex items-center justify-center'>
                                    <Construction className='w-10 h-10 text-cyan-400' />
                                </div>
                            </div>
                        </div>
                        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                            <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                                Under Construction
                            </span>
                        </h1>
                        <p className='text-gray-300 text-lg md:text-xl'>
                            You're seeing an early build. Some trading features are still being deployed.
                        </p>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

    // If user is not logged in, show normal homepage
    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header/>
            <WelcomeBanner liveEventsCount={games.length}/>
            <div className='flex-grow'>
                <LiveOdds games={games} loading={loading} error={error}/>
            </div>
            <Footer/>
        </div>
    );
}
export default HomePage;