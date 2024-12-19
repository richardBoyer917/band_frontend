
import { menuItemsData } from "../../constant/group";
import MenuItems from "./MenuItems";
import "../../styles/layouts/dropdown.css"

const depthLevel = 0;

const HeaderLink = () => {
  return (
    <nav className="desktop-nav " >
      <ul className="menus alignCenter">
        {menuItemsData.map((menu, index) => (
          <MenuItems items={menu} key={index} depthLevel={depthLevel} />
        ))}
      </ul>
    </nav>
  )
}

export default HeaderLink