import { darkDownloadIcon } from "../../../assets";
import { DownloadButton1 } from "../../../components/Buttons";
import {
  BigEquipmentImageCard,
  EquipmentImageCaptionCard,
  SmallEquipmentImageCard,
} from "../../../components/Cards";
import { PDFText, TitleGoBack } from "../../../components/Titles";
import useScrollToTop from "../../../hooks/useScrollToTop";

import "../../../styles/pages/serie.css";
const EquipmentTopPage = ({ equipment }) => {
  useScrollToTop();
  return (
    <div className="section2">
      <div className="sectionWrapper caseTopSection">
        <TitleGoBack title="← ВСЁ ОБОРУДОВАНИЕ" />
        <div className="flexWrapBetween">
          <div className="equipmentGallery chichaShow">
            {equipment.images && equipment.images.length > 0 && (
              <>
                <BigEquipmentImageCard url={`${equipment.images[1]}`} />
                <BigEquipmentImageCard url={`${equipment.images[1]}`} />
              </>
            )}
            <div className="equipmentSmallImage" style={{ gap: "17px" }}>
              {equipment.images && equipment.images.length > 1 && (
                <SmallEquipmentImageCard url={`${equipment.images[1]}`} />
              )}
              {equipment.images && equipment.images.length > 2 && (
                <SmallEquipmentImageCard url={`${equipment.images[2]}`} />
              )}
            </div>
          </div>

          <div className="equipmentContent">
            <div>
              <p className="x30">{equipment?.name}</p>
              <p
                className="x14"
                style={{ marginTop: "10px", fontWeight: "100" }}
              >
                {equipment?.categoryType}
              </p>
            </div>
            <p className="x18Font_5">{equipment?.description}</p>
            <div className="equipmentGallery chichaHidden">
              {equipment.images && equipment.images.length > 0 && (
                <BigEquipmentImageCard url={`${equipment.images[1]}`} />
              )}
              <div className="equipmentSmallImage" style={{ gap: "17px" }}>
                {equipment.images && equipment.images.length > 1 && (
                  <SmallEquipmentImageCard url={`${equipment.images[1]}`} />
                )}
                {equipment.images && equipment.images.length > 2 && (
                  <SmallEquipmentImageCard url={`${equipment.images[2]}`} />
                )}
              </div>
            </div>
            <hr className="chichaShow" />
            <div
              className="flexWrap"
              style={{ gap: "clamp(20px, 3.5vw, 30px" }}
            >
              <EquipmentImageCaptionCard
                title="производитель"
                text={equipment?.manufacturer}
              />
              <EquipmentImageCaptionCard
                title="масса"
                text={`${equipment?.weight}кг`}
              />
              <EquipmentImageCaptionCard
                title="серия"
                text={equipment?.series}
              />
              <EquipmentImageCaptionCard
                title="гарантия"
                text={`${equipment?.dimension?.width} x ${equipment?.dimension?.height} x ${equipment?.dimension?.depth} MM`}
              />
            </div>
            <hr />
            <div
              className="alignCenter"
              style={{ gap: "clamp(16px, 2vw, 26px)" }}
            >
              <DownloadButton1
                icon={darkDownloadIcon}
                title="Скачать инструкцию"
              />
              <PDFText />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentTopPage;
