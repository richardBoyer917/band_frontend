import { useParams } from "react-router-dom";
import EquipmentUsed from "../../Sites/SitePage/EquipmentUsed";
import ContactSection from "../../Home/ContactSection";
import EquipmentTopPage from "../EquipmentTopPage";
import { useEffect, useState } from "react";
import { getEquipById } from "../../../api/equipAPI";
import useScrollToTop from "../../../hooks/useScrollToTop";
const EquipmentPage = () => {
  useScrollToTop();
  const { equipId } = useParams();
  const [equipment, setEquipment] = useState({});

  useEffect(() => {
    getEquipById(equipId).then((data) => {
      data && setEquipment(data);
    });
  }, [equipId]);
  return (
    <section className="wrapper">
      <div className="container">
        <EquipmentTopPage equipment={equipment} />
        <EquipmentUsed
          title="Это оборудование использовалось"
          cases={equipment?.blogs}
        />
        <ContactSection title="Узнать об аренде оборудования" />
      </div>
    </section>
  );
};

export default EquipmentPage;
