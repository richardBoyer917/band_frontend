import React, { useState } from "react";
import {
  BigArrowBlackButton,
  BlackButton,
  EventTagButton,
  LinkButton,
} from "../Buttons";
import { CardBadge, CardViewNumber, CaseCatalogCardBadge } from "../Badges";
import VideoPreview from "./UserCard/Preview/VideoPreview";
import {
  coveringPlay,
  greyDocument,
  greyDownload,
  whitePlay,
  starIcon1,
  positionIcon,
  // redTrash,
  // greyPencil,
  // greyArrow,
  // moveUp,
  // moveDown,
} from "../../assets";
import "../../styles/components/cards/card.css";
import endpoint from "../../config/config";
import { useNavigate } from "react-router-dom";
import { handleDownload } from "../../constant/defaultLink";

const PendingCard = ({ item }) => {
  const navigate = useNavigate();
  const handleLink = (url) => {
    navigate(url);
  };
  return (
    <div className="pendingCard">
      <img src={item.img} alt="pendingImage" />
      <div className="pendingCardContent">
        <div>
          <p className="cardBigTitle" style={{ paddingTop: "4px" }}>
            {item.title}
          </p>
          <p className="cardDescription" style={{ maxWidth: "355px" }}>
            {item.description}
          </p>
        </div>
        <BlackButton title="ПОДРОБНЕЕ" onClick={() => handleLink(item?.url)} />
      </div>
    </div>
  );
};

const PublicationCard = ({ item }) => {
  const navigate = useNavigate();
  const handleLink = () => {
    navigate(`site-one/${item.id}`);
  };

  return (
    <div className="publicationCard">
      <div style={{ position: "relative" }}>
        <video src={`${item.video}`} alt="publicationImage" />
        <CardViewNumber value={item.capacity} />
      </div>
      <div
        className="spaceBetween"
        style={{ padding: "clamp(20px, 4vw, 25px) 0 clamp(8px, 2vw, 12px) 0" }}
      >
        <p className="cardTitle">{item.name}</p>
        <div
          className="alignCenter flexWrap itemEnd"
          style={{ float: "right" }}
        >
          <CardBadge title="Ресторан" />
          <CardBadge title="Ещё 6" />
        </div>
      </div>
      <p style={{ paddingBottom: "clamp(20px, 4vw, 25px)" }}>{item.address}</p>
      <BlackButton onClick={() => handleLink()} title="ПОДРОБНЕЕ" />
    </div>
  );
};

const TextBlogCard = ({ item }) => (
  <div className="blogCard textBlogCard">
    <img className="textBlogCardImg" src={item.url} alt="textBlog" />
    <p>{item.content}</p>
    <p className="textBlogCardNumber">{item.viewNumber} подписчик</p>
    <div>
      <a
        href="https://t.me/zavodshow"
        rel="noreferrer"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <BigArrowBlackButton title="ЧИТАТЬ В ТЕЛЕГРАМ" />
      </a>
    </div>
  </div>
);

const VideoBlogCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="blogCard videoBlogCard">
        <p>{item.title}</p>
        <div style={{ position: "relative" }}>
          <video
            style={{
              width: "100%",
              height: "clamp(168px, 15vw,201px)",
              borderRadius: "5px",
            }}
          >
            <source src={`${item.video}`} type="video/mp4" />
          </video>
          <img
            src={whitePlay}
            onClick={handleOpen}
            alt="whitePlay"
            className="whitePlayImg"
          />
        </div>
        <p className="videoBlogCardDescription">{item.description}</p>
        <div>
          <a
            href={item?.links}
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none", color: `var(--primaryBgColor)` }}
          >
            <LinkButton title="ЧИТАТЬ ПОСТ" />
          </a>
        </div>
      </div>
      <VideoPreview open={open} setOpen={setOpen} avatar={`${item.video}`} />
    </>
  );
};

const EventWorksCard = ({ item, handleMoveToCase }) => (
  <div className="eventWorksCard">
    <img src={item.img} style={{cursor: "pointer"}} onClick={handleMoveToCase} alt="eventWorksImage" />
    <p className="eventTitle" onClick={handleMoveToCase} style={{ padding: "clamp(20px, 2vw, 24px) 0", cursor: "pointer" }}>
      {item.title}
    </p>
    <div className="itemCenter" style={{ gap: "5px" }}>
      {item.tags.map((title, index) => (
        <EventTagButton handleMoveToCase={handleMoveToCase} key={index} title={title} />
      ))}
    </div>
  </div>
);

const RentalCostCard = ({ cost }) => (
  <div className="rentalBox">
    <p className="sectionTitle" style={{ color: "var(--primaryBgColor)" }}>
      от {cost?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб
    </p>
    <p className="rentalSmallText">за один репетиционный час</p>
  </div>
);

const RentalCostDocCard = ({ item, docFile }) => {
  return (
    <div className="rentalCostDocCard">
      <img src={greyDocument} alt="greyDocument" />
      <p className="docuText">{item.text}</p>
      <div
        className="alignCenter"
        style={{ cursor: "pointer" }}
        onClick={() => handleDownload("")}
      >
        <img src={greyDownload} alt="greyDownload" />
        <p className="docuSizeText">&nbsp;&nbsp;{item.size}</p>
      </div>
    </div>
  );
};

const ChichaBoxVideoCard = ({ video, width, height, onClick }) => (
  <div className="auditoriumLeft" style={{ width: width, height: height }}>
    <video
      className="auditoriumLeft"
      style={{ width: "100%", height: height }}
      src={video}
    />
    <img
      src={coveringPlay}
      alt="coveringPlay"
      className="absoluteCenter coveringPlay"
      onClick={onClick}
    />
  </div>
);

const ChichaBoxRightCard = ({ content, width, height }) => (
  <div
    className="auditoriumRight alignCenter"
    style={{ width: width, height: height }}
  >
    <div style={{ width: "100%" }}>{content}</div>
  </div>
);

const CaseCatalogCard = ({ type, item, onClick }) => {

  return (
    <div className="caseCatalogCard">
      {type !== "equipment" ? (
        <video
          src={
            type === "case"
              ? `${item?.video}`
              : type === "platform"
              ? `${item?.video}`
              : ""
          }
          style={{ width: "100%", height: "175px", objectFit: "cover" }}
          onClick={onClick}
        />
      ) : (
        <div
          className="itemCenter"
          style={{
            width: "100%",
            height: "175px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          <img
            src={`${item?.images.length > 0 && item.images[0]}`}
            style={{ maxWidth: "100%", maxHeight: "175px", objectFit: "cover" }}
            onClick={onClick}
            alt="img"
          />
        </div>
      )}
      {type === "case" ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 3,
              textAlign: "right",
            }}
          >
            {<CaseCatalogCardBadge label={item?.startDate} />} <br />
            {
              <CaseCatalogCardBadge
                label={
                  item?.type === "тур"
                    ? `${item?.cities.length} городов`
                    : item?.cities.length > 0 && item.cities[0]
                }
              />
            }
          </div>
          <div className="caseCatalogParagraph alignCenter flexWrapBetween">
            <p className="x16" style={{ color: "white" }}>
              {item?.name}
            </p>
            <p className="x14" style={{ color: "#B5B5B5" }}>
              {item?.blog_type}
            </p>
          </div>
          <div
            className="x12 alignCenter"
            style={{ color: "white", gap: "5px" }}
          >
            <img
              src={item?.type === "тур" ? starIcon1 : positionIcon}
              alt="caseCatalogIcon"
            />
            {item.venue && <p>{item.venue}</p>}
          </div>
        </div>
      ) : type === "platform" ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 3,
              textAlign: "right",
            }}
          >
            <CaseCatalogCardBadge type={type} label={item?.capacity} />
          </div>
          <div className="caseCatalogParagraph alignCenter flexWrapBetween">
            <p className="x16" style={{ color: "white" }}>
              {item?.name}
            </p>
            <p className="x14" style={{ color: "#B5B5B5" }}>
              {item?.site_type[0]}
            </p>
          </div>
          <div
            className="x12 alignCenter"
            style={{ color: "white", gap: "5px" }}
          >
            <img src={positionIcon} alt="caseCatalogIcon" />
            <p>{item?.address}</p>
          </div>
        </div>
      ) : type === "equipment" ? (
        <div>
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 3,
              textAlign: "right",
            }}
          >
            <CaseCatalogCardBadge type="equipment" label={item?.brand} />
          </div>
          <div className="caseCatalogParagraph alignCenter flexWrapBetween">
            <p className="x16" style={{ color: "white" }}>
              {item?.name}
            </p>
            <p className="x14" style={{ color: "#B5B5B5" }}>
              {item?.equipment_type}
            </p>
          </div>
          <div
            className="x12 alignCenter"
            style={{ color: "white", gap: "5px" }}
          >
            <p>{item?.categoryType}</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const BigEquipmentImageCard = ({ url }) => (
  <div className="bigEquipmentImageWrappper itemCenter">
    <img src={url} alt="cameraImg1" />
  </div>
);

const SmallEquipmentImageCard = ({ url }) => (
  <div className="smallEquipmentImageWrappper itemCenter">
    <img src={url} alt="smailCameraImg1" />
  </div>
);

const EquipmentImageCaptionCard = ({ title, text }) => (
  <div style={{ width: "40%" }}>
    <p className="x16Font_4" style={{ marginBottom: "10px" }}>
      {title}
    </p>
    <p className="x18Font_4 ">{text}</p>
  </div>
);

const AdminPermissionCard = ({ content }) => (
  <div className="adminPermissionCard">
    <p>Доступно:</p>
    {content}
  </div>
);

export {
  PendingCard,
  PublicationCard,
  TextBlogCard,
  VideoBlogCard,
  EventWorksCard,
  RentalCostCard,
  RentalCostDocCard,
  ChichaBoxVideoCard,
  ChichaBoxRightCard,
  CaseCatalogCard,
  BigEquipmentImageCard,
  SmallEquipmentImageCard,
  EquipmentImageCaptionCard,
  AdminPermissionCard,
};
