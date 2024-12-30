import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function CardLayout() {
    const seasonInfo = useSelector((state)=> state.seasonInfo)
    const order = useSelector((state) => state.order)

    const navigate = useNavigate();
    const url = '/img/player/';
    
    return (
        <article className="absolute w-[calc(100%-200px)] left-[200px] bg-background-gradient md:left-0 md:w-full md:top-[175px] sm:top-[330px] sm:left-0 sm:w-full">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,0.5fr))] my-5 ml-5 justify-center items-center gap-2.5 px-5 pb-5">
                {
                    seasonInfo[order].map((a, i)=>{
                        const handleClick = ()=>{
                            navigate(`/player/${a.season}/${a.url_name}`)
                        }
                        
                        return (
                            <div className="flex justify-center items-center flex-col w-[250px] h-[450px] mt-5 border border-slate-300 rounded-2xl bg-card-gradient text-center backdrop-blur-[10px] shadow-cardShadow 
                                hover:shadow-cardHoverShadow hover:transition hover:duration-500" 
                                
                            key={i} onClick={()=>handleClick()}>
                                <span className="text-white opacity-50 text-4xl pt-3 pl-4 font-serif absolute top-0 left-0 z-[2] tracking-[-3px]">{a.backnumber}</span>
                                <div className="flex flex-col justify-center items-stretch font-serif text-white font-semibold">
                                <span className='text-lg text-slate-200 mt-1'>{a.first_name}</span>
                                    <h3 className='text-2xl text-center my-2'>{a.last_name}</h3>
                                </div>
                                <div className="bg-customCobalt border border-slate-500 backdrop-blur-[40px] shadow-cardShadow rounded-[20px] w-[200px] h-[250px] overflow-hidden">
                                    <img className='absolute top-0 left-0 w-full'
                                    src={url + '/' + a.season + '/' + a.season + a.last_name + '.webp'} alt="player"/>
                                </div>
                                <p className="text-white p-4 text-sm font-serif font-bold">
                                    {a.position}
                                </p>
                            </div>  
                        )
                    }) 
                }
        </div>
    </article>
    )
}