import { getCasesWithCheckbox } from "../../../api/caseAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExampleCase = () => {
  const [caseExampleInfo, setCaseExampleInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCasesWithCheckbox("3D", 5)
      .then((data) => {
        if (data) {
          setCaseExampleInfo(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });
  }, []);

  const SmallMediaCard = ({ item }) => (
    <div>
      <video
        src={`${item?.video}`}
        onClick={() => {
          navigate(`/case-one/${item?.id}`);
        }}
      />
      <div>
        <p className="caseImgTitle">{item?.name}</p>
        <p className="caseImgText">{item?.venue}</p>
      </div>
    </div>
  );

  return (
    <section className="sectionWrapper section2">
      <div className="sectionHeader">
        <p className="sectionTitle" style={{ textAlign: "center" }}>
          Примеры кейсов с 3D-визуализацией
        </p>
      </div>
      <div className="flexWrapBetween" style={{ gap: "30px" }}>
        <div className="caseLeftSection itemCenter">
          <div>
            <video
              src={`${caseExampleInfo[0]?.video}`}
              onClick={() => {
                navigate(`/case-one/${caseExampleInfo[0]?.id}`);
              }}
            />
            <p className="caseImgTitle">{caseExampleInfo[0]?.name}</p>
            <p className="caseImgText">{caseExampleInfo[0]?.venue}</p>
          </div>
        </div>
        <div
          className="caseRightSection"
          style={{ display: "grid", gap: "26px" }}
        >
          <div className="spaceBetween" style={{ gap: "28px" }}>
            <SmallMediaCard item={caseExampleInfo[1]} />
            <SmallMediaCard item={caseExampleInfo[2]} />
          </div>
          <div className="spaceBetween" style={{ gap: "28px" }}>
            <SmallMediaCard item={caseExampleInfo[3]} />
            <SmallMediaCard item={caseExampleInfo[4]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleCase;
