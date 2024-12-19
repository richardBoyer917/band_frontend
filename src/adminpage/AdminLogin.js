import { useState } from "react";
import { adminLoginLogo } from "../assets";
import { Input } from "../components/Inputs";
import { DefaultButton } from "../components/Buttons";
import { AdminPageWrapper } from "./components/AdminSection";

import { login } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import "../styles/adminpage/style.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const inputinfo = [
    {
      title: "Электронная почта",
      name: "email",
      type: "email",
      placeholder: "",
    },
    {
      title: "Пароль",
      name: "password",
      type: "password",
      placeholder: "",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.getItem("token")
      ? navigate("/admin")
      : login(adminInfo).then((data) => {
          if(data){
            navigate("/admin")
          } else {
            setErrorMessage("Неверный логин или пароль")
            setOpenSnackbar(true);
          }
        });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  const content = (
    <div className="sectionWrapper itemCenter">
      <form className="adminLoginSection" onSubmit={handleSubmit}>
        <div className="adminLoginHeader">
          <img src={adminLoginLogo} alt="adminLoginLogo" />
          <p className="adminLoginTitle">
            Страница
            <br />
            администратора
          </p>
        </div>
        {inputinfo.map((item, index) => (
          <div key={index}>
            <p className="x16" style={{ marginBottom: "12px" }}>
              {item.title}
            </p>
            <Input item={item} handleChange={handleChange} />
          </div>
        ))}
        <div className="alignCenter" style={{ gap: "30px" }}>
          <DefaultButton type="submit" title="Войти на страницу" />
          <p className="x14">
            Данные для входа доступны по запросу: <br />{" "}
            <span style={{ fontWeight: 700 }}>admin@zavodshow.ru</span>
          </p>
        </div>
      </form>

       <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Hide after 6 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );

  return <AdminPageWrapper content={content} />;
};

export default AdminLogin;
