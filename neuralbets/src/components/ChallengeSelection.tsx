import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Sparkles, DollarSign } from 'lucide-react';
import { getChallengeConfigs, createWallet, ChallengeConfig } from '../api/walletApi';

interface ChallengeSelectionProps {
    userId: string;
    onChallengeSelected: () => void;
}

const ChallengeSelection: React.FC<ChallengeSelectionProps> = ({ userId, onChallengeSelected }) => {
    const [challenges, setChallenges] = useState<ChallengeConfig[]>([]);
    const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('10000');
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadChallenges = async () => {
            try {
                const configs = await getChallengeConfigs();
                setChallenges(configs);
                setLoading(false);
            } catch (err) {
                console.error('Error loading challenges:', err);
                setError('Failed to load challenge options');
                setLoading(false);
            }
        };

        loadChallenges();
    }, []);

    const handleCreateWallet = async () => {
        if (!selectedChallenge) return;

        setCreating(true);
        setError(null);

        try {
            const customBalance = selectedChallenge === 'free_play' 
                ? parseFloat(customAmount) 
                : undefined;

            await createWallet(userId, selectedChallenge, customBalance);
            onChallengeSelected();
        } catch (err: any) {
            console.error('Error creating wallet:', err);
            setError(err.message || 'Failed to create wallet');
            setCreating(false);
        }
    };

    const getChallengeIcon = (challengeType: string) => {
        switch (challengeType) {
            case 'challenge_100_1000':
                return <Trophy className='w-8 h-8 text-yellow-400' />;
            case 'challenge_500_5000':
                return <TrendingUp className='w-8 h-8 text-orange-400' />;
            case 'challenge_1000_10000':
                return <Sparkles className='w-8 h-8 text-purple-400' />;
            case 'free_play':
                return <DollarSign className='w-8 h-8 text-cyan-400' />;
            default:
                return <Trophy className='w-8 h-8 text-gray-400' />;
        }
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-mainblue'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400'></div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-mainblue flex items-center justify-center p-4'>
            <div className='max-w-5xl w-full'>
                <div className='text-center mb-12'>
                    <h1 className='text-5xl font-bold mb-4'>
                        <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                            Choose Your Challenge
                        </span>
                    </h1>
                    <p className='text-gray-300 text-lg'>
                        Select a challenge mode to start your simulated betting journey
                    </p>
                </div>

                {error && (
                    <div className='mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center'>
                        {error}
                    </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                    {challenges.map((challenge) => {
                        const isSelected = selectedChallenge === challenge.challenge_type;
                        const isFreePlay = challenge.challenge_type === 'free_play';

                        return (
                            <div
                                key={challenge.challenge_type}
                                onClick={() => setSelectedChallenge(challenge.challenge_type)}
                                className={`
                                    relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300
                                    ${isSelected
                                        ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20'
                                        : 'bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-2 border-cyan-500/10 hover:border-cyan-500/30'
                                    }
                                `}
                            >
                                {isSelected && (
                                    <div className='absolute top-4 right-4 w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center'>
                                        <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                        </svg>
                                    </div>
                                )}

                                <div className='flex items-start gap-4 mb-4'>
                                    <div className='flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'>
                                        {getChallengeIcon(challenge.challenge_type)}
                                    </div>
                                    <div className='flex-grow'>
                                        <h3 className='text-white font-bold text-xl mb-2'>
                                            {challenge.display_name}
                                        </h3>
                                        <p className='text-gray-400 text-sm'>
                                            {challenge.description}
                                        </p>
                                    </div>
                                </div>

                                {!isFreePlay && (
                                    <div className='mt-4 pt-4 border-t border-cyan-500/10'>
                                        <div className='flex justify-between items-center'>
                                            <div className='text-gray-400 text-sm'>Starting Balance</div>
                                            <div className='text-cyan-400 font-bold text-lg'>
                                                ${challenge.starting_balance.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <div className='text-gray-400 text-sm'>Target Balance</div>
                                            <div className='text-green-400 font-bold text-lg'>
                                                ${challenge.target_balance.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isFreePlay && isSelected && (
                                    <div className='mt-4 pt-4 border-t border-cyan-500/10'>
                                        <label className='block text-gray-400 text-sm mb-2'>
                                            Choose Your Starting Balance
                                        </label>
                                        <div className='relative'>
                                            <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 font-bold text-lg'>
                                                $
                                            </span>
                                            <input
                                                type='number'
                                                min='100'
                                                max='1000000'
                                                step='100'
                                                value={customAmount}
                                                onChange={(e) => setCustomAmount(e.target.value)}
                                                className='w-full bg-mainblue border-2 border-cyan-500/30 text-white rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 font-mono text-lg'
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                        <p className='text-xs text-gray-500 mt-2'>
                                            Max: $1,000,000
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className='flex justify-center'>
                    <button
                        onClick={handleCreateWallet}
                        disabled={!selectedChallenge || creating}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                            ${selectedChallenge && !creating
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105'
                                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                            }
                        `}
                    >
                        {creating ? (
                            <span className='flex items-center gap-2'>
                                <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white'></div>
                                Creating Wallet...
                            </span>
                        ) : (
                            'Start Betting'
                        )}
                    </button>
                </div>

                <div className='mt-8 text-center text-gray-500 text-sm'>
                    <p>🎮 All bets are simulated - No real money involved</p>
                    <p className='mt-2'>Practice your strategies risk-free!</p>
                </div>
            </div>
        </div>
    );
};

export default ChallengeSelection;
