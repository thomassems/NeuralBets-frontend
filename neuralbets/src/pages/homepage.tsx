import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import WelcomeBanner from '../components/WelcomeBanner';
import Footer from '../components/Footer';
import LiveOdds from '../components/LiveOdds';
import { live_game } from '../types/Livegame';
import { getLiveOdds } from '../api/liveOddsApi';

const HomePage = () => {
    const [games, setGames] = useState<live_game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
    }, []);

    return (
        <div className='bg-mainblue'>
            <Header/>
            <WelcomeBanner liveEventsCount={games.length}/>
            <LiveOdds games={games} loading={loading} error={error}/>
            <Footer/>
        </div>
    );
}
export default HomePage;