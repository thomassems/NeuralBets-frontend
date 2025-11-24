

// import { useEffect, useState } from "react";
// import { getLiveOdds } from "../api/liveOddsApi";


const LiveOdds = () => {
    return (
        <div className='h-[500px]'>

        </div>
    );
}
//     const [liveOdds, setLiveOdds] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     useEffect(() => {
//         const fetchOdds = async () => {
//             try {
//                 setLoading(true);
//                 const data = await getLiveOdds();
//                 setLiveOdds(data);
//                 setError(null);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'Failed to fetch live odds');
//                 console.error('Error fetching live odds:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchOdds();
//     }, []);
//     console.log(liveOdds);
//     return (
//         <div className='text-pink-500'>
//             <h2>LIVE ODDS</h2>
//         </div>
//     )
// }

export default LiveOdds;

export {}