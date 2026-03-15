import React, { useState } from 'react';
import { LiveIndicator } from './LiveIndicator';
import AuthModal from './AuthModal';
import {
    Trophy, TrendingUp, Sparkles, DollarSign, ArrowRight,
    Bot, BarChart3, Shield, Activity, Layers, Target,
    Zap, Eye, SlidersHorizontal, Play, ChevronRight
} from 'lucide-react';

interface LandingPageProps {
    liveEventsCount: number;
}

const LandingPage: React.FC<LandingPageProps> = ({ liveEventsCount }) => {
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

    const openSignup = () => { setAuthMode('signup'); setShowAuth(true); };
    const openLogin = () => { setAuthMode('login'); setShowAuth(true); };

    return (
        <>
            <AuthModal isVisible={showAuth} onClose={() => setShowAuth(false)} initialMode={authMode} />

            {/* ── HERO ──────────────────────────────────────────────── */}
            <section className='relative overflow-hidden border-b border-cyan-500/10'>
                <div className='absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent'></div>
                <div className='absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed10_1px,transparent_1px)] bg-[size:4rem_4rem]'></div>

                {/* Floating orbs */}
                <div className='absolute top-20 left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse'></div>
                <div className='absolute bottom-10 right-[10%] w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] animate-pulse' style={{ animationDelay: '1s' }}></div>

                <div className='relative max-w-6xl mx-auto px-8 pt-24 pb-28'>
                    <div className='flex flex-col lg:flex-row items-center gap-16'>
                        {/* Left - Text */}
                        <div className='lg:w-1/2 text-center lg:text-left'>
                            <div className='flex items-center gap-3 justify-center lg:justify-start mb-6'>
                                <LiveIndicator/>
                                <span className='text-sm text-gray-400'>{liveEventsCount} Live Event{liveEventsCount !== 1 ? 's' : ''} Right Now</span>
                            </div>
                            <h1 className='text-5xl md:text-6xl font-bold leading-tight mb-6'>
                                <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>Practice</span> 
                                <div className='text-white'>Sports Betting</div>
                                <span className='text-white'>Without The Risk</span>
                            </h1>
                            <p className='text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0'>
                                Real odds. Simulated money. Build strategies, test models, and compete in challenges, all without risking a cent.
                            </p>
                            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                                <button
                                    onClick={openSignup}
                                    className='px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2'
                                >
                                    Start Free <ArrowRight className='w-5 h-5' />
                                </button>
                                <button
                                    onClick={openLogin}
                                    className='px-8 py-4 rounded-xl border-2 border-cyan-500/30 text-white font-bold text-lg hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300'
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>

                        {/* Right - Visual Card */}
                        <div className='lg:w-1/2 w-full max-w-md'>
                            <div className='relative'>
                                <div className='absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl'></div>
                                <div className='relative rounded-2xl border border-cyan-500/20 bg-gray-900/80 backdrop-blur-md p-6 space-y-4'>
                                    {/* Fake wallet header */}
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center'>
                                                <DollarSign className='w-4 h-4 text-cyan-400' />
                                            </div>
                                            <span className='text-gray-400 text-sm'>Balance</span>
                                        </div>
                                        <span className='text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/30'>
                                            $100 → $1K Challenge
                                        </span>
                                    </div>
                                    <p className='text-white font-bold text-4xl font-mono'>$847.50</p>
                                    <div className='flex items-center gap-1 text-green-400 text-sm'>
                                        <TrendingUp className='w-4 h-4' /> +$747.50 (747.5%)
                                    </div>
                                    <div className='h-px bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent'></div>
                                    {/* Fake bets */}
                                    <div className='space-y-2'>
                                        {[
                                            { teams: 'Maple Leafs vs Canadiens', pick: 'TOR ML', odds: '-135', result: 'won' },
                                            { teams: 'Lakers vs Celtics', pick: 'BOS ML', odds: '+110', result: 'won' },
                                            { teams: 'Chiefs vs Bills', pick: 'KC ML', odds: '-150', result: 'pending' },
                                        ].map((bet, i) => (
                                            <div key={i} className='flex items-center justify-between px-3 py-2 rounded-lg bg-mainblue/50 border border-white/5'>
                                                <div>
                                                    <p className='text-xs text-gray-500'>{bet.teams}</p>
                                                    <p className='text-sm text-white'>{bet.pick} <span className='text-cyan-400 font-mono'>{bet.odds}</span></p>
                                                </div>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                    bet.result === 'won' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                                }`}>
                                                    {bet.result === 'won' ? 'Won' : 'Pending'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ──────────────────────────────────────── */}
            <section className='relative py-24 px-8'>
                <div className='max-w-5xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>How It Works</h2>
                        <p className='text-gray-400 max-w-2xl mx-auto'>
                            Get started in minutes. No credit card, no real money, just pick a challenge and start betting.
                        </p>
                    </div>

                    <div className='relative'>
                        {/* Connecting line */}
                        <div className='hidden md:block absolute top-16 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30'></div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                            {[
                                { step: '01', icon: <Shield className='w-7 h-7 text-cyan-400' />, title: 'Create Your Account', desc: 'Sign up in seconds with email or Google. Choose a betting challenge or free play mode to set your starting balance.' },
                                { step: '02', icon: <Eye className='w-7 h-7 text-purple-400' />, title: 'Browse & Bet', desc: 'Explore real-time odds across NFL, NHL, Soccer, and more. Build parlays, filter by sport, and place simulated bets.' },
                                { step: '03', icon: <Bot className='w-7 h-7 text-orange-400' />, title: 'Build & Refine', desc: 'Create custom betting models with conditions. Use the AI strategy assistant to learn, test, and improve your approach.' },
                            ].map((item, i) => (
                                <div key={i} className='relative text-center'>
                                    <div className='relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-mainblue border-2 border-cyan-500/30 mb-5'>
                                        {item.icon}
                                    </div>
                                    <div className='absolute -top-2 -right-2 z-20 text-xs font-bold text-cyan-400/60'>{item.step}</div>
                                    <h3 className='text-white font-bold text-lg mb-2'>{item.title}</h3>
                                    <p className='text-gray-400 text-sm leading-relaxed'>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CHALLENGES ────────────────────────────────────────── */}
            <section className='relative py-24 px-8 border-t border-white/5'>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent'></div>
                <div className='relative max-w-6xl mx-auto'>
                    <div className='flex flex-col lg:flex-row items-center gap-16'>
                        {/* Left - Text */}
                        <div className='lg:w-1/2'>
                            <span className='text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3 block'>Challenges</span>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Pick Your Challenge,<br/>Prove Your Strategy</h2>
                            <p className='text-gray-400 leading-relaxed mb-6'>
                                Challenges give your betting a goal. Start with a set balance and try to hit a target. It's the best way to practice discipline and bankroll management with real stakes (minus the real money).
                            </p>
                            <ul className='space-y-3 mb-8'>
                                {[
                                    'Structured goals keep you disciplined',
                                    'Tracks your P/L, win rate, and progress',
                                    'Reset anytime to try a different approach',
                                ].map((text, i) => (
                                    <li key={i} className='flex items-center gap-3 text-gray-300 text-sm'>
                                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center'>
                                            <ChevronRight className='w-3 h-3 text-cyan-400' />
                                        </div>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={openSignup} className='text-cyan-400 font-semibold text-sm flex items-center gap-2 hover:text-cyan-300 transition-colors'>
                                Start a Challenge <ArrowRight className='w-4 h-4' />
                            </button>
                        </div>

                        {/* Right - Challenge Cards */}
                        <div className='lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {[
                                { icon: <Trophy className='w-6 h-6 text-yellow-400' />, name: '$100 → $1,000', start: 100, target: 1000, classes: 'from-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40' },
                                { icon: <TrendingUp className='w-6 h-6 text-orange-400' />, name: '$500 → $5,000', start: 500, target: 5000, classes: 'from-orange-500/5 border-orange-500/20 hover:border-orange-500/40' },
                                { icon: <Sparkles className='w-6 h-6 text-purple-400' />, name: '$1K → $10K', start: 1000, target: 10000, classes: 'from-purple-500/5 border-purple-500/20 hover:border-purple-500/40' },
                                { icon: <DollarSign className='w-6 h-6 text-cyan-400' />, name: 'Free Play', start: null, target: null, classes: 'from-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40' },
                            ].map((c, i) => (
                                <div key={i} className={`rounded-2xl p-5 border bg-gradient-to-br to-transparent transition-all duration-300 ${c.classes}`}>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center'>
                                            {c.icon}
                                        </div>
                                        <span className='text-white font-bold'>{c.name}</span>
                                    </div>
                                    {c.start !== null ? (
                                        <div className='space-y-1'>
                                            <div className='flex justify-between text-xs'>
                                                <span className='text-gray-400'>Start</span>
                                                <span className='text-cyan-400 font-mono'>${c.start.toLocaleString()}</span>
                                            </div>
                                            <div className='flex justify-between text-xs'>
                                                <span className='text-gray-400'>Target</span>
                                                <span className='text-green-400 font-mono'>${c.target!.toLocaleString()}</span>
                                            </div>
                                            <div className='mt-2 h-1.5 rounded-full bg-gray-800'>
                                                <div className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500' style={{ width: '10%' }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className='text-gray-500 text-xs'>Choose any starting balance up to $1M. No target — just practice.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MODELS & AI ASSISTANT ─────────────────────────────── */}
            <section className='relative py-24 px-8 border-t border-white/5'>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent'></div>
                <div className='relative max-w-6xl mx-auto'>
                    <div className='flex flex-col lg:flex-row-reverse items-center gap-16'>
                        {/* Right - Text */}
                        <div className='lg:w-1/2'>
                            <span className='text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block'>Betting Models</span>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Build Your Own<br/>Betting Strategy</h2>
                            <p className='text-gray-400 leading-relaxed mb-6'>
                                Go beyond gut feelings. Create custom models with conditions that define when and how you bet. Set rules like "only bet when home odds are above +150" or "limit to underdogs in hockey". Then watch how your strategy performs over time.
                            </p>
                            <ul className='space-y-3 mb-8'>
                                {[
                                    'Define conditions with field/operator/value rules',
                                    'Choose staking strategies: Flat, Percentage, or Kelly Criterion',
                                    'Toggle models on or off and track their performance',
                                    'Chat with an AI assistant to refine your approach',
                                ].map((text, i) => (
                                    <li key={i} className='flex items-center gap-3 text-gray-300 text-sm'>
                                        <div className='flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center'>
                                            <ChevronRight className='w-3 h-3 text-purple-400' />
                                        </div>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={openSignup} className='text-purple-400 font-semibold text-sm flex items-center gap-2 hover:text-purple-300 transition-colors'>
                                Create Your First Model <ArrowRight className='w-4 h-4' />
                            </button>
                        </div>

                        {/* Left - Model Visual */}
                        <div className='lg:w-1/2 w-full max-w-md'>
                            <div className='relative'>
                                <div className='absolute -inset-4 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 rounded-3xl blur-2xl'></div>
                                <div className='relative rounded-2xl border border-purple-500/20 bg-gray-900/80 backdrop-blur-md p-6'>
                                    {/* Fake model card */}
                                    <div className='flex items-center justify-between mb-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-purple-500/30 flex items-center justify-center'>
                                                <Layers className='w-5 h-5 text-purple-400' />
                                            </div>
                                            <div>
                                                <h4 className='text-white font-bold'>NHL Value Finder</h4>
                                                <p className='text-gray-500 text-xs'>Hockey &middot; Moneyline</p>
                                            </div>
                                        </div>
                                        <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30'>
                                            <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse'></span>
                                            Running
                                        </span>
                                    </div>

                                    {/* Conditions */}
                                    <div className='space-y-2 mb-4'>
                                        <p className='text-xs text-gray-500 uppercase tracking-wider font-semibold'>Conditions</p>
                                        {[
                                            { field: 'Home Odds', op: '>', val: '1.80' },
                                            { field: 'Value Threshold', op: '>=', val: '5%' },
                                            { field: 'Underdog Only', op: '==', val: '0' },
                                        ].map((c, i) => (
                                            <div key={i} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10 text-sm'>
                                                <Activity className='w-3.5 h-3.5 text-cyan-400' />
                                                <span className='text-white font-medium'>{c.field}</span>
                                                <span className='text-cyan-400 font-mono'>{c.op}</span>
                                                <span className='text-purple-400 font-mono'>{c.val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className='grid grid-cols-3 gap-3'>
                                        <div className='text-center p-2 rounded-lg bg-mainblue/50 border border-white/5'>
                                            <p className='text-gray-500 text-xs'>Triggered</p>
                                            <p className='text-white font-bold'>23</p>
                                        </div>
                                        <div className='text-center p-2 rounded-lg bg-mainblue/50 border border-white/5'>
                                            <p className='text-gray-500 text-xs'>Win Rate</p>
                                            <p className='text-green-400 font-bold'>61%</p>
                                        </div>
                                        <div className='text-center p-2 rounded-lg bg-mainblue/50 border border-white/5'>
                                            <p className='text-gray-500 text-xs'>P/L</p>
                                            <p className='text-green-400 font-bold font-mono'>+$312</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── LIVE ODDS FEATURE ─────────────────────────────────── */}
            <section className='relative py-24 px-8 border-t border-white/5'>
                <div className='max-w-5xl mx-auto'>
                    <div className='text-center mb-16'>
                        <span className='text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3 block'>Real-Time Data</span>
                        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Live Odds From Real Bookmakers</h2>
                        <p className='text-gray-400 max-w-2xl mx-auto'>
                            We pull odds from real sportsbooks in real time so your practice environment mirrors the actual betting landscape. Filter by sport or league, build parlays, and track your picks.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {[
                            { icon: <Zap className='w-6 h-6 text-yellow-400' />, title: 'Real-Time Odds', desc: 'Live data from actual bookmakers, updated continuously.' },
                            { icon: <SlidersHorizontal className='w-6 h-6 text-cyan-400' />, title: 'Smart Filters', desc: 'Filter by sport or league. Find exactly the games you want.' },
                            { icon: <BarChart3 className='w-6 h-6 text-purple-400' />, title: 'Parlay Builder', desc: 'Combine multiple bets. See combined odds and potential payout instantly.' },
                            { icon: <Target className='w-6 h-6 text-green-400' />, title: 'Bet Tracking', desc: 'Every bet is recorded. View your full history, win rate, and P/L.' },
                        ].map((f, i) => (
                            <div key={i} className='rounded-2xl p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300'>
                                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center mb-4'>
                                    {f.icon}
                                </div>
                                <h3 className='text-white font-bold mb-2'>{f.title}</h3>
                                <p className='text-gray-400 text-sm leading-relaxed'>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PLATFORM WALKTHROUGH ──────────────────────────────── */}
            <section className='relative py-24 px-8 border-t border-white/5'>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent'></div>
                <div className='relative max-w-5xl mx-auto'>
                    <div className='text-center mb-16'>
                        <span className='text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3 block'>Platform Overview</span>
                        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Everything You Need In One Place</h2>
                        <p className='text-gray-400 max-w-2xl mx-auto'>
                            NeuralBets is designed to mirror a real betting experience. Here's what you'll find when you log in.
                        </p>
                    </div>

                    {/* Flow Diagram */}
                    <div className='relative'>
                        {/* Vertical line */}
                        <div className='hidden md:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-cyan-500/30'></div>

                        <div className='space-y-16'>
                            {[
                                {
                                    side: 'left',
                                    icon: <Play className='w-5 h-5 text-cyan-400' />,
                                    title: 'Dashboard',
                                    desc: 'Your home base. See your wallet balance, quick stats, and jump to any part of the platform. Your profit/loss and win rate are always visible.',
                                    visual: (
                                        <div className='flex items-center gap-4'>
                                            <div className='flex-1 rounded-lg bg-mainblue p-3 border border-white/5'>
                                                <p className='text-gray-500 text-xs'>Balance</p>
                                                <p className='text-white font-bold font-mono'>$4,250.00</p>
                                            </div>
                                            <div className='flex-1 rounded-lg bg-mainblue p-3 border border-white/5'>
                                                <p className='text-gray-500 text-xs'>Win Rate</p>
                                                <p className='text-green-400 font-bold'>64.2%</p>
                                            </div>
                                            <div className='flex-1 rounded-lg bg-mainblue p-3 border border-white/5'>
                                                <p className='text-gray-500 text-xs'>Bets</p>
                                                <p className='text-white font-bold'>53</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    side: 'right',
                                    icon: <BarChart3 className='w-5 h-5 text-purple-400' />,
                                    title: 'Betting Portal',
                                    desc: 'Browse live odds for dozens of games across multiple sports. Use the sport and league filters to narrow down. Click on odds to add to your parlay slip, set your bet amount, and place it.',
                                    visual: (
                                        <div className='space-y-2'>
                                            {['All Sports', 'Hockey', 'Soccer'].map((s, i) => (
                                                <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${i === 0 ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-mainblue border-white/5 text-gray-400'}`}>
                                                    <SlidersHorizontal className='w-3 h-3' /> {s}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                },
                                {
                                    side: 'left',
                                    icon: <Layers className='w-5 h-5 text-orange-400' />,
                                    title: 'Betting Models',
                                    desc: 'Define your strategy with rules. Set conditions like minimum odds thresholds, favourite/underdog filters, and implied probability ranges. Choose your staking strategy and toggle the model on or off.',
                                    visual: (
                                        <div className='space-y-2'>
                                            <div className='flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10'>
                                                <Activity className='w-3 h-3 text-cyan-400' />
                                                <span className='text-white'>Home Odds</span>
                                                <span className='text-cyan-400 font-mono'>{'>'}</span>
                                                <span className='text-purple-400 font-mono'>1.80</span>
                                            </div>
                                            <div className='flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10'>
                                                <Activity className='w-3 h-3 text-cyan-400' />
                                                <span className='text-white'>Value</span>
                                                <span className='text-cyan-400 font-mono'>{'>='}</span>
                                                <span className='text-purple-400 font-mono'>5%</span>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    side: 'right',
                                    icon: <Bot className='w-5 h-5 text-cyan-400' />,
                                    title: 'AI Strategy Assistant',
                                    desc: 'Not sure where to start? Chat with our AI assistant. It can explain betting concepts, help you build models, suggest bankroll strategies, and walk you through parlay math,  to your questions.',
                                    visual: (
                                        <div className='space-y-2'>
                                            <div className='flex justify-end'>
                                                <div className='bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs rounded-lg px-3 py-2'>How does the Kelly Criterion work?</div>
                                            </div>
                                            <div className='flex items-start gap-2'>
                                                <div className='w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0'>
                                                    <Bot className='w-3 h-3 text-cyan-400' />
                                                </div>
                                                <div className='bg-mainblue/50 border border-white/5 text-gray-300 text-xs rounded-lg px-3 py-2'>
                                                    <strong className='text-white'>Kelly Criterion</strong> calculates optimal bet size based on your edge...
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                            ].map((item, i) => (
                                <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                    <div className='md:w-1/2'>
                                        <div className={`${item.side === 'right' ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                                            <div className={`inline-flex items-center gap-2 mb-3 ${item.side === 'right' ? '' : 'md:flex-row-reverse'}`}>
                                                <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center'>
                                                    {item.icon}
                                                </div>
                                                <h3 className='text-white font-bold text-lg'>{item.title}</h3>
                                            </div>
                                            <p className='text-gray-400 text-sm leading-relaxed'>{item.desc}</p>
                                        </div>
                                    </div>
                                    {/* Timeline dot */}
                                    <div className='hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-cyan-400 border-4 border-mainblue z-10'></div>
                                    <div className='md:w-1/2'>
                                        <div className='rounded-xl bg-gray-900/60 border border-white/5 p-4'>
                                            {item.visual}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ─────────────────────────────────────────── */}
            <section className='relative py-24 px-8 border-t border-white/5'>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent'></div>
                <div className='relative max-w-3xl mx-auto text-center'>
                    <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Ready to Test Your Strategy?</h2>
                    <p className='text-gray-400 text-lg mb-8 max-w-xl mx-auto'>
                        Join NeuralBets and start practicing with real odds and simulated money. No risk, all the fun.
                    </p>
                    <button
                        onClick={openSignup}
                        className='px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105'
                    >
                        Get Started — It's Free
                    </button>
                    <p className='text-gray-600 text-sm mt-4'>No credit card required. No real money involved.</p>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
