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
            <div className="Navbar relative flex justify-between items-center w-calc-full-200px h-[75px] left-[200px] px-[40px] py-0 text-white bg-customBlue border-white border-b text-center
            md:left-0 md:p-0 md:w-full sm:left-0 sm:p-0 sm:w-full sm:h-[160px] sm:flex-col sm:items-center sm:justify-center">
                <div className="Navbar__dropbox">  
                    <select className="font-sans text-[1rem] font-medium leading-[1.5] text-slate-600 bg-white m-0 rounded-[0.5em] border-b border-slate-400 py-[0.55em] pr-[1.4em] pl-[0.8em] focus:outline-none disabled:opacity-50 md:ml-[10px]" 
                    
                    name="Season" defaultValue={order} onChange={(e)=>{
                        setOrder(e.target.value)
                    }}>
                        <option value={0}>2023-2024</option>
                        <option value={1}>2024-2025</option>
                    </select>
                </div>
                <div className="Navbar__sort flex justify-center md:p-0 sm:my-[20px]">
                    <ul className="list-none flex flex-row md:p-0">
                        <li className="border border-white rounded-[5px] p-[10px] my-0 mx-[10px] bg-none
                        hover:bg-cyan-gradient hover:shadow-sortbtnHoverShadow">
                            <span className="no-underline text-white cursor-pointer"
                            onClick={()=>{
                            let seasonInfoCopy = [...seasonInfo];
                            seasonInfoCopy.map((a, i) => {
                                a.sort((x, y) => x.last_name.toLowerCase() < y.last_name.toLowerCase() ? -1 : 1);
                                console.log('이름 정렬 완료!! 선수목록 \n', seasonInfo[i]);
                                setSeasonInfo(seasonInfoCopy);
                                return <CardLayout seasonInfo={seasonInfo} order={order}/>;
                            })
                        }}>Name</span></li>
                        <li className="border border-white rounded-[5px] p-[10px] my-0 mx-[10px] bg-none
                        hover:bg-cyan-gradient hover:shadow-sortbtnHoverShadow">
                            <span className="no-underline text-white cursor-pointer"
                            onClick={()=>{
                            let seasonInfoCopy = [...seasonInfo];
                            seasonInfoCopy.map((a, i) => {
                                a.sort((x, y) => x.backnumber - y.backnumber); 
                                console.log('등번호 정렬 완료!! 선수목록 \n', seasonInfo[i]);
                                setSeasonInfo(seasonInfoCopy);
                                return <CardLayout seasonInfo={seasonInfo} order={order}/>;
                            })
                        }}>Number</span></li>
                        <li className="border border-white rounded-[5px] p-[10px] my-0 mx-[10px] bg-none
                        hover:bg-cyan-gradient hover:shadow-sortbtnHoverShadow">
                            <span className="no-underline text-white cursor-pointer"
                            onClick={()=>{
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

