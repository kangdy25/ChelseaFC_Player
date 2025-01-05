import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSeasonInfo } from "../redux/slice/seasonInfoSlice";
import { setOrder } from "../redux/slice/orderSlice";
import SortButton from "../component/SortButton";
import CardLayout from "../component/CardLayout";

export default function MainLayout() {
    const seasonInfo = useSelector((state) => state.seasonInfo)
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch();

    // 정렬 알고리즘
    const handleSort = (label) => {
        const sortedSeasonInfo = seasonInfo.map((season) => {
            return [...season].sort((x, y) =>
            {
                if (label === 'name') {
                    return x.last_name.toLowerCase() < y.last_name.toLowerCase() ? -1 : 1;
                } else if (label === 'number') {
                    return x.backnumber - y.backnumber; 
                } else if (label === 'position') {
                    return x.role - y.role;
                }
                return 0;
            });
        });
        dispatch(setSeasonInfo(sortedSeasonInfo));
        return <CardLayout />;
    }
    
    // order 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('order', order);
    }, [order]);

    return (
        <section className="relative md:static sm:static">
            <div className="w-[calc(100%-200px)] relative flex justify-between items-center h-[75px] left-[200px] px-10 py-0 text-white bg-customBlue border-white border-b text-center
            md:left-0 md:p-0 md:w-full sm:left-0 sm:p-0 sm:w-full sm:h-[160px] sm:flex-col sm:items-center sm:justify-center">
                <div>  
                    <select className="font-sans text-base font-medium text-slate-600 bg-white m-0 rounded-lg border-b border-slate-400 py-2 pr-6 pl-2 focus:outline-none disabled:opacity-50 md:ml-2" 
                    
                    name="Season" defaultValue={order} onChange={(e)=>{
                        dispatch(setOrder(e.target.value))
                    }}>
                        <option value={0}>2023-2024</option>
                        <option value={1}>2024-2025</option>
                    </select>
                </div>
                <div className="flex justify-center md:p-0 sm:my-5">
                    <ul className="list-none flex flex-row md:p-0">
                        <SortButton label="name" onClick={()=>handleSort('name')} />
                        <SortButton label="number" onClick={()=>handleSort('number')} />
                        <SortButton label="position" onClick={()=>handleSort('position')} />
                    </ul>
                </div>
            </div>
            <CardLayout />
        </section>
    )
    
}

