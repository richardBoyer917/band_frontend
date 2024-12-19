import { useState } from "react";
import { Link } from "react-scroll";
import { ArrowDefaultButton } from "../../../components/Buttons";
import { coveringVideo } from "../../../assets";
import {
  ChichaBoxRightCard,
  ChichaBoxVideoCard,
} from "../../../components/Cards";
import VideoPreview from "../../../components/Cards/UserCard/Preview/VideoPreview";

const Covering = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <section className="section2 sectionWrapper">
      <div className="spaceBetween sectionHeader">
        <p className="sectionTitle">Покрытие для шоу</p>
        <Link to="contactSection" offset={-200} spy={true} smooth={true}>
          <div className="coveringBtn">
            <ArrowDefaultButton title="CДЕЛАТЬ РАСЧЁТ" />
          </div>
        </Link>
      </div>

      <div
        className="flexWrapBetween"
        style={{ marginTop: "30px", gap: "clamp(30px, 3.5vw, 40px)" }}
      >
        <ChichaBoxVideoCard video={coveringVideo} onClick={handleOpen} />
        <ChichaBoxRightCard
          content={
            <>
              <p
                className="cardTitle"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                Используем сценические покрытия от произволителей Grabo
                (Венгрия), RMG Polyvinyl India Limited (Индия), le mark group
                (Франция)
              </p>
              <p
                className="cardDescription coveringGap"
                style={{
                  color: "var(--secondaryWhiteColor)",
                  letterSpacing: "-0.03em",
                }}
              >
                Цвет черный с матовой поверхностью, толщиной от 1,2 до 2 мм.
                использвуется на профессиональных сценах для покрытия
                сценических площадок. Все покрытия армированы стекловолокном,
                что обеспечивает ровность при укладке и обеспечивает высокую
                плотность.
              </p>
              <p
                className="cardDescription"
                style={{
                  color: "var(--secondaryWhiteColor)",
                  letterSpacing: "-0.03em",
                }}
              >
                При монтаже используется балетный скотч для танцевального
                линолеума PRO-DANCE производства TUCHLER (Германия) Весь
                линолеум шириной 2 м. и длинной от 2 до 20.
              </p>
            </>
          }
        />
      </div>
      <VideoPreview open={open} setOpen={setOpen} avatar={coveringVideo} />
    </section>
  );
};

export default Covering;
