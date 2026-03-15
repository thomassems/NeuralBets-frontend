import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { getTransactions, Transaction } from '../api/walletApi';
import { Navigate } from 'react-router-dom';
import { Clock, TrendingUp, TrendingDown, CircleDot, ArrowUpRight, RotateCcw } from 'lucide-react';

const MyBets = () => {
    const { currentUser } = useAuth();
    const { wallet } = useWallet();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!currentUser) return;
            try {
                setLoading(true);
                const data = await getTransactions(currentUser.uid);
                setTransactions(data);
            } catch (err) {
                console.error('Error fetching transactions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [currentUser]);

    if (!currentUser) {
        return <Navigate to='/' replace />;
    }

    const filteredTransactions = filter === 'all'
        ? transactions
        : transactions.filter(t => t.type === filter);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'bet_placed':
                return <ArrowUpRight className='w-4 h-4 text-orange-400' />;
            case 'bet_won':
                return <TrendingUp className='w-4 h-4 text-green-400' />;
            case 'bet_lost':
                return <TrendingDown className='w-4 h-4 text-red-400' />;
            case 'challenge_start':
                return <CircleDot className='w-4 h-4 text-cyan-400' />;
            case 'balance_adjustment':
                return <RotateCcw className='w-4 h-4 text-purple-400' />;
            default:
                return <CircleDot className='w-4 h-4 text-gray-400' />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'bet_placed': return 'text-orange-400';
            case 'bet_won': return 'text-green-400';
            case 'bet_lost': return 'text-red-400';
            case 'challenge_start': return 'text-cyan-400';
            case 'balance_adjustment': return 'text-purple-400';
            default: return 'text-gray-400';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'bet_placed': return 'Bet Placed';
            case 'bet_won': return 'Won';
            case 'bet_lost': return 'Lost';
            case 'challenge_start': return 'Challenge Started';
            case 'balance_adjustment': return 'Reset';
            default: return type;
        }
    };

    const formatDate = (isoString: string) => {
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true
            });
        } catch { return isoString; }
    };

    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header/>

            <div className='mx-8 mt-8 mb-6'>
                <h1 className='text-3xl font-bold'>
                    <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                        My Bets
                    </span>
                </h1>
                <p className='text-gray-400 mt-2'>Track your betting activity and outcomes</p>
            </div>

            {/* Stats Summary */}
            {wallet && (
                <div className='mx-8 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='rounded-2xl p-5 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-cyan-500/10'>
                        <p className='text-gray-400 text-xs mb-1'>Total Bets</p>
                        <p className='text-white font-bold text-2xl'>{wallet.bets_placed}</p>
                    </div>
                    <div className='rounded-2xl p-5 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-green-500/10'>
                        <p className='text-gray-400 text-xs mb-1'>Won</p>
                        <p className='text-green-400 font-bold text-2xl'>{wallet.bets_won}</p>
                    </div>
                    <div className='rounded-2xl p-5 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-red-500/10'>
                        <p className='text-gray-400 text-xs mb-1'>Lost</p>
                        <p className='text-red-400 font-bold text-2xl'>{wallet.bets_lost}</p>
                    </div>
                    <div className='rounded-2xl p-5 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-purple-500/10'>
                        <p className='text-gray-400 text-xs mb-1'>Win Rate</p>
                        <p className='text-purple-400 font-bold text-2xl'>
                            {wallet.bets_placed > 0 ? ((wallet.bets_won / wallet.bets_placed) * 100).toFixed(1) : '0.0'}%
                        </p>
                    </div>
                </div>
            )}

            {/* Filter Tabs */}
            <div className='mx-8 mb-6 flex gap-2 flex-wrap'>
                {[
                    { key: 'all', label: 'All' },
                    { key: 'bet_placed', label: 'Placed' },
                    { key: 'bet_won', label: 'Won' },
                    { key: 'bet_lost', label: 'Lost' },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            filter === tab.key
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'bg-gray-900/30 text-gray-400 border border-white/5 hover:border-cyan-500/30 hover:text-gray-300'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Transactions List */}
            <div className='mx-8 flex-grow mb-12'>
                {loading ? (
                    <div className='flex items-center justify-center py-16'>
                        <div className='flex flex-col items-center space-y-4'>
                            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400'></div>
                            <p className='text-white text-xl'>Loading bet history...</p>
                        </div>
                    </div>
                ) : filteredTransactions.length === 0 ? (
                    <div className='flex items-center justify-center py-16'>
                        <div className='text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-cyan-500/10'>
                            <p className='text-gray-400 text-lg mb-2'>No betting activity yet</p>
                            <p className='text-gray-500 text-sm'>Head to the <a href='/portal' className='text-cyan-400 hover:underline'>Betting Portal</a> to place your first bet!</p>
                        </div>
                    </div>
                ) : (
                    <div className='space-y-3'>
                        {filteredTransactions.map(transaction => (
                            <div key={transaction.transaction_id} className='rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5'>
                                            {getTypeIcon(transaction.type)}
                                        </div>
                                        <div>
                                            <div className='flex items-center gap-2'>
                                                <span className={`text-sm font-semibold ${getTypeColor(transaction.type)}`}>
                                                    {getTypeLabel(transaction.type)}
                                                </span>
                                            </div>
                                            <p className='text-gray-500 text-xs'>{transaction.description}</p>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <p className={`font-mono font-bold ${transaction.amount > 0 ? 'text-green-400' : transaction.amount < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                            {transaction.amount > 0 ? '+' : ''}{transaction.amount !== 0 ? `$${Math.abs(transaction.amount).toFixed(2)}` : '-'}
                                        </p>
                                        <div className='flex items-center gap-1 text-gray-500 text-xs mt-1'>
                                            <Clock className='w-3 h-3' />
                                            <span>{formatDate(transaction.created_at)}</span>
                                        </div>
                                        <p className='text-gray-600 text-xs'>Bal: ${transaction.balance_after.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer/>
        </div>
    );
};

export default MyBets;
