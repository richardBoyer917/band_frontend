import {
  dateIcon,
  flagIcon,
  lengthIcon,
  positionIcon,
  starIcon1,
  userIcon,
} from "../../../assets";
import { CaseButton } from "../../../components/Buttons";
import { TitleGoBack } from "../../../components/Titles";

const TopCaseEventSection = ({ caseOne }) => {
  const day = caseOne?.startDate?.split(" ")[0];
  return (
    <section className="section1" style={{ paddingTop: "30px" }}>
      <div className="caseTopSection">
        <TitleGoBack title="← ВСЕ КЕЙСЫ" />
        <div className="flexWrapBetween caseTopWrapper">
          <div className="caseTitleWrapper">
            <p className="caseTitle">{caseOne?.name}</p>
            <CaseButton title={caseOne?.blog_type?.[0] || ""} />
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
                  src={
                    caseOne?.blog_type?.[0] === "тур" ? positionIcon : flagIcon
                  }
                />
                {caseOne.blog_type?.[0] === "тур"
                  ? `${caseOne?.cities?.length} городов`
                  : caseOne?.cities?.[0]}
              </div>
              <div
                className="x24Font_5"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                <img
                  style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                  alt="positionImg"
                  src={
                    caseOne?.blog_type?.[0] === "тур" ? starIcon1 : positionIcon
                  }
                />
                {caseOne?.venue}
              </div>
            </div>
            <div className="caseTopGap">
              <div
                className="x24Font_5"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                <img
                  style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                  alt="dateIcon"
                  src={dateIcon}
                />
                {caseOne?.blog_type?.[0] === "тур"
                  ? `${day}-${caseOne?.endDate}`
                  : caseOne?.startDate}
              </div>
              <div
                className="x24Font_5"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                <img
                  style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                  alt="userIcon"
                  src={
                    caseOne?.blog_type?.[0] === "тур" ? lengthIcon : userIcon
                  }
                />{" "}
                {caseOne.blog_type?.[0] === "тур"
                  ? `${caseOne?.guests}KM`
                  : caseOne?.guests}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCaseEventSection;
