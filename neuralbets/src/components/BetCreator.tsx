import { live_game } from '../types/Livegame';
import { convertBettingOdds, getGamesBetOn} from '../utils/oddsUtils';
import { ParlayPayout } from './ParlayPayout';
import { unselectBet } from './LiveOdds';
import { PlaceBet } from './PlaceBet';
import { useState } from 'react';

interface BetCreatorProps {
    games: live_game[];
    selectedBets: any;
    betAmount: number;
    setBetAmount: any;
    setSelectedBets: any;
}

const removeBet = (selectedBets: any, setSelectedBets: any, gameId: string) => {
    const newSet = new Set(selectedBets);
    newSet.delete(gameId)
    setSelectedBets(newSet);
    unselectBet(gameId);
}

const BetCreator = ({ games, selectedBets, setSelectedBets, betAmount, setBetAmount}: BetCreatorProps) => {
    let gamesBetOn = getGamesBetOn(games, selectedBets);
    const [isBetConfirmed, setIsBetConfirmed] = useState(false);

    return (
        <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm mb-5 rounded-xl mt-20 mr-10'>
            <div className='flex items-center flex-col mt-5'>
                <h1 className='text-cyan-500 text-xl'>Parlay Builder</h1>
                <h2 className='text-gray-500 text-xs'>2 Selections</h2>
                <div className=''>
                    {gamesBetOn.map(game => 
                    <div key={game.game_id} className='m-5 bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 p-5 text-xs rounded-xl'> 
                        <div className='flex justify-between'>
                            <div>
                                <div className='text-xs text-gray-500 my-1'>{game.home_team} vs {game.away_team}</div>
                                {/* SHOULD ONLY USE IF h2h */}
                                <div className='text-sm'>{game.team_bet_on} ML</div>
                                <p className='text-cyan-500 my-1'>Odds: <strong>{convertBettingOdds(game.team_odds)}</strong></p>
                            </div>
                            {/* will have to get the actual betId */}
                            <button onClick={() => removeBet(selectedBets, setSelectedBets, game.team_bet_on_id)} className='mt-2 text-md text-xl font-semibold text-gray-500 hover:text-gray-300'>
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
                        value={betAmount}
                        onChange={(e) => {
                            const newValue = parseFloat(e.target.value);
                            const positiveValue = Math.max(newValue, 0);
                            setBetAmount(positiveValue)}
                        }
                        min="0"
                        step="1"
                        required
                />
            </div>
            <ParlayPayout
                games={games}
                selectedBets={selectedBets}
                betAmount={betAmount}
            />
            <div id='confirm-bet-id' className='text-center text-xs mt-4 hidden'>
                <p></p>
            </div>
            <button onClick={() => {
               setIsBetConfirmed(true);
               PlaceBet(isBetConfirmed, setIsBetConfirmed, betAmount);
            }}className='mt-4 bg-cyan-500 p-5 w-full mb-0 hover:cursor-pointer'>Confirm Bet</button>
            </div>
        </div>
    )
};

export default BetCreator;