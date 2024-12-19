import { useState } from "react";
import { DefaultButton, TabButton } from "../../components/Buttons";
import { Input, TextArea } from "../../components/Inputs";
import { darkAdd, smallFatUser, whiteMail, whitePhone } from "../../assets";
import { SmallAvatar } from "../../components/Avatars";
import { sendEmail } from "../../api/emailAPI";
import { ToEmail, ToPhone } from "../../components/ToText";
import CustomerModal from "../../components/Modals";
import SimpleCaptcha from "../../components/SimpleCaptcha";
import { Alert, Snackbar } from "@mui/material";

const inputinfo = [
  {
    title: "ФИО",
    name: "name",
    type: "text",
    placeholder: "Иванов Иван Иванович",
  },
  {
    title: "Контакты",
    name: "email",
    type: "email",
    placeholder: "Email, социальные сети, телефон",
  },
];

const ContactHeader = ({ title }) => (
  <div className="contactTop">
    <div className="flexWrapBetween alignCenter" style={{ gap: "10px" }}>
      <p className="sectionTitle">{title}</p>
      <p className="x14_2 chichaShow" style={{ maxWidth: "225px" }}>
        Оставьте заявку, и мы свяжемся с вами в ближайшее время
      </p>
    </div>
    <hr className="hrStyle" />
    <p
      className="x14_2 chichaHidden"
      style={{ maxWidth: "225px", marginBottom: "30px" }}
    >
      Оставьте заявку, и мы свяжемся с вами в ближайшее время
    </p>
  </div>
);

const ContactMiddle = ({
  sendData,
  handleChange,
  handleSubmit,
  setError,
  error,
}) => (
  <form className="contactMiddle flexWrap" onSubmit={handleSubmit}>
    <div className="formLeft">
      {inputinfo.map((item, index) => (
        <div key={index}>
          <p className="x16" style={{ marginBottom: "12px" }}>
            {item.title}
          </p>
          <Input item={item} handleChange={handleChange} />
        </div>
      ))}
    </div>
    <div className="formRight">
      <p className="x16" style={{ marginBottom: "12px" }}>
        Краткая информация о мероприятии
      </p>
      <TextArea
        name="content"
        value={sendData.content}
        onChange={handleChange}
        placeholder={
          "Какое хотите провести: частное, корпоративное, \nделовое, государственное?"
        }
      />
    </div>

    <div className="formLeft">
      <p className="x16" style={{ marginBottom: "12px" }}>
        Прикрепить файл
      </p>
      <div className="spaceBetween">
        <TabButton
          icon={darkAdd}
          title="Выбрать файл"
          onChange={handleChange}
          setError={setError}
          error={error}
        />
        <p
          className="x14 uploadDescription"
          style={{ width: "clamp(160px, 16vw, 167px)" }}
        >
          Файлы до 3 МБ. DOC,
          <br /> PDF, JPG, форматы Exel
        </p>
      </div>
    </div>
    <div
      className="formRight"
      style={{ display: "flex", alignItems: "flex-end" }}
    >
      <DefaultButton type={"submit"} title="ОТПРАВИТЬ ЗАЯВКУ" />
    </div>
    {error && <p className="errorText">{error || "Please select a file"}</p>}
  </form>
);

const ContactFooter = () => (
  <div className="contactFooter spaceBetween" style={{ gap: "30px" }}>
    <div className="alignCenter" style={{ gap: "20px" }}>
      <SmallAvatar url={smallFatUser} />
      <div>
        <p className="x18">Алексей Седов</p>
        <p className="x14">Генеральный продюсер</p>
      </div>
    </div>
    <div style={{ display: "grid", gap: "3px" }}>
      <p className="x18 alignCenter" style={{ gap: "11px" }}>
        <img src={whiteMail} alt="icon" />
        <ToEmail email="pr@zavodshow.ru" />
      </p>
      <p className="x18 alignCenter" style={{ gap: "11px" }}>
        <img src={whitePhone} alt="icon" />
        <ToPhone phoneNumber="+7 495 720-12-82" />
      </p>
    </div>
    <p className="x14 alignCenter">
      Задать вопрос напрямую
      <br /> генеральному директору
    </p>
  </div>
);

const ContactSection = ({ title }) => {
  const [open, setOpen] = useState(false);

  const [sendData, setSendData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [error, setError] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "", open: false });

  const handleShowCaptcha = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "video" && files[0]) {
      const file = files[0];
      const allowedTypes = [
        "application/msword",
        "application/pdf",
        "image/jpeg",
        "application/vnd.ms-excel",
        "video/mp4",
      ];
      const maxSize = 3 * 1024 * 1024; // 3 MB in bytes

      if (!allowedTypes.includes(file.type)) {
        setAlert({
          message: "Недопустимый тип файла. Пожалуйста, загрузите файл .doc, .pdf, .jpg, .xls или .mp4.",
          severity: "error",
          open: true,
        });
        return;
      }

      if (file.size > maxSize) {
        setAlert({
          message: "Размер файла превышает 3 МБ. Пожалуйста, загрузите файл меньшего размера.",
          severity: "error",
          open: true,
        });
        return;
      }

      // If file is valid, update state and clear error
      setSendData({ ...sendData, file: file });
    } else {
      // For non-file inputs
      setSendData({ ...sendData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    let newFormData = new FormData();
    Object.keys(sendData).forEach((key) => {
      newFormData.append(key, sendData[key]);
    });
    
    sendEmail(newFormData).then((data) => {
      if (data?.message) {
        setAlert({
          message: "Ваш запрос успешно отправлен.",
          severity: "success",
          open: true,
        });
      } else {
        setAlert({
          message: "Ошибка отправки формы. Попробуйте еще раз.",
          severity: "error",
          open: true,
        });
      }
      setSendData({ name: "", email: "", content: "", file: null });
      setOpen(false);
    });
  };

  return (
    <div id="contactSection" className="sectionWrapper section2">
      <ContactHeader title={title} />
      <ContactMiddle
        sendData={sendData}
        handleChange={handleChange}
        setError={setError}
        error={error}
        setOpen={setOpen}
        handleSubmit={handleShowCaptcha}
      />
      <hr className="hrStyle" />
      <ContactFooter />
      <CustomerModal
        open={open}
        setOpen={setOpen}
        content={
          <div className="absoluteCenter">
            <SimpleCaptcha handleSubmit={handleSubmit} setOpen={setOpen} />
          </div>
        }
      />
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactSection;
