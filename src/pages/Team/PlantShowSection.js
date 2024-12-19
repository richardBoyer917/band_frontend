import { useEffect, useState } from "react";
import { plantShowInfo } from "../../constant/group";

const PlantShowSection = ({ team }) => {
  const [data, setData] = useState(plantShowInfo);

  useEffect(() => {
    const updatedData = plantShowInfo.map((item, index) => {
      return {
        ...item,
        content: team && team[`tag${index + 1}`],
      };
    });
    setData(updatedData);
  }, [team]);
  return (
    <div className="sectionWrapper">
      <div className="section2">
        <div className="sectionHeader">
          <p className="pageTitle" style={{ textAlign: " center" }}>
            ЗАВОД ШОУ - это ценности
          </p>
        </div>
        <div className="plantShowTopics flexWrapAround">
          {["", "", "", ""].map((_, index) => (
            <div
              key={index}
              className="plantTopicsItem"
              style={{ gap: "clamp(50px, 6vw, 72px)" }}
            >
              <div className="plantTopicsItem">
                <p className="x24Font_1">{data[index]?.topic}</p>
                <p className="x18Font_4">{data[index]?.content}</p>
              </div>
              <div className="plantTopicsItem">
                <p className="x24Font_1">{data[index + 4]?.topic}</p>
                <p className="x18Font_4">{data[index + 4]?.content}</p>
              </div>
            </div>
          ))}
          {/* <div>
            <div
              className="plantTopicsItem"
              style={{ width: "70%", float: "left" }}
            >
              <p className="x24Font_1">#Патриотизм</p>
              <p className="x18Font_4">
                Мы гордимся нашей страной и всегда стараемся помогать -
                обеспечивать концерты для наших героям, поддерживать русскую
                культуру. Именно поэтому мы создали свой благотворительный
                проект по восстановлению Храма всех Святых -{" "}
                <a
                  href="https://xn--80adkstanfhkcs0b.xn--p1ai/page53391439.html"
                  target="_blank"
                  rel="noreferrer"
                  className="teamLink"
                >
                  праздник «Суворочка»
                </a>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PlantShowSection;
