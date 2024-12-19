import { Box, ButtonGroup, Typography } from "@mui/material";
import { ChichaBox } from "../../../components/ChichaBox";
import useScrollToTop from "../../../hooks/useScrollToTop";
import {
  BestCaseTagButton,
  BlackButton,
  BlackButtonBorderWhite,
  DefaultButton,
  OutLinedButton,
  TabButton,
} from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRental, insertRental } from "../../../api/rentalAPI";
import { Input } from "../../../components/Inputs";
import { darkAdd } from "../../../assets";
import { DataTable } from "../../../components/Tables";

const AdminPageWrapper = ({ content }) => {
  useScrollToTop();

  return (
    <div className="wrapper">
      <div className="section1">{content}</div>
    </div>
  );
};

const AdminSection = ({
  id,
  adding,
  title,
  columns,
  data,
  dataType,
  handle,
  handleNewCreate,
}) => {
  const bestCaseInfo = [
    { title: "Главная", galleryType: "Home" },
    { title: "События", galleryType: "Events" },
    { title: "Туры", galleryType: "Tours" },
    { title: "СветСвет", galleryType: "Light" },
    { title: "Звук", galleryType: "Sound" },
    { title: "Видео", galleryType: "Video" },
    { title: "Одежда сцены", galleryType: "Stage" },
  ];

  return (
    <ChichaBox
      content={
        <Box id={id}>
          <div className="sectionHeader" style={{ marginBottom: "20px" }}>
            <p className="sectionTitle">{title}</p>
            <br />
            {id === "bestCase" && (
              <div className="alignCenter">
                {bestCaseInfo.map((item, index) => (
                  <BestCaseTagButton
                    key={index}
                    title={item.title}
                    className={
                      dataType === item.galleryType ? "selBestCase" : ""
                    }
                    onClick={() => handle(item.galleryType)}
                  />
                ))}
              </div>
            )}
          </div>

          <DataTable id={id} columns={columns} data={data} />
          {adding !== 0 &&
            (id === "bestCase" ? (
              <div className="spaceBetween">
                <div className="alignCenter">
                  <BlackButton
                    onClick={handleNewCreate}
                    title={`Новый ${title}`}
                  />
                  <span style={{ marginLeft: "25px" }}>
                    Можно добавить еще {9 - data.length} кейса
                  </span>
                </div>
                <span style={{ paddingRight: "10px" }}>
                  <b>На странице:</b> {data.length} кейсов
                </span>
              </div>
            ) : (
              <BlackButton onClick={handleNewCreate} title={`Новый ${title}`} />
            ))}
        </Box>
      }
    />
  );
};

const AdminSection1 = ({
  adding,
  title,
  columns,
  data,
  handleNewCreate,
  id,
}) => {
  const [rental, setRental] = useState({ cost: "", files: [] });

  useEffect(() => {
    getRental()
      .then((data) => {
        if (data) {
          setRental(data);
        } else {
          setRental({ cost: "", files: [] });
        }
      })
      .catch((error) => {
        console.error("Error fetching rental data: ", error);
        setRental({ cost: "", files: [] });
      });
  }, []);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setRental((prevState) => {
      const updatedFiles = [...(prevState.files || [])];
      updatedFiles[index] = file;
      return {
        ...prevState,
        files: updatedFiles,
      };
    });
  };

  const inputinfo = {
    title: "Стоимость аренды",
    name: "cost",
    type: "text",
    placeholder: "Введите Стоимость аренды",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRental({ ...rental, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newFormData = new FormData();
    Object.keys(rental).forEach((key) => {
      if (key === "files") {
        rental[key].forEach((file) => newFormData.append("files[]", file));
      } else {
        newFormData.append(key, rental[key]);
      }
    });
    insertRental(newFormData).then((data) => {
      console.log("data", data);
    });
  };

  const fileList = ["3D-макеты сцены", "Тех.райдер площадки", "Архив фото"];

  return (
    <ChichaBox
      content={
        <Box id={id}>
          <div className="sectionHeader">
            <p
              className="sectionTitle"
              style={{ color: `var(--primaryBgColor)` }}
            >
              {title}
            </p>
          </div>
          <DataTable columns={columns} data={data} />
          {adding !== 0 && (
            <BlackButton title={`Новый ${title}`} onClick={handleNewCreate}>
              Новый {title}
            </BlackButton>
          )}
          {title === "Репетиционная база" && (
            <div>
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", gap: "18px" }}
                className="itemCenter"
              >
                <div
                  style={{ display: "flex", gap: "10px" }}
                  className="itemCenter"
                >
                  <p className="x16">{inputinfo.title}:</p>
                  <Input
                    value={rental.cost || ""}
                    item={inputinfo}
                    handleChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {fileList.map((item, index) => (
                    <div key={index}>
                      <TabButton
                        icon={darkAdd}
                        title={item}
                        onChange={(e) => handleFileChange(e, index)}
                      />
                      {rental.files && rental.files[index] && (
                        <Typography>
                          {" "}
                          Выбранный файл: {rental.files[index].name}
                        </Typography>
                      )}
                    </div>
                  ))}
                </div>
                <OutLinedButton type="submit" title="Применять" />
              </form>
            </div>
          )}
        </Box>
      }
    />
  );
};

const CreatePageWrapper = ({ title, content, handleSubmit, link }) => {
  const navigate = useNavigate();
  return (
    <AdminPageWrapper
      content={
        <div
          className="sectionWrapper section1"
          style={{ color: `var(--secondaryWhiteColor)`, marginBottom: '0px' }}
        >
          <div className="sectionHeader">
            <p className="sectionTitle">{title}</p>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "18px" }}
          >
            {content}
            <ButtonGroup sx={{ gap: "10px" }}>
              <DefaultButton
                type="submit"
                title="Представлять на рассмотрение"
              />
              <BlackButtonBorderWhite
                title="Назад"
                onClick={() => {
                  navigate(link);
                }}
              />
            </ButtonGroup>
          </form>
        </div>
      }
    />
  );
};

export { AdminPageWrapper, AdminSection, AdminSection1, CreatePageWrapper };
