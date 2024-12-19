import { menuItemsData } from '../../constant/group';
import MobileMenuItems from './MobileMenuItems'

const MobileHeaderLink = () => {
  const depthLevel = 0;
  return (
    <nav className="mobile-nav">
      <ul className="menus">
        {menuItemsData.map((menu, index) => {
          return (
            <MobileMenuItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
            />
          );
        })}
      </ul>

    </nav>
  );
};

export default MobileHeaderLink;