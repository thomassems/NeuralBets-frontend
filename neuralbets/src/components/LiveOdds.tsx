import { Clock, ChevronDown, Star } from 'lucide-react';
import { LiveIndicator } from './LiveIndicator';
import { live_game } from '../types/Livegame';
import BetCreator from './BetCreator';
import { convertBettingOdds } from '../utils/oddsUtils';
import { formatSportName, formatTimeToEST } from '../utils/formatUtils';
import { getSportIcon, getFavoriteSports, toggleFavoriteSport } from '../utils/sportIcons';
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
 
 function listGames(games: live_game[], selectedBets: any, setSelectedBets:any, betAmount: number, setBetAmount: any, favorites: string[] = []) {
    // Group games by sport (each sport shown once as header, then its games below)
    const bySport = games.reduce<Record<string, live_game[]>>((acc, game) => {
        const sport = formatSportName(game.sport_name);
        if (!acc[sport]) acc[sport] = [];
        acc[sport].push(game);
        return acc;
    }, {});
    const sportOrder = Array.from(new Set(games.map(g => formatSportName(g.sport_name)))).sort((a, b) => {
        const aFav = favorites.includes(a);
        const bFav = favorites.includes(b);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return a.localeCompare(b);
    });

    return (
        <div className='flex justify-start gap-4 w-full'>
        <div className='flex-grow max-w-4xl'>
            {sportOrder.map(sport => (
            <div key={sport} className='text-white m-8'>
                <div className='flex items-center gap-2 mb-5'>
                    <span className='text-cyan-400'>{getSportIcon(sport, 'w-5 h-5')}</span>
                    <h2 className='text-white text-[20px] font-bold'>{sport}</h2>
                </div>
                {bySport[sport].map(game => (
                <div key={game.id} className='mb-5'>
                <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm rounded-xl'>
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
                </div>
                ))}
            </div>
            ))}
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
    const [selectedSport, setSelectedSport] = useState<string>('all');
    const [selectedLeague, setSelectedLeague] = useState<string>('all');
    const [favorites, setFavorites] = useState<string[]>(getFavoriteSports());
    const [forceShowAll, setForceShowAll] = useState(false);

    // Extract unique sports from games, sorted with favorites first
    const sports = useMemo(() => {
        const uniqueSports = Array.from(new Set(games.map(game => formatSportName(game.sport_name))));
        return uniqueSports.sort((a, b) => {
            const aFav = favorites.includes(a);
            const bFav = favorites.includes(b);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return a.localeCompare(b);
        });
    }, [games, favorites]);
    
    // When favorites exist and not forcing "all", show all favorited sports; otherwise use selectedSport
    const showingFavorites = favorites.length > 0 && !forceShowAll;

    // Extract unique leagues from games (filtered by sport)
    const leagues = useMemo(() => {
        const filteredBySport = showingFavorites
            ? games.filter(game => favorites.includes(formatSportName(game.sport_name)))
            : (selectedSport === 'all' ? games : games.filter(game => formatSportName(game.sport_name) === selectedSport));
        const uniqueLeagues = new Set(filteredBySport.map(game => game.sport_title));
        return Array.from(uniqueLeagues).sort();
    }, [games, selectedSport, favorites, showingFavorites]);

    // Filter games: when favorites exist show all favorites; else use selectedSport
    const filteredGames = useMemo(() => {
        let filtered = games;

        if (showingFavorites) {
            filtered = filtered.filter(game => favorites.includes(formatSportName(game.sport_name)));
        } else if (selectedSport !== 'all') {
            filtered = filtered.filter(game => formatSportName(game.sport_name) === selectedSport);
        }

        if (selectedLeague !== 'all') {
            filtered = filtered.filter(game => game.sport_title === selectedLeague);
        }

        return filtered;
    }, [games, selectedSport, selectedLeague, favorites, showingFavorites]);
    
    // Clear selected bets when sport or league filter changes
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
    }, [selectedSport, selectedLeague, favorites, forceShowAll]);
    
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
                    {/* Filter Section */}
                    <div className='mx-8 mb-8 mt-4 space-y-4'>
                        {/* Sport Buttons */}
                        <div className='flex flex-wrap gap-2'>
                            {/* All Sports button */}
                            <button
                                onClick={() => {
                                    setForceShowAll(true);
                                    setSelectedSport('all');
                                    setSelectedLeague('all');
                                }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                    !showingFavorites && selectedSport === 'all'
                                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/10'
                                        : 'bg-gray-900/30 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                                }`}
                            >
                                <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                    <circle cx='12' cy='12' r='10' />
                                    <path d='M2 12h20' />
                                    <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
                                </svg>
                                All
                                <span className={`text-xs px-1.5 py-0.5 rounded-md ${selectedSport === 'all' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-500'}`}>
                                    {games.length}
                                </span>
                            </button>

                            {/* Divider if there are favorites */}
                            {favorites.length > 0 && sports.some(s => favorites.includes(s)) && (
                                <div className='flex items-center px-1'>
                                    <div className='w-px h-6 bg-white/10' />
                                </div>
                            )}

                            {/* Sport buttons */}
                            {sports.map(sport => {
                                const count = games.filter(g => formatSportName(g.sport_name) === sport).length;
                                const isFav = favorites.includes(sport);
                                const isSelected = showingFavorites ? isFav : selectedSport === sport;

                                return (
                                    <div key={sport} className='relative group/sport flex'>
                                        <button
                                            onClick={() => {
                                                if (showingFavorites) {
                                                    const nextFavs = toggleFavoriteSport(sport);
                                                    setFavorites(nextFavs);
                                                    setForceShowAll(false);
                                                    if (nextFavs.length > 0) setSelectedLeague('all');
                                                } else {
                                                    setSelectedSport(selectedSport === sport ? 'all' : sport);
                                                    setSelectedLeague('all');
                                                }
                                            }}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                                isSelected
                                                    ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/10'
                                                    : 'bg-gray-900/30 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                                            }`}
                                        >
                                            <span className={isSelected ? 'text-cyan-400' : 'text-gray-500 group-hover/sport:text-gray-300 transition-colors'}>
                                                {getSportIcon(sport, 'w-4 h-4')}
                                            </span>
                                            {sport}
                                            <span className={`text-xs px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-500'}`}>
                                                {count}
                                            </span>
                                            {isFav && (
                                                <Star className='w-3 h-3 text-yellow-400 fill-yellow-400' />
                                            )}
                                        </button>
                                        {/* Favorite toggle on hover */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const wasFav = favorites.includes(sport);
                                                const nextFavs = toggleFavoriteSport(sport);
                                                setFavorites(nextFavs);
                                                setForceShowAll(false);
                                                setSelectedLeague('all');
                                                if (wasFav && nextFavs.length === 0) {
                                                    setSelectedSport('all');
                                                }
                                            }}
                                            className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center opacity-0 group-hover/sport:opacity-100 transition-opacity duration-200 hover:border-yellow-500/50 z-10'
                                            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                                        >
                                            <Star className={`w-2.5 h-2.5 ${isFav ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* League dropdown + info row */}
                        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                            <div className='relative group'>
                                <select
                                    id='league-filter'
                                    value={selectedLeague}
                                    onChange={(e) => setSelectedLeague(e.target.value)}
                                    className='appearance-none bg-mainblue border-2 border-purple-500/30 text-white rounded-xl px-5 py-2.5 pr-12 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 cursor-pointer font-medium hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 w-full sm:min-w-[220px]'
                                >
                                    <option value='all' className='bg-mainblue text-white'>All Leagues</option>
                                    {leagues.map(league => {
                                        const sportFilteredGames = showingFavorites
                                            ? games.filter(g => favorites.includes(formatSportName(g.sport_name)))
                                            : (selectedSport === 'all' ? games : games.filter(g => formatSportName(g.sport_name) === selectedSport));
                                        const count = sportFilteredGames.filter(g => g.sport_title === league).length;
                                        return (
                                            <option key={league} value={league} className='bg-mainblue text-white'>
                                                {league} ({count})
                                            </option>
                                        );
                                    })}
                                </select>
                                <ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 pointer-events-none' />
                            </div>

                            <p className='text-gray-500 text-xs'>
                                {!showingFavorites && selectedSport === 'all' && selectedLeague === 'all'
                                    ? `Showing all ${games.length} events`
                                    : `${filteredGames.length} ${filteredGames.length === 1 ? 'event' : 'events'}${showingFavorites ? ` in ${favorites.join(', ')}` : selectedSport !== 'all' ? ` in ${selectedSport}` : ''}${selectedLeague !== 'all' ? ` — ${selectedLeague}` : ''}`
                                }
                            </p>

                            {(showingFavorites || selectedSport !== 'all' || selectedLeague !== 'all') && (
                                <button
                                    onClick={() => { setForceShowAll(true); setSelectedSport('all'); setSelectedLeague('all'); }}
                                    className='px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-medium hover:bg-white/10 hover:text-white transition-all duration-200 whitespace-nowrap'
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Games List */}
                    {filteredGames.length === 0 ? (
                        <div className='text-white text-center mx-8 py-12 animate-fadeIn'>
                            <div className='inline-block p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-cyan-500/10'>
                                <p className='text-lg text-gray-400'>
                                    No games available
                                    {showingFavorites && <> for <span className='text-cyan-400 font-semibold'>{favorites.join(', ')}</span></>}
                                    {!showingFavorites && selectedSport !== 'all' && <> for <span className='text-cyan-400 font-semibold'>{selectedSport}</span></>}
                                    {selectedLeague !== 'all' && <> in <span className='text-purple-400 font-semibold'>{selectedLeague}</span></>}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <ul className='animate-fadeIn'>
                            {listGames(filteredGames, selectedBets, setSelectedBets, betAmount, setBetAmount, favorites)}
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