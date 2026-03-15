import React, { useState } from 'react';
import {
    BettingModel, ModelStatus, CONDITION_FIELDS, OPERATOR_OPTIONS,
    STAKING_OPTIONS
} from '../types/BettingModel';
import {
    Play, Pause, FileEdit, Trash2, ChevronDown, ChevronUp,
    CircleDot, Activity, TrendingUp, TrendingDown, Settings2
} from 'lucide-react';

interface ModelCardProps {
    model: BettingModel;
    onToggleStatus: (id: string) => void;
    onEdit: (model: BettingModel) => void;
    onDelete: (id: string) => void;
}

const statusConfig: Record<ModelStatus, { label: string; color: string; bg: string; border: string; dot: string }> = {
    running: { label: 'Running', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', dot: 'bg-green-400' },
    paused:  { label: 'Paused',  color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', dot: 'bg-yellow-400' },
    draft:   { label: 'Draft',   color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/30', dot: 'bg-gray-400' },
};

const ModelCard: React.FC<ModelCardProps> = ({ model, onToggleStatus, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const cfg = statusConfig[model.status];
    const winRate = model.stats.betsTriggered > 0
        ? ((model.stats.wins / model.stats.betsTriggered) * 100).toFixed(1)
        : '-';
    const stakingLabel = STAKING_OPTIONS.find(s => s.value === model.stakingStrategy)?.label || model.stakingStrategy;

    const getFieldLabel = (field: string) =>
        CONDITION_FIELDS.find(f => f.value === field)?.label || field;

    const getOperatorLabel = (op: string) =>
        OPERATOR_OPTIONS.find(o => o.value === op)?.label || op;

    return (
        <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
            model.status === 'running' ? 'border-green-500/20 hover:border-green-500/40' :
            model.status === 'paused' ? 'border-yellow-500/20 hover:border-yellow-500/40' :
            'border-cyan-500/10 hover:border-cyan-500/30'
        } bg-gradient-to-r from-gray-900/50 to-gray-900/30`}>

            {/* Header Row */}
            <div className='p-5'>
                <div className='flex items-start justify-between gap-4'>
                    <div className='flex-grow min-w-0'>
                        <div className='flex items-center gap-3 mb-1'>
                            <h3 className='text-white font-bold text-lg truncate'>{model.name}</h3>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color} ${cfg.border} border`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${model.status === 'running' ? 'animate-pulse' : ''}`}></span>
                                {cfg.label}
                            </span>
                        </div>
                        <p className='text-gray-400 text-sm truncate'>{model.description || 'No description'}</p>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            <span className='text-xs px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'>{model.sport}</span>
                            <span className='text-xs px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20'>{model.betType}</span>
                            <span className='text-xs px-2 py-0.5 rounded-md bg-gray-500/10 text-gray-400 border border-gray-500/20'>{model.conditions.filter(c => c.enabled).length} conditions</span>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className='hidden sm:flex items-center gap-4 flex-shrink-0'>
                        <div className='text-center'>
                            <p className='text-gray-500 text-xs'>Triggered</p>
                            <p className='text-white font-bold'>{model.stats.betsTriggered}</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-gray-500 text-xs'>Win Rate</p>
                            <p className={`font-bold ${model.stats.wins > model.stats.losses ? 'text-green-400' : model.stats.losses > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                {winRate}{winRate !== '-' ? '%' : ''}
                            </p>
                        </div>
                        <div className='text-center'>
                            <p className='text-gray-500 text-xs'>P/L</p>
                            <p className={`font-bold font-mono ${model.stats.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {model.stats.profitLoss >= 0 ? '+' : ''}${model.stats.profitLoss.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex items-center justify-between mt-4 pt-3 border-t border-white/5'>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => onToggleStatus(model.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                model.status === 'running'
                                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20'
                                    : 'bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20'
                            }`}
                        >
                            {model.status === 'running' ? <Pause className='w-3.5 h-3.5' /> : <Play className='w-3.5 h-3.5' />}
                            {model.status === 'running' ? 'Pause' : 'Start'}
                        </button>
                        <button
                            onClick={() => onEdit(model)}
                            className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-200'
                        >
                            <FileEdit className='w-3.5 h-3.5' />
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(model.id)}
                            className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all duration-200'
                        >
                            <Trash2 className='w-3.5 h-3.5' />
                        </button>
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className='flex items-center gap-1 text-xs text-gray-400 hover:text-gray-300 transition-colors'
                    >
                        {expanded ? 'Hide' : 'Details'}
                        {expanded ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                    </button>
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className='px-5 pb-5 border-t border-white/5 animate-fadeIn'>
                    {/* Mobile Stats */}
                    <div className='flex gap-4 mt-4 sm:hidden'>
                        <div className='flex-1 text-center rounded-xl bg-mainblue/50 p-3 border border-white/5'>
                            <p className='text-gray-500 text-xs'>Triggered</p>
                            <p className='text-white font-bold'>{model.stats.betsTriggered}</p>
                        </div>
                        <div className='flex-1 text-center rounded-xl bg-mainblue/50 p-3 border border-white/5'>
                            <p className='text-gray-500 text-xs'>Win Rate</p>
                            <p className='text-green-400 font-bold'>{winRate}{winRate !== '-' ? '%' : ''}</p>
                        </div>
                        <div className='flex-1 text-center rounded-xl bg-mainblue/50 p-3 border border-white/5'>
                            <p className='text-gray-500 text-xs'>P/L</p>
                            <p className={`font-bold font-mono ${model.stats.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ${model.stats.profitLoss.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Staking Info */}
                    <div className='mt-4 flex items-center gap-2'>
                        <Settings2 className='w-4 h-4 text-gray-500' />
                        <span className='text-gray-400 text-sm'>Staking: <span className='text-white'>{stakingLabel}</span> — <span className='text-cyan-400'>{model.stakePercent}%</span> per bet</span>
                    </div>

                    {/* Conditions */}
                    <div className='mt-4'>
                        <h4 className='text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2'>Conditions</h4>
                        {model.conditions.length === 0 ? (
                            <p className='text-gray-500 text-sm'>No conditions set</p>
                        ) : (
                            <div className='space-y-2'>
                                {model.conditions.map(cond => (
                                    <div key={cond.id} className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-sm ${
                                        cond.enabled
                                            ? 'bg-cyan-500/5 border-cyan-500/10 text-gray-300'
                                            : 'bg-gray-500/5 border-gray-500/10 text-gray-500 line-through'
                                    }`}>
                                        <Activity className={`w-3.5 h-3.5 flex-shrink-0 ${cond.enabled ? 'text-cyan-400' : 'text-gray-600'}`} />
                                        <span className='font-medium text-white'>{getFieldLabel(cond.field)}</span>
                                        <span className='text-cyan-400 font-mono'>{getOperatorLabel(cond.operator)}</span>
                                        <span className='text-purple-400 font-mono'>{cond.value || '—'}</span>
                                        {!cond.enabled && <span className='text-xs text-gray-600 ml-auto'>(disabled)</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Timestamps */}
                    <div className='mt-4 flex gap-4 text-xs text-gray-600'>
                        <span>Created: {new Date(model.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(model.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModelCard;
