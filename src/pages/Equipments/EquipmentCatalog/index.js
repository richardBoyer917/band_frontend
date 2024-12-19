import { useEffect, useState } from "react";
import { HeroTopButton } from "../../../components/Buttons";
import { SearchInputBasic } from "../../../components/Inputs";
import DetailSection from "../../Cases/CaseCatalog/DetailSection";
import { getEquips } from "../../../api/equipAPI";
import useScrollToTop from "../../../hooks/useScrollToTop";

const EquipmentCatalog = ({ type, catalogInfo }) => {
  useScrollToTop();
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(equipments);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = equipments.filter(
      (item) =>
        item.type.toLowerCase().includes(value) ||
        item.name.toLowerCase().includes(value) ||
        item.series.toLowerCase().includes(value) ||
        item.brand.toLowerCase().includes(value)
      // item.cities.some((city) => city.toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    getEquips().then((data) => {
      data && setEquipments(data);
      setFilteredData(data);
    });
  }, []);
  return (
    <section className="wrapper">
      <div className="container">
        <div className="sectionWrapper section2">
          <div className="sectionHeader">
            <div className="alignCenter" style={{ gap: "27px" }}>
              <p
                className="x30"
                style={{ color: `var(--secondaryWhiteColor)` }}
              >
                Оборудование
              </p>
              <p className="x30" style={{ color: `#B0B0B0` }}>
                {equipments?.length}
              </p>
            </div>
            <SearchInputBasic
              onChange={handleSearch}
              placeholder={catalogInfo.placeholder}
            />
            <div className="flexWrap" style={{ marginTop: "20px" }}>
              {catalogInfo.buttonTitle?.map((title, index) => (
                <div
                  key={index}
                  style={{ marginTop: "5px", marginRight: "5px" }}
                >
                  <HeroTopButton title={title} />
                </div>
              ))}
            </div>
          </div>
          <DetailSection
            type={type}
            data={filteredData}
            fieldInfo={catalogInfo.selectBoxInfo}
            checkText={catalogInfo.checkText}
          />
        </div>
      </div>
    </section>
  );
};

export default EquipmentCatalog;
