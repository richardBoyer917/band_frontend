import useScrollToTop from "../../hooks/useScrollToTop";
import ContactSection from "../Home/ContactSection";
import OpenStreetMap from "./OpenStreetMap";
import MemberSection from "./MemberSection";
import "../../styles/pages/teamOffice.css";

const TeamOffice = () => {
  useScrollToTop();
  return (
    <div className="wrapper">
      <div className="container">
        <div className="sectionWrapper">
          <div className="section2 flexWrap alignCenter">
            <MemberSection />
            <OpenStreetMap />
          </div>
        </div>
        <div className="sectionWrapper">
          <ContactSection title="Остались вопросы?" />
        </div>
      </div>
    </div>
  );
};

export default TeamOffice;
