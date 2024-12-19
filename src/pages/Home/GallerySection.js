import { useState, useEffect, useRef } from "react";
import { gallery } from "../../constant/group";
import { ArrowDefaultButton } from "../../components/Buttons";
import { getCasesWithTags } from "../../api/caseAPI";
import { useNavigate } from "react-router-dom";

const GallerySection = ({ title, galleryType }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [galleryInfo, setGalleryInfo] = useState(gallery);
  const navigate = useNavigate();

  const [isShrunk, setIsShrunk] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > galleryRef.current.clientHeight) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getCasesWithTags(galleryType, 9)
      .then((data) => {
        const updatedGalleryInfo = data.map((item, index) => ({
          ...item,
          width: gallery[index]?.width || "",
          top: gallery[index]?.top || "",
        }));
        setGalleryInfo(updatedGalleryInfo);
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });
  }, [galleryType]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLink = (url) => {
    navigate(url);
  };

  return (
    <div
      id="gallerySection"
      className="galleryWrapper sectionWrapper"
      ref={galleryRef}
    >
      <div className="section2">
        <p
          className="sectionHeader sectionTitle"
          style={{
            textAlign: "center",
            position: !isShrunk ? "sticky" : "static",
            top: "clamp(100px, 15vw, 200px)",
          }}
        >
          {title}
        </p>
        {screenSize >= 1332 ? (
          <>
            <div className="gallery galleryMain">
              {galleryInfo.map((image, index) => (
                <div key={index} style={{ width: `${image.width}px` }}>
                  <video
                    src={`${image.video}`}
                    alt={image.name}
                    style={{
                      marginTop: `${image.top}px`,
                      width: "100%",
                      height: "auto",
                    }}
                    onClick={() => {
                      navigate(`/case-one/${image?.id}`);
                    }}
                  />
                  <p className="x16">{image.name}</p>
                  <p className="x12">{image.venue}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "100px" }}>
              <ArrowDefaultButton
                title="ВСЕ КЕЙСЫ ЗАВОД ШОУ"
                onClick={() => handleLink("/cases")}
              />
            </div>
          </>
        ) : (
          <div className="gallery  smallgalleryMain">
            <div className="smallgallery">
              <div>
                <video
                  src={`${galleryInfo[0]?.video}`}
                  onClick={() => {
                    navigate(`/case-one/${galleryInfo[0]?.id}`);
                  }}
                  alt="smallgallery1"
                  style={{ width: `clamp(158px, 40vw, 463px)`, height: "100%" }}
                />
              </div>
              <div style={{ paddingTop: `clamp(27px,10vw,115px)` }}>
                <video
                  src={`${galleryInfo[1]?.video}`}
                  onClick={() => {
                    navigate(`/case-one/${galleryInfo[1]?.id}`);
                  }}
                  alt="smallgallery2"
                  style={{ width: `clamp(125px, 30vw, 360px)`, height: "100%" }}
                />
              </div>
            </div>
            <div className="smallgallery">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `clamp(12px,5vw,30px)`,
                }}
              >
                <video
                  src={`${galleryInfo[2]?.video}`}
                  onClick={() => {
                    navigate(`/case-one/${galleryInfo[2]?.id}`);
                  }}
                  alt="smallgallery3"
                  style={{
                    width: `clamp(124px, 30vw, 259px)`,
                    height: `clamp(182px,40vw,277px)`,
                  }}
                />
                <video
                  src={`${galleryInfo[6]?.video}`}
                  onClick={() => {
                    navigate(`/case-one/${galleryInfo[6]?.id}`);
                  }}
                  alt="smallgallery5"
                  style={{
                    width: `clamp(124px, 30vw, 260px)`,
                    height: `clamp(67px,20vw,140px)`,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `clamp(18px,5vw,30px)`,
                  justifyContent: "space-between",
                }}
              >
                <video
                  src={`${galleryInfo[3]?.video}`}
                  onClick={() => {
                    navigate(`/case-one/${galleryInfo[3]?.id}`);
                  }}
                  alt="smallgallery4"
                  style={{
                    width: `clamp(158px, 40vw, 359px)`,
                    height: `clamp(118px,30vw,181px)`,
                  }}
                />
                <video
                  src={`${galleryInfo[4]?.video}`}
                  onClick={() => {
                    navigate(`/case-one/${galleryInfo[4]?.id}`);
                  }}
                  alt="smallgallery6"
                  style={{
                    width: `clamp(158px, 40vw, 360px)`,
                    height: `clamp(127px,30vw,180px)`,
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <video
                src={`${galleryInfo[5]?.video}`}
                onClick={() => {
                  navigate(`/case-one/${galleryInfo[5]?.id}`);
                }}
                alt="smallgallery6"
                style={{ width: `clamp(300px, 20vw, 400px)` }}
              />
            </div>
            <div className="smallgallery">
              <video
                src={`${galleryInfo[8]?.video}`}
                onClick={() => {
                  navigate(`/case-one/${galleryInfo[8]?.id}`);
                }}
                alt="smallgallery4"
                style={{ width: `clamp(158px, 40vw, 660px)` }}
              />
              <video
                src={`${galleryInfo[7]?.video}`}
                onClick={() => {
                  navigate(`/case-one/${galleryInfo[7]?.id}`);
                }}
                alt="smallgallery4"
                style={{ width: `clamp(124px, 30vw, 260px)` }}
              />
            </div>
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ArrowDefaultButton
                title="ВСЕ КЕЙСЫ ЗАВОД ШОУ"
                onClick={() => handleLink("/cases")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GallerySection;
