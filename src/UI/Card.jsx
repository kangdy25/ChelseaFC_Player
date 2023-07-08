import Havertz from './Havertz.webp'

export default function Card() {
    return (
        <div>
            <div class="card">
                <h3>Kai Havertz</h3>
                <div class="card__rectangle">
                    <img src={Havertz} alt=""/>
                </div>
                <p class="card__detail">
                    The Blues completed the signing of the young German international in the summer of 2020 
                    when <span>Kai Havertz</span> put his signature on a five-year contract.
                </p>
            </div>  
        </div>
    )
}