import { useNavigate } from 'react-router-dom';

export default function CardLayout(props) {
    const navigate = useNavigate();
    const url = '/img/player/';
    return (
        <div className="background">
                <div className="card_layout">
                    {
                        props.seasonInfo[props.order].map((a, i)=>{
                            const handleClick = ()=>{
                                navigate(`/player/${a.season}/${a.backnumber}`)
                            }

                            return (
                                <div className="card" key={i} onClick={()=>handleClick()}>
                                    <span className="card__number">{a.backnumber}</span>
                                    <div className="card__name">
                                    <span>{a.first_name}</span>
                                        <h3>{a.last_name}</h3>
                                    </div>
                                    <div className="card__rectangle">
                                        <img src={url + '/' + a.season + '/' + a.season + a.last_name + '.webp'} alt=""/>
                                    </div>
                                    <p className="card__detail">
                                        <span>{a.position}</span> 
                                    </p>
                                </div>  
                            )
                        }) 
                    }
            </div>
        </div>
    )
}