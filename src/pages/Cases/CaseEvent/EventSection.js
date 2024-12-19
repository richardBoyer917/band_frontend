import { useState } from "react";
import {
  ChichaBoxRightCard,
  ChichaBoxVideoCard,
} from "../../../components/Cards";
import { WhiteBox } from "../../../components/WhiteBox/WhiteBox";

import { ArrowBlackButton } from "../../../components/Buttons";
import VideoPreview from "../../../components/Cards/UserCard/Preview/VideoPreview";

const EventSection = ({ dData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const onClick = (url) => {
    window.open(url, "_blank");
  };

  const content = (
    <section>
      <p
        className="sectionTitle"
        style={{ color: `var(--primaryBgColor)`, width: "90%" }}
      >
        3D-визуализация сцены мероприятия
      </p>
      <div
        className="flexWrapBetween"
        style={{ marginTop: "30px", gap: "clamp(30px, 3.5vw, 40px)" }}
      >
        <div>
          <ChichaBoxVideoCard
            width="clamp(240px, 46vw, 700px)"
            height="clamp(154px, 30vw, 410px)"
            video={`${dData?.video}`}
            onClick={handleOpen}
          />
          <p
            style={{
              marginTop: "clamp(14px, 3vw, 30px)",
              fontWeight: "500",
              fontSize: "clamp(10px, 3vw, 16px)",
            }}
          >
            Перед мероприятием провели 3D-визуализацию сцены{" "}
          </p>
        </div>
        <ChichaBoxRightCard
          content={
            <>
              {dData && (
                <div>
                  <div>
                    <p className="x24Font_2 overflowBreak">{dData.title1}</p>
                    <p className="x18Font_2 eventSectionText overflowBreak">
                      {dData.content1}
                    </p>
                  </div>
                  <div>
                    <p className="x24Font_2 overflowBreak">{dData.title2}</p>
                    <p className="x18Font_2 eventSectionText overflowBreak">
                      {dData.content2}
                    </p>
                  </div>
                </div>
              )}
              <div style={{ marginTop: "10px" }}>
                <ArrowBlackButton
                  onClick={() => onClick(dData?.links && dData.links)}
                  title="CДЕЛАТЬ РАСЧЁТ"
                />
              </div>
            </>
          }
          width="clamp(240px, 45vw, 401px)"
        />
      </div>
      <VideoPreview open={open} setOpen={setOpen} avatar={dData?.video} />
    </section>
  );

  return (
    <div className="">
      <WhiteBox content={content} />
    </div>
  );
};

export default EventSection;
