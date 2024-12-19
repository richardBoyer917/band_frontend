import { DarkIconButton } from "../../../components/Buttons";
import { ChichaBox } from "../../../components/ChichaBox";
import { handleDownload } from "../../../constant/defaultLink";
import { creationInfo } from "../../../constant/group";

const ShowCreation = () => {
  const content = (
    <section>
      <p
        className="sectionTitle"
        style={{
          color: `var(--primaryBgColor)`,
          width: "90%",
          marginBottom: "10px",
        }}
      >
        Создание шоу под ключ
      </p>
      <p
        className="sectionTitle"
        style={{
          color: `var(--secondaryWhiteHover)`,
          width: "90%",
          marginBottom: "0px",
        }}
      >
        Наш процесс работы
      </p>
      <div
        className="flexWrapAround"
        style={{ paddingTop: "35px", gap: "10px" }}
      >
        {creationInfo.map((item, index) => (
          <div
            key={index}
            className="creationItem"
            style={{
              width: index === 0 && "320px",
              background: item.bgColor,
              marginLeft: index === 0 ? 0 : index === 1 && "-45px",
            }}
          >
            <p className="creationTitle">{item.title}</p>
            {item.smallText.map((text, idx) => (
              <p key={idx} className="creationSmallText">
                {text}
              </p>
            ))}
            {item.contentText ? (
              <div>
                <p className="contentTitle">{item.contentTitle}</p>
                {item.contentText.map((text, idx) => (
                  <p
                    key={idx}
                    className="creationSmallText"
                    style={{ margin: "3px 0" }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            ) : (
              <div>
                <DarkIconButton
                  icon={item.buttonIcon}
                  title={item.buttonTitle}
                  onClick={() =>handleDownload("", "")}
                />
                <p
                  className="pdfText"
                  style={{
                    marginTop: "clamp(16px , 2vw, 25px)",
                    marginLeft: "0",
                  }}
                >
                  {item.sizeText}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return <ChichaBox content={content} />;
};

export default ShowCreation;
