import { live_game } from '../types/Livegame';

interface BetCreatorProps {
    games: live_game[];
}

const BetCreator = ({ games }: BetCreatorProps) => {
    return (
        <div className='bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all p-0 overflow-hidden backdrop-blur-sm mb-5 rounded-xl m-20'>
            <div><h1>Parlay Builder</h1>
                <h2>2 Selections</h2>
            </div>
                <div className=''>
                    {games.map(game => 
                    <div key={game.id}>
                        <div>{game.home_team} vs {game.away_team}</div>
                    </div>)}
            </div>
        </div>
    )
};

export default BetCreator;