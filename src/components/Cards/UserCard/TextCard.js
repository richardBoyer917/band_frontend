import { useState } from "react";
// import { swiperGeer } from "../../../assets";
import TextPreview from "./Preview/TextPreview";

const TextCard = (props) => {
  const [open, setOpen] = useState(false);

  const { name, avatar, content } = props;

  const handleMore = () => {
    setOpen(true);
  };

  return (
    <>
      {/* <div className="textCard">
        <div className="textCardTop">
          <img src={avatar} alt="avatar" />
          <div className="cardBigTitle">{name}</div>
        </div>
        <div className="fade-text">{content}</div>
        <p className="cardDescription" onClick={handleMore}>
          Читать полный отзыв
        </p>
        <img className="swiperGeer" src={swiperGeer} alt="swiperGeer" />
      </div> */}
      <div className="alignCenter" style={{ height: "330px" }}>
        <div className="videoCard">
          <div className="videoActionArea">
            <img
              src={avatar}
              alt="avatar"
              className="circleVideo"
              style={{ cursor: "pointer" }}
              onClick={handleMore}
            />
            <p className="cardBigTitle">{name}</p>
            <button onClick={handleMore} className="cardDescription">
              Читать отзыв
            </button>
          </div>
        </div>
      </div>
      <TextPreview
        name={name}
        avatar={avatar}
        content={content}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default TextCard;
