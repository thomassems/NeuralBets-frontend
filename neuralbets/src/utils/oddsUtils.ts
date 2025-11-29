import { live_game } from "../types/Livegame";

export const getGamesBetOn = (games: live_game[], selectedBets:any) => {
    let gamesBetOn = [];

    for (let i: number = 0; i < games.length; i++){
        if (selectedBets.has(games[i].away_team_id)) {
            gamesBetOn.push({
                game_id: games[i].id,
                home_team: games[i].home_team,
                away_team: games[i].away_team,
                team_odds: games[i].away_team_price,
                team_bet_on: games[i].away_team,
                team_bet_on_id: games[i].away_team_id
            })
        } 
        if (selectedBets.has(games[i].home_team_id)){
            gamesBetOn.push({
                game_id: games[i].id,
                home_team: games[i].home_team,
                away_team: games[i].away_team,
                team_odds: games[i].home_team_price,
                team_bet_on: games[i].home_team,
                team_bet_on_id: games[i].home_team_id
            });
        }
    }
    return gamesBetOn;
}

export const convertBettingOdds = (decimalOdds: number) => {
    if (decimalOdds === 1.0) {
        return '-';
    }
    if (decimalOdds < 2.00) {
        const negativeOdds = Math.round(-100 / (decimalOdds - 1));
        return `${negativeOdds}`;
    }
    else {
        const positiveOdds = Math.round((decimalOdds - 1) * 100);
        return `+${positiveOdds}`;
    }

 };

 export const calculateDecimalTotalOdds = (games:any, selectedBets:any) => {
    let totalOdds: number = 1.0;
    if (!selectedBets || selectedBets.size === 0) {
        return totalOdds;
    }
    for (let i: number = 0; i < games.length; i++){
        if (selectedBets.has(games[i].home_team_id)){
            totalOdds = totalOdds * games[i].home_team_price;
        }
        if (selectedBets.has(games[i].away_team_id)){
            totalOdds = totalOdds * games[i].away_team_price;
        }
    }
    return totalOdds;
 }

 export const calculateTotalMarketOdds = (games:any, selectedBets:any) => {
    console.log('calculatetotalmarketodds called');
    const odds = calculateDecimalTotalOdds(games, selectedBets);
    console.log(selectedBets);
    return [convertBettingOdds(odds), odds];
 }

 export const calculateExpectedPayout = (odds: any, betAmount: number) => {
    return (odds * betAmount).toFixed(2);
 };

 export const calculatePotentialProfit = (payout:string, betAmount:number) => {
    return ((+payout) - betAmount).toFixed(2);
 };

 export const verifyBet = (amount: number) => {

 }