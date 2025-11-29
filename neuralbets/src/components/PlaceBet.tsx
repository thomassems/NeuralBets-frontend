import { verifyBet } from "../utils/oddsUtils"; 

export const PlaceBet = (betAmount: any, gamesBetOnLength: number) => {
    const element = document.getElementById('confirm-bet-id');
    if (betAmount == 0){
         if (element) {
            element.textContent = 'To confirm your wager, please enter a bet amount greater than $0.00.';
            element.classList.remove('hidden');
         }
    }
    else if (gamesBetOnLength == 0){
        if (element) {
            element.textContent = 'Bet slip is empty, please select at least one bet.';
            element.classList.remove('hidden');
         }
    }
    else {
        console.log('valid bet amount');
        if (element) {
            element.classList.remove('hidden');
            element.textContent = 'Please sign up to place a bet';
        }
    }
}