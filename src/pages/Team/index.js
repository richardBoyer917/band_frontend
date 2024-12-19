import { useEffect, useState } from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import MasterSection from "./MasterSection";
import PlantHero from "./PlantHero";
import PlantShowSection from "./PlantShowSection";
import { getTeam } from "../../api/teamAPI";
import { defaultLink } from "../../constant/defaultLink";
import "../../styles/pages/teamPage.css";

const TeamPage = () => {
  useScrollToTop();
  const [data, setData] = useState([]);

  useEffect(() => {
    getTeam().then((data) => {
      data && setData(data);
    });
  }, []);
  return (
    <section className="wrapper">
      <PlantHero team={data} />
      <div className="container">
        <PlantShowSection team={data[0]} />
        <MasterSection links={(data && data[0]?.links) || (defaultLink)} />
      </div>
    </section>
  );
};

export default TeamPage;
