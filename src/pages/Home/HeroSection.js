import { useNavigate } from "react-router-dom";
import { chicha123, chicha94 } from "../../assets";
import {
  BoxRound,
  MiddleChichaRound,
  MiddleRound,
  SmallChichaRound,
  SmallRound,
} from "../../components/BoxRound";
import {
  BlackButton,
  DefaultButton,
  SmallTabButton,
  SmallTransButton,
} from "../../components/Buttons";
import { TwoChichas } from "../../components/Chichas";
import { menuItemsData } from "../../constant/group";
import { Link } from "react-scroll";
import { heroVideo2 } from "../../assets";
// heroVideo1

const HeroSection = () => {
  const navigate = useNavigate();
  const buttonGroupClassInfo = ["firstGroup", "secondGroup", "thirdGroup"];

  // const valuse = ['10', '20', '30', '40', '50', '60', '70', '80', '90']
  // valuse.map((value, index) => {
  //   const radians = (value * Math.PI) / 180;

  //   const sine = Math.sin(radians);  // Calculate sine
  //   const cosine = Math.cos(radians);

  //   let x = 100 - 100 * cosine
  //   let y = 100 * sine
  // })

  const handleLink = (url) => {
    navigate(url);
  };

  const handleNavigation = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="sectionWrapper" style={{ position: "relative" }}>
      <div className="heroSection">
        <div style={{position: "absolute", width: "100%"}}>
          <div className="section1 heroContent">
            <div className="chichaShow">
              {menuItemsData[1].submenu.map((item, index) => (
                <div
                  key={index}
                  className={`alignCenter ${buttonGroupClassInfo[index]}`}
                  style={{ gap: "5px" }}
                >
                  <SmallTransButton title={item.title} />
                  {item.submenu.map((menu, idx) => (
                    <SmallTabButton
                      onClick={() => handleLink(menu.url)}
                      key={idx}
                      title={menu.title}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p className="pageTitle" style={{ textAlign: "left" }}>
              Технический продакшн
            </p>
            <p className="pageTitle" style={{ textAlign: "right" }}>
              частных мероприятий
            </p>
            <div className="itemCenter">
              <div
                className="chichaHidden"
                style={{ gap: "4px", marginTop: "32px" }}
              >
                {menuItemsData[1].submenu.map((item, index) => (
                  <SmallTransButton
                    key={index}
                    title={index === 0 ? "ТЕХ. УСЛУГИ" : item.title}
                  />
                ))}
              </div>
            </div>
             <div className="flexWrap itemCenter heroBottomButton">
              <Link to="gallerySection" spy={true} smooth={true}>
                <DefaultButton title="КЕЙСЫ" />
              </Link>
              <BlackButton
                title="зАПОЛНИТЬ БРИФ"
                onClick={() =>
                  handleNavigation("https://forms.yandex.com/admin/")
                }
              />
            </div>
          </div>
        </div>
        <video src={heroVideo2} autoPlay muted loop className="heroVideo">
        </video>
      </div>
      <div>
        <div className="chichaHidden">
          <SmallChichaRound right={-1} bottom={-1} rotate={"90deg"} />
          <SmallChichaRound left={-1} bottom={-1} rotate={"180deg"} />
          <SmallRound right={-1} top={-1} />
          <SmallRound left={-1} top={-1} rotate={"-90deg"} />
        </div>

        <div className="chichaShow">
          <MiddleRound right={-1} top={-1} />
          <MiddleRound left={-1} top={-1} rotate="-90deg" />
          <MiddleChichaRound
            flag={true}
            right={-1}
            bottom={-5}
            rotate="90deg"
          />
          <div className="chichaIndex heroTwoChichas">
            <TwoChichas img1={chicha94} img2={chicha123} />
            <BoxRound left="0px" top="-49px" width="50px" />
            <BoxRound right="-47px" bottom="43px" width="50px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
