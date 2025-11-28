import { calculateTotalMarketOdds } from "../utils/oddsUtils";

interface ParlayPayoutProps {
    games: any;
    selectedBets: any;
    payout: number; 
    profit: number;
}

const removeBet = () => {

}

export const ParlayPayout = ({games, selectedBets, payout, profit}: ParlayPayoutProps) => {
    let totalOdds = calculateTotalMarketOdds(games, selectedBets);

    return (
        <div className='mx-5 w-full px-10'>
            <div className='flex justify-between w-full text-sm bg-gradient-to-r from-gray-900/20 to-gray-900/10 border border-cyan-500/10 p-5 rounded-xl'>
                <div>
                    <h1 className='mb-1'>Total Odds:</h1>
                    <h1 className='mb-2'>Expected payout:</h1>
                    <h1 className='text-gray-500 text-xs'>Potential Profit:</h1>
                </div>
                <div>
                    <h1 className='mb-1 text-cyan-500'>{totalOdds}</h1>
                    <h1 className='mb-2'>${payout}</h1>
                    <h1 className='text-cyan-500 text-xs'>{profit}</h1>
                </div>
            </div>      
        </div>
    );
};