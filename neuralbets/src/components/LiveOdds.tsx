import { Clock, ChevronDown } from 'lucide-react';
import { LiveIndicator } from './LiveIndicator';
import { live_game } from '../types/Livegame';
import BetCreator from './BetCreator';
import { convertBettingOdds } from '../utils/oddsUtils';
import { formatSportName, formatTimeToEST } from '../utils/formatUtils';
import { useState, useMemo, useEffect } from 'react';


 const selectBet = (betId: string, gameId: string, selectedBets: any, setSelectedBets: any, setBetAmount: any, games: live_game[]) => {    
    // Find the game to get both team IDs
    console.log('selectBet called');
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

            const newSet = new Set(selectedBets);
            newSet.delete(otherButtonId);
            newSet.add(betId);
            setSelectedBets(newSet);
            console.log(newSet);
            
            if (priceSpan) {
                priceSpan.classList.remove('text-cyan-400');
                priceSpan.classList.add('text-white');
            }
        } else {
            // Unselecting this button
            element.classList.remove(...selectedClasses);
            element.classList.add(...unselectedClasses);

            const newSet = new Set(selectedBets);
            newSet.delete(betId);
            setSelectedBets(newSet);
            console.log(newSet);
            
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
        updateBetTabVisibility(setBetAmount, games);
    }
 }

 export const unselectBet = (betId: string) => {
        const element = document.getElementById(betId);
        if (element){
            const selectedClasses = 'bg-cyan-400 text-white'.split(' ');
            const unselectedClasses = 'bg-gradient-to-br from-cyan-500/10 to-purple-600/5'.split(' ');
            element.classList.remove(...selectedClasses);
            element.classList.add(...unselectedClasses);

            const labelSpan = element.querySelector('span:first-child');
            const priceSpan = element.querySelector('span:last-child');
        
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

 const updateBetTabVisibility = (setBetAmount: any, games: live_game[]) => {
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
        setBetAmount(0);
        const element = document.getElementById('confirm-bet-id');
        element?.classList.add('hidden');
    }
 }
 
 function listGames(games: live_game[], selectedBets: any, setSelectedBets:any, betAmount: number, setBetAmount: any) {

    return (
        <div className='flex justify-start gap-4 w-full'>
        <div className='flex-grow max-w-4xl'>
            {games.map(game => 
            <div key={game.id} className='text-white m-8'>
                <div className='display flex justify-between mb-5'>
                    <div className='text-white text-[20px] text-bold'>{formatSportName(game.sport_name)}</div>
                </div>  
                <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm mb-5 rounded-xl'>
                    <div className='flex justify-between items-start mx-5 my-4'>    
                        <div className='flex space-x-3 items-center'>
                            <div className='border-[#c084fc] border text-[#c084fc] rounded-md px-2 py-1 text-xs'>{game.sport_title}</div>
                            <LiveIndicator/>
                        </div>
                        <div className='flex flex-col items-end gap-1'>
                            <div className='flex space-x-1 items-center text-sm'>
                                <Clock className="h-3.5 w-3.5" />
                                <div>{formatTimeToEST(game.start_time)}</div>
                            </div>
                            {game.bookmaker && (
                                <div className='text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                                    {game.bookmaker}
                                </div>
                            )}
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
                    <button id={game.home_team_id} onClick={() => selectBet(game.home_team_id, game.id, selectedBets, setSelectedBets, setBetAmount, games)} className='flex-col h-20 w-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/5 hover:from-cyan-500/20 hover:to-purple-600/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex rounded-md justify-center'>
                        <span className="text-xs text-gray-500 mb-1">Home</span>
                        <span className="text-lg text-cyan-400 font-mono">{convertBettingOdds(game.home_team_price)}</span>
                    </button>
                    <button id={game.away_team_id} onClick={() => selectBet(game.away_team_id, game.id, selectedBets, setSelectedBets, setBetAmount, games)} className='flex-col h-20 w-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/5 hover:from-cyan-500/20 hover:to-purple-600/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex rounded-md justify-center'>
                        <span className="text-xs text-gray-500 mb-1">Away</span>
                        <span className="text-lg text-cyan-400 font-mono">{convertBettingOdds(game.away_team_price)}</span>
                    </button>
                    </div>
                </div>
            </div>)}
        </div>
        <div id='bet-tab' className='w-0 transition-all text-white sticky top-20 h-fit'>
            <div className='max-h-[calc(100vh-6rem)] overflow-y-auto'>
               <BetCreator games={games}
                           selectedBets={selectedBets} 
                           setSelectedBets={setSelectedBets}
                           betAmount={betAmount}
                           setBetAmount={setBetAmount}
                            />
            </div>
        </div>
        </div>
    );
 }

interface LiveOddsProps {
    games: live_game[];
    loading: boolean;
    error: string | null;
}

const LiveOdds = ({ games, loading, error }: LiveOddsProps) => {
    const [selectedBets, setSelectedBets] = useState(new Set());
    const [betAmount, setBetAmount] = useState(0);
    const [selectedLeague, setSelectedLeague] = useState<string>('all');
    
    // Extract unique leagues from games
    const leagues = useMemo(() => {
        const uniqueLeagues = new Set(games.map(game => game.sport_title));
        return Array.from(uniqueLeagues).sort();
    }, [games]);
    
    // Filter games based on selected league
    const filteredGames = useMemo(() => {
        if (selectedLeague === 'all') {
            return games;
        }
        return games.filter(game => game.sport_title === selectedLeague);
    }, [games, selectedLeague]);
    
    // Clear selected bets when league filter changes
    useEffect(() => {
        // Clear all bet selections visually
        selectedBets.forEach(betId => {
            const element = document.getElementById(betId as string);
            if (element) {
                const selectedClasses = 'bg-cyan-400 text-white'.split(' ');
                const unselectedClasses = 'bg-gradient-to-br from-cyan-500/10 to-purple-600/5'.split(' ');
                element.classList.remove(...selectedClasses);
                element.classList.add(...unselectedClasses);
                
                const labelSpan = element.querySelector('span:first-child');
                const priceSpan = element.querySelector('span:last-child');
                
                if (labelSpan) {
                    labelSpan.classList.remove('text-white');
                    labelSpan.classList.add('text-gray-500');
                }
                if (priceSpan) {
                    priceSpan.classList.remove('text-white');
                    priceSpan.classList.add('text-cyan-400');
                }
            }
        });
        
        // Clear the selected bets state
        setSelectedBets(new Set());
        setBetAmount(0);
        
        // Hide bet tab
        const betTab = document.getElementById('bet-tab');
        if (betTab) {
            betTab.classList.remove('w-96');
            betTab.classList.add('w-0');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLeague]);
    
    // Show structure immediately, even while loading
    const showContent = !loading || games.length > 0;
    
    return (
        <div className='mb-24 pb-6'>
            {/* Loading State - shown inline, doesn't block page */}
            {loading && games.length === 0 && (
                <div className='mx-8 mb-8 mt-4 flex items-center justify-center'>
                    <div className='flex flex-col items-center space-y-4'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400'></div>
                        <p className='text-white text-xl'>Loading live odds...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className='mx-8 mb-8 mt-4 flex items-center justify-center'>
                    <p className='text-red-400 text-xl'>{error}</p>
                </div>
            )}

            {/* Show content when we have games */}
            {showContent && games.length > 0 && (
                <>
                    {/* League Filter Section */}
                    <div className='mx-8 mb-8 mt-4'>
                        <div className='relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-cyan-500/40'>
                            <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 animate-pulse'></div>
                            
                            <div className='relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                                <div className='flex items-center gap-3'>
                                    <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'>
                                        <svg className='w-5 h-5 text-cyan-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='text-white font-semibold text-lg'>Filter by League</h3>
                                        <p className='text-gray-400 text-xs'>
                                            {selectedLeague === 'all' 
                                                ? `Showing all ${games.length} events`
                                                : `${filteredGames.length} ${filteredGames.length === 1 ? 'event' : 'events'} in ${selectedLeague}`
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                                <div className='flex items-center gap-3'>
                                    <div className='relative group'>
                                        <select
                                            id='league-filter'
                                            value={selectedLeague}
                                            onChange={(e) => setSelectedLeague(e.target.value)}
                                            className='appearance-none bg-mainblue border-2 border-cyan-500/30 text-white rounded-xl px-5 py-2.5 pr-12 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 cursor-pointer font-medium hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 min-w-[200px]'
                                        >
                                            <option value='all' className='bg-mainblue text-white'>All Leagues</option>
                                            {leagues.map(league => {
                                                const count = games.filter(g => g.sport_title === league).length;
                                                return (
                                                    <option key={league} value={league} className='bg-mainblue text-white'>
                                                        {league} ({count})
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400 pointer-events-none transition-transform duration-200 group-hover:translate-y-[-40%]' />
                                    </div>
                                    
                                    {selectedLeague !== 'all' && (
                                        <button
                                            onClick={() => setSelectedLeague('all')}
                                            className='px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/10 animate-fadeIn'
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Games List */}
                    {filteredGames.length === 0 ? (
                        <div className='text-white text-center mx-8 py-12 animate-fadeIn'>
                            <div className='inline-block p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-cyan-500/10'>
                                <p className='text-lg text-gray-400'>No games available for <span className='text-cyan-400 font-semibold'>{selectedLeague}</span></p>
                            </div>
                        </div>
                    ) : (
                        <ul className='animate-fadeIn'>
                            {listGames(filteredGames, selectedBets, setSelectedBets, betAmount, setBetAmount)}
                        </ul>
                    )}
                </>
            )}

            {/* Empty state when no games and not loading */}
            {!loading && games.length === 0 && !error && (
                <div className='mx-8 mb-8 mt-4 flex items-center justify-center'>
                    <p className='text-white text-xl'>No live odds available at the moment.</p>
                </div>
            )}
        </div>
    );
}

export default LiveOdds;