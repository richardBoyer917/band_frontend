import { useNavigate } from "react-router-dom";
import { UserCardNumber } from "../../../components/Badges";
import { ArrowDefaultButton, Banquet } from "../../../components/Buttons";

const CristalRoom = ({ site }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/site-one/${site.id}`);
  };

  return (
    <section className="section2">
      <div className="cristalRoomWrapper spaceBetween">
        <div className="cristalLeft">
          <video src={`${site?.video}`} />
        </div>
        <div className="cristalRight flexWrapBetween">
          <div className="cristalItem1">
            <div>
              <p className="eventTitle" style={{ marginBottom: "20px" }}>
                {site?.name}
              </p>
              <Banquet title="Банкетный зал" />
            </div>
            <div style={{ gap: "10px", display: "grid" }}>
              <UserCardNumber
                value={site?.capacity}
                text="Основная вместимость"
              />
              <UserCardNumber value="80" text="Фуршет" />
            </div>
          </div>
          <div className="cristalItem2">
            <ArrowDefaultButton
              onClick={() => handleClick()}
              title="подробнее о площадке"
            />
            <div style={{ width: "170px" }}>
              <p className="cristalItem2Text">{site?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CristalRoom;
