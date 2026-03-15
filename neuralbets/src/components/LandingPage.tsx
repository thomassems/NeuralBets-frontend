import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { LiveIndicator } from './LiveIndicator';
import AuthModal from './AuthModal';
import {
    Trophy, TrendingUp, Sparkles, DollarSign, ArrowRight,
    Bot, BarChart3, Shield, Activity, Layers, Target,
    Zap, Eye, SlidersHorizontal, ChevronRight
} from 'lucide-react';

interface LandingPageProps {
    liveEventsCount: number;
}

// ─── Animated counter that ticks up when visible ───────────────────
function AnimatedCounter({ target, duration = 2, prefix = '', suffix = '' }: {
    target: number; duration?: number; prefix?: string; suffix?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const motionVal = useSpring(0, { duration: duration * 1000 });
    const [display, setDisplay] = useState('0');

    useEffect(() => {
        if (isInView) motionVal.set(target);
    }, [isInView, target, motionVal]);

    useEffect(() => {
        const unsub = motionVal.on('change', (v) => {
            setDisplay(
                target % 1 !== 0 ? v.toFixed(1) : Math.round(v).toLocaleString()
            );
        });
        return unsub;
    }, [motionVal, target]);

    return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ─── Tilt card wrapper ─────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

    const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [x, y]);

    const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Reveal wrapper (fade + slide up on scroll) ───────────────────
const reveal = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { type: 'spring' as const, stiffness: 80, damping: 20, delay: i * 0.12 },
    }),
};

