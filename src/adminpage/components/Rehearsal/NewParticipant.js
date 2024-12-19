import { useState } from "react";
import { Typography } from "@mui/material";
import "react-datepicker/dist/react-datepicker.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "../../../components/Buttons";
import { darkAdd } from "../../../assets";
import { Input } from "../../../components/Inputs";
import {
  insertParticipant,
  updateParticipant,
} from "../../../api/participantAPI";
import LoadingProgress from "../../../components/Loading/Loading";

const NewParticipant = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const { Data } = location.state || {};

  const [formData, setFormData] = useState({
    name: Data?.name || "",
  });
  const inputinfo = {
    title: "Имя",
    name: "name",
    type: "text",
    placeholder: "Введите Имя",
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      newFormData.append(key, formData[key]);
    });

    const request = Data
      ? updateParticipant(Data?.id, newFormData)
      : insertParticipant(newFormData)

    request.then((data) => {
      if(data && data.error){
        console.log(data.error)
      } else {
        navigate("/admin/rehearsalTable")
      }
    }).finally(() => {
      setLoading(false)
    })
  };

  return (
    <CreatePageWrapper
      title="Введите данные участника здесь"
      handleSubmit={handleSubmit}
      link="/admin/rehearsalTable"
      content={
        <>
          <TabButton
            icon={darkAdd}
            title="Выбрать видео"
            onChange={handleImageChange}
          />
          {formData.image && (
            <Typography>Selected File: {formData.image.name}</Typography>
          )}
          <Input
            value={formData.name}
            item={inputinfo}
            handleChange={handleChange}
          />
          {loading && (
            <LoadingProgress />
          )}
        </>
      }
    />
  );
};

export default NewParticipant;
