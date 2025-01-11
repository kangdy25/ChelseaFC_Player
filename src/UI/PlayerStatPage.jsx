import {React, useCallback, useEffect} from 'react'
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

    // 환경 변수 설정
    const API_URL=process.env.REACT_APP_API_UR;

    useEffect(() => {
        // 새로운 선수에 대한 데이터 로드 전 상태 초기화
        dispatch(resetStats());
    }, [name, season, dispatch]);

    // 카드 컴포넌트 클릭 시 해당 선수와 일치하는 데이터 찾기
    const playerData = seasonInfo.find(
        (seasonArray) => seasonArray.some(player => player.season === parseInt(season)))?.find(
            (player)=> player.url_name === name
    )

    // 크롤링 요청 코드
    const fetchStats = useCallback(async (playerData) => {
        try {
            const response = await fetch(`${API_URL}/crawl`, {
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
    }, [dispatch, API_URL]);

    // 페이지 접속 시 현역 첼시 선수 데이터가 있으면 크롤링 시작
    useEffect(() => {
        if (playerData && playerData.isChelsea) {
            fetchStats(playerData);
        }
    }, [playerData, fetchStats]);

    // 현재 첼시 소속이 아닌 선수는 404 에러 처리
    if (!playerData || !playerData.isChelsea) {
        return <NotFoundPage />;
    }

    // 데이터를 기다리는 동안 Loading UI, 데이터 받은 후 포지션에 따라서 페이지 렌더링
    return (
        <main className='flex'>    
            {!stats ? <Loading/> : (stats.role !== 0 ? <FieldPlayer /> : <Goalkeeper />) }
        </main>
    )
}

export default PlayerStatPage