import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoImgSwiper from "../../../components/VideoImgSwiper/VideoImgSwiper";
import { DefaultButton } from "../../../components/Buttons";
import { Navigation } from "swiper/modules";
import { leftArrow, rightArrow } from "../../../assets";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const EquipmentUsed = ({ cases, title }) => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const isMobileSwiper = useMediaQuery("(max-width: 1000px)");

  const addDatas = () => {
    setData(cases?.slice(0, data.length + 2));
  };

  const reduceDatas = () => {
    setData(cases?.slice(0, 2));
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width > 1000) {
      setData(cases);
    } else {
      setData(cases?.slice(0, 2));
    }
  }, [width, cases]);

  return (
    <section className="section2 sectionWrapper">
      <p className="sectionTitle sectionHeader">{title}</p>
      {!isMobileSwiper ? (
        <div
          className="videoImgSwiperWrapper flexWrapBetween"
          style={{ position: "relative" }}
        >
          <Swiper
            loop={true}
            slidesPerView={data?.length === 1 ? 1 : 2}
            spaceBetween={40}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // breakpoints={{
            //     320: {
            //         slidesPerView: 1,
            //         spaceBetween: 40,
            //     },
            //     1000: {
            //         slidesPerView: 2,
            //         spaceBetween: 40,
            //     },
            // }}
          >
            {data?.map((item, index) => (
              <SwiperSlide className="videoImgSwiper" key={index}>
                <VideoImgSwiper item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-prev">
            <img src={leftArrow} alt="leftArrow" />
          </div>
          <div className="custom-next">
            <img src={rightArrow} alt="rightArrow" />
          </div>
        </div>
      ) : (
        <div>
          <div
            className="videoImgSwiperWrapper flexWrapBetween"
            style={{ position: "relative" }}
          >
            {data?.map((item, index) => (
              <div className="videoImgSwiper" key={index}>
                <VideoImgSwiper item={item} />
              </div>
            ))}
          </div>
          <div className="itemCenter" style={{ marginTop: "50px" }}>
            {data?.length === cases?.length ? (
              <DefaultButton onClick={reduceDatas} title="скрыть больше" />
            ) : (
              <DefaultButton onClick={addDatas} title="cмотреть ещё" />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default EquipmentUsed;
