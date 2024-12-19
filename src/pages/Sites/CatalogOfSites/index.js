import { useEffect, useState } from "react";
import { HeroTopButton } from "../../../components/Buttons";
import { SearchInputBasic } from "../../../components/Inputs";
import DetailSection from "../../Cases/CaseCatalog/DetailSection";
import { getSite } from "../../../api/siteAPI";
import useScrollToTop from "../../../hooks/useScrollToTop";

const CatalogOfSites = ({ progress, type, catalogInfo }) => {
  useScrollToTop();
  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(sites);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = sites.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.cities.some((cities) => cities.toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    getSite().then((data) => {
      data && setSites(data);
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
                Площадки
              </p>
              <p className="x30" style={{ color: `#B0B0B0` }}>
                {sites?.length}
              </p>
            </div>
            <SearchInputBasic
              onChange={handleSearch}
              placeholder={catalogInfo.placeholder}
            />
            <div className="flexWrap" style={{ marginTop: "20px" }}>
              {catalogInfo.buttonTitle.map((title, index) => (
                <div
                  key={index}
                  style={{ marginTop: "5px", marginRight: "5px" }}
                >
                  <HeroTopButton key={index} title={title} />
                </div>
              ))}
            </div>
          </div>
          <DetailSection
            progress={progress}
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

export default CatalogOfSites;
