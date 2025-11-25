// import { useEffect, useState } from "react";
// import { getLiveOdds } from "../api/liveOddsApi";

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
          start_time: '2025-11-23T18:02:38Z'
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
    start_time: '2025-11-23T21:14:00Z'
 };

 games = [game1, game2];

 function listGames(games: live_game[]) {
    return (
        <ul>
            {games.map(game => 
            <div key={game.id} className='text-white m-8'>
                <div className='text-white text-[20px] text-bold'>{game.sport_name}</div>
                <div className='border-b border-cyan-500/10 bg-black/95 backdrop-blur-sm sticky top-0 z-50 m-4'>
                    <div className='inline border border-[#c084fc] border text-[#c084fc] rounded-md px-2 py-1'>{game.sport_title}</div>
                    <div className='space-y-3'>
                        <div>{game.home_team}</div>
                        <div className="h-px bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent"></div>
                        <div>{game.away_team}</div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <button>{game.home_team_price}</button>
                        <button>{game.away_team_price}</button>
                    </div>
                </div>
            </div>)}
        </ul>
    );
 }

const LiveOdds = () => {
    // will have an api call here, and have games store the results
    return (
        <div className='h-[500px]'>
            <ul>
                {listGames(games)}
            </ul>
        </div>
    );
}

export default LiveOdds;