import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Eye } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header />

            <div className='relative overflow-hidden border-b border-white/[0.04]'>
                <div className='absolute inset-0 bg-gradient-to-b from-purple-500/[0.04] to-transparent' />
                <div className='relative max-w-4xl mx-auto px-8 py-16 text-center'>
                    <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-5'>
                        <Eye className='w-7 h-7 text-purple-400' />
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-3'>Privacy Policy</h1>
                    <p className='text-gray-400'>Last updated: March 14, 2026</p>
                </div>
            </div>

            <div className='flex-grow max-w-4xl mx-auto px-8 py-16 w-full'>
                <div className='prose-invert space-y-10'>
                    <Section title='1. Introduction'>
                        <p>
                            NeuralBets ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our simulated sports betting platform. Please read this policy carefully.
                        </p>
                    </Section>

                    <Section title='2. Information We Collect'>
                        <p><strong className='text-white'>Account Information:</strong> When you create an account, we collect your email address, display name, and authentication credentials (managed through Firebase Authentication). If you sign in with Google, we receive your name, email, and profile picture from Google.</p>
                        <p><strong className='text-white'>Usage Data:</strong> We collect information about how you interact with the Platform, including:</p>
                        <ul>
                            <li>Simulated bets placed, including amounts, selections, and outcomes</li>
                            <li>Challenge participation and progress</li>
                            <li>Betting models created and their configurations</li>
                            <li>AI Strategy Assistant conversations</li>
                            <li>Pages visited, features used, and time spent on the Platform</li>
                        </ul>
                        <p><strong className='text-white'>Technical Data:</strong> We automatically collect device information, browser type, IP address, and cookies/similar technologies for Platform functionality and analytics.</p>
                    </Section>

                    <Section title='3. How We Use Your Information'>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Provide, maintain, and improve the Platform</li>
                            <li>Manage your account and authenticate your identity</li>
                            <li>Track your simulated betting activity, wallet balance, and challenge progress</li>
                            <li>Power the AI Strategy Assistant with context about your betting patterns</li>
                            <li>Send you service-related communications (account verification, updates)</li>
                            <li>Analyze usage patterns to improve features and user experience</li>
                            <li>Detect and prevent abuse, fraud, or unauthorized access</li>
                        </ul>
                    </Section>

                    <Section title='4. Information Sharing'>
                        <p>We do not sell your personal information. We may share your information with:</p>
                        <ul>
                            <li><strong className='text-white'>Service Providers:</strong> Third-party services that help us operate the Platform (e.g., Firebase for authentication and data storage, hosting providers)</li>
                            <li><strong className='text-white'>Odds Data Providers:</strong> We receive odds data from The Odds API but do not share your personal data with them</li>
                            <li><strong className='text-white'>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                            <li><strong className='text-white'>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                        </ul>
                    </Section>

                    <Section title='5. Data Storage & Security'>
                        <p>
                            Your data is stored using Firebase (Google Cloud infrastructure) and our own backend services. We implement industry-standard security measures including encryption in transit (HTTPS/TLS), secure authentication tokens, and access controls.
                        </p>
                        <p>
                            However, no method of electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
                        </p>
                    </Section>

                    <Section title='6. Data Retention'>
                        <p>
                            We retain your account data and simulated betting history for as long as your account is active. If you request account deletion, we will remove your personal data within 30 days, though we may retain anonymized usage data for analytics purposes.
                        </p>
                    </Section>

                    <Section title='7. Your Rights'>
                        <p>Depending on your jurisdiction, you may have the right to:</p>
                        <ul>
                            <li><strong className='text-white'>Access</strong> the personal data we hold about you</li>
                            <li><strong className='text-white'>Correct</strong> inaccurate or incomplete data</li>
                            <li><strong className='text-white'>Delete</strong> your account and associated data</li>
                            <li><strong className='text-white'>Export</strong> your data in a portable format</li>
                            <li><strong className='text-white'>Opt out</strong> of non-essential communications</li>
                        </ul>
                        <p>
                            To exercise any of these rights, contact us at{' '}
                            <a href='mailto:support@neuralbets.com' className='text-cyan-400 hover:text-cyan-300 transition-colors'>support@neuralbets.com</a>.
                        </p>
                    </Section>

                    <Section title='8. Cookies'>
                        <p>
                            We use cookies and similar technologies to maintain your session, remember your preferences, and analyze Platform usage. Essential cookies are required for the Platform to function; analytics cookies help us understand how the Platform is used.
                        </p>
                    </Section>

                    <Section title="9. Children's Privacy">
                        <p>
                            NeuralBets is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If we learn that we have collected data from a user under 18, we will take steps to delete that information promptly.
                        </p>
                    </Section>

                    <Section title='10. Third-Party Links'>
                        <p>
                            The Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                        </p>
                    </Section>

                    <Section title='11. Changes to This Policy'>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on the Platform or sending you an email. Your continued use of the Platform after changes are posted constitutes acceptance of the updated policy.
                        </p>
                    </Section>

                    <Section title='12. Contact Us'>
                        <p>
                            If you have questions or concerns about this Privacy Policy, please contact us at{' '}
                            <a href='mailto:support@neuralbets.com' className='text-cyan-400 hover:text-cyan-300 transition-colors'>support@neuralbets.com</a>.
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

export default PrivacyPolicy;
