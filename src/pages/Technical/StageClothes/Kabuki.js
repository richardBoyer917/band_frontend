import { useState } from "react";
import {
  kabukiImg1,
  kabukiImg2,
  kabukiImg3,
  kabukiImg4,
  kabukiVideo,
} from "../../../assets";
import { ArrowDefaultButton } from "../../../components/Buttons";
import { kabukiInfo } from "../../../constant/group";
import { ChichaBoxVideoCard } from "../../../components/Cards";
import { DetailDataInput } from "../../../components/Inputs";
import { Link } from "react-scroll";
import VideoPreview from "../../../components/Cards/UserCard/Preview/VideoPreview";

const kabukiImgInfo = [kabukiImg1, kabukiImg2, kabukiImg3, kabukiImg4];

const kabukiText = [
  "— Пульт с двухшаговой системой сброса, защищающей от случайного «отстрела»,",
  "— DMX вход для управления устройствами сброса с помощью внешнего DMX сигнала, в том числе — для «веерного» сброса занавеса,",
  "— Кабель электропитания с 240-вольтной вилкой Schuko,",
  "— Светодиодный индикатор питания и компактных модулей состоящих из магнитных замков, которые крепятся на ферму.",
];

const Kabuki = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const KabukiHeader = () => (
    <div className="spaceBetween sectionHeader">
      <p className="sectionTitle">Кабуки</p>
      <Link to="contactSection" offset={-200} spy={true} smooth={true}>
        <div className="coveringBtn">
          <ArrowDefaultButton title="CДЕЛАТЬ РАСЧЁТ" />
        </div>
      </Link>
    </div>
  );

  const KabukiList = () => (
    <div className="kabukiList">
      <p className="x16">Один элемент кабуки выдерживает вес:</p>
      <div
        className="flexWrapBetween auditoriumContentCard"
        style={{ paddingTop: 0 }}
      >
        {kabukiInfo.topText.map((item, index) => (
          <div key={index}>
            <p className="x14" style={{ marginBottom: "8px" }}>
              {item.text}
            </p>
            <p className="x18">{item.number}</p>
          </div>
        ))}
      </div>
      <p className="x16">Технические характеристики элемента:</p>
      <div>
        {kabukiInfo.bottomText.map((item, index) => (
          <DetailDataInput key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );

  const KabukiImgList = () => (
    <div
      className="flexWrapBetween"
      style={{ gap: "clamp(10px, 1.5vw, 20px)" }}
    >
      {kabukiImgInfo.map((item, index) => (
        <img alt="kabukiImg" className="kabukiImg" key={index} src={item} />
      ))}
    </div>
  );

  const KabukiBottom = () => (
    <div className="kabukiBottom">
      <div className="kabukiBottomLeft">
        <p className="cardTitle">
          Кабуки — это система моментального сброса занавеса для внезапной смены
          фона сцены на различных шоу или выставках
        </p>
        <p className="cardDescription" style={{ marginTop: "15px" }}>
          Можно сделать управляемый и безопасный сброс мягких декораций,
          воздушных шариков, игрушек, задников, занавесов, флагов, баннеров,
          бесшовных сеток и проекционных экранов
        </p>
      </div>
      <div className="kabukiBottomRight">
        <p className="cardTitle">В комплекте системы:</p>
        {kabukiText.map((item, index) => (
          <p
            className="auditoriumTextSize"
            key={index}
            style={{ lineHeight: "clamp(15.06px, 2vw, 22.2px)" }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
  return (
    <section className="section2 sectionWrapper">
      <div>
        <KabukiHeader />
        <div className="kabukiBody">
          <div className="flexWrapBetween" style={{ gap: "20px" }}>
            <ChichaBoxVideoCard
              video={kabukiVideo}
              width="clamp(300px, 40vw, 640px)"
              height="clamp(210px, 40vw, 544px)"
              onClick={handleOpen}
            />
            <KabukiList />
          </div>
          <KabukiImgList />
          <KabukiBottom />
        </div>
      </div>
      <VideoPreview open={open} setOpen={setOpen} avatar={kabukiVideo} />
    </section>
  );
};

export default Kabuki;
