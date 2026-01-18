import { live_game } from '../types/Livegame';
import { convertBettingOdds, getGamesBetOn} from '../utils/oddsUtils';
import { ParlayPayout } from './ParlayPayout';
import { unselectBet } from './LiveOdds';
import AuthNotification from './AuthNotification';
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
    const [showAuthNotification, setShowAuthNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Check if user is logged in (you can replace this with actual auth check)
    const isLoggedIn = false; // TODO: Replace with actual auth state

    const handlePlaceBet = () => {
        // Clear previous error
        setErrorMessage('');
        const element = document.getElementById('confirm-bet-id');
        
        // Validate bet amount (check for 0, empty, or falsy values)
        if (!betAmount || betAmount <= 0) {
            setErrorMessage('To confirm your wager, please enter a bet amount greater than $0.00.');
            if (element) {
                element.classList.remove('hidden');
            }
            return;
        }
        
        // Validate selections
        if (gamesBetOn.length === 0) {
            setErrorMessage('Bet slip is empty, please select at least one bet.');
            if (element) {
                element.classList.remove('hidden');
            }
            return;
        }
        
        // Check if user is logged in
        if (!isLoggedIn) {
            setShowAuthNotification(true);
            return;
        }
        
        // If all validations pass, place the bet
        console.log('Placing bet:', { betAmount, gamesBetOn });
        // TODO: Actual bet placement logic here
    };

    return (
        <>
            <AuthNotification 
                isVisible={showAuthNotification}
                onClose={() => setShowAuthNotification(false)}
            />
            
            <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm mb-5 rounded-xl mt-20 mr-10'>
                <div className='flex items-center flex-col mt-5'>
                    <h1 className='text-cyan-500 text-xl'>Parlay Builder</h1>
                    <h2 className='text-gray-500 text-xs'>{gamesBetOn.length} Selections</h2>
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
                            const value = e.target.value;
                            if (value === '') {
                                setBetAmount('');
                                return;
                            }
                            
                            const decimalIndex = value.indexOf('.');
                            if (decimalIndex !== -1) {
                                const decimalPart = value.substring(decimalIndex + 1);
                                if (decimalPart.length > 2) {
                                    const truncatedValue = value.substring(0, decimalIndex + 3);
                                    const numValue = parseFloat(truncatedValue);
                                    if (!isNaN(numValue)) {
                                        setBetAmount(Math.max(numValue, 0));
                                    }
                                    return;
                                }
                            }
                            
                            const validPattern = /^\d*\.?\d{0,2}$/;
                            if (!validPattern.test(value)) {
                                return;
                            }
                            
                            const numValue = parseFloat(value);
                            if (isNaN(numValue)) {
                                return;
                            }
                            const positiveValue = Math.max(numValue, 0);
                            setBetAmount(positiveValue);
                        }}
                        onBlur={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                                const roundedValue = Math.round(Math.max(value, 0) * 100) / 100;
                                setBetAmount(roundedValue);
                            }
                        }}
                        min="0"
                        step="0.01"
                        required
                />
            </div>
            <ParlayPayout
                games={games}
                selectedBets={selectedBets}
                betAmount={betAmount}
            />
            
            {/* Error message display */}
            {errorMessage && (
                <div id='confirm-bet-id' className='text-center text-xs mt-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 animate-fadeIn'>
                    <p className='text-red-400'>{errorMessage}</p>
                </div>
            )}
            
            <button 
                onClick={handlePlaceBet}
                className='mt-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 p-5 w-full mb-0 hover:cursor-pointer transition-all duration-200 font-semibold text-white transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-cyan-500/50'
            >
                Confirm Bet
            </button>
            </div>
        </div>
        </>
    )
};

export default BetCreator;