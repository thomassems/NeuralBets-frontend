export type ModelStatus = 'running' | 'paused' | 'draft';

export type ConditionOperator = '>' | '<' | '>=' | '<=' | '==' | '!=';

export interface ModelCondition {
    id: string;
    field: string;
    operator: ConditionOperator;
    value: string;
    enabled: boolean;
}

export interface BettingModel {
    id: string;
    name: string;
    description: string;
    sport: string;
    betType: string;
    status: ModelStatus;
    conditions: ModelCondition[];
    stakingStrategy: string;
    stakePercent: number;
    createdAt: string;
    updatedAt: string;
    stats: {
        betsTriggered: number;
        wins: number;
        losses: number;
        profitLoss: number;
    };
}

export const SPORT_OPTIONS = [
    'All Sports', 'Hockey', 'Football', 'Soccer', 'Basketball', 'Baseball', 'MMA', 'Tennis'
];

export const BET_TYPE_OPTIONS = [
    'Moneyline', 'Spread', 'Over/Under', 'Parlay'
];

export const STAKING_OPTIONS = [
    { value: 'flat', label: 'Flat Betting' },
    { value: 'percentage', label: 'Percentage of Bankroll' },
    { value: 'kelly', label: 'Kelly Criterion' },
];

export const CONDITION_FIELDS = [
    { value: 'home_odds', label: 'Home Odds' },
    { value: 'away_odds', label: 'Away Odds' },
    { value: 'odds_diff', label: 'Odds Difference' },
    { value: 'implied_prob_home', label: 'Implied Prob (Home)' },
    { value: 'implied_prob_away', label: 'Implied Prob (Away)' },
    { value: 'value_threshold', label: 'Value Threshold (%)' },
    { value: 'min_odds', label: 'Min Odds' },
    { value: 'max_odds', label: 'Max Odds' },
    { value: 'favourite_only', label: 'Favourite Only (1/0)' },
    { value: 'underdog_only', label: 'Underdog Only (1/0)' },
];

export const OPERATOR_OPTIONS: { value: ConditionOperator; label: string }[] = [
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '>=', label: '>=' },
    { value: '<=', label: '<=' },
    { value: '==', label: '==' },
    { value: '!=', label: '!=' },
];

export function createEmptyModel(): BettingModel {
    return {
        id: `model_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: '',
        description: '',
        sport: 'All Sports',
        betType: 'Moneyline',
        status: 'draft',
        conditions: [],
        stakingStrategy: 'flat',
        stakePercent: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stats: { betsTriggered: 0, wins: 0, losses: 0, profitLoss: 0 },
    };
}

export function createEmptyCondition(): ModelCondition {
    return {
        id: `cond_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        field: 'home_odds',
        operator: '>',
        value: '',
        enabled: true,
    };
}