function Reveal({ children, className = '', delay = 0 }: {
    children: React.ReactNode; className?: string; delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            custom={delay}
            variants={reveal}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Abstract hero visualization ──────────────────────────────────
function HeroVisualization() {
    const orbs = [
        { size: 6, x: '20%', y: '15%', color: '#06b6d4', delay: 0 },
        { size: 4, x: '75%', y: '25%', color: '#06b6d4', delay: 0.5 },
        { size: 8, x: '50%', y: '60%', color: '#a855f7', delay: 1.0 },
        { size: 3, x: '85%', y: '70%', color: '#06b6d4', delay: 1.5 },
        { size: 5, x: '30%', y: '80%', color: '#a855f7', delay: 0.8 },
        { size: 3, x: '60%', y: '10%', color: '#a855f7', delay: 0.3 },
        { size: 4, x: '10%', y: '55%', color: '#10b981', delay: 1.2 },
        { size: 5, x: '90%', y: '45%', color: '#06b6d4', delay: 0.6 },
    ];

    const lines = [
        { x1: '20%', y1: '15%', x2: '50%', y2: '60%' },
        { x1: '50%', y1: '60%', x2: '75%', y2: '25%' },
        { x1: '75%', y1: '25%', x2: '85%', y2: '70%' },
        { x1: '30%', y1: '80%', x2: '50%', y2: '60%' },
        { x1: '20%', y1: '15%', x2: '60%', y2: '10%' },
        { x1: '10%', y1: '55%', x2: '30%', y2: '80%' },
        { x1: '60%', y1: '10%', x2: '90%', y2: '45%' },
    ];

    return (
        <div className='relative w-full h-full min-h-[340px]'>
            <svg className='absolute inset-0 w-full h-full' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
                {lines.map((l, i) => (
                    <motion.line
                        key={i}
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke='url(#lineGrad)' strokeWidth='0.5' strokeOpacity='0.3'
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                    />
                ))}
                <defs>
                    <linearGradient id='lineGrad'>
                        <stop offset='0%' stopColor='#06b6d4' />
                        <stop offset='100%' stopColor='#a855f7' />
                    </linearGradient>
                </defs>
            </svg>

            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className='absolute rounded-full'
                    style={{
                        width: orb.size * 5,
                        height: orb.size * 5,
                        left: orb.x,
                        top: orb.y,
                        background: `radial-gradient(circle, ${orb.color}60 0%, ${orb.color}10 70%, transparent 100%)`,
                        boxShadow: `0 0 ${orb.size * 4}px ${orb.color}30`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: orb.delay },
                        opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: orb.delay },
                    }}
                />
            ))}

            {/* Central pulsing ring */}
            <motion.div
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/20'
                style={{ width: 120, height: 120 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30'
                style={{ width: 80, height: 80 }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />

            {/* Floating stat badges */}
            <motion.div
                className='absolute top-[12%] right-[8%] backdrop-blur-md bg-gray-900/70 border border-cyan-500/30 rounded-xl px-3 py-2'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{ opacity: { delay: 1.2 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            >
                <p className='text-[10px] text-gray-500 uppercase tracking-wider'>Win Rate</p>
                <p className='text-cyan-400 font-bold text-sm font-mono'>67.3%</p>
            </motion.div>

            <motion.div
                className='absolute bottom-[15%] left-[5%] backdrop-blur-md bg-gray-900/70 border border-cyan-500/30 rounded-xl px-3 py-2'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                transition={{ opacity: { delay: 1.6 }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
            >
                <p className='text-[10px] text-gray-500 uppercase tracking-wider'>P/L Today</p>
                <p className='text-green-400 font-bold text-sm font-mono'>+$247.50</p>
            </motion.div>

            <motion.div
                className='absolute bottom-[30%] right-[15%] backdrop-blur-md bg-gray-900/70 border border-purple-500/30 rounded-xl px-3 py-2'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -5, 0] }}
                transition={{ opacity: { delay: 2 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            >
                <p className='text-[10px] text-gray-500 uppercase tracking-wider'>Active Models</p>
                <p className='text-purple-400 font-bold text-sm font-mono'>3 Running</p>
            </motion.div>
        </div>
    );
}


// ─── MAIN COMPONENT ───────────────────────────────────────────────
const LandingPage: React.FC<LandingPageProps> = ({ liveEventsCount }) => {
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

    const openSignup = () => { setAuthMode('signup'); setShowAuth(true); };
    const openLogin = () => { setAuthMode('login'); setShowAuth(true); };

    return (
        <>
            <AuthModal isVisible={showAuth} onClose={() => setShowAuth(false)} initialMode={authMode} />

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className='relative overflow-hidden'>
                {/* Warm gradient wash */}
                <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-purple-500/[0.03] to-cyan-500/[0.03]' />
                <div className='absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed10_1px,transparent_1px)] bg-[size:5rem_5rem]' />

                <div className='absolute top-10 left-[5%] w-96 h-96 bg-cyan-500/8 rounded-full blur-[150px]' />
                <div className='absolute bottom-0 right-[10%] w-80 h-80 bg-cyan-500/8 rounded-full blur-[130px]' />

                <div className='relative max-w-7xl mx-auto px-8 pt-28 pb-32'>
                    <div className='flex flex-col lg:flex-row items-center gap-12'>
                        {/* Text */}
                        <div className='lg:w-1/2 text-center lg:text-left'>
                            <motion.div
                                className='flex items-center gap-3 justify-center lg:justify-start mb-8'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            >
                                <LiveIndicator />
                                <span className='text-sm text-gray-400'>
                                    {liveEventsCount} Live Event{liveEventsCount !== 1 ? 's' : ''} Right Now
                                </span>
                            </motion.div>

                            <motion.h1
                                className='text-5xl md:text-[3.5rem] lg:text-[4rem] font-extrabold leading-[1.1] mb-7 tracking-tight'
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.15 }}
                            >
                                <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                                    Sharpen Your
                                </span>
                                <br />
                                <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                                    Edge.
                                </span>
                                <br />
                                <span className='text-white'>Zero Risk.</span>
                            </motion.h1>

                            <motion.p
                                className='text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
                            >
                                Place simulated bets with real-time odds. Build custom strategy models. Compete in challenges. All with zero financial risk.
                            </motion.p>

                            <motion.div
                                className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.45 }}
                            >
                                <button
                                    onClick={openSignup}
                                    className='group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25'
                                >
                                    <span className='relative z-10 flex items-center justify-center gap-2'>
                                        Get Started Free
                                        <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                                    </span>
                                    <span className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                </button>
                                <button
                                    onClick={openLogin}
                                    className='px-8 py-4 rounded-xl border border-white/10 text-white font-semibold text-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300'
                                >
                                    Sign In
                                </button>
                            </motion.div>
                        </div>

                        {/* Abstract viz */}
                        <motion.div
                            className='lg:w-1/2 w-full'
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.4 }}
                        >
                            <HeroVisualization />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-mainblue to-transparent' />
            </section>

            {/* ── SOCIAL PROOF BAR ──────────────────────────────── */}
            <section className='relative py-16 px-8 border-y border-white/[0.04]'>
                <div className='max-w-4xl mx-auto'>
                    <Reveal>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
                            {[
                                { value: <AnimatedCounter target={12} suffix='K+' />, label: 'Simulated Bets Placed' },
                                { value: <AnimatedCounter target={4} suffix='+' />, label: 'Sports Covered' },
                                { value: <AnimatedCounter target={50} suffix='+' />, label: 'Leagues Available' },
                                { value: <AnimatedCounter target={100} prefix='$' suffix='K+' />, label: 'Simulated Volume' },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <p className='text-2xl md:text-3xl font-bold text-white mb-1'>{stat.value}</p>
                                    <p className='text-xs text-gray-500 uppercase tracking-wider'>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────────── */}
            <section className='relative py-28 px-8'>
                <div className='max-w-5xl mx-auto'>
                    <Reveal>
                        <div className='text-center mb-20'>
                            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 block'>
                                How It Works
                            </span>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                                Three steps. No catch.
                            </h2>
                            <p className='text-gray-400 max-w-lg mx-auto'>
                                Get up and running in under a minute.
                            </p>
                        </div>
                    </Reveal>

                    <div className='relative'>
                        {/* Connecting line */}
                        <div className='hidden md:block absolute top-[3.5rem] left-[16%] right-[16%] h-px bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-cyan-500/40' />

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                            {[
                                { step: '01', icon: <Shield className='w-6 h-6' />, accent: 'cyan', title: 'Pick a Challenge', desc: 'Sign up, then choose a challenge tier or free play mode. Your simulated balance is ready instantly.' },
                                { step: '02', icon: <Eye className='w-6 h-6' />, accent: 'cyan', title: 'Browse & Bet', desc: 'Explore live odds across dozens of leagues. Build parlays, filter by sport, and place simulated bets.' },
                                { step: '03', icon: <Bot className='w-6 h-6' />, accent: 'purple', title: 'Build & Refine', desc: 'Create strategy models with custom conditions. Use the AI assistant to level up your approach.' },
                            ].map((item, i) => (
                                <Reveal key={i} delay={i}>
                                    <div className='relative text-center group'>
                                        <div className={`relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-mainblue border-2 mb-6 transition-all duration-300 group-hover:scale-110 ${
                                            item.accent === 'cyan' ? 'border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-500/10' :
                                            'border-purple-500/30 text-purple-400 group-hover:border-purple-400/60 group-hover:shadow-lg group-hover:shadow-purple-500/10'
                                        }`}>
                                            {item.icon}
                                        </div>
                                        <div className='absolute -top-1 right-[30%] text-[10px] font-mono font-bold text-gray-600'>
                                            {item.step}
                                        </div>
                                        <h3 className='text-white font-bold text-lg mb-2'>{item.title}</h3>
                                        <p className='text-gray-400 text-sm leading-relaxed max-w-xs mx-auto'>{item.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CHALLENGES ───────────────────────────────────── */}
            <section className='relative py-28 px-8 border-t border-white/[0.04]'>
                <div className='absolute inset-0 bg-gradient-to-b from-cyan-500/[0.015] via-transparent to-transparent' />
                <div className='relative max-w-6xl mx-auto'>
                    <div className='flex flex-col lg:flex-row items-center gap-20'>
                        <div className='lg:w-1/2'>
                            <Reveal>
                                <span className='text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 block'>Challenges</span>
                                <h2 className='text-3xl md:text-4xl font-bold text-white mb-5'>
                                    Set a target.<br/>
                                    <span className='text-cyan-400'>Prove your strategy.</span>
                                </h2>
                                <p className='text-gray-400 leading-relaxed mb-8'>
                                    Challenges give structure to your practice. Pick a starting balance and a target, then trade your way there. Track every bet, every win, every lesson learned. Reset whenever you want to try a new approach.
                                </p>
                            </Reveal>
                            <Reveal delay={1}>
                                <ul className='space-y-4 mb-8'>
                                    {[
                                        { text: 'Real discipline without real consequences', icon: <Shield className='w-3.5 h-3.5 text-cyan-400' /> },
                                        { text: 'Tracks P/L, win rate, and target progress', icon: <Target className='w-3.5 h-3.5 text-cyan-400' /> },
                                        { text: 'Reset anytime — no penalty', icon: <Sparkles className='w-3.5 h-3.5 text-cyan-400' /> },
                                    ].map((item, i) => (
                                        <li key={i} className='flex items-center gap-3 text-gray-300'>
                                            <div className='flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center'>
                                                {item.icon}
                                            </div>
                                            <span className='text-sm'>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={openSignup} className='group text-cyan-400 font-semibold text-sm flex items-center gap-2 hover:text-cyan-300 transition-colors'>
                                    Start a Challenge <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                                </button>
                            </Reveal>
                        </div>

                        {/* Challenge cards */}
                        <div className='lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {[
                                { icon: <Trophy className='w-5 h-5 text-yellow-400' />, name: '$100 → $1K', start: 100, target: 1000, progress: 35, border: 'border-yellow-500/20 hover:border-yellow-400/50', glow: 'hover:shadow-yellow-500/10' },
                                { icon: <TrendingUp className='w-5 h-5 text-orange-400' />, name: '$500 → $5K', start: 500, target: 5000, progress: 22, border: 'border-orange-500/20 hover:border-orange-400/50', glow: 'hover:shadow-orange-500/10' },
                                { icon: <Sparkles className='w-5 h-5 text-purple-400' />, name: '$1K → $10K', start: 1000, target: 10000, progress: 12, border: 'border-purple-500/20 hover:border-purple-400/50', glow: 'hover:shadow-purple-500/10' },
                                { icon: <DollarSign className='w-5 h-5 text-cyan-400' />, name: 'Free Play', start: null, target: null, progress: 0, border: 'border-cyan-500/20 hover:border-cyan-400/50', glow: 'hover:shadow-cyan-500/10' },
                            ].map((c, i) => (
                                <Reveal key={i} delay={i * 0.5}>
                                    <TiltCard className={`rounded-2xl p-5 border bg-gray-900/40 backdrop-blur-sm transition-all duration-300 hover:shadow-lg cursor-default ${c.border} ${c.glow}`}>
                                        <div className='flex items-center gap-3 mb-4'>
                                            <div className='w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center'>
                                                {c.icon}
                                            </div>
                                            <span className='text-white font-bold text-sm'>{c.name}</span>
                                        </div>
                                        {c.start !== null ? (
                                            <div className='space-y-2'>
                                                <div className='flex justify-between text-xs'>
                                                    <span className='text-gray-500'>Start</span>
                                                    <span className='text-white font-mono'>${c.start.toLocaleString()}</span>
                                                </div>
                                                <div className='flex justify-between text-xs'>
                                                    <span className='text-gray-500'>Target</span>
                                                    <span className='text-cyan-400 font-mono'>${c.target!.toLocaleString()}</span>
                                                </div>
                                                <div className='mt-2 h-1 rounded-full bg-gray-800 overflow-hidden'>
                                                    <motion.div
                                                        className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500'
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${c.progress}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <p className='text-gray-500 text-xs leading-relaxed'>
                                                Pick any starting balance up to $1M. No target — just practice your way.
                                            </p>
                                        )}
                                    </TiltCard>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MODELS & AI ──────────────────────────────────── */}
            <section className='relative py-28 px-8 border-t border-white/[0.04]'>
                <div className='absolute inset-0 bg-gradient-to-b from-purple-500/[0.015] via-transparent to-transparent' />
                <div className='relative max-w-6xl mx-auto'>
                    <div className='flex flex-col lg:flex-row-reverse items-center gap-20'>
                        <div className='lg:w-1/2'>
                            <Reveal>
                                <span className='text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-4 block'>Betting Models</span>
                                <h2 className='text-3xl md:text-4xl font-bold text-white mb-5'>
                                    Go beyond gut feelings.
                                </h2>
                                <p className='text-gray-400 leading-relaxed mb-8'>
                                    Define rules like "only bet when odds exceed +150" or "stick to hockey underdogs." Set your staking strategy — flat, percentage, or Kelly Criterion — then let the model guide your decisions. An AI assistant is always available to help you think through it.
                                </p>
                            </Reveal>
                            <Reveal delay={1}>
                                <ul className='space-y-4 mb-8'>
                                    {[
                                        { text: 'Condition-based rules: field, operator, value', icon: <Activity className='w-3.5 h-3.5 text-purple-400' /> },
                                        { text: 'Three staking strategies to choose from', icon: <BarChart3 className='w-3.5 h-3.5 text-purple-400' /> },
                                        { text: 'AI-powered strategy assistant built in', icon: <Bot className='w-3.5 h-3.5 text-purple-400' /> },
                                    ].map((item, i) => (
                                        <li key={i} className='flex items-center gap-3 text-gray-300'>
                                            <div className='flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center'>
                                                {item.icon}
                                            </div>
                                            <span className='text-sm'>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={openSignup} className='group text-purple-400 font-semibold text-sm flex items-center gap-2 hover:text-purple-300 transition-colors'>
                                    Build Your First Model <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                                </button>
                            </Reveal>
                        </div>

                        {/* Model visual */}
                        <div className='lg:w-1/2 w-full max-w-md'>
                            <Reveal delay={0.5}>
                                <TiltCard>
                                    <div className='relative'>
                                        <div className='absolute -inset-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-2xl' />
                                        <div className='relative rounded-2xl border border-purple-500/20 bg-gray-900/70 backdrop-blur-md p-6'>
                                            <div className='flex items-center justify-between mb-5'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center'>
                                                        <Layers className='w-5 h-5 text-purple-400' />
                                                    </div>
                                                    <div>
                                                        <h4 className='text-white font-bold'>NHL Value Finder</h4>
                                                        <p className='text-gray-500 text-xs'>Hockey &middot; Moneyline</p>
                                                    </div>
                                                </div>
                                                <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20'>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
                                                    Running
                                                </span>
                                            </div>

                                            <div className='space-y-2 mb-5'>
                                                <p className='text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2'>Conditions</p>
                                                {[
                                                    { field: 'Home Odds', op: '>', val: '1.80', delay: 0.6 },
                                                    { field: 'Value Threshold', op: '≥', val: '5%', delay: 0.8 },
                                                    { field: 'Underdog Only', op: '=', val: 'false', delay: 1.0 },
                                                ].map((c, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className='flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10 text-sm'
                                                        initial={{ opacity: 0, x: -15 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: c.delay }}
                                                    >
                                                        <Activity className='w-3.5 h-3.5 text-cyan-400 flex-shrink-0' />
                                                        <span className='text-white font-medium'>{c.field}</span>
                                                        <span className='text-cyan-400 font-mono'>{c.op}</span>
                                                        <span className='text-purple-400 font-mono'>{c.val}</span>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className='grid grid-cols-3 gap-3'>
                                                {[
                                                    { label: 'Triggered', val: '23', color: 'text-white' },
                                                    { label: 'Win Rate', val: '61%', color: 'text-green-400' },
                                                    { label: 'P/L', val: '+$312', color: 'text-green-400' },
                                                ].map((s, i) => (
                                                    <div key={i} className='text-center p-2 rounded-lg bg-mainblue/40 border border-white/5'>
                                                        <p className='text-gray-500 text-[10px] uppercase tracking-wider'>{s.label}</p>
                                                        <p className={`font-bold text-sm font-mono ${s.color}`}>{s.val}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES GRID ─────────────────────────────────── */}
            <section className='relative py-28 px-8 border-t border-white/[0.04]'>
                <div className='max-w-5xl mx-auto'>
                    <Reveal>
                        <div className='text-center mb-16'>
                            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 block'>
                                Real-Time Data
                            </span>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                                Live odds. Real bookmakers.
                            </h2>
                            <p className='text-gray-400 max-w-lg mx-auto'>
                                Your practice environment mirrors the real betting landscape, so the skills you build here actually transfer.
                            </p>
                        </div>
                    </Reveal>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {[
                            { icon: <Zap className='w-5 h-5 text-yellow-400' />, title: 'Real-Time Odds', desc: 'Pulled from actual bookmakers. Updated continuously.', border: 'hover:border-yellow-500/40', glow: 'hover:shadow-yellow-500/5' },
                            { icon: <SlidersHorizontal className='w-5 h-5 text-cyan-400' />, title: 'Smart Filters', desc: 'Filter by sport, league, or both. Find exactly what you want.', border: 'hover:border-cyan-500/40', glow: 'hover:shadow-cyan-500/5' },
                            { icon: <BarChart3 className='w-5 h-5 text-purple-400' />, title: 'Parlay Builder', desc: 'Stack bets together. See combined odds and payout in real time.', border: 'hover:border-purple-500/40', glow: 'hover:shadow-purple-500/5' },
                            { icon: <Target className='w-5 h-5 text-green-400' />, title: 'Full History', desc: 'Every bet recorded. Review your win rate, P/L, and patterns.', border: 'hover:border-green-500/40', glow: 'hover:shadow-green-500/5' },
                        ].map((f, i) => (
                            <Reveal key={i} delay={i}>
                                <motion.div
                                    className={`group rounded-2xl p-6 border border-white/[0.06] bg-gray-900/30 transition-all duration-300 hover:shadow-lg h-full ${f.border} ${f.glow}`}
                                    whileHover={{ y: -4 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                >
                                    <div className='w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                                        {f.icon}
                                    </div>
                                    <h3 className='text-white font-bold mb-2'>{f.title}</h3>
                                    <p className='text-gray-500 text-sm leading-relaxed'>{f.desc}</p>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PLATFORM WALKTHROUGH ──────────────────────────── */}
            <section className='relative py-28 px-8 border-t border-white/[0.04]'>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.01] to-transparent' />
                <div className='relative max-w-5xl mx-auto'>
                    <Reveal>
                        <div className='text-center mb-20'>
                            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 block'>
                                Inside the Platform
                            </span>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                                What you get when you log in
                            </h2>
                        </div>
                    </Reveal>

                    <div className='relative'>
                        {/* Vertical line */}
                        <div className='hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/30' />

                        <div className='space-y-20'>
                            {[
                                {
                                    icon: <BarChart3 className='w-5 h-5 text-cyan-400' />,
                                    accent: 'cyan',
                                    title: 'Dashboard',
                                    desc: 'Your home base. Balance, win rate, recent activity — all at a glance. Quick links take you straight to the portal, your bets, or your models.',
                                    visual: (
                                        <div className='flex items-center gap-3'>
                                            {[
                                                { label: 'Balance', val: '$4,250', color: 'text-white' },
                                                { label: 'Win Rate', val: '64.2%', color: 'text-green-400' },
                                                { label: 'Bets', val: '53', color: 'text-white' },
                                            ].map((s, j) => (
                                                <div key={j} className='flex-1 rounded-lg bg-mainblue/60 p-3 border border-white/5'>
                                                    <p className='text-gray-500 text-[10px] uppercase tracking-wider'>{s.label}</p>
                                                    <p className={`font-bold font-mono text-sm ${s.color}`}>{s.val}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    icon: <Eye className='w-5 h-5 text-cyan-400' />,
                                    accent: 'cyan',
                                    title: 'Betting Portal',
                                    desc: 'Browse dozens of live games. Filter by sport or league. Click any odds line to add it to your parlay slip. Set your amount and place.',
                                    visual: (
                                        <div className='space-y-2'>
                                            {[
                                                { team: 'Toronto ML', odds: '-135', sport: 'NHL' },
                                                { team: 'Boston ML', odds: '+110', sport: 'NBA' },
                                            ].map((b, j) => (
                                                <div key={j} className='flex items-center justify-between px-3 py-2 rounded-lg bg-mainblue/60 border border-white/5'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono'>{b.sport}</span>
                                                        <span className='text-white text-xs font-medium'>{b.team}</span>
                                                    </div>
                                                    <span className='text-cyan-400 font-mono text-xs font-bold'>{b.odds}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    icon: <Layers className='w-5 h-5 text-purple-400' />,
                                    accent: 'purple',
                                    title: 'Strategy Models',
                                    desc: 'Define conditions, pick a staking strategy, and toggle models on or off. Each model tracks its own triggered bets, win rate, and profit.',
                                    visual: (
                                        <div className='space-y-2'>
                                            <div className='flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-purple-500/5 border border-purple-500/10'>
                                                <Activity className='w-3 h-3 text-purple-400' />
                                                <span className='text-white'>Home Odds</span>
                                                <span className='text-cyan-400 font-mono'>{'>'}</span>
                                                <span className='text-cyan-400 font-mono'>1.80</span>
                                            </div>
                                            <div className='flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-purple-500/5 border border-purple-500/10'>
                                                <Activity className='w-3 h-3 text-purple-400' />
                                                <span className='text-white'>Value</span>
                                                <span className='text-cyan-400 font-mono'>{'≥'}</span>
                                                <span className='text-cyan-400 font-mono'>5%</span>
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    icon: <Bot className='w-5 h-5 text-cyan-400' />,
                                    accent: 'cyan',
                                    title: 'AI Strategy Assistant',
                                    desc: 'Not sure where to start? Ask the AI. It explains concepts, suggests models, walks you through bankroll math, and helps you think through your edge.',
                                    visual: (
                                        <div className='space-y-2'>
                                            <div className='flex justify-end'>
                                                <div className='bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs rounded-lg rounded-br-sm px-3 py-2 max-w-[70%]'>
                                                    What staking strategy should I use?
                                                </div>
                                            </div>
                                            <div className='flex items-start gap-2'>
                                                <div className='w-5 h-5 rounded-md bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                                    <Bot className='w-3 h-3 text-cyan-400' />
                                                </div>
                                                <div className='bg-white/[0.03] border border-white/5 text-gray-300 text-xs rounded-lg rounded-bl-sm px-3 py-2'>
                                                    For beginners, <strong className='text-white'>flat staking</strong> is safest. Once you have data on your edge, try Kelly Criterion...
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                },
                            ].map((item, i) => (
                                <Reveal key={i} delay={0}>
                                    <div className='flex items-start gap-6 md:gap-10'>
                                        {/* Timeline dot */}
                                        <div className='hidden md:flex flex-col items-center flex-shrink-0'>
                                            <motion.div
                                                className={`w-4 h-4 rounded-full border-[3px] border-mainblue z-10 ${
                                                    item.accent === 'cyan' ? 'bg-cyan-400' :
                                                    'bg-purple-400'
                                                }`}
                                                whileInView={{ scale: [1, 1.5, 1] }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            />
                                        </div>
                                        {/* Content */}
                                        <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            <div>
                                                <div className='flex items-center gap-2 mb-3'>
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                                                        item.accent === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20' :
                                                        'bg-purple-500/10 border-purple-500/20'
                                                    }`}>
                                                        {item.icon}
                                                    </div>
                                                    <h3 className='text-white font-bold text-lg'>{item.title}</h3>
                                                </div>
                                                <p className='text-gray-400 text-sm leading-relaxed'>{item.desc}</p>
                                            </div>
                                            <motion.div
                                                className='rounded-xl bg-gray-900/50 border border-white/5 p-4'
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                            >
                                                {item.visual}
                                            </motion.div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ────────────────────────────────────── */}
            <section className='relative py-28 px-8 border-t border-white/[0.04] overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-t from-cyan-500/[0.03] via-transparent to-transparent' />

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute w-1 h-1 rounded-full bg-cyan-400/30'
                        style={{
                            left: `${15 + i * 14}%`,
                            bottom: '20%',
                        }}
                        animate={{
                            y: [0, -80 - i * 20, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.4,
                        }}
                    />
                ))}

                <div className='relative max-w-2xl mx-auto text-center'>
                    <Reveal>
                        <h2 className='text-3xl md:text-4xl font-bold text-white mb-5'>
                            Ready to test your edge?
                        </h2>
                        <p className='text-gray-400 text-lg mb-10 max-w-md mx-auto'>
                            Real odds, simulated stakes, and tools that actually make you better. Start free — no card, no catch.
                        </p>
                        <motion.button
                            onClick={openSignup}
                            className='group relative px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg overflow-hidden'
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            <span className='relative z-10 flex items-center justify-center gap-2'>
                                Get Started Free
                                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                            </span>
                            <span className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                        </motion.button>
                        <p className='text-gray-600 text-sm mt-5'>No credit card. No real money. Just practice.</p>
                    </Reveal>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
