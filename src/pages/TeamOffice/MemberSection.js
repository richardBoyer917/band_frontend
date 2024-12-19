import { miniClock, miniMail, miniPhone, miniTelegram } from "../../assets";
import { teamOfficeInfo } from "../../constant/group";

const MemberSection = () => (
  <div className="halfWidth meberSquare">
    {teamOfficeInfo.map((item, index) => (
      <div key={index} className="flexWrap itemCenter memberInfo">
        <div className="smallHalfWidth memberType">
          {item.title ? (
            <div>
              <p className="x16_2" style={{ marginBottom: "15px" }}>
                {item.title}
              </p>
              <p className="x15_1">{item.description}</p>
            </div>
          ) : (
            <p className="x12Font">{item.description}</p>
          )}
        </div>
        <div className="smallHalfWidth memberData">
          {item.title ? (
            <>
              <p className="mobileShow"> &nbsp; &nbsp;</p>
              <div className="alignCenter">
                <img src={miniPhone} alt="icon" />
                &nbsp; &nbsp;
                <span className="x15_1">{item.content[0]?.value}</span>
              </div>
              <div className="alignCenter">
                <img src={miniClock} alt="icon" />
                &nbsp; &nbsp;
                <span className="x15_1">
                  Пн-Сб: &nbsp;{item.content[1]?.value}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="alignCenter">
                <img src={miniPhone} alt="icon" />
                &nbsp; &nbsp;
                <span className="x14_3">{item.content[0]?.value}</span>
              </div>
              <div
                className="alignCenter"
                style={{ display: item.content[1] ? "block" : "none" }}
              >
                <img src={miniMail} alt="icon" />
                &nbsp; &nbsp;
                <span className="x14_3">{item.content[1]?.value}</span>
              </div>
              <div
                className="alignCenter"
                style={{ display: item.content[2] ? "block" : "none" }}
              >
                <img src={miniTelegram} alt="icon" />
                &nbsp; &nbsp;
                <span className="x14_3">{item.content[2]?.value}</span>
              </div>
            </>
          )}
        </div>
        {index === 3 && <hr className="thirdLine" />}
      </div>
    ))}
  </div>
);

export default MemberSection;
