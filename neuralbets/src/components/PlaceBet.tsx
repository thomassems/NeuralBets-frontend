import { verifyBet } from "../utils/oddsUtils"; 

export const PlaceBet = (isBetConfirmed: any, setIsBetConfirmed: any, betAmount: any) => {
    setIsBetConfirmed(false);
    const element = document.getElementById('confirm-bet-id');
    if (betAmount == 0){
         if (element) {
            element.textContent = 'To confirm your wager, please enter a bet amount greater than $0.00.';
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