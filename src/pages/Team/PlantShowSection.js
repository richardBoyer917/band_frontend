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
        </div>
      </div>
    </div>
  );
};

export default PlantShowSection;
