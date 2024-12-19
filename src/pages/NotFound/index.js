import useScrollToTop from "../../hooks/useScrollToTop";
import "../../styles/pages/notFound.css";

const NotFound = () => {
  useScrollToTop();

  return (
    <div className="wrapper">
      <div className="sectionWrapper">
        <div className="container section1 notFound">
          <p className="x300">404</p>
          <div className="sectionTitle">
            Увы, но такой страницы больше нет :(
          </div>
          <button className="button defaultButton">на главную</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
