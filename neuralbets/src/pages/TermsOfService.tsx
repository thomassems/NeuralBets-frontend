import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield } from 'lucide-react';

const TermsOfService = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header />

            {/* Page Header */}
            <div className='relative overflow-hidden border-b border-white/[0.04]'>
                <div className='absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent' />
                <div className='relative max-w-4xl mx-auto px-8 py-16 text-center'>
                    <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-5'>
                        <Shield className='w-7 h-7 text-cyan-400' />
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-3'>Terms of Service</h1>
                    <p className='text-gray-400'>Last updated: March 14, 2026</p>
                </div>
            </div>

            {/* Content */}
            <div className='flex-grow max-w-4xl mx-auto px-8 py-16 w-full'>
                <div className='prose-invert space-y-10'>
                    <Section title='1. Acceptance of Terms'>
                        <p>
                            By accessing or using NeuralBets ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Platform. NeuralBets reserves the right to update these terms at any time, and your continued use of the Platform constitutes acceptance of any changes.
                        </p>
                    </Section>

                    <Section title='2. Description of Service'>
                        <p>
                            NeuralBets is a <strong className='text-white'>simulated sports betting platform</strong> designed for educational and entertainment purposes. The Platform allows users to:
                        </p>
                        <ul>
                            <li>Place simulated bets using virtual currency with no real monetary value</li>
                            <li>View real-time odds sourced from actual bookmakers</li>
                            <li>Participate in challenges with simulated starting balances and targets</li>
                            <li>Create and manage custom betting strategy models</li>
                            <li>Interact with an AI-powered strategy assistant</li>
                        </ul>
                        <p>
                            <strong className='text-white'>No real money is wagered, won, or lost on NeuralBets.</strong> All balances, bets, winnings, and losses are entirely simulated. NeuralBets is not a gambling service and does not facilitate real-money wagering of any kind.
                        </p>
                    </Section>

                    <Section title='3. Eligibility'>
                        <p>
                            You must be at least 18 years of age (or the age of majority in your jurisdiction) to use NeuralBets. By creating an account, you represent and warrant that you meet this age requirement. NeuralBets reserves the right to request verification of age at any time.
                        </p>
                    </Section>

                    <Section title='4. User Accounts'>
                        <p>
                            To access certain features of the Platform, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to:
                        </p>
                        <ul>
                            <li>Provide accurate, current, and complete information during registration</li>
                            <li>Notify us immediately of any unauthorized access to your account</li>
                            <li>Not create multiple accounts for the purpose of abusing Platform features</li>
                        </ul>
                    </Section>

                    <Section title='5. Virtual Currency & Simulated Betting'>
                        <p>
                            All currency on NeuralBets is virtual and holds no real-world monetary value. Virtual balances cannot be exchanged, transferred, or redeemed for real money, goods, or services. Challenge targets, wallet balances, and profit/loss figures are purely for tracking your simulated betting performance.
                        </p>
                        <p>
                            NeuralBets reserves the right to reset, modify, or remove virtual balances at any time without notice and without liability.
                        </p>
                    </Section>

                    <Section title='6. Odds Data'>
                        <p>
                            NeuralBets displays odds sourced from third-party bookmakers via The Odds API. While we strive for accuracy, odds data is provided "as is" and may be subject to delays, errors, or discrepancies. NeuralBets does not guarantee the accuracy, completeness, or timeliness of any odds data displayed on the Platform.
                        </p>
                    </Section>

                    <Section title='7. User Conduct'>
                        <p>You agree not to:</p>
                        <ul>
                            <li>Use the Platform for any unlawful purpose</li>
                            <li>Attempt to reverse engineer, decompile, or disassemble any part of the Platform</li>
                            <li>Use automated scripts, bots, or scrapers to access the Platform</li>
                            <li>Interfere with or disrupt the Platform's infrastructure</li>
                            <li>Impersonate any person or entity</li>
                            <li>Use the Platform to promote or facilitate real-money gambling</li>
                        </ul>
                    </Section>

                    <Section title='8. Intellectual Property'>
                        <p>
                            All content, features, and functionality of NeuralBets — including but not limited to text, graphics, logos, icons, software, and the overall design — are the property of NeuralBets and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any Platform content without prior written consent.
                        </p>
                    </Section>

                    <Section title='9. AI Strategy Assistant'>
                        <p>
                            The AI Strategy Assistant provides general educational information about betting concepts and strategies. Its outputs are not financial advice, gambling advice, or recommendations. NeuralBets makes no guarantees about the accuracy or effectiveness of any strategies suggested by the AI assistant. You use the AI assistant at your own discretion.
                        </p>
                    </Section>

                    <Section title='10. Limitation of Liability'>
                        <p>
                            NeuralBets is provided "as is" and "as available" without warranties of any kind. To the fullest extent permitted by law, NeuralBets shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.
                        </p>
                        <p>
                            Since NeuralBets involves no real money, you acknowledge that no financial loss can result from using the Platform.
                        </p>
                    </Section>

                    <Section title='11. Termination'>
                        <p>
                            NeuralBets may suspend or terminate your account at any time, for any reason, with or without notice. Upon termination, your right to use the Platform ceases immediately, and any virtual currency or data associated with your account may be deleted.
                        </p>
                    </Section>

                    <Section title='12. Governing Law'>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which NeuralBets operates, without regard to conflict of law principles.
                        </p>
                    </Section>

                    <Section title='13. Contact'>
                        <p>
                            If you have questions about these Terms of Service, please contact us at{' '}
                            <a href='mailto:support@neuralbets.com' className='text-cyan-400 hover:text-cyan-300 transition-colors'>
                                support@neuralbets.com
                            </a>.
                        </p>
                    </Section>
                </div>
            </div>

            <Footer />
        </div>
    );
};

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

export default TermsOfService;
