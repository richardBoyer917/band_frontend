import { footerTopLink } from "../constant/group";
import { darkTelegram, darkVK, logo, whiteMail, whitePhone } from "../assets";
import {
  CircleButton,
  DefaultButton,
  ScrollSpyButton,
} from "../components/Buttons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ToEmail, ToPhone } from "../components/ToText";

const FooterTop = () => (
  <div className="footerTop">
    <div className="footerTopLeft">
      <RouterLink to="/">
        <img className="bigFooterLogo" alt="bigFooterLogo" src={logo} />
      </RouterLink>
    </div>
    <div className="footerTopRight">
      <div>
        {footerTopLink.map((item, index) => (
          <RouterLink key={index} to={item.url} className="footerTopLink">
            {item.title}
          </RouterLink>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }} className="socialBtn">
        <ScrollSpyButton
          to="contactSection"
          content={
            <div className="requestBtn1">
              <DefaultButton title="ОСТАВИТЬ ЗАЯВКУ" />
            </div>
          }
        />
        <a href="https://t.me/zavodshow" rel="noreferrer" target="_blank">
          <CircleButton icon={darkTelegram} alt="darkTelegram" />
        </a>
        <a href="https://vk.com/zavodshow" rel="noreferrer" target="_blank">
          <CircleButton icon={darkVK} alt="darkVK" />
        </a>
      </div>
    </div>
  </div>
);

const FooterMiddle = () => {
  const navigate = useNavigate();

  const goContactus = () => {
    let section = document.getElementById("contactSection");
    if (!section) {
      navigate("/contact");
      setTimeout(() => {
        section = document.getElementById("contactSection");
        if (section) {
          const sectionY =
            section.getBoundingClientRect().top + window.pageYOffset - 200;
          window.scrollTo({ top: sectionY, behavior: "smooth" });
        }
      }, 500);
    } else {
      const sectionY =
        section.getBoundingClientRect().top + window.pageYOffset - 200;
      window.scrollTo({ top: sectionY, behavior: "smooth" });
    }
  };

  return (
    <div className="footerMiddle">
      <div className="footerMiddleLeft">
        <DefaultButton onClick={() => goContactus()} title="ОСТАВИТЬ ЗАЯВКУ" />
      </div>
      <div className="footerMiddleRight">
        <div className="middleOne box1">
          <RouterLink to="/services/showdevelopment" className="middleTitle">
            РАЗРАБОТКА ШОУ
          </RouterLink>
          <RouterLink to="/services/visualization" className="middleTitle">
            3D-визуализация
          </RouterLink>
          <RouterLink to="/services/rehearsal" className="middleLink">
            Репетиционная база
          </RouterLink>
        </div>
        <div className="middleOne box2">
          <RouterLink to="/production/event" className="middleTitle">
            ПРОДАКШН
          </RouterLink>
          <RouterLink to="/production/event" className="middleLink">
            События
          </RouterLink>
          <RouterLink to="/production/tourconcert" className="middleLink">
            Концерты и туры
          </RouterLink>
        </div>
        <div className="middleOne box3">
          <RouterLink to="/technical/light" className="middleTitle">
            ТЕХНИЧЕСКИЕ УСЛУГИ
          </RouterLink>
          <div>
            <RouterLink
              to="/technical/light"
              className="middleLink"
              style={{ marginRight: "28px" }}
            >
              Свет
            </RouterLink>
            <RouterLink to="/technical/sound" className="middleLink">
              Видео
            </RouterLink>
          </div>
          <div>
            <RouterLink
              to="/technical/videopage"
              className="middleLink"
              style={{ marginRight: "28px" }}
            >
              Звук
            </RouterLink>
            <RouterLink to="/technical/stageclothes" className="middleLink">
              Одежда сцены
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterBottom = () => {
  const navigate = useNavigate();
  const goPlantShowSection = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("blogSection");
      if (section) {
        const sectionY =
          section.getBoundingClientRect().top + window.pageYOffset - 200;
        window.scrollTo({ top: sectionY, behavior: "smooth" });
      }
    }, 500);
  };
  return (
    <div className="footerTop">
      <div className="footerTopLeft footerContactWrap">
        <div
          style={{
            display: "grid",
            gap: "13px",
            color: `var(--secondaryWhiteColor)`,
          }}
        >
          <p className="x18 alignCenter" style={{ gap: "11px" }}>
            <img src={whiteMail} alt="icon" />
            <ToEmail email="pr@zavodshow.ru" />
          </p>
          <p className="x18 alignCenter" style={{ gap: "11px" }}>
            <img src={whitePhone} alt="icon" />
            <ToPhone phoneNumber="+7 495 720 12-82" />
          </p>
        </div>
      </div>
      <div className="footerTopRight">
        <p className="footerContact">
          Москва, г. Реутов, ул. Победы, 20
          <br />
          Пн-Сб:&nbsp;10-19 МСК
        </p>
        <div className="footerTopLeft1">
          <div
            style={{
              display: "grid",
              gap: "13px",
              color: `var(--secondaryWhiteColor)`,
            }}
          >
            <p className="x18 alignCenter" style={{ gap: "11px" }}>
              <img src={whiteMail} alt="icon" />
              info@zavodshow.ru
            </p>
            <p className="x18 alignCenter" style={{ gap: "11px" }}>
              <img src={whitePhone} alt="icon" />
              +7 906 065-28-33
            </p>
          </div>
        </div>
        <div className="footerBottomLink" style={{ marginBottom: "20px" }}>
          <span onClick={goPlantShowSection} className="footerSpacialLink">
            © ЗАВОД ШОУ
          </span>
          {/* <a className="footerSpacialLink" target="_blank" rel="noreferrer" href="https://linkedin.com">© ЗАВОД ШОУ</a> */}
          <RouterLink className="footerSpacialLink" to="/policy">
            Политика конфиденциальности
          </RouterLink>
          <a
            className="footerSpacialLink"
            target="_blank"
            rel="noreferrer"
            href="https://lard.digital"
          >
            Разработка сайта
          </a>
          <a
            className="footerSpacialLink"
            target="_blank"
            rel="noreferrer"
            href="https://drive.google.com/file/d/1GBdaQc7jWGSIvKF_bxRxT2gECSaikiZi/view"
          >
            СОУТ
          </a>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="wrapper" style={{ paddingTop: 0 }}>
      <div className="footerImg">
        <div className="footerWrapper">
          <FooterTop />
          <FooterMiddle />
          <hr />
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
