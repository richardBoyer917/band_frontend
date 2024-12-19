import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { leftArrow, rightArrow } from "../../../assets";
import CustomerModal from "../../../components/Modals";

export default function CaseEventSwiper({ images }) {
  const [open, setOpen] = useState(false);
  const [selImage, setSelImgae] = useState(null);

  const handleClick = (imgUrl) => {
    setOpen(true);
    setSelImgae(imgUrl);
  };

  return (
    <div style={{ position: "relative" }}>
      <Swiper
        slidesPerView={3}
        loop={true}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="EventSwiper"
      >
        {images?.map((item, index) => (
          <SwiperSlide key={index} className="swiperAuto">
            <img
              src={`${item}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(`${item}`)}
              alt={index}
              className="eventImg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-prev">
        <img src={leftArrow} alt="leftArrow" />
      </div>
      <div className="custom-next">
        <img src={rightArrow} alt="rightArrow" />
      </div>
      <CustomerModal
        open={open}
        setOpen={setOpen}
        content={
          <div className="absoluteCenter">
            <img src={selImage} alt="selImage" className="previewImage" />
          </div>
        }
      />
    </div>
  );
}
