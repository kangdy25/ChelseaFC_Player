import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PlayerStatPage = () => {
    const seasonInfo = useSelector((state) => state.seasonInfo)
    const [stats, setStats] = useState(null);
    const {season, name} = useParams();

    console.log(season, name)
    const playerData = seasonInfo.find(
        (seasonArray) => seasonArray.some(player => player.season === parseInt(season)))?.find(
            (player)=> player.url_name === name
    )
    if (!playerData) {
        return <div>선수 데이터를 찾을 수 없습니다.</div>;
    }
    
    const fetchStats = async (playerData) => {
        console.log(playerData)
        try {
            const response = await fetch('/crawl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playerData }),
            }); 

            if (response.status === 404) {
                alert("Player not found on Chelsea roster");
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            
            // /crawl 엔드포인트 호출
            const data = await response.json();
            console.log(data)
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-7xl">Player Stats</h1>
                <button className="mt-5 bg-red-400 cursor-pointer border border-slate-700 p-2 rounded-lg" onClick={() => fetchStats(playerData)}>Fetch Player Stats</button>
                {stats && (
                    <ul>
                        <li>Appearances: {stats.appearances}</li>
                        <li>Minutes Played: {stats.minutesPlayed}</li>
                        <li>Starts: {stats.starts}</li>
                        <li>Subbed On/Off: {stats.subbedOnOff}</li>
                        <li>Total Touches: {stats.totalTouches}</li>
                        <li>Tackles Won/Lost: {stats.tacklesWonLost}</li>
                    </ul>
                )}
        </div>
    )
}

export default PlayerStatPage