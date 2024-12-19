import { positionIcon, userIcon, worldIcon } from "../../../assets";
import { CaseButton } from "../../../components/Buttons";
import { TitleGoBack } from "../../../components/Titles";

const TopSiteEventSection = ({ siteOne }) => {
  return (
    <section className="section1">
      <div className="caseTopSection">
        <TitleGoBack title="← ВСЕ ПЛОЩАДКИ" />
        <div className="flexWrap caseTopWrapper">
          <div className="caseTitleWrapper">
            <p className="caseTitle">{siteOne?.name}</p>
            <CaseButton title="Банкетный зал" />
          </div>
          <div className="caseTopItem spaceBetween">
            <div className="caseTopGap">
              <div
                className="x24Font_5"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                <img
                  style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                  alt="flagImg"
                  src={positionIcon}
                />
                {siteOne?.address}
              </div>
              <div className="spaceBetween">
                <div
                  className="x24Font_5"
                  style={{ color: "var(--secondaryWhiteColor)" }}
                >
                  <img
                    style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                    alt="flagImg"
                    src={worldIcon}
                  />
                  test.ru
                </div>
                <div
                  className="x24Font_5"
                  style={{ color: "var(--secondaryWhiteColor)" }}
                >
                  <img
                    style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                    alt="flagImg"
                    src={userIcon}
                  />
                  {siteOne?.capacity} гостей
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSiteEventSection;
