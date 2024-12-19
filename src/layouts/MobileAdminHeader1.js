import { Link } from "react-router-dom"
import "../styles/layouts/dropdown.css"

const MobileAdminHeader1 = ({item, isHambuger, setIsHambuger}) =>{
    const hambugerClick = () => {
        isHambuger ? setIsHambuger(false) : setIsHambuger(true)
    }

    return(
        <>
            <nav className="admin-mobile-nav">
                <ul className="admin-menus">
                    {
                        item.smallLink.map((menu, index) => (
                            <li key={index} className="admin-menu-items" onClick={hambugerClick}>
                                <Link to={menu.link}>{menu.title}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}

export default MobileAdminHeader1