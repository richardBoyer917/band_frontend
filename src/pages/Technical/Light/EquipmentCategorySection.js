import { useEffect, useState } from "react";
import { ArrowDefaultButton, Banquet } from "../../../components/Buttons";
import { getEquipsByType } from "../../../api/equipAPI";
import { useNavigate } from "react-router-dom";

const EquipmentCategorySection = ({ type }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getEquipsByType(type).then((data) => {
      data && setData(data);
    });
  }, [type]);
  const handleLink = (url) => {
    navigate(url);
  };
  return (
    <div className="sectionWrapper section2">
      <div className="sectionHeader flexWrapBetween alignCenter">
        <p className="sectionTitle">Используем в работе</p>
        <div className="chichaShow">
          <ArrowDefaultButton
            title="ВСЕ ОБОРУДОВАНИЕ ДЛЯ СВЕТА"
            onClick={() => {
              handleLink("/equipment");
            }}
          />
        </div>
      </div>
      <div className="flexWrapAround" style={{ gap: "40px" }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="equipmentCard"
            style={{ position: "relative" }}
          >
            <div className="itemCenter">
              <img
                src={`${item.images[0]}`}
                alt="eventWorksImage"
                onClick={() => handleLink(`/equipment-one/${item.id}`)}
              />
            </div>
            <p
              className="x18"
              style={{ color: "white", padding: "24px 0 12px 0" }}
            >
              {item.name}
            </p>
            <p
              className="x14_3"
              style={{
                color: "#838383",
                height: "35px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item.categoryType}
            </p>
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <Banquet title={item.categoryType} />
            </div>
          </div>
        ))}
      </div>
      <div className="itemCenter chichaHidden" style={{ marginTop: "40px" }}>
        <ArrowDefaultButton title="ВСЕ ОБОРУДОВАНИЕ ДЛЯ СВЕТА" />
      </div>
    </div>
  );
};

export default EquipmentCategorySection;
