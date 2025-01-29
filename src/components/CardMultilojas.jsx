import Image from "next/image";
import style from "./card.module.scss"

const CardMultilojas = ({ nomeRestaurante, cidade, estado, distancia }) => {
    
    const isDistanciaValida = !isNaN(distancia) && distancia !== null;

    return(
        <div className={style.card}>
            <Image src="/mapa.png" alt="Ícone de Mapa" className={style.icon} width={24} height={24} />
        
            <div className={style.content}>
                <h2 className={style.title}>{nomeRestaurante}</h2>
                <p className={style.subtitle}>{cidade}/{estado}</p>
            </div>
            {isDistanciaValida && (
                <div className={style.distancia}>
                    {Number(distancia.toFixed(2))} km
                </div>
            )}
        </div>
    )
}

export default CardMultilojas;