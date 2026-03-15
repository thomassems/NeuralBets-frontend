import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModelCard from '../components/ModelCard';
import ModelEditor from '../components/ModelEditor';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Bot, Send, Sparkles, BookOpen, TrendingUp, Shield, BarChart3, Lightbulb, Plus, Layers } from 'lucide-react';
import { BettingModel } from '../types/BettingModel';

// ─── Chat Types & Constants ──────────────────────────────────────────────────

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const STARTER_PROMPTS = [
    { icon: <TrendingUp className='w-5 h-5' />, title: 'Value Betting', description: 'Help me understand value betting and how to identify undervalued odds' },
    { icon: <Shield className='w-5 h-5' />, title: 'Bankroll Management', description: 'What are the best bankroll management strategies for sports betting?' },
    { icon: <BarChart3 className='w-5 h-5' />, title: 'Parlay Strategy', description: 'Explain parlay betting strategies and when to use them vs single bets' },
    { icon: <Lightbulb className='w-5 h-5' />, title: 'Build a Model', description: 'Help me build a simple betting model to evaluate NHL games' },
];

// ─── Local Storage Helpers ───────────────────────────────────────────────────

const STORAGE_KEY = 'neuralbets_models';

function loadModels(): BettingModel[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function saveModels(models: BettingModel[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
}

// ─── Component ───────────────────────────────────────────────────────────────

const Models = () => {
    const { currentUser } = useAuth();

    // Tab state
    const [activeTab, setActiveTab] = useState<'models' | 'assistant'>('models');

    // Models state
    const [models, setModels] = useState<BettingModel[]>(loadModels);
    const [editorOpen, setEditorOpen] = useState(false);
    const [editingModel, setEditingModel] = useState<BettingModel | null>(null);

    // Chat state
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Persist models
    useEffect(() => { saveModels(models); }, [models]);

    // Chat auto-scroll
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    if (!currentUser) {
        return <Navigate to='/' replace />;
    }

    // ── Model CRUD ───────────────────────────────────────────────────────────

    const handleSaveModel = (model: BettingModel) => {
        setModels(prev => {
            const idx = prev.findIndex(m => m.id === model.id);
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = model;
                return copy;
            }
            return [...prev, model];
        });
        setEditorOpen(false);
        setEditingModel(null);
    };

    const handleToggleStatus = (id: string) => {
        setModels(prev => prev.map(m => {
            if (m.id !== id) return m;
            const nextStatus = m.status === 'running' ? 'paused' : 'running';
            return { ...m, status: nextStatus, updatedAt: new Date().toISOString() };
        }));
    };

    const handleDeleteModel = (id: string) => {
        if (!window.confirm('Delete this model? This cannot be undone.')) return;
        setModels(prev => prev.filter(m => m.id !== id));
    };

    const handleEditModel = (model: BettingModel) => {
        setEditingModel(model);
        setEditorOpen(true);
    };

    const handleCreateNew = () => {
        setEditingModel(null);
        setEditorOpen(true);
    };

    // ── Chat ─────────────────────────────────────────────────────────────────

    const simulateResponse = (userMessage: string) => {
        setIsTyping(true);
        let response: string;
        const lower = userMessage.toLowerCase();

        if (lower.includes('value bet')) {
            response = `**Value Betting** is a strategy where you identify bets where the odds offered by a bookmaker are higher than the actual probability of the outcome.\n\n**How it works:**\n1. Estimate the true probability of an outcome\n2. Convert the bookmaker's odds to implied probability\n3. If your estimated probability > implied probability, that's a value bet\n\n**Example:** If you believe a team has a 60% chance of winning, but the odds imply only a 45% chance, that's a value bet.\n\n**Tips:**\n- Focus on sports/leagues you know well\n- Track your predictions vs outcomes over time\n- Start with small stakes to validate your model\n\nWant me to help you build a value betting model for a specific sport?`;
        } else if (lower.includes('bankroll') || lower.includes('management')) {
            response = `**Bankroll Management** is crucial for long-term betting success. Here are proven strategies:\n\n**1. Flat Betting (Recommended for beginners)**\n- Bet the same amount (1-3% of bankroll) on every wager\n\n**2. Kelly Criterion**\n- Bet size = (bp - q) / b\n- Mathematically optimal but can be aggressive\n\n**3. Percentage Model**\n- Always bet a fixed percentage of your current bankroll\n\n**Golden Rules:**\n- Never bet more than 5% on a single wager\n- Set a stop-loss limit for the day/week\n- Don't chase losses\n- Keep detailed records\n\nWant me to help you set up a bankroll plan based on your current challenge?`;
        } else if (lower.includes('parlay')) {
            response = `**Parlay Betting Strategies:**\n\nParlays combine multiple bets into one, multiplying the odds together.\n\n**Smart Parlay Strategies:**\n1. **Correlated Parlays** - Combine bets that are logically connected\n2. **2-3 Leg Max** - Keep parlays small to maintain reasonable win probability\n3. **Hedge the Last Leg** - If all but one leg hits, consider hedging\n4. **Mix Favorites** - Don't parlay all underdogs\n\n**Rule of thumb**: 80% singles, 20% parlays\n\nWant me to help you analyze your current parlay selections?`;
        } else if (lower.includes('model') || lower.includes('build')) {
            response = `**Building a Betting Model - Step by Step:**\n\n**Step 1: Choose Your Focus**\n- Pick one sport and one bet type\n\n**Step 2: Identify Key Factors**\n- Team record, recent form, key stats\n\n**Step 3: Weight the Factors**\n- Assign importance (0-100) to each factor\n\n**Step 4: Generate Win Probabilities**\n- Compare composite scores → implied probabilities\n\n**Step 5: Find Value**\n- Only bet when you see significant value (5%+)\n\n**Step 6: Track & Refine**\n- Log every prediction and result\n\nTry creating a model using the **My Models** tab — you can set conditions, choose a staking strategy, and toggle it on/off!`;
        } else {
            response = `Great question! Some key principles:\n\n1. **Data-driven decisions** - Always base bets on analysis\n2. **Discipline** - Stick to your strategy even during losing streaks\n3. **Specialization** - Focus on sports/leagues you understand deeply\n4. **Record keeping** - Track everything to find what works\n\nI can help you with:\n- **Building betting models** for specific sports\n- **Analyzing odds** to find value\n- **Bankroll strategies** to protect your balance\n- **Understanding bet types** (moneyline, spreads, totals, parlays)\n\nWhat specific area would you like to explore?`;
        }

        setTimeout(() => {
            setMessages(prev => [...prev, { id: `msg_${Date.now()}`, role: 'assistant', content: response, timestamp: new Date() }]);
            setIsTyping(false);
        }, 1200);
    };

    const handleSend = () => {
        if (!input.trim() || isTyping) return;
        const userMsg: ChatMessage = { id: `msg_${Date.now()}`, role: 'user', content: input.trim(), timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        simulateResponse(userMsg.content);
    };

    const handleStarterPrompt = (description: string) => {
        const userMsg: ChatMessage = { id: `msg_${Date.now()}`, role: 'user', content: description, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        simulateResponse(description);
        inputRef.current?.focus();
    };

    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, i) => {
            let processed = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
            if (line.startsWith('- ')) return <li key={i} className='ml-4 list-disc' dangerouslySetInnerHTML={{ __html: processed.slice(2) }} />;
            if (/^\d+\.\s/.test(line)) return <li key={i} className='ml-4 list-decimal' dangerouslySetInnerHTML={{ __html: processed.replace(/^\d+\.\s/, '') }} />;
            if (line === '') return <br key={i} />;
            return <p key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
        });
    };

    // ── Summary Stats ────────────────────────────────────────────────────────

    const runningCount = models.filter(m => m.status === 'running').length;
    const totalTriggered = models.reduce((sum, m) => sum + m.stats.betsTriggered, 0);
    const totalPL = models.reduce((sum, m) => sum + m.stats.profitLoss, 0);

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <div className='bg-mainblue min-h-screen flex flex-col'>
            <Header/>

            {editorOpen && (
                <ModelEditor
                    model={editingModel}
                    onSave={handleSaveModel}
                    onClose={() => { setEditorOpen(false); setEditingModel(null); }}
                />
            )}

            <div className='flex-grow flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-8 py-8'>
                {/* Page Header */}
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
                    <div>
                        <h1 className='text-3xl font-bold'>
                            <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                                Betting Models
                            </span>
                        </h1>
                        <p className='text-gray-400 mt-1'>Create, manage, and refine your betting strategies</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className='flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 text-sm self-start'
                    >
                        <Plus className='w-4 h-4' /> New Model
                    </button>
                </div>

                {/* Tabs */}
                <div className='flex gap-1 mb-6 bg-gray-900/50 rounded-xl p-1 border border-white/5 self-start'>
                    <button
                        onClick={() => setActiveTab('models')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeTab === 'models'
                                ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                                : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                        }`}
                    >
                        <Layers className='w-4 h-4' />
                        My Models
                        {models.length > 0 && (
                            <span className='text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full'>{models.length}</span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('assistant')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeTab === 'assistant'
                                ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                                : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                        }`}
                    >
                        <Bot className='w-4 h-4' />
                        Strategy Assistant
                    </button>
                </div>

                {/* ── My Models Tab ─────────────────────────────────────────── */}
                {activeTab === 'models' && (
                    <div className='animate-fadeIn'>
                        {/* Summary Bar */}
                        {models.length > 0 && (
                            <div className='grid grid-cols-3 gap-4 mb-6'>
                                <div className='rounded-xl p-4 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-green-500/10'>
                                    <p className='text-gray-400 text-xs mb-0.5'>Active</p>
                                    <p className='text-green-400 font-bold text-xl'>{runningCount} <span className='text-gray-500 text-xs font-normal'>/ {models.length}</span></p>
                                </div>
                                <div className='rounded-xl p-4 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-cyan-500/10'>
                                    <p className='text-gray-400 text-xs mb-0.5'>Bets Triggered</p>
                                    <p className='text-white font-bold text-xl'>{totalTriggered}</p>
                                </div>
                                <div className='rounded-xl p-4 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-purple-500/10'>
                                    <p className='text-gray-400 text-xs mb-0.5'>Total P/L</p>
                                    <p className={`font-bold text-xl font-mono ${totalPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {totalPL >= 0 ? '+' : ''}${totalPL.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Models List */}
                        {models.length === 0 ? (
                            <div className='flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-cyan-500/10'>
                                <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 flex items-center justify-center mb-4'>
                                    <Layers className='w-8 h-8 text-cyan-400/50' />
                                </div>
                                <h3 className='text-white font-semibold text-lg mb-2'>No Models Yet</h3>
                                <p className='text-gray-500 text-sm text-center max-w-sm mb-6'>
                                    Create your first betting model to define automated strategies with custom conditions.
                                </p>
                                <button
                                    onClick={handleCreateNew}
                                    className='flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-sm'
                                >
                                    <Plus className='w-4 h-4' /> Create Your First Model
                                </button>
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                {models.map(model => (
                                    <ModelCard
                                        key={model.id}
                                        model={model}
                                        onToggleStatus={handleToggleStatus}
                                        onEdit={handleEditModel}
                                        onDelete={handleDeleteModel}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Strategy Assistant Tab ────────────────────────────────── */}
                {activeTab === 'assistant' && (
                    <div className='flex-grow flex flex-col rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-gray-900/50 to-gray-900/30 overflow-hidden animate-fadeIn'>
                        {/* Messages */}
                        <div className='flex-grow overflow-y-auto p-6 space-y-6 min-h-[400px] max-h-[60vh]'>
                            {messages.length === 0 ? (
                                <div className='h-full flex flex-col items-center justify-center'>
                                    <div className='mb-6 relative'>
                                        <div className='absolute inset-0 bg-cyan-500/20 blur-2xl animate-pulse'></div>
                                        <div className='relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center'>
                                            <Sparkles className='w-8 h-8 text-cyan-400' />
                                        </div>
                                    </div>
                                    <h2 className='text-white text-xl font-semibold mb-2'>Strategy Assistant</h2>
                                    <p className='text-gray-400 text-sm text-center max-w-md mb-8'>
                                        I can help you build betting models, understand strategies, and refine your approach.
                                    </p>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg'>
                                        {STARTER_PROMPTS.map((prompt, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleStarterPrompt(prompt.description)}
                                                className='text-left p-4 rounded-xl border border-cyan-500/10 bg-mainblue/50 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200 group'
                                            >
                                                <div className='flex items-center gap-2 mb-1'>
                                                    <span className='text-cyan-400 group-hover:text-cyan-300 transition-colors'>{prompt.icon}</span>
                                                    <span className='text-white text-sm font-medium'>{prompt.title}</span>
                                                </div>
                                                <p className='text-gray-500 text-xs leading-relaxed'>{prompt.description}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] ${msg.role === 'user' ? '' : 'flex gap-3'}`}>
                                                {msg.role === 'assistant' && (
                                                    <div className='flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mt-1'>
                                                        <Bot className='w-4 h-4 text-cyan-400' />
                                                    </div>
                                                )}
                                                <div className={`rounded-2xl px-4 py-3 ${
                                                    msg.role === 'user'
                                                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white'
                                                        : 'bg-mainblue/50 border border-white/5 text-gray-300'
                                                }`}>
                                                    {msg.role === 'user' ? (
                                                        <p className='text-sm'>{msg.content}</p>
                                                    ) : (
                                                        <div className='text-sm leading-relaxed space-y-1'>{renderMarkdown(msg.content)}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className='flex justify-start'>
                                            <div className='flex gap-3'>
                                                <div className='flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center'>
                                                    <Bot className='w-4 h-4 text-cyan-400' />
                                                </div>
                                                <div className='bg-mainblue/50 border border-white/5 rounded-2xl px-4 py-3'>
                                                    <div className='flex gap-1'>
                                                        <div className='w-2 h-2 rounded-full bg-cyan-400 animate-bounce' style={{ animationDelay: '0ms' }}></div>
                                                        <div className='w-2 h-2 rounded-full bg-cyan-400 animate-bounce' style={{ animationDelay: '150ms' }}></div>
                                                        <div className='w-2 h-2 rounded-full bg-cyan-400 animate-bounce' style={{ animationDelay: '300ms' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {/* Input */}
                        <div className='p-4 border-t border-white/5'>
                            <div className='flex gap-3'>
                                <input
                                    ref={inputRef}
                                    type='text'
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder='Ask about betting strategies, models, or get advice...'
                                    disabled={isTyping}
                                    className='flex-grow bg-mainblue border-2 border-cyan-500/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200 placeholder:text-gray-600 disabled:opacity-50'
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                                        input.trim() && !isTyping
                                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/30'
                                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <Send className='w-4 h-4' />
                                </button>
                            </div>
                            <div className='flex items-center gap-2 mt-2'>
                                <BookOpen className='w-3 h-3 text-gray-600' />
                                <p className='text-gray-600 text-xs'>AI-powered strategy assistant for educational purposes only</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer/>
        </div>
    );
};

export default Models;
