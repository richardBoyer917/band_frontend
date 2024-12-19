import { useNavigate } from "react-router-dom"
import { logo } from "../assets"

const AdminHeader = ({ setIsAdminPage }) => {
  const navigate = useNavigate();
  const RouterName = [
    { title: 'Кейсы мероприятий', url: 'newCase' },
    { title: 'Каталог площадок', url: 'newSite' },
    { title: 'Каталог оборудования', url: 'newEquipment' },
    { title: 'Отзывы (Нас рекомендуют)', url: 'newReview' },
    { title: 'Блог #ЗаводШоу', url: 'newFactory' },
    { title: 'Репетиционная база', url: 'newBase' },
    { title: '3D-визуализация', url: 'newVisualization' },
    { title: 'Команда', url: 'newTeam' },
  ]

  const handleClick = (link, scrollSpy) => {
    const currentPath = window.location.pathname;
    if (currentPath !== link) {
      navigate(link);
    }
    if (scrollSpy) {
      setTimeout(() => {
        const section = document.getElementById(scrollSpy);
        if (section) {
          const sectionY = section.getBoundingClientRect().top + window.pageYOffset - 200
          window.scrollTo({ top: sectionY, behavior: 'smooth' })
        }
      }, 500);
    }
  }

  return (
    <header className="scrollWrapper">
      <div className='headerScroll'>
        <div className="container alignCenter spaceBetween">
          <img onClick={() => { setIsAdminPage(false); navigate('/') }} src={logo} alt="logo" style={{ cursor: 'pointer' }} />
          <div className="alignCenter">
            <nav className="desktop-nav" >
              <ul className="menus alignCenter">
                {RouterName.map((items, index) => (
                  <li className="menu-items" key={index} style={{ cursor: 'pointer' }} onClick={() => handleClick('/admin', items.url)}>
                    <a href="#" onClick={(e) => e.preventDefault()}>{items.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader;