import { BlackButton } from "../../../components/Buttons";
import { gradiantBgInfo } from "../../../constant/group";
import { Link } from "react-scroll";

const EquipmentCard = ({ data, title }) => {
  return (
    <div className="sectionWrapper pendingSquare section1">
      <div className="flexWrapBetween alignCenter">
        <p className="sectionTitle">{title}</p>
        <p
          className="sectionTitle"
          style={{ color: `var(--secondaryWhiteHover)` }}
        >
          Этапы работы
        </p>
        <div className="chichaShow">
          <Link to="contactSection" offset={-200} spy={true} smooth={true}>
            <BlackButton title="заказать консультацию" />
          </Link>
        </div>
      </div>
      <hr
        style={{
          borderColor: "#CFCFCF",
          width: "100%",
          margin: "clamp(20px, 3vw, 40px) 0",
        }}
      />
      <div className="flexWrapAround" style={{ gap: "10px" }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="creationItem"
            style={{
              background: gradiantBgInfo[index],
              marginLeft: index === 0 && 0,
            }}
          >
            <p className="creationTitle">{item.title}</p>
            {item.content.map((text, idx) => (
              <p key={idx} className="creationSmallText">
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentCard;
