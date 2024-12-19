import { Svideo5 } from "../../../assets";
import { BigVideoBox } from "../../../components/Boxes";
import HeroSample from "../../../components/HeroSample/HeroSample";
import SwiperSection from "../../../components/Swiper/Swiper";
import { equipmentsCardInfo, heroSectionInfo } from "../../../constant/group";
import BlogSection from "../../Home/BlogSection";
import ContactSection from "../../Home/ContactSection";
import GallerySection from "../../Home/GallerySection";
import EquipmentCard from "../Light/EquipmentCard";
// import EquipmentCategorySection from "../Light/EquipmentCategorySection";
import useScrollToTop from "../../../hooks/useScrollToTop";

const VideoPage = () => {
  useScrollToTop();

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[7]} />
        <GallerySection title="Наши кейсы по видео" galleryType="Видео" />
        <EquipmentCard data={equipmentsCardInfo.video} title="Видео" />
        <BigVideoBox
          item={{
            src: Svideo5,
            videoTitle: "Видео-драйв",
            videoDescription: "Фэндом-концерт Райна Гослинга",
          }}
        />
        {/* <EquipmentCategorySection type="видео" /> */}
      </div>
      <SwiperSection displayType="Технический" />
      <div className="container">
        <ContactSection title="Рассчитать видео" />
        <BlogSection />
      </div>
    </section>
  );
};

export default VideoPage;
