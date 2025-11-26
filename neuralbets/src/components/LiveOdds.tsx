// import { useEffect, useState } from "react";
// import { getLiveOdds } from "../api/liveOddsApi";
import { Clock } from 'lucide-react';
import { LiveIndicator } from './LiveIndicator';

interface live_game {
    id: string,
    sport_name: string;
    sport_title: string;
    home_team: string;
    away_team: string;
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
    away_team: 'Minnesota Wild',
    market: 'h2h',
    bookmaker: 'FanDuel',
    home_team_price: 2.16,
    away_team_price: 1.68,
    start_time: '21:00'
 };

 games = [game1, game2];

 function listGames(games: live_game[]) {
    // will maybe need the BE to send the times as actual times to be used
    return (
        <ul>
            {games.map(game => 
            <div key={game.id} className='text-white m-8'>
                <div className='display flex justify-between mb-5'>
                    <div className='text-white text-[20px] text-bold'>{game.sport_name}</div>
                </div>  
                <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm mb-5'>
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
                    <button className='flex-col h-20 w-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/5 hover:from-cyan-500/20 hover:to-purple-600/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex rounded-md'>
                        <span className="text-xs text-gray-500 mb-1">Home</span>
                        <span className="text-lg text-cyan-400 font-mono">{game.home_team_price}</span>
                    </button>
                    <button className='flex-col h-20 w-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/5 hover:from-cyan-500/20 hover:to-purple-600/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex rounded-md'>
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
    // will have an api call here, and have games store the results
    return (
        <div className='mb-100'>
            <ul>
                {listGames(games)}
            </ul>
        </div>
    );
}

export default LiveOdds;