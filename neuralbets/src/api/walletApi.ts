const API_BASE_URL = 'http://localhost:8081/api';

export interface ChallengeConfig {
    challenge_type: string;
    starting_balance: number;
    target_balance: number;
    min_balance: number;
    max_balance: number;
    display_name: string;
    description: string;
}

export interface Wallet {
    user_id: string;
    balance: number;
    challenge_type: string;
    starting_balance: number;
    target_balance: number | null;
    created_at: string;
    updated_at: string;
    total_wagered: number;
    total_won: number;
    total_lost: number;
    bets_placed: number;
    bets_won: number;
    bets_lost: number;
}

export interface Transaction {
    transaction_id: string;
    user_id: string;
    type: string;
    amount: number;
    balance_before: number;
    balance_after: number;
    bet_id: string | null;
    description: string;
    created_at: string;
}

export async function getChallengeConfigs(): Promise<ChallengeConfig[]> {
    const response = await fetch(`${API_BASE_URL}/challenges`);
    if (!response.ok) {
        throw new Error('Failed to fetch challenge configurations');
    }
    return await response.json();
}

export async function getWallet(userId: string): Promise<Wallet | null> {
    const response = await fetch(`${API_BASE_URL}/wallet/${userId}`);
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        throw new Error('Failed to fetch wallet');
    }
    return await response.json();
}

export async function createWallet(
    userId: string, 
    challengeType: string, 
    customBalance?: number
): Promise<Wallet> {
    const response = await fetch(`${API_BASE_URL}/wallet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            challenge_type: challengeType,
            custom_balance: customBalance
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create wallet');
    }
    
    return await response.json();
}

export async function placeBet(userId: string, betAmount: number, betId: string): Promise<Wallet> {
    const response = await fetch(`${API_BASE_URL}/wallet/${userId}/bet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bet_amount: betAmount,
            bet_id: betId
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to place bet');
    }
    
    return await response.json();
}

export async function recordBetWin(userId: string, payout: number, betId: string): Promise<Wallet> {
    const response = await fetch(`${API_BASE_URL}/wallet/${userId}/win`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            payout: payout,
            bet_id: betId
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to record bet win');
    }
    
    return await response.json();
}

export async function recordBetLoss(userId: string, amountLost: number, betId: string): Promise<Wallet> {
    const response = await fetch(`${API_BASE_URL}/wallet/${userId}/lose`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount_lost: amountLost,
            bet_id: betId
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to record bet loss');
    }
    
    return await response.json();
}

export async function getTransactions(userId: string, limit: number = 50): Promise<Transaction[]> {
    const response = await fetch(`${API_BASE_URL}/wallet/${userId}/transactions?limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }
    return await response.json();
}

export async function resetWallet(userId: string): Promise<Wallet> {
    const response = await fetch(`${API_BASE_URL}/wallet/${userId}/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to reset wallet');
    }
    
    return await response.json();
}
