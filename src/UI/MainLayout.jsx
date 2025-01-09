import CardLayout from "../component/CardLayout";
import player2324 from '../Database/2324_player'
import player2425 from '../Database/2425_player'
import { useState, useEffect} from "react";

export default function MainLayout() {
    let [seasonInfo, setSeasonInfo] = useState([player2324, player2425]);
    let [order, setOrder] = useState(()=>{
        const savedOrder = localStorage.getItem('order');
        return savedOrder ? savedOrder : 1;  // 2024-2025로 기본값 설정
    });

    // order 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('order', order);
    }, [order]);

    return (
        <div>
            <div className="Navbar">
                <div className="Navbar__dropbox">  
                    <select name="Season" defaultValue={order} onChange={(e)=>{
                        setOrder(e.target.value)
                    }}>
                        <option value={0}>2023-2024</option>
                        <option value={1}>2024-2025</option>
                    </select>
                </div>
                <div className="Navbar__sort">
                    <ul>
                        <li><span onClick={()=>{
                            let seasonInfoCopy = [...seasonInfo];
                            seasonInfoCopy.map((a, i) => {
                                a.sort((x, y) => x.last_name.toLowerCase() < y.last_name.toLowerCase() ? -1 : 1);
                                console.log('이름 정렬 완료!! 선수목록 \n', seasonInfo[i]);
                                setSeasonInfo(seasonInfoCopy);
                                return <CardLayout seasonInfo={seasonInfo} order={order}/>;
                            })
                        }}>Name</span></li>
                        <li><span onClick={()=>{
                            let seasonInfoCopy = [...seasonInfo];
                            seasonInfoCopy.map((a, i) => {
                                a.sort((x, y) => x.backnumber - y.backnumber); 
                                console.log('등번호 정렬 완료!! 선수목록 \n', seasonInfo[i]);
                                setSeasonInfo(seasonInfoCopy);
                                return <CardLayout seasonInfo={seasonInfo} order={order}/>;
                            })
                        }}>Number</span></li>
                        <li><span onClick={()=>{
                            let seasonInfoCopy = [...seasonInfo];
                            seasonInfoCopy.map((a, i) => {
                                a.sort((x, y) => x.role - y.role); 
                                console.log('포지션 정렬 완료!! 선수목록 \n', seasonInfo[i]);
                                setSeasonInfo(seasonInfoCopy); 
                                return <CardLayout seasonInfo={seasonInfo} order={order}/>;
                            })
                        }}>Position</span></li>
                    </ul>
                </div>
            </div>
            <CardLayout seasonInfo={seasonInfo} order={order}/>
        </div>
    )
    
}

