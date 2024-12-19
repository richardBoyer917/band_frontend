import { useState } from "react";
import { darkPlay } from "../../../assets";
import VideoPreview from "./Preview/VideoPreview";
import "../../../styles/components/cards/swiperCard.css";

const VideoCard = (props) => {
  const { name, avatar } = props;

  const [open, setOpen] = useState(false);

  const handlePlay = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="alignCenter" style={{ height: "330px" }}>
        <div className="videoCard">
          <div className="videoActionArea">
            <div className="circleVideoWrap">
              <div className="circleVideo">
                <video>
                  <source src={avatar} type="video/mp4" />
                </video>
              </div>
              <div className="videoPlayIcon itemCenter" onClick={handlePlay}>
                <img
                  src={darkPlay}
                  style={{ paddingLeft: "3px" }}
                  alt="darkPlay"
                />
              </div>
            </div>
            <p className="cardBigTitle">{name}</p>
            <button onClick={handlePlay} className="cardDescription">
              Читать отзыв
            </button>
          </div>
        </div>
      </div>
      <VideoPreview name={name} avatar={avatar} open={open} setOpen={setOpen} />
    </>
  );
};

export default VideoCard;
