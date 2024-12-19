import { useState } from "react";
import { Typography } from "@mui/material";
import "react-datepicker/dist/react-datepicker.module.css";
import { insertThree, updateThree } from "../../../api/threeAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "../../../components/Buttons";
import { darkAdd } from "../../../assets";
import { Input, TextArea } from "../../../components/Inputs";
import LoadingProgress from "../../../components/Loading/Loading";

const NewThree = () => {
  const location = useLocation();
  const { Data } = location.state || {};
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title1: Data?.title1 || "",
    content1: Data?.content1 || "",
    title2: Data?.title2 || "",
    content2: Data?.content2 || "",
    links: Data?.links || "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const inputinfo = [
    {
      title: "Название1",
      name: "title1",
      type: "text",
      placeholder: "ВХОДНАЯ Название1",
    },
    {
      title: "Содержание1",
      name: "content1",
      type: "text",
      placeholder: "ВХОДНАЯ Содержание1",
    },
    {
      title: "Название2",
      name: "title2",
      type: "text",
      placeholder: "ВХОДНАЯ Название2",
    },
    {
      title: "Содержание2",
      name: "content2",
      type: "text",
      placeholder: "ВХОДНАЯ Содержание2",
    },
    {
      title: "ссылок",
      name: "links",
      type: "text",
      placeholder: "ВХОДНАЯ ссылок",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      newFormData.append(key, formData[key]);
    });

    const request = Data
      ? updateThree(Data?.id, newFormData)
      : insertThree(newFormData)

      request.then((data) => {
        if(data && data.error){
          console.log(data.error)
        } else {
          navigate("/admin/visualizationTable");
        }
      }).finally(() => {
        setLoading(false)
      })

  };

  return (
    <CreatePageWrapper
      title="Введите здесь данные вашей 3D-визуализации"
      handleSubmit={handleSubmit}
      link="/admin/visualizationTable"
      content={
        <>
          <TabButton
            icon={darkAdd}
            title="Выбрать файл"
            onChange={handleVideoChange}
          />
          {formData.video && (
            <Typography> Выбранный файл: {formData.video.name}</Typography>
          )}
          {inputinfo?.map((item, index) =>
            index % 2 === 0 ? (
              <div key={index}>
                <p className="x16">{item.title}</p>
                <Input
                  value={formData[item.name]}
                  item={item}
                  handleChange={handleChange}
                />
              </div>
            ) : (
              <div key={index}>
                <p className="x16">{item.title}</p>
                <TextArea
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  value={formData[item.name]}
                />
              </div>
            )
          )}
          {loading && (
            <LoadingProgress />
          )}
        </>
      }
    />
  );
};

export default NewThree;
