import React from "react";
import { backChicha, bigFatUser, design } from "../../assets";
import { QuestionButton } from "../../components/Buttons";
const PlantHero = ({ team }) => {
  const questionSqareInfo = [
    {
      button: [
        "20 лет в индустрии",
        "4016 мероприятий с 2015 года",
        "85 городов в РФ и мире",
      ],
    },
    {
      button: ["350 частных мероприятий", "50 специалистов", "50 специалистов"],
    },
    {
      button: [
        "20 лет в индустрии",
        "4016 мероприятий с 2015 года",
        "85 городов в РФ и мире",
        "50 специалистов",
        "350 частных мероприятий",
      ],
    },
  ];

  const data = team && team[0];
  return (
    <section
      className="sectionWrapper"
      style={{ paddingTop: "clamp(5px, 3vw, 40px)" }}
    >
      <p className="sectionTitle" style={{ textAlign: "center" }}>
        Постоянное обучение и развитие{" "}
      </p>
      <div
        style={{
          backgroundImage: `url(${design})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "right",
        }}
      >
        <div className="container" style={{ paddingTop: "64px" }}>
          <div className="lampChichaSquare section1 ">
            <div className="chichaPlant1">
              <div className="questionButtonGroup">
                {questionSqareInfo[0].button.map((title, index) => (
                  <div
                    key={index}
                    style={{ marginRight: index === 1 ? "-20px" : undefined }}
                    className={`${index === 1 && "itemEnd"}`}
                  >
                    <QuestionButton
                      title={
                        data &&
                        data.competencies[index] &&
                        data.competencies[index]
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="chichaPlant">
              <div className="imgWrapper">
                <img className="lampChicha" src={backChicha} alt="bigChicha" />
                <img
                  className="lampChichaUser"
                  src={bigFatUser}
                  alt="bigFatUser"
                />
                <div className="imgBorder"></div>
              </div>
            </div>
            <div className="chichaPlant1">
              <div className="questionButtonGroup">
                {questionSqareInfo[1].button.map((title, index) => (
                  <div
                    key={index}
                    className={`${index === 1 ? "itemStart" : "itemEnd"}`}
                  >
                    <QuestionButton
                      title={
                        data &&
                        data.competencies[index + 3] &&
                        data.competencies[index + 3]
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className="showConceptsm">Алексей Седов</p>
            <p className="showConceptBasis">
              Основатель и генеральный продюсер
            </p>

            <div className="questionButtonGroup1">
              {questionSqareInfo[2].button.map((title, index) => (
                <div key={index} className="itemCenter">
                  <QuestionButton
                    title={
                      data &&
                      data.competencies[index] &&
                      data.competencies[index]
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantHero;
