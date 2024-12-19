import { useState } from "react";
import { ChichaBox } from "../../../components/ChichaBox";
import { slidingVideo } from "../../../assets";
import { BlackButton } from "../../../components/Buttons";
import {
  ChichaBoxRightCard,
  ChichaBoxVideoCard,
} from "../../../components/Cards";
import { DetailDataInput } from "../../../components/Inputs";
import { Link } from "react-scroll";
import VideoPreview from "../../../components/Cards/UserCard/Preview/VideoPreview";

const SlidingCurtain = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const slidingInfo = [
    {
      text: "Ширина",
      number: "12 метров",
    },
    {
      text: "Длина",
      number: "X метров",
    },
    {
      text: "Вес ткани",
      number: "YY кг",
    },
    {
      text: "Нагрузка ",
      number: "до 750 кг",
    },
    {
      text: "Раздвижной занавес до 12 метров",
      number: "",
    },
  ];
  const content = (
    <section>
      <p
        className="sectionTitle"
        style={{
          color: `var(--primaryBgColor)`,
          width: "90%",
          marginBottom: "40px",
        }}
      >
        Раздвижной занавес
      </p>

      <div
        className="flexWrapBetween"
        style={{ marginTop: "30px", gap: "clamp(30px, 3.5vw, 40px)" }}
      >
        <ChichaBoxVideoCard video={slidingVideo} onClick={handleOpen} />
        <ChichaBoxRightCard
          content={
            <>
              {slidingInfo.map((item, index) => (
                <DetailDataInput key={index} item={item} index={index} />
              ))}
              <Link to="contactSection" offset={-200} spy={true} smooth={true}>
                <div style={{ marginTop: "clamp(10px, 20vw, 40px)" }}>
                  <BlackButton title="CДЕЛАТЬ РАСЧЁТ" />
                </div>
              </Link>
            </>
          }
        />
      </div>
      <VideoPreview open={open} setOpen={setOpen} avatar={slidingVideo} />
    </section>
  );

  return <ChichaBox content={content} />;
};

export default SlidingCurtain;
