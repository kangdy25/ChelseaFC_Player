import { useSelector, useDispatch } from "react-redux";
import { setSeasonInfo } from "../redux/slice/seasonInfoSlice";
import { setOrder } from "../redux/slice/orderSlice";
import CardLayout from "../component/CardLayout";
import { useEffect} from "react";

export default function MainLayout() {
    const seasonInfo = useSelector((state) => state.seasonInfo)
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch();
    console.log(seasonInfo)
    // order 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('order', order);
    }, [order]);

    return (
        <section>
            <div className="Navbar relative flex justify-between items-center w-calc-full-200px h-[75px] left-[200px] px-[40px] py-0 text-white bg-customBlue border-white border-b text-center
            md:left-0 md:p-0 md:w-full sm:left-0 sm:p-0 sm:w-full sm:h-[160px] sm:flex-col sm:items-center sm:justify-center">
                <div className="Navbar__dropbox">  
                    <select className="font-sans text-[1rem] font-medium leading-[1.5] text-slate-600 bg-white m-0 rounded-[0.5em] border-b border-slate-400 py-[0.55em] pr-[1.4em] pl-[0.8em] focus:outline-none disabled:opacity-50 md:ml-[10px]" 
                    
                    name="Season" defaultValue={order} onChange={(e)=>{
                        dispatch(setOrder(e.target.value))
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
                                const sortedSeasonInfo = seasonInfo.map((season, i) => {
                                    return [...season].sort((x, y) =>
                                        x.last_name.toLowerCase() < y.last_name.toLowerCase() ? -1 : 1
                                    );
                                });
                                dispatch(setSeasonInfo(sortedSeasonInfo));
                                return <CardLayout />;
                        }}>Name</span></li>
                        <li className="border border-white rounded-[5px] p-[10px] my-0 mx-[10px] bg-none
                        hover:bg-cyan-gradient hover:shadow-sortbtnHoverShadow">
                            <span className="no-underline text-white cursor-pointer"
                            onClick={()=>{
                                const sortedSeasonInfo = seasonInfo.map((season) => {
                                    return [...season].sort((x, y) =>
                                        x.backnumber - y.backnumber
                                    );
                                });
                                dispatch(setSeasonInfo(sortedSeasonInfo));
                                return <CardLayout />;
                        }}>Number</span></li>
                        <li className="border border-white rounded-[5px] p-[10px] my-0 mx-[10px] bg-none
                        hover:bg-cyan-gradient hover:shadow-sortbtnHoverShadow">
                            <span className="no-underline text-white cursor-pointer"
                            onClick={()=>{
                                const sortedSeasonInfo = seasonInfo.map((season) => {
                                    return [...season].sort((x, y) =>
                                        x.role - y.role
                                    );
                                });
                                dispatch(setSeasonInfo(sortedSeasonInfo));
                                return <CardLayout />;
                        }}>Position</span></li>
                    </ul>
                </div>
            </div>
            <CardLayout />
        </section>
    )
    
}

