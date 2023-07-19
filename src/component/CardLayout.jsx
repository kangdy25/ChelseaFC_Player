import { useEffect } from "react";

export default function CardLayout(props) {
    const url = '/img/player/';
    return (
        <div className="background">
                <div className="card_layout">
                    {
                            props.seasonInfo[props.order].map((a, i)=>{
                                return (
                                    <div className="card" key={i}>
                                        <a href="/">
                                            <div className="card__name">
                                            <span>{a.first_name}</span>
                                                <h3>{a.last_name}</h3>
                                            </div>
                                            <div className="card__rectangle">
                                                <img src={url + a.last_name + '.webp'} alt=""/>
                                            </div>
                                            <p className="card__detail">
                                                <span>{a.position}</span> 
                                            </p>
                                        </a>
                                    </div>  
                                )
                            }) 
                    // })
                }
            </div>
        </div>
    )
}