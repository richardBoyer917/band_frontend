import { useState } from "react";
import { whitePlay } from "../../assets";
import { UserCardNumber } from "../Badges";
import { ArrowBlackButton, Banquet } from "../Buttons";
import VideoPreview from "../Cards/UserCard/Preview/VideoPreview";
import { useNavigate } from "react-router-dom";

const VideoImgSwiper = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleLink = (url) => {
    navigate(url);
  };
  return (
    <>
      <div className="swiperGapWidth">
        <div className="spaceBetween">
          <p className="x24Font_2">{item?.name}</p>
          <UserCardNumber value={item?.guests} />
        </div>
        <div>
          <Banquet title={item?.name} />
        </div>
        <div style={{ position: "relative" }}>
          <video
            style={{
              width: "100%",
              height: "clamp(213px, 15vw,266px)",
              borderRadius: "5px",
            }}
            src={`${item?.video}`}
          />
          <img
            src={whitePlay}
            onClick={handleOpen}
            alt="whitePlay"
            className="whiteMiddlePlayImg"
          />
        </div>
        <img
          src={`${item?.images?.length > 0 && item.images[0]}`}
          alt="swiperImg1"
          className="swiperImgBox"
          style={{
            width: "100%",
            height: "clamp(213px, 15vw,266px)",
            borderRadius: "5px",
          }}
        />
        <div>
          <ArrowBlackButton
            title="подробнее о кейсе"
            onClick={() => {
              handleLink(`/case-one/${item?.id}`);
            }}
          />
        </div>
      </div>
      <VideoPreview open={open} setOpen={setOpen} avatar={item?.video} />
    </>
  );
};

export default VideoImgSwiper;
