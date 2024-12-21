import {React, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setStats, resetStats } from "../redux/slice/statsSlice"
import NotFoundPage from './NotFoundPage';
import FieldPlayer from "../component/FieldPlayer"
import Goalkeeper from "../component/Goalkeeper"
import Loading from "./Loading"

const PlayerStatPage = () => {
    const seasonInfo = useSelector((state) => state.seasonInfo)
    const stats = useSelector((state) => state.stats)
    const dispatch = useDispatch();

    const {season, name} = useParams();

    useEffect(() => {
        // 새로운 선수에 대한 데이터 로드 전 상태 초기화
        dispatch(resetStats());
    }, [name, season, dispatch]);

    const playerData = seasonInfo.find(
        (seasonArray) => seasonArray.some(player => player.season === parseInt(season)))?.find(
            (player)=> player.url_name === name
    )

    // 현재 첼시 소속이 아닌 선수는 404 에러 처리
    if (!playerData.isChelsea) {
        return <NotFoundPage/>;
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
            dispatch(setStats(data));
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };
    return (
        <div className="flex flex-col  justify-center items-center">
            <h1 className="text-7xl">Player Stats</h1>
                <button className="mt-5 bg-red-400 cursor-pointer border border-slate-700 p-2 rounded-lg" onClick={() => fetchStats(playerData)}>Fetch Player Stats</button>
                {!stats ? <Loading/> : (stats.role !== 0 ? <FieldPlayer /> : <Goalkeeper />) }
        </div>
    )
}

export default PlayerStatPage