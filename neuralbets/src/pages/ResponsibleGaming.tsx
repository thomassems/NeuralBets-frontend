import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, AlertTriangle, Phone, ExternalLink, ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';

const ResponsibleGaming = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header />

            <div className='relative overflow-hidden border-b border-white/[0.04]'>
                <div className='absolute inset-0 bg-gradient-to-b from-green-500/[0.04] to-transparent' />
                <div className='relative max-w-4xl mx-auto px-8 py-16 text-center'>
                    <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 mb-5'>
                        <Heart className='w-7 h-7 text-green-400' />
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-3'>Responsible Gaming</h1>
                    <p className='text-gray-400 max-w-lg mx-auto'>
                        NeuralBets uses simulated money only. But we still believe in promoting healthy habits and awareness around betting.
                    </p>
                </div>
            </div>

            <div className='flex-grow max-w-4xl mx-auto px-8 py-16 w-full'>
                <div className='space-y-16'>

                    {/* Disclaimer Banner */}
                    <div className='rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6'>
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <AlertTriangle className='w-5 h-5 text-cyan-400' />
                            </div>
                            <div>
                                <h3 className='text-white font-bold mb-2'>No Real Money Involved</h3>
                                <p className='text-gray-400 leading-relaxed'>
                                    NeuralBets is a <strong className='text-white font-semibold'>simulated betting platform</strong>. All balances, wagers, winnings, and losses use virtual currency with zero real-world monetary value. You cannot deposit, withdraw, or transfer real money on NeuralBets. Nothing on this platform constitutes gambling.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Educational Section */}
                    <div className='space-y-10'>
                        <Section title='Why We Care'>
                            <p>
                                Even though NeuralBets doesn't involve real money, we recognize that the skills and habits you develop here may carry over to real betting environments. We want you to approach those environments — if you ever choose to — with discipline, self-awareness, and healthy boundaries.
                            </p>
                            <p>
                                The purpose of NeuralBets is education and strategy development. If at any point your relationship with betting — simulated or real — feels unhealthy, we encourage you to take a step back and seek support.
                            </p>
                        </Section>

                        <Section title='Healthy Betting Habits'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                {[
                                    { title: 'Set Time Limits', desc: 'Decide in advance how long you\'ll spend on the platform per session. Take regular breaks.' },
                                    { title: 'Don\'t Chase Losses', desc: 'If a strategy isn\'t working, step away and reassess. Chasing losses leads to poor decisions.' },
                                    { title: 'Treat It As Practice', desc: 'NeuralBets is a learning tool. Focus on refining your strategy, not on the number in your wallet.' },
                                    { title: 'Know Your Limits', desc: 'Understand the difference between entertainment and compulsion. Be honest with yourself about your habits.' },
                                    { title: 'Separate Simulation from Reality', desc: 'Simulated results don\'t guarantee real-world outcomes. Real betting carries financial risk.' },
                                    { title: 'Talk About It', desc: 'If you\'re struggling with gambling-related issues, talk to someone you trust or reach out to a helpline.' },
                                ].map((tip, i) => (
                                    <div key={i} className='rounded-xl border border-white/[0.06] bg-gray-900/30 p-5'>
                                        <h4 className='text-white font-semibold mb-2'>{tip.title}</h4>
                                        <p className='text-gray-400 text-sm leading-relaxed'>{tip.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {/* Self-Assessment */}
                        <SelfAssessment />

                        {/* Resources */}
                        <Section title='Help & Resources'>
                            <p className='mb-4'>
                                If you or someone you know is struggling with problem gambling, these organizations offer free, confidential support:
                            </p>
                            <div className='space-y-3'>
                                {[
                                    { name: 'National Council on Problem Gambling (NCPG)', phone: '1-800-522-4700', url: 'https://www.ncpgambling.org', desc: 'US-based 24/7 helpline and online chat' },
                                    { name: 'Gamblers Anonymous', phone: null, url: 'https://www.gamblersanonymous.org', desc: 'Peer support groups worldwide' },
                                    { name: 'GamCare', phone: '0808 8020 133', url: 'https://www.gamcare.org.uk', desc: 'UK-based support and counselling' },
                                    { name: 'ConnexOntario', phone: '1-866-531-2600', url: 'https://www.connexontario.ca', desc: 'Ontario, Canada — 24/7 helpline' },
                                    { name: 'Responsible Gambling Council', phone: null, url: 'https://www.responsiblegambling.org', desc: 'Canada — research and public awareness' },
                                ].map((resource, i) => (
                                    <div key={i} className='flex items-start gap-4 rounded-xl border border-white/[0.06] bg-gray-900/30 p-5'>
                                        <div className='w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                            <Phone className='w-4 h-4 text-green-400' />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center gap-2 flex-wrap'>
                                                <h4 className='text-white font-semibold'>{resource.name}</h4>
                                                <a href={resource.url} target='_blank' rel='noopener noreferrer' className='text-cyan-400 hover:text-cyan-300 transition-colors'>
                                                    <ExternalLink className='w-3.5 h-3.5' />
                                                </a>
                                            </div>
                                            <p className='text-gray-400 text-sm'>{resource.desc}</p>
                                            {resource.phone && (
                                                <p className='text-green-400 font-mono text-sm mt-1'>{resource.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title='Our Commitment'>
                            <p>
                                NeuralBets is designed to be a safe, educational environment. We will never introduce real-money wagering. We will never incentivize excessive or compulsive use of the platform. And we will always provide resources and information to help you maintain a healthy relationship with sports betting, whether simulated or real.
                            </p>
                            <p>
                                If you have concerns or suggestions about how we can better promote responsible gaming, please contact us at{' '}
                                <a href='mailto:support@neuralbets.com' className='text-cyan-400 hover:text-cyan-300 transition-colors'>support@neuralbets.com</a>.
                            </p>
                        </Section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

function SelfAssessment() {
    const [open, setOpen] = useState(false);
    const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

    const questions = [
        'Do you spend more time betting (simulated or real) than you originally planned?',
        'Do you feel restless or irritable when you try to stop or reduce betting?',
        'Have you ever lied to someone about how much time or money you spend on betting?',
        'Do you find yourself chasing losses — increasing bets to win back what you lost?',
        'Has betting ever caused problems in your relationships, work, or school?',
        'Do you bet as a way to escape problems or relieve negative emotions?',
        'Have you ever borrowed money or sold things to fund real-money betting?',
    ];

    const yesCount = Object.values(answers).filter(v => v === true).length;
    const answeredAll = Object.keys(answers).length === questions.length;

    return (
        <div className='rounded-2xl border border-white/[0.06] bg-gray-900/30 overflow-hidden'>
            <button
                onClick={() => setOpen(!open)}
                className='w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors'
            >
                <div>
                    <h3 className='text-white font-bold text-lg'>Self-Assessment</h3>
                    <p className='text-gray-400 text-sm mt-1'>Quick, private check-in — nothing is recorded or stored</p>
                </div>
                {open ? <ChevronUp className='w-5 h-5 text-gray-400' /> : <ChevronDown className='w-5 h-5 text-gray-400' />}
            </button>

            {open && (
                <div className='px-6 pb-6 space-y-4'>
                    <div className='h-px bg-white/5' />
                    <p className='text-gray-400 text-sm'>
                        Answer honestly. This is completely private — your answers are not saved or sent anywhere.
                    </p>
                    <div className='space-y-3'>
                        {questions.map((q, i) => (
                            <div key={i} className='flex items-start gap-4 p-4 rounded-xl bg-mainblue/40 border border-white/5'>
                                <p className='text-gray-300 text-sm flex-1'>{q}</p>
                                <div className='flex gap-2 flex-shrink-0'>
                                    <button
                                        onClick={() => setAnswers(prev => ({ ...prev, [i]: true }))}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                            answers[i] === true
                                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                        }`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setAnswers(prev => ({ ...prev, [i]: false }))}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                            answers[i] === false
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                        }`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {answeredAll && (
                        <div className={`rounded-xl p-5 border ${
                            yesCount >= 3
                                ? 'bg-red-500/5 border-red-500/20'
                                : yesCount >= 1
                                    ? 'bg-yellow-500/5 border-yellow-500/20'
                                    : 'bg-green-500/5 border-green-500/20'
                        }`}>
                            <div className='flex items-start gap-3'>
                                {yesCount >= 3 ? (
                                    <XCircle className='w-5 h-5 text-red-400 flex-shrink-0 mt-0.5' />
                                ) : (
                                    <CheckCircle2 className='w-5 h-5 text-green-400 flex-shrink-0 mt-0.5' />
                                )}
                                <div>
                                    {yesCount >= 3 ? (
                                        <>
                                            <p className='text-white font-semibold mb-1'>Consider seeking support</p>
                                            <p className='text-gray-400 text-sm'>You answered "Yes" to {yesCount} of {questions.length} questions. This may indicate a pattern worth exploring with a professional. The resources listed below are free and confidential.</p>
                                        </>
                                    ) : yesCount >= 1 ? (
                                        <>
                                            <p className='text-white font-semibold mb-1'>Stay mindful</p>
                                            <p className='text-gray-400 text-sm'>You answered "Yes" to {yesCount} question{yesCount > 1 ? 's' : ''}. It's worth being aware of these patterns. If they become more frequent, consider talking to someone.</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className='text-white font-semibold mb-1'>Looking healthy</p>
                                            <p className='text-gray-400 text-sm'>Your answers don't suggest any concerning patterns. Keep up the healthy habits and stay self-aware.</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className='text-xl font-bold text-white mb-4'>{title}</h2>
            <div className='text-gray-400 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_li]:text-gray-400 [&_strong]:font-semibold'>
                {children}
            </div>
        </div>
    );
}

export default ResponsibleGaming;
