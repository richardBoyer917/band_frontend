import { caseSolutionChiCha } from "../../../assets";
import "../../../styles/pages/cases/caseEvent.css";

const CaseCards = ({ solution, feature }) => {
  return (
    <div className="container">
      <div className="section caseEvent1">
        <div style={{ display: "grid", gap: "clamp(20px,2vw,24px)" }}>
          <p className="x30">Особенность кейса</p>
          <p className="x20Font"> {feature}</p>
        </div>
        {solution?.length > 0 && (
          <div style={{ display: "grid", gap: "clamp(20px, 2vw, 24px)" }}>
            <p className="x30 caseChiCha">
              <img
                className="firstImage"
                src={caseSolutionChiCha}
                alt="CaseSolutionChiCha"
                style={{
                  width: "31px",
                  height: "39px",
                  paddingRight: "16.29px",
                }}
              />
              Решение кейса
              <img
                className="secondImage"
                src={caseSolutionChiCha}
                alt="CaseSolutionChiCha"
                style={{ width: "31px", height: "39px", paddingLeft: "13px" }}
              />
            </p>
            <div
              className="flexWrap"
              style={{ display: "grid", gap: "clamp(68px,7vw,85px)" }}
            >
              {solution?.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "grid", gap: "clamp(30px,3vw,40px)" }}
                >
                  <p className="x20Font">{item?.content}</p>
                  <div>
                    {
                      <div
                        className="flexWrap"
                        style={{
                          width: "100%",
                          gap: "clamp(10px,1.3vw,20px)",
                        }}
                      >
                        {item?.images.length > 0 &&
                          item?.images.map((item, idx) => (
                            <div
                              className=" caseCardImg"
                              key={idx}
                              style={{
                                width:
                                  index % 2 === 0
                                    ? idx % 4 === 0
                                      ? "39.3%"
                                      : idx % 4 === 1
                                      ? "58.7%"
                                      : idx % 4 === 2
                                      ? "58.7%"
                                      : "39.3%"
                                    : idx % 4 === 0
                                    ? "58.7%"
                                    : idx % 4 === 1
                                    ? "39.3%"
                                    : idx % 4 === 2
                                    ? "39.3%"
                                    : "58.7%",
                                display: "grid",
                                gap: "clamp(10px,1.3vw,20px)",
                                borderRadius: "10px",
                              }}
                            >
                              <img src={`${item.image}`} alt={idx} />
                              {item?.title && (
                                <p className="x18_3">{item.title}</p>
                              )}
                            </div>
                          ))}
                      </div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseCards;
