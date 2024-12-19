import WorkProcess from "./WorkProcess";
import HeroSample from "../../../components/HeroSample/HeroSample";
import SwiperSection from "../../../components/Swiper/Swiper";
import ExampleCase from "./ExampleCase";
import { heroSectionInfo, workProcessInfo } from "../../../constant/group";
import ContactSection from "../../Home/ContactSection";
import BlogSection from "../../Home/BlogSection";
import { Big3DBox } from "../../../components/Boxes";
import { stage3d } from "../../../assets";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "../../../styles/pages/services/visualization.css";
import samplePDF from '../../../assets/document/tour.pdf'

const Visualization = () => {
  useScrollToTop();
  return (
    <div className="wrapper visualization">
      <div className="container ">
        <HeroSample heroSectionInfo={heroSectionInfo[0]} />
        <Big3DBox
          item={{
            title: "Cцена",
            subTitle:
              "Смоделируем несколько вариантов оформления сцены и выберем наиболее подходящий под требования",
            src: stage3d,
          }}
        />
        <WorkProcess
          title1="3D-визуализация"
          title2="Наш процесс работы"
          data={workProcessInfo}
          fileName="document.pdf"
          url={samplePDF}
        />
        <ExampleCase />
      </div>
      <SwiperSection displayType="3Д" />
      <div className="container ">
        <ContactSection title="Заказать расчёт 3D" />
        <BlogSection />
      </div>
    </div>
  );
};

export default Visualization;
