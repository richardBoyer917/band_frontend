import { useEffect, useState } from "react";
import { BigVideoBox } from "../../../components/Boxes";
import HeroSample from "../../../components/HeroSample/HeroSample";
import SwiperSection from "../../../components/Swiper/Swiper";
import { heroSectionInfo, workProcessInfo4 } from "../../../constant/group";
import BlogSection from "../../Home/BlogSection";
import ContactSection from "../../Home/ContactSection";
import GallerySection from "../../Home/GallerySection";
import PendingSection from "../../Home/PendingSection";
import WorkProcess from "../../Services/Visualization/WorkProcess";
import { getCasesByType } from "../../../api/caseAPI";
import useScrollToTop from "../../../hooks/useScrollToTop";
// import { ProductionConcert } from "../../../assets";

const TourConcert = () => {
  useScrollToTop();
  const [caseData, setCaseData] = useState({});
  useEffect(() => {
    getCasesByType("тур").then((data) => {
      data && setCaseData(data[0]);
    });
  }, []);
  return (
    <section className="wrapper tourConcert">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[4]} />
        <GallerySection title="Кейсы по турам" galleryType="Туры" />
        <WorkProcess
          arrowWidth="210px"
          title1="Тур"
          title2="Наш процесс работы"
          data={workProcessInfo4}
          fileName="tour"
        />
        <BigVideoBox
          item={{
            titleCenter: false,
            title: "Видео из тура",
            src: "http://38.60.163.234:8000/storage/uploads/ProductionConcert.mp4",
            videoTitle: caseData?.venue,
            videoDescription: caseData?.name,
          }}
        />
      </div>
      <SwiperSection displayType="Концерты" />
      <div className="container">
        <PendingSection />
        <ContactSection title="Рассчитать концерт/тур" />
        <BlogSection />
      </div>
    </section>
  );
};

export default TourConcert;
