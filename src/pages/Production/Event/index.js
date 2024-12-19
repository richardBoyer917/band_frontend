import EventWorks from "./EventWorks";
import useScrollToTop from "../../../hooks/useScrollToTop";
import HeroSample from "../../../components/HeroSample/HeroSample";
import GallerySection from "../../Home/GallerySection";
import WorkProcess from "../../Services/Visualization/WorkProcess";
import SwiperSection from "../../../components/Swiper/Swiper";
import PendingSection from "../../Home/PendingSection";
import ContactSection from "../../Home/ContactSection";
import BlogSection from "../../Home/BlogSection";
import { BigVideoBox } from "../../../components/Boxes";

import { workProcessInfo3, heroSectionInfo } from "../../../constant/group";
import { useEffect, useState } from "react";
import { getCasesByType } from "../../../api/caseAPI";
import { productionEvent } from "../../../assets";

const Event = () => {
  useScrollToTop();

  const [caseData, setCaseData] = useState({});
  useEffect(() => {
    getCasesByType("частное").then((data) => {
      data && setCaseData(data[0]);
    });
  }, []);
  useScrollToTop();

  return (
    <section className="wrapper events">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[3]} />
        <GallerySection title="Кейсы по событиям" galleryType="События" />
        <EventWorks />
        <WorkProcess
          arrowWidth="210px"
          title1="Cобытие"
          title2="Наш процесс работы"
          data={workProcessInfo3}
          fileName="event"
        />
      </div>
      <SwiperSection displayType="Концерты" />
      <div className="container">
        <PendingSection />
        <BigVideoBox
          item={{
            titleCenter: false,
            title: "Видео с мероприятия",
            src: `${caseData?.video || productionEvent}`,
            videoTitle: caseData?.venue,
            videoDescription: caseData?.name,
          }}
        />
        <ContactSection title="Рассчитать продакшн" />
        <BlogSection />
      </div>
    </section>
  );
};

export default Event;
