import { Clock } from 'lucide-react';
import { LiveIndicator } from './LiveIndicator';

interface live_game {
    id: string,
    sport_name: string;
    sport_title: string;
    home_team: string;
    home_team_id: string;
    away_team: string;
    away_team_id: string;
    market: string;
    bookmaker: string;
    home_team_price: number;
    away_team_price: number;
    start_time: string;
}

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
          away_team_price: 1.6,
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
    }
 }
 
 function listGames(games: live_game[]) {
    // will maybe need the BE to send the times as actual times to be used
    return (
        <ul>
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
                    {/* MAYBE FROM THE BE, I'lLL HAVE TO GENERATE THESE THINGS. MAKES EASY FOR STORING */}
                    <button id={game.home_team_id} onClick={() => selectBet(game.home_team_id, game.id)} className='flex-col h-20 w-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/5 hover:from-cyan-500/20 hover:to-purple-600/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex rounded-md'>
                        <span className="text-xs text-gray-500 mb-1">Home</span>
                        <span className="text-lg text-cyan-400 font-mono">{game.home_team_price}</span>
                    </button>
                    <button id={game.away_team_id} onClick={() => selectBet(game.away_team_id, game.id)} className='flex-col h-20 w-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/5 hover:from-cyan-500/20 hover:to-purple-600/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex rounded-md'>
                        <span className="text-xs text-gray-500 mb-1">Away</span>
                        <span className="text-lg text-cyan-400 font-mono">{game.away_team_price}</span>
                    </button>
                    </div>
                </div>
            </div>)}
        </ul>
    );
 }

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