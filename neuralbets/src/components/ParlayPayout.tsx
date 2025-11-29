import { calculateTotalMarketOdds, calculateExpectedPayout, calculatePotentialProfit } from "../utils/oddsUtils";

interface ParlayPayoutProps {
    games: any;
    selectedBets: any;
    betAmount: number;
}

export const ParlayPayout = ({games, selectedBets, betAmount}: ParlayPayoutProps) => {
    const [totalMarketOdds, totalOdds] = calculateTotalMarketOdds(games, selectedBets);
    let payout: string = calculateExpectedPayout(totalOdds, betAmount);
    let profit: string = calculatePotentialProfit(payout, betAmount);

    return (
         <div className='mx-5 w-full px-10'>
            <div className= 'w-full text-sm bg-gradient-to-r from-gray-900/20 to-gray-900/10 border border-cyan-500/10 p-5 rounded-xl'>
                <div className='flex justify-between'>
                    <h1 className='mb-1'>Total Odds:</h1>
                    <h1 className='mb-1 text-cyan-500'>{totalMarketOdds}</h1>
                </div>
                <div className='flex justify-between'>
                    <h1 className='mb-2'>Expected payout:</h1>
                    <h1 className='mb-2'>${payout}</h1>
                </div>
                <hr className='border-t border-gray-500 border-opacity-50 my-1'></hr>
                <div className='flex justify-between'>
                    <h1 className='text-gray-500 text-xs w-max-full'>Potential Profit:</h1>
                    <h1 className='text-cyan-500 text-xs'>{profit}</h1>
                </div>
            </div>      
        </div>
    );
};    


