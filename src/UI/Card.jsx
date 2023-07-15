import player_2324 from "../Database/2324_player"

export default function Card() {
    const url = '/img/player/'
    // let [player2324, setPlayer2324] = useState([
    //     'Kepa', 'Badiashile', 'Thiago Silva', 'Chilwell', 'Reece James', 'Cucurella', 'Fofana',
    //     'Ampadu',])
    return (
        <div className="background">
            <div className="card_layout">
                {
                    player_2324.map((a, i)=>{
                        return (
                            <div className="card">
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
                }
            </div>
        </div>
    )
}