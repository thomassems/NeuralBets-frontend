import React, { useState, useEffect } from 'react';
import {
    BettingModel, ModelCondition,
    SPORT_OPTIONS, BET_TYPE_OPTIONS, STAKING_OPTIONS,
    CONDITION_FIELDS, OPERATOR_OPTIONS,
    createEmptyModel, createEmptyCondition
} from '../types/BettingModel';
import { X, Plus, Trash2, GripVertical } from 'lucide-react';

interface ModelEditorProps {
    model: BettingModel | null;
    onSave: (model: BettingModel) => void;
    onClose: () => void;
}

const ModelEditor: React.FC<ModelEditorProps> = ({ model, onSave, onClose }) => {
    const [form, setForm] = useState<BettingModel>(model || createEmptyModel());
    const isEditing = !!model;

    useEffect(() => {
        setForm(model || createEmptyModel());
    }, [model]);

    const updateField = <K extends keyof BettingModel>(key: K, value: BettingModel[K]) => {
        setForm(prev => ({ ...prev, [key]: value, updatedAt: new Date().toISOString() }));
    };

    const addCondition = () => {
        setForm(prev => ({
            ...prev,
            conditions: [...prev.conditions, createEmptyCondition()],
            updatedAt: new Date().toISOString()
        }));
    };

    const updateCondition = (id: string, updates: Partial<ModelCondition>) => {
        setForm(prev => ({
            ...prev,
            conditions: prev.conditions.map(c => c.id === id ? { ...c, ...updates } : c),
            updatedAt: new Date().toISOString()
        }));
    };

    const removeCondition = (id: string) => {
        setForm(prev => ({
            ...prev,
            conditions: prev.conditions.filter(c => c.id !== id),
            updatedAt: new Date().toISOString()
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        onSave(form);
    };

    return (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-4' onClick={onClose}>
            <div className='absolute inset-0 bg-black/70 backdrop-blur-sm'></div>
            <div
                className='relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-900 border border-cyan-500/20 shadow-2xl shadow-black/50'
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className='sticky top-0 z-10 bg-gray-900 border-b border-white/5 px-6 py-4 flex items-center justify-between'>
                    <h2 className='text-xl font-bold text-white'>
                        {isEditing ? 'Edit Model' : 'Create New Model'}
                    </h2>
                    <button onClick={onClose} className='text-gray-400 hover:text-white transition-colors p-1'>
                        <X className='w-5 h-5' />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='p-6 space-y-6'>
                    {/* Name & Description */}
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-1.5'>Model Name *</label>
                            <input
                                type='text'
                                value={form.name}
                                onChange={e => updateField('name', e.target.value)}
                                placeholder='e.g. NHL Value Finder'
                                required
                                className='w-full bg-mainblue border-2 border-cyan-500/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all placeholder:text-gray-600'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-1.5'>Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => updateField('description', e.target.value)}
                                placeholder='Describe what this model does and when it should trigger bets...'
                                rows={2}
                                className='w-full bg-mainblue border-2 border-cyan-500/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all placeholder:text-gray-600 resize-none'
                            />
                        </div>
                    </div>

                    {/* Sport & Bet Type */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-1.5'>Sport</label>
                            <select
                                value={form.sport}
                                onChange={e => updateField('sport', e.target.value)}
                                className='w-full bg-mainblue border-2 border-cyan-500/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer'
                            >
                                {SPORT_OPTIONS.map(s => <option key={s} value={s} className='bg-gray-900'>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-1.5'>Bet Type</label>
                            <select
                                value={form.betType}
                                onChange={e => updateField('betType', e.target.value)}
                                className='w-full bg-mainblue border-2 border-cyan-500/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer'
                            >
                                {BET_TYPE_OPTIONS.map(b => <option key={b} value={b} className='bg-gray-900'>{b}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Staking */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-1.5'>Staking Strategy</label>
                            <select
                                value={form.stakingStrategy}
                                onChange={e => updateField('stakingStrategy', e.target.value)}
                                className='w-full bg-mainblue border-2 border-cyan-500/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer'
                            >
                                {STAKING_OPTIONS.map(s => <option key={s.value} value={s.value} className='bg-gray-900'>{s.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-1.5'>Stake %</label>
                            <input
                                type='number'
                                min='0.5'
                                max='25'
                                step='0.5'
                                value={form.stakePercent}
                                onChange={e => updateField('stakePercent', parseFloat(e.target.value) || 0)}
                                className='w-full bg-mainblue border-2 border-cyan-500/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all'
                            />
                        </div>
                    </div>

                    {/* Conditions */}
                    <div>
                        <div className='flex items-center justify-between mb-3'>
                            <label className='text-sm font-medium text-gray-300'>Conditions</label>
                            <button
                                type='button'
                                onClick={addCondition}
                                className='flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors'
                            >
                                <Plus className='w-3.5 h-3.5' /> Add Condition
                            </button>
                        </div>

                        {form.conditions.length === 0 ? (
                            <div className='text-center py-6 rounded-xl border-2 border-dashed border-cyan-500/10'>
                                <p className='text-gray-500 text-sm'>No conditions yet. Add conditions to define when this model should trigger bets.</p>
                            </div>
                        ) : (
                            <div className='space-y-2'>
                                {form.conditions.map((cond) => (
                                    <div key={cond.id} className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                                        cond.enabled
                                            ? 'bg-cyan-500/5 border-cyan-500/10'
                                            : 'bg-gray-500/5 border-gray-500/10 opacity-50'
                                    }`}>
                                        <GripVertical className='w-4 h-4 text-gray-600 flex-shrink-0 cursor-grab' />

                                        <select
                                            value={cond.field}
                                            onChange={e => updateCondition(cond.id, { field: e.target.value })}
                                            className='bg-mainblue border border-cyan-500/20 text-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer flex-1 min-w-0'
                                        >
                                            {CONDITION_FIELDS.map(f => (
                                                <option key={f.value} value={f.value} className='bg-gray-900'>{f.label}</option>
                                            ))}
                                        </select>

                                        <select
                                            value={cond.operator}
                                            onChange={e => updateCondition(cond.id, { operator: e.target.value as any })}
                                            className='bg-mainblue border border-cyan-500/20 text-cyan-400 rounded-lg px-2 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer w-14'
                                        >
                                            {OPERATOR_OPTIONS.map(o => (
                                                <option key={o.value} value={o.value} className='bg-gray-900'>{o.label}</option>
                                            ))}
                                        </select>

                                        <input
                                            type='text'
                                            value={cond.value}
                                            onChange={e => updateCondition(cond.id, { value: e.target.value })}
                                            placeholder='Value'
                                            className='bg-mainblue border border-cyan-500/20 text-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-cyan-500/50 w-20 font-mono'
                                        />

                                        <button
                                            type='button'
                                            onClick={() => updateCondition(cond.id, { enabled: !cond.enabled })}
                                            className={`w-8 h-5 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
                                                cond.enabled ? 'bg-cyan-500' : 'bg-gray-600'
                                            }`}
                                        >
                                            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                                                cond.enabled ? 'left-3.5' : 'left-0.5'
                                            }`}></span>
                                        </button>

                                        <button
                                            type='button'
                                            onClick={() => removeCondition(cond.id)}
                                            className='text-red-400/50 hover:text-red-400 transition-colors flex-shrink-0'
                                        >
                                            <Trash2 className='w-3.5 h-3.5' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className='flex gap-3 pt-2'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='flex-1 px-4 py-3 rounded-xl text-gray-400 font-medium border border-white/10 hover:bg-white/5 transition-all'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={!form.name.trim()}
                            className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                                form.name.trim()
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/30'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {isEditing ? 'Save Changes' : 'Create Model'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModelEditor;
