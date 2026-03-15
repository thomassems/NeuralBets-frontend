import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, RotateCcw, History, Target } from 'lucide-react';
import { Wallet as WalletType } from '../api/walletApi';
import { resetWallet } from '../api/walletApi';

interface WalletDisplayProps {
    wallet: WalletType;
    onWalletUpdate: () => void;
}

const WalletDisplay: React.FC<WalletDisplayProps> = ({ wallet, onWalletUpdate }) => {
    const [showStats, setShowStats] = useState(false);
    const [resetting, setResetting] = useState(false);

    const profitLoss = wallet.balance - wallet.starting_balance;
    const isProfitable = profitLoss > 0;
    const winRate = wallet.bets_placed > 0 
        ? ((wallet.bets_won / wallet.bets_placed) * 100).toFixed(1) 
        : '0.0';
    
    const targetProgress = wallet.target_balance 
        ? ((wallet.balance / wallet.target_balance) * 100).toFixed(1)
        : null;

    const handleReset = async () => {
        if (!window.confirm('Are you sure you want to reset your wallet? This will restore your starting balance and clear all stats.')) {
            return;
        }

        setResetting(true);
        try {
            await resetWallet(wallet.user_id);
            onWalletUpdate();
        } catch (err) {
            console.error('Error resetting wallet:', err);
            alert('Failed to reset wallet');
        } finally {
            setResetting(false);
        }
    };

    return (
        <div className='mx-8 mt-4 mb-8'>
            <div className='relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-gray-900/70 via-gray-900/50 to-gray-900/30 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40'>
                <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse'></div>
                
                <div className='relative p-6'>
                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
                        {/* Balance Section */}
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'>
                                <Wallet className='w-7 h-7 text-cyan-400' />
                            </div>
                            <div>
                                <p className='text-gray-400 text-sm mb-1'>Current Balance</p>
                                <p className='text-white font-bold text-3xl font-mono'>
                                    ${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                                <div className={`flex items-center gap-1 text-sm mt-1 ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
                                    {isProfitable ? <TrendingUp className='w-4 h-4' /> : <TrendingDown className='w-4 h-4' />}
                                    <span className='font-semibold'>
                                        {isProfitable ? '+' : ''}{profitLoss.toFixed(2)}
                                    </span>
                                    <span className='text-gray-500'>
                                        ({isProfitable ? '+' : ''}{((profitLoss / wallet.starting_balance) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className='flex flex-wrap gap-4'>
                            <div className='bg-mainblue/50 rounded-xl px-4 py-3 border border-cyan-500/10'>
                                <p className='text-gray-400 text-xs mb-1'>Bets Placed</p>
                                <p className='text-white font-bold text-xl'>{wallet.bets_placed}</p>
                            </div>
                            <div className='bg-mainblue/50 rounded-xl px-4 py-3 border border-green-500/10'>
                                <p className='text-gray-400 text-xs mb-1'>Win Rate</p>
                                <p className='text-green-400 font-bold text-xl'>{winRate}%</p>
                            </div>
                            {targetProgress && (
                                <div className='bg-mainblue/50 rounded-xl px-4 py-3 border border-purple-500/10'>
                                    <p className='text-gray-400 text-xs mb-1 flex items-center gap-1'>
                                        <Target className='w-3 h-3' />
                                        Target Progress
                                    </p>
                                    <p className='text-purple-400 font-bold text-xl'>{targetProgress}%</p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className='flex gap-3'>
                            <button
                                onClick={() => setShowStats(!showStats)}
                                className='px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-500/50 transition-all duration-200 flex items-center gap-2'
                            >
                                <History className='w-4 h-4' />
                                {showStats ? 'Hide' : 'Stats'}
                            </button>
                            <button
                                onClick={handleReset}
                                disabled={resetting}
                                className='px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-500/50 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                <RotateCcw className={`w-4 h-4 ${resetting ? 'animate-spin' : ''}`} />
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Expanded Stats */}
                    {showStats && (
                        <div className='mt-6 pt-6 border-t border-cyan-500/10 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn'>
                            <div className='text-center'>
                                <p className='text-gray-400 text-xs mb-1'>Total Wagered</p>
                                <p className='text-white font-semibold'>${wallet.total_wagered.toFixed(2)}</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-gray-400 text-xs mb-1'>Total Won</p>
                                <p className='text-green-400 font-semibold'>${wallet.total_won.toFixed(2)}</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-gray-400 text-xs mb-1'>Total Lost</p>
                                <p className='text-red-400 font-semibold'>${wallet.total_lost.toFixed(2)}</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-gray-400 text-xs mb-1'>Net Profit</p>
                                <p className={`font-semibold ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
                                    ${profitLoss.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletDisplay;
