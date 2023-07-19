import CardLayout from "../component/CardLayout";
import SortLayout from "../component/SortLayout";

import player2223 from '../Database/2223_player'
import player2324 from '../Database/2324_player'
import { useEffect, useState } from "react";

export default function MainLayout() {
    let [seasonInfo, setSeasonInfo] = useState([player2223, player2324])
    // let ChangeOne = [''];
    let [order, setOrder] = useState(0)
    return (
        <div>
            <div className="Navbar">
                <div className="Navbar__dropbox">  
                    {/* <select name="Season" defaultValue={JSON.stringify(player2324)} onChange={(e)=>{ */}
                        {/* // let copy = seasonInfo;
                        // copy[0] = JSON.parse(e.target.value);
                        // setSeasonInfo(copy)
                        // console.log(seasonInfo[0]); */}
                    <select name="Season" defaultValue={0} onChange={(e)=>{
                        setOrder(e.target.value)
                        console.log(e.target.value)
                        console.log(`지금 숫자는 ${order}입니다`)
                    }}>
                        {/* <option value={JSON.stringify(player2223)}>2022-2023</option> */}
                        <option value={0}>2022-2023</option>
                        {/* <option value={JSON.stringify(player2324)}>2023-2024</option> */}
                        <option value={1}>2023-2024</option>
                    </select>
                </div>
                <SortLayout/>
            </div>
            <CardLayout seasonInfo={seasonInfo} order={order}/>
            
        </div>
    )
    
}

