import useScrollToTop from "../../hooks/useScrollToTop";
import "../../styles/pages/notFound.css";

const OurMerch = () => {
    useScrollToTop();

    return (
        <div className="wrapper">
          <div className="sectionWrapper">
            <div className="container section1 notFound">
              <div className="sectionTitle">
                в разработке
              </div>
            </div>
          </div>
        </div>
      );
}

export default OurMerch;
