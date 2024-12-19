import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { DefaultButton, MobileHeaderLink } from "../components/Buttons";
import HeaderWrapper from "./HeaderWrapp";
import { adminUser, lightLogout, logo } from "../assets";
import { logout } from "../api/authAPI";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { getUserInfo } from "../api/adminAPI";
import { hambuger } from "../assets";
import MobileAdminHeader1 from "./MobileAdminHeader1";
import "../styles/layouts/layout.css";

const AdminHeader1 = ({ setIsAdminPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShrunk, setIsShrunk] = useState(false);
  const [isHambuger, setIsHambuger] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1000px)");

  const adminLinkInfo = {
    admin: {
      title: "Страница администратора",
      link: "",
      smallLink: [
        { title: "кейсы", link: "/admin/eventTable" },
        { title: "каталог площадок", link: "/admin/sitesTable" },
        // { title: "каталог оборудования", link: "/admin/equipmentTable" },
        { title: "отзывы", link: "/admin/reviewTable" },
        { title: "блог", link: "/admin/factoryshowTable" },
        { title: "реп. база", link: "/admin/rehearsalTable" },
        { title: "3D-визуализация", link: "/admin/visualizationTable" },
        { title: "команда", link: "/admin/newTeamTable" },
      ],
    },
    setting: {
      title: "Настройки аккаунта",
      link: "setting",
      smallLink: [
        { title: "данные аккаунта", link: "adminDataSection" },
        { title: "каталог пользователей", link: "adminDirectorySection" },
      ],
    },
    create: {
      title: "Создание пользователя",
      link: "create",
    },
    edit: {
      title: "Изменение данных пользователя",
      link: "edit",
    },
  };

  const [addLink, setAddLink] = useState(adminLinkInfo.admin);
  const [userInfo, setUserInfo] = useState({});

  const handleLogout = () => {
    logout().then(() => {
      setIsAdminPage(false);
      navigate("/");
    });
  };

  const hambugerClick = () => {
    isHambuger ? setIsHambuger(false) : setIsHambuger(true);
  }

  const handleSetting = () => {
    navigate("/admin/setting");
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    token &&
      getUserInfo().then((data) => {
        data && setUserInfo(data);
      });
  }, [sessionStorage.getItem("token")]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const pathArray = currentPath.split("/");
    const lastPathSegment = pathArray[pathArray.length - 1];
    if (adminLinkInfo[lastPathSegment]) {
      setAddLink(adminLinkInfo[lastPathSegment]);
    }
  }, [location.pathname]);

  return (
    <>
      {userInfo.name && (
        <HeaderWrapper
          content={
            <>
              <div
                className={`spaceBetween topHeader ${
                  isShrunk ? "scrolled" : ""
                }`}
              >
                <div className="alignCenter">
                  <img
                    onClick={() => {
                      setIsAdminPage(false);
                      navigate("/");
                    }}
                    src={logo}
                    alt="Company Logo"
                    style={{ cursor: "pointer", width: "98px" }}
                  />
                  <div className="adminHeaderLink">
                    <RouterLink to="/admin">Страница администратора</RouterLink>
                    {(addLink.link === "create" || addLink.link === "edit") && (
                      <span className="adminHeaderSpan">
                        <span>&nbsp;&nbsp; / &nbsp;&nbsp;</span>
                        <RouterLink to="/admin/setting">
                          Настройки аккаунта
                        </RouterLink>
                      </span>
                    )}
                    {addLink.link !== "" && (
                      <span  className="adminHeaderSpan">
                        <span>&nbsp;&nbsp; / &nbsp;&nbsp;</span>
                        <RouterLink to={`/admin/${addLink.link}`}>
                          {addLink.title}
                        </RouterLink>
                      </span>
                    )}
                  </div>
                </div>
                <div className="requestBtn alignCenter" style={{ gap: "15px" }}>
                  <div className="adminHeaderLink">
                    <span style={{ fontSize: "12px" }}>
                      {userInfo.name} {userInfo.lastname}
                    </span>
                  </div>
                  <img
                    className="headerAvatar"
                    src={adminUser}
                    alt="Admin User Avatar"
                  />
                  <DefaultButton onClick={handleSetting} title="настройки" />
                  <img
                    src={lightLogout}
                    alt="Logout Icon"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              {addLink.smallLink && (
                <div className="container">
                  <div className="adminHeaderScrollLink">
                    {addLink.smallLink.map((item, index) => (
                      <MobileHeaderLink
                        key={index}
                        link={item.link}
                        content={item.title}
                      />
                    ))}
                  </div>
                </div>
              )}
              {
                addLink.smallLink && isMobile && isHambuger &&
                  <MobileAdminHeader1 item={adminLinkInfo.admin} isHambuger={isHambuger} setIsHambuger={setIsHambuger} />
              }
              {isShrunk && <hr />}
              {
                addLink.smallLink && isMobile &&
                  <img src={hambuger} onClick={hambugerClick} alt="hambuger" className="adminHeaderHanbuger" />
              }
            </>
          }
        />
      )}
    </>
  );
};

export default AdminHeader1;
