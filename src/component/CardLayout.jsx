import { useNavigate } from 'react-router-dom';

export default function CardLayout(props) {
    const navigate = useNavigate();
    const url = '/img/player/';
    return (
        <div className="background absolute left-[200px] w-calc-full-200px bg-background-gradient md:left-0 md:w-full md:top-[175px] sm:top-[330px]">
                <div className="card_layout grid grid-cols-[repeat(auto-fill,minmax(250px,0.5fr))] my-5 ml-5 justify-center content-center gap-2.5 px-5 pb-5">
                    {
                        props.seasonInfo[props.order].map((a, i)=>{
                            // url에 맞게 이름 변환
                            let name = '';
                            if (a.first_name === '') {
                                name = a.last_name.replace(" ", "-");
                            } else {
                                name = a.first_name + '-' + a.last_name;
                            }

                            const handleClick = ()=>{
                                navigate(`/player/${a.season}/${name.toLowerCase()}`)
                            }

                            return (
                                <div className="card flex justify-center items-center flex-col w-[250px] h-[450px] mt-5 border border-slate-300 rounded-2xl bg-card-gradient text-center backdrop-blur-[10px] shadow-cardShadow 
                                hover:shadow-cardHoverShadow hover:transform hover:scale-105 hover:transition hover:duration-1000" 
                                
                                key={i} onClick={()=>handleClick()}>
                                    <span className="card__number text-white opacity-50 text-[40px] pt-[10px] pl-4 font-serif absolute top-0 left-0 z-[2] tracking-[-3px]">{a.backnumber}</span>
                                    <div className="card__name flex flex-col justify-center items-stretch font-serif text-white font-semibold">
                                    <span className='text-[16px] text-slate-200 mt-1'>{a.first_name}</span>
                                        <h3 className='text-[26px] text-center mt-2'>{a.last_name}</h3>
                                    </div>
                                    <div className="card__rectangle bg-customCobalt border border-slate-500 backdrop-blur-[40px] shadow-cardShadow rounded-[20px] w-[200px] h-[250px] overflow-hidden">
                                        <img className='absolute top-0 left-0 w-full'
                                        src={url + '/' + a.season + '/' + a.season + a.last_name + '.webp'} alt=""/>
                                    </div>
                                    <p className="card__detail text-white p-4 text-[13px]">
                                        <span className='text-[15px] font-serif font-bold'>{a.position}</span> 
                                    </p>
                                </div>  
                            )
                        }) 
                    }
            </div>
        </div>
    )
}