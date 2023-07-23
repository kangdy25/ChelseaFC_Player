import CardLayout from "../component/CardLayout";
import SortLayout from "../component/SortLayout";

import player2223 from '../Database/2223_player'
import player2324 from '../Database/2324_player'
import { useState } from "react";

export default function MainLayout() {
    let [seasonInfo, setSeasonInfo] = useState([player2223, player2324]);
    let [order, setOrder] = useState(0);
    let [sortResult, setSortResult] = useState('')
    return (
        <div>
            <div className="Navbar">
                <div className="Navbar__dropbox">  
                    <select name="Season" defaultValue={0} onChange={(e)=>{
                        setOrder(e.target.value)
                    }}>
                        <option value={0}>2022-2023</option>
                        <option value={1}>2023-2024</option>
                    </select>
                </div>
                <div className="Navbar__sort">
                    <ul>
                        <li><span onClick={()=>{
                            let seasonInfoCopy = [...seasonInfo];
                            seasonInfoCopy.map((a, i) => {
                                a.sort((x, y) => x.last_name.toLowerCase() < y.last_name.toLowerCase() ? -1 : 1);
                                console.log('이름 정렬 완료!! 선수목록 \n', seasonInfo[i]);
                                setSeasonInfo(seasonInfoCopy)
                            })
                        }}>Name</span></li>
                        <li><span onClick={()=>{
                            let seasonInfoCopy = [...seasonInfo];
                            seasonInfoCopy.map((a, i) => {
                                a.sort((x, y) => x.backnumber - y.backnumber); 
                                console.log('등번호 정렬 완료!! 선수목록 \n', seasonInfo[i]);
                                setSeasonInfo(seasonInfoCopy)
                            })
                        }}>Number</span></li>
                        <li><span onClick={()=>{
                            let seasonInfoCopy = [...seasonInfo];
                            seasonInfoCopy.map((a, i) => {
                                a.sort((x, y) => x.role - y.role); 
                                console.log('포지션 정렬 완료!! 선수목록 \n', seasonInfo[i]);
                                setSeasonInfo(seasonInfoCopy)
                            })
                        }}>Position</span></li>
                    </ul>
                </div>
            </div>
            <CardLayout seasonInfo={seasonInfo} order={order}/>
            
        </div>
    )
    
}

