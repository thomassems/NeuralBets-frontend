import { live_game } from '../types/Livegame';
import { convertBettingOdds } from '../utils/oddsUtils';
import { ParlayPayout } from './ParlayPayout';

interface BetCreatorProps {
    games: live_game[];
}

const removeBet = () => {

}

const BetCreator = ({ games }: BetCreatorProps) => {
    return (
        <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm mb-5 rounded-xl mt-20 mr-10'>
            <div className='flex items-center flex-col mt-5'>
                <h1 className='text-cyan-500 text-xl'>Parlay Builder</h1>
                <h2 className='text-gray-500 text-xs'>2 Selections</h2>
                <div className=''>
                    {games.map(game => 
                    <div key={game.id} className='m-5 bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 p-5 text-xs rounded-xl'> 
                        <div className='flex justify-between'>
                            <div>
                                <div className='text-xs text-gray-500 my-1'>{game.home_team} vs {game.away_team}</div>
                                {/* SHOULD ONLY USE IF h2h */}
                                <div className='text-sm'>{game.home_team} ML</div>
                                <p className='text-cyan-500 my-1'>Odds: <strong>{convertBettingOdds(game.home_team_price)}</strong></p>
                            </div>
                            <button onClick={removeBet} className='mt-2 text-md text-xl font-semibold text-gray-500 hover:text-gray-300 focus:outline-none'>
                                &times;
                            </button>
                        </div>
                    </div>)}
                </div>
                {/* HORIZONTAL LINE HERE */}
                <p className='text-xs text-left'>Bet Amount</p>
                <div className="flex rounded-lg 
                        border border-cyan-500/10
                        transition duration-150 ease-in-out m-5 bg-gradient-to-r from-gray-900/50 to-gray-900/30 mt-2">
                
                <span className="inline-flex items-center px-4 rounded-l-lg 
                            text-gray-500 text-base font-medium 
                            bg-gray-900/50">
                    $
                </span>
                <input 
                    type="number" 
                    id="short-input" 
                    placeholder="0.00"
                    className="block w-full py-2 pl-2 pr-4 text-white 
                           bg-gray-900/50 placeholder:text-white
                           border-0 focus:ring-0 focus:outline-none rounded-r-lg"
                />
            </div>
            <ParlayPayout
                totalOdds={'+520'}
                payout={28.35}
                profit={22.35}
            />
            <button className='mt-8 bg-cyan-500 p-5 w-full mb-0 hover:cursor-pointer'>Confirm Bet</button>
            </div>
        </div>
    )
};

export default BetCreator;