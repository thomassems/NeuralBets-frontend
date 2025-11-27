import { Clock } from 'lucide-react';
import { LiveIndicator } from './LiveIndicator';
import { live_game } from '../types/Livegame';
import BetCreator from './BetCreator';
import { convertBettingOdds } from '../utils/oddsUtils';

// FOR TESTING
let games: live_game[];
const game1: live_game = {id: 'cc4352fd8dac47d053790493642f3540',
          sport_name: 'Football',
          sport_title: 'NFL',
          home_team: 'Chicago Bears',
          home_team_id: '4e3d1a8c-7f5b-4c62-9e90-1b2d3c4e5f60',
          away_team_id: 'a7b8c9d0-e1f2-43g4-h5i6-7j8k9l0m1n2o',
          away_team: 'Pittsburgh Steelers',
          market: 'h2h',
          bookmaker: 'FanDuel',
          home_team_price: 5.2,
          away_team_price: 1.23,
          start_time: '18:00'
 };

 const game2: live_game = {id:'fde2c32bb935ab51ed460435fa77c373',
    sport_name: 'Hockey',
    sport_title: 'NHL',
    home_team: 'Winnipeg Jets',
    home_team_id: 'b9c8d7e6-f5a4-43b2-c1d0-e9f8a7b6c5d4',
    away_team: 'Minnesota Wild',
    away_team_id: '71605948-3210-4f5e-6d7c-8b9a0c1d2e3f',
    market: 'h2h',
    bookmaker: 'FanDuel',
    home_team_price: 2.16,
    away_team_price: 1.68,
    start_time: '21:00'
 };

 games = [game1, game2];

 const selectBet = (betId: string, gameId: string) => {    
    // Find the game to get both team IDs
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    const element = document.getElementById(betId);
    const otherButtonId = betId === game.home_team_id ? game.away_team_id : game.home_team_id;
    const otherElement = document.getElementById(otherButtonId);
    
    if (element) {
        const selectedClasses = 'bg-cyan-400 text-white'.split(' ');
        const unselectedClasses = 'bg-gradient-to-br from-cyan-500/10 to-purple-600/5'.split(' ');

        // Get the spans inside this button
        const labelSpan = element.querySelector('span:first-child');
        const priceSpan = element.querySelector('span:last-child');

        if (element.classList.contains('bg-gradient-to-br')) {
            // First, always unselect the other button (if it exists)
            if (otherElement) {
                otherElement.classList.remove(...selectedClasses);
                otherElement.classList.add(...unselectedClasses);
                
                const otherLabelSpan = otherElement.querySelector('span:first-child');
                const otherPriceSpan = otherElement.querySelector('span:last-child');
                
                if (otherLabelSpan) {
                    otherLabelSpan.classList.remove('text-white');
                    otherLabelSpan.classList.add('text-gray-500');
                }
                if (otherPriceSpan) {
                    otherPriceSpan.classList.remove('text-white');
                    otherPriceSpan.classList.add('text-cyan-400');
                }
            }
            
            // Then select this button
            element.classList.remove(...unselectedClasses);
            element.classList.add(...selectedClasses);
            
            if (priceSpan) {
                priceSpan.classList.remove('text-cyan-400');
                priceSpan.classList.add('text-white');
            }
        } else {
            // Unselecting this button
            element.classList.remove(...selectedClasses);
            element.classList.add(...unselectedClasses);
            
            // Update spans back to original colors
            if (labelSpan) {
                labelSpan.classList.remove('text-white');
                labelSpan.classList.add('text-gray-500');
            }
            if (priceSpan) {
                priceSpan.classList.remove('text-white');
                priceSpan.classList.add('text-cyan-400');
            }
        }
        
        // Check if any bet is selected and show/hide bet-tab accordingly
        updateBetTabVisibility();
    }
 }

 const updateBetTabVisibility = () => {
    const betTab = document.getElementById('bet-tab');
    if (!betTab) return;
    
    // Get all possible bet button IDs from all games
    const allBetIds: string[] = [];
    games.forEach(game => {
        allBetIds.push(game.home_team_id, game.away_team_id);
    });
    
    // Check if any button is selected (has bg-cyan-400 class)
    const hasSelectedBet = allBetIds.some(betId => {
        const button = document.getElementById(betId);
        return button && button.classList.contains('bg-cyan-400');
    });
    
    // Show or hide bet-tab based on selection
    if (hasSelectedBet) {
        betTab.classList.remove('w-0');
        betTab.classList.add('w-96');
    } else {
        betTab.classList.remove('w-96');
        betTab.classList.add('w-0');
    }
 }
 
 function listGames(games: live_game[]) {
    // will maybe need the BE to send the times as actual times to be used
    return (
        <div className='flex justify-between align-center w-full'>
        <div className='flex-grow'>
            {games.map(game => 
            <div key={game.id} className='text-white m-8'>
                <div className='display flex justify-between mb-5'>
                    <div className='text-white text-[20px] text-bold'>{game.sport_name}</div>
                </div>  
                <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm mb-5 rounded-xl'>
                    <div className='display flex justify-between mx-5 my-4'>    
                        <div className='flex space-x-5 align-center'>
                            <div className='inline border-[#c084fc] border text-[#c084fc] rounded-md px-1 py-0.5'>{game.sport_title}</div>
                            <LiveIndicator/>
                        </div>
                        <div className='flex space-x-1 items-center'>
                            <Clock className="h-3.5 w-3.5" />
                            <div>{game.start_time}</div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between p-5 border-b border-white/5'>
                        <div className='space-y-3'>
                            <div>{game.home_team}</div>
                            <div className="h-px bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent"></div>
                            <div>{game.away_team}</div>
                        </div>
                    </div>
                    <div className='flex items-center space-x-2 m-5'>
                    <button id={game.home_team_id} onClick={() => selectBet(game.home_team_id, game.id)} className='flex-col h-20 w-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/5 hover:from-cyan-500/20 hover:to-purple-600/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex rounded-md justify-center'>
                        <span className="text-xs text-gray-500 mb-1">Home</span>
                        <span className="text-lg text-cyan-400 font-mono">{convertBettingOdds(game.home_team_price)}</span>
                    </button>
                    <button id={game.away_team_id} onClick={() => selectBet(game.away_team_id, game.id)} className='flex-col h-20 w-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/5 hover:from-cyan-500/20 hover:to-purple-600/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex rounded-md justify-center'>
                        <span className="text-xs text-gray-500 mb-1">Away</span>
                        <span className="text-lg text-cyan-400 font-mono">{convertBettingOdds(game.away_team_price)}</span>
                    </button>
                    </div>
                </div>
            </div>)}
        </div>
        <div id='bet-tab' className='w-0 transition-all text-white'>
                {/* WILL NEED TO BE ALTERED TO ONLY PASS IN DATA FOR BETS THAT HAVE BEEN CLICKED
                MEANING THIS COMPONENT WILL HAvE TO CHANGE WHILE THINGS ARE CLICKED */}
                {/* WILL NEED A STATE VARIABLE FOR THE SELECTED GAMES AND WILL NEED THEM TO CHANGE
                AS GAMES CHANGES (selected+unselected) */}
               <BetCreator games={games} />
        </div>
        </div>
    );
 }

// const betCreator =() => {
    // will be used to create bets. will find all the selected bets and then pass them into a BE api
    // which we'll then make the data look better
    // user should be able to select an amount. they should be able to press an x beside bets to remove them
    // will maybe have to call a separate API to do the math, or can maybe handle this from the FE
    // 
// };

const makeBet = () => {
    // will be on a onClick button which is used to make a bet
    // BE API will have to verify whether the bet is valid, user has the funds
};

const LiveOdds = () => {
    return (
        <div className='mb-24 pb-6'>
            <ul>
                {listGames(games)}
            </ul>
        </div>
    );
}

export default LiveOdds;