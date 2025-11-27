import { live_game } from '../types/Livegame';
import { convertBettingOdds } from '../utils/oddsUtils';

interface BetCreatorProps {
    games: live_game[];
}

const removeBet = () => {

}

const BetCreator = ({ games }: BetCreatorProps) => {
    return (
        <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm mb-5 rounded-xl mt-20 mr-10 rounded-xl'>
            <div className='flex items-center flex-col mb-10 mt-5'>
                <h1 className='text-cyan-500 text-xl'>Parlay Builder</h1>
                <h2 className='text-gray-500 text-xs'>2 Selections</h2>
            </div>
                <div className=''>
                    {games.map(game => 
                    <div key={game.id} className='m-5 bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 p-5 text-xs rounded-xl'> 
                        <div className='flex justify-between'>
                            <div>
                                <div className='text-xs text-gray-500 my-1'>{game.home_team} vs {game.away_team}</div>
                                <div className='text-sm'>{game.home_team} ML</div>
                                <p className='text-cyan-500 my-1'>Odds: <strong>{convertBettingOdds(game.home_team_price)}</strong></p>
                            </div>
                            <button onClick={removeBet} className='mt-2 text-md text-xl font-semibold text-gray-500 hover:text-gray-300 focus:outline-none'>
                                &times;
                            </button>
                        </div>
                    </div>)}
            </div>
        </div>
    )
};

export default BetCreator;