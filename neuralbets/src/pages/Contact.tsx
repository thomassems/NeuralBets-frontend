import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Send, MapPin, Clock, MessageCircle, Github, Twitter } from 'lucide-react';

const Contact = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSubmitted(true);
            setForm({ name: '', email: '', subject: '', message: '' });
        }, 1200);
    };

    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header />

            <div className='relative overflow-hidden border-b border-white/[0.04]'>
                <div className='absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent' />
                <div className='relative max-w-4xl mx-auto px-8 py-16 text-center'>
                    <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-5'>
                        <MessageCircle className='w-7 h-7 text-cyan-400' />
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-3'>Contact Us</h1>
                    <p className='text-gray-400 max-w-lg mx-auto'>
                        Have a question, suggestion, or found a bug? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className='flex-grow max-w-5xl mx-auto px-8 py-16 w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-12'>

                    {/* Contact Form */}
                    <div className='lg:col-span-3'>
                        {submitted ? (
                            <div className='rounded-2xl border border-green-500/20 bg-green-500/5 p-10 text-center'>
                                <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 mb-5'>
                                    <Send className='w-7 h-7 text-green-400' />
                                </div>
                                <h3 className='text-white font-bold text-xl mb-2'>Message Sent</h3>
                                <p className='text-gray-400 mb-6'>Thanks for reaching out. We'll get back to you as soon as possible.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className='text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors'
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className='space-y-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                    <div>
                                        <label className='block text-gray-400 text-sm mb-2'>Name</label>
                                        <input
                                            type='text'
                                            required
                                            value={form.name}
                                            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                            className='w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-white/10 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all'
                                            placeholder='Your name'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-gray-400 text-sm mb-2'>Email</label>
                                        <input
                                            type='email'
                                            required
                                            value={form.email}
                                            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                                            className='w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-white/10 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all'
                                            placeholder='you@example.com'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-gray-400 text-sm mb-2'>Subject</label>
                                    <input
                                        type='text'
                                        required
                                        value={form.subject}
                                        onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                                        className='w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-white/10 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all'
                                        placeholder='What is this about?'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-400 text-sm mb-2'>Message</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={form.message}
                                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                                        className='w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-white/10 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none'
                                        placeholder='Tell us more...'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    disabled={sending}
                                    className='px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                                >
                                    {sending ? (
                                        <>
                                            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className='w-4 h-4' />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className='lg:col-span-2 space-y-6'>
                        <div className='rounded-2xl border border-white/[0.06] bg-gray-900/30 p-6 space-y-6'>
                            <h3 className='text-white font-bold text-lg'>Get in Touch</h3>

                            <div className='flex items-start gap-4'>
                                <div className='w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0'>
                                    <Mail className='w-4 h-4 text-cyan-400' />
                                </div>
                                <div>
                                    <p className='text-gray-500 text-xs uppercase tracking-wider mb-1'>Email</p>
                                    <a href='mailto:support@neuralbets.com' className='text-white hover:text-cyan-400 transition-colors text-sm'>
                                        support@neuralbets.com
                                    </a>
                                </div>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0'>
                                    <Clock className='w-4 h-4 text-purple-400' />
                                </div>
                                <div>
                                    <p className='text-gray-500 text-xs uppercase tracking-wider mb-1'>Response Time</p>
                                    <p className='text-white text-sm'>Usually within 24-48 hours</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0'>
                                    <MapPin className='w-4 h-4 text-green-400' />
                                </div>
                                <div>
                                    <p className='text-gray-500 text-xs uppercase tracking-wider mb-1'>Based In</p>
                                    <p className='text-white text-sm'>Canada</p>
                                </div>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className='rounded-2xl border border-white/[0.06] bg-gray-900/30 p-6'>
                            <h3 className='text-white font-bold mb-4'>Follow Us</h3>
                            <div className='flex gap-3'>
                                {[
                                    { icon: <Github className='w-4 h-4' />, label: 'GitHub', href: '#' },
                                    { icon: <Twitter className='w-4 h-4' />, label: 'Twitter', href: '#' },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm'
                                    >
                                        {social.icon}
                                        {social.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* FAQ teaser */}
                        <div className='rounded-2xl border border-white/[0.06] bg-gray-900/30 p-6'>
                            <h3 className='text-white font-bold mb-3'>Common Questions</h3>
                            <div className='space-y-3'>
                                {[
                                    { q: 'Is NeuralBets free?', a: 'Yes. NeuralBets is completely free and uses simulated money only.' },
                                    { q: 'Can I lose real money?', a: 'No. All betting on NeuralBets is simulated. No real money is involved.' },
                                    { q: 'How do I reset my wallet?', a: 'Open your wallet display and use the reset option to start fresh.' },
                                ].map((faq, i) => (
                                    <div key={i}>
                                        <p className='text-white text-sm font-medium'>{faq.q}</p>
                                        <p className='text-gray-500 text-xs mt-0.5'>{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
