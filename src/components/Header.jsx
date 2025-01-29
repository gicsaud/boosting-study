import style from "./header.module.scss"

export default function Header(){
    return(
        <div className={style.container}>
            <div className={style.logo}>
                <span>Boosting Study</span>
            </div>
            <div className={style.infos}>
                <a href="#">Sobre Nós</a>
                <a href="#">Templates</a>
                <a href="#">Acessar</a>
            </div>
        </div>
    )
}