import { useState } from "react"

export default function Card() {
    const url = '/img/player/'
    let [player2324, setPlayer202324] = useState([
        'Kepa', 'Badiashile', 'Thiago Silva', 'Chilwell', 'Reece James', 'Cucurella', 'Fofana',
        'Ampadu'

])
    return (
        <div className="background">
            <div className="card_layout">
                {
                    player2324.map((player, i)=>{
                        return (
                            <div className="card">
                                <h3>{player}</h3>
                                <div className="card__rectangle">
                                    <img src={url + player + '.webp'} alt=""/>
                                </div>
                                <p className="card__detail">
                                    The Wonderful player, <span>{player}</span> 
                                </p>
                            </div>  
                        )
                    })
                }
            </div>
        </div>
    )
}