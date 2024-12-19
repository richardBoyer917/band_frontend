import { useState } from 'react';
import MobileDropdown from './MobileDropdown';

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false)
  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdown((prev) => !prev);
  };
  return (
    <li className="menu-items" onClick={closeDropdown}>
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={(e) => toggleDropdown(e)}
          >
            {items.title}
            <div>
              {dropdown ? (
                <span className="arrow-close" />
              ) : (
                <span className="arrow" />
              )}
            </div>
          </button>
          <MobileDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <a href={items.url}>{items.title}</a>
      )}
    </li>
  );
};

export default MenuItems;