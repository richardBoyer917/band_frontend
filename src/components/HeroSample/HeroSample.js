import React from "react";
import {
  BlackButtonBorderWhite,
  DefaultButton,
  HeroTopButton,
  HeroTopWhiteButton,
  ScrollSpyButton,
  SmallHeroLinkButton,
} from "../Buttons";
import "../../styles/components/herosample.css";

const HeroSample = (props) => {
  const { heroSectionInfo } = props;

  return (
    <section>
      <div className="herotopBtn flexWrap section2">
        <HeroTopButton title={heroSectionInfo.heroTopButton} />
        {heroSectionInfo?.heroTopWhiteBtn?.map((title, index) => (
          <div key={index} className="heroWhiteTopbtn">
            <HeroTopWhiteButton title={title} />
          </div>
        ))}
      </div>

      <section
        className="sectionWrapper section2 heroBg"
        style={{ paddingTop: "clamp(30px, 4vw, 40px)" }}
      >
        <img src={heroSectionInfo.bgUrl} alt="bgUrl" />
        {heroSectionInfo.text ? (
          <div className="spaceEnd">
            <p className="heroTitle heroTitleWidth">
              {heroSectionInfo.title.split("&&").map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <div className="heroTextWidth">
              <p
                className="cardTitle"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                {heroSectionInfo.text[0]}
              </p>
              <p
                className="cardDescription"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                {heroSectionInfo.text[1]}
              </p>
            </div>
          </div>
        ) : (
          <p className="heroTitle">
            {heroSectionInfo.title.split("&&").map((text, index) => (
              <React.Fragment key={index}>
                {text}
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
        <div className="spaceBetween heroLinkWrap">
          {heroSectionInfo.flag === 1 ? (
            <div className="heroLinkLeft">
              <ScrollSpyButton
                to="contactSection"
                content={
                  <DefaultButton title={heroSectionInfo.defaultBtn.title} />
                }
              />
            </div>
          ) : (
            <div className="heroLinkLeft heroLinkLeft1">
              <ScrollSpyButton
                to="contactSection"
                content={
                  <DefaultButton title={heroSectionInfo.defaultBtn.title} />
                }
              />
              <a
                rel="noreferrer"
                target="_blank"
                href={heroSectionInfo.defaultDarkBtn.urlLink}
              >
                <BlackButtonBorderWhite
                  title={heroSectionInfo.defaultDarkBtn.title}
                />
              </a>
            </div>
          )}
          <div className="heroLinkRight chichaShow">
            {heroSectionInfo.heroLinkTitle.map((item, index) => (
              <div key={index} style={{ marginTop: "3px" }}>
                <SmallHeroLinkButton title={item.title} />
              </div>
            ))}
          </div>
          <div className="heroLinkRight chichaHidden">
            {heroSectionInfo.mobileHeroLinkTitle.map((item, index) => (
              <div key={index} style={{ marginTop: "3px" }}>
                <SmallHeroLinkButton title={item.title} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default HeroSample;
