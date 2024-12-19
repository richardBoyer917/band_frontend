import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Dropdown from './Dropdown';
import { downArrow } from '../../assets';

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false)
  let ref = useRef()
  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  return (
    <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu" onClick={() => setDropdown((prev) => !prev)}>
            {items.title}{' '} {depthLevel === 0 ? <img src={downArrow} style={{ marginLeft: '8px' }} alt='downArrow' /> : <img src={downArrow} style={{ marginLeft: '8px', rotate: '-90deg' }} alt='downArrow' />}
          </button>
          <Dropdown dropdown={dropdown} submenus={items.submenu} depthLevel={depthLevel} />
        </>
      ) : (
        <RouterLink to={items.url} >{items.title}</RouterLink>
      )}
    </li>
  );
};

export default MenuItems;