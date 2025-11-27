export const convertBettingOdds = (decimalOdds: number) => {
    if (decimalOdds < 2.00) {
        const negativeOdds = Math.round(-100 / (decimalOdds - 1));
        return negativeOdds
    }
    else {
        const positiveOdds = Math.round((decimalOdds - 1) * 100);
        return `+${positiveOdds}`;
    }

 };