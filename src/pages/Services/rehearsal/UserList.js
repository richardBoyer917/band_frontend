import { DefaultButton } from "../../../components/Buttons";
import { useEffect, useState } from "react";

const UserList = ({ title, userListInfo }) => {
  const [users, setUsers] = useState([]);

  const addUsers = () => {
    setUsers(userListInfo.slice(0, users.length + 3));
  };

  const reduceUsers = () => setUsers(userListInfo.slice(0, 3));

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    if (width > 589) {
      setUsers(userListInfo);
    } else {
      setUsers(userListInfo.slice(0, 3));
    }
  }, [width, userListInfo]);
  
  return (
    <section className="sectionWrapper section2" id="userLists">
      <div className="sectionHeader">
        <p className="sectionTitle" style={{ textAlign: "center" }}>
          {title ? title : "На этой базе репетировали"}
        </p>
      </div>
      <div className="flexWrapAround userListWrapper">
        {users.map((item, index) => (
          <div key={index}>
            <img
              className="userListAvatar"
              src={`${item.image}`}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              alt={item.image}
            />
            <p className="cardBigTitle userListTitle">{item.name}</p>
            <a
              className="cardDescription userListLink"
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/@zavodshow?si=iKWeBnsR_h9tWZjl"
            >
              Смотреть шоу
            </a>
          </div>
        ))}
      </div>
      <div className="seeMoreButton">
        {users.length === userListInfo.length ? (
          <DefaultButton onClick={reduceUsers} title="скрыть больше" />
        ) : (
          <DefaultButton onClick={addUsers} title="cмотреть ещё" />
        )}
      </div>
    </section>
  );
};

export default UserList;
