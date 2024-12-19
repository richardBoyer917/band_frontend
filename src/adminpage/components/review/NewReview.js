import { useState } from "react";
import {
  Autocomplete,
  Box,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.module.css";
import { insertReview, updateReview } from "../../../api/reviewAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "../../../components/Buttons";
import { Input, SelectBox, TextArea } from "../../../components/Inputs";
import { darkAdd } from "../../../assets";
import LoadingProgress from "../../../components/Loading/Loading";

const NewReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const { Data } = location.state || {};

  const [formData, setFormData] = useState({
    type: Data?.type || "Text",
    name: Data?.name || "",
    content: Data?.content || "",
    displayType: Data?.displayType || [],
    queue: Data?.queue || 0,
  });
  const currency = {
    name: "type",
    option: ["Text", "Video"],
  };
  const inputinfo = [
    { title: "Имя", name: "name", type: "text", placeholder: "Введите имя" },
    {
      title: "Содержание",
      name: "content",
      type: "text",
      placeholder: "Введите содержание",
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "displayType") {
        formData[key].forEach((item) =>
          newFormData.append("displayType[]", item)
        );
      } else {
        newFormData.append(key, formData[key]);
      }
    });

    const request = Data
      ? updateReview(Data?.id, newFormData)
      : insertReview(newFormData)

    request.then((data) => {
      if(data && data.error){
        console.log(data.error)
      } else {
        navigate("/admin/reviewTable")
      }
    }).finally(() => {
      setLoading(false)
    })
  };

  const displayType = {
    title: "ТИП",
    name: "displayType",
    type: "text",
    placeholder: "Раздел дисплея",
    option: ["Технический", "Концерты", "3Д"],
  };

  return (
    <CreatePageWrapper
      title="Введите данные вашего отзыва здесь"
      handleSubmit={handleSubmit}
      link="/admin/reviewTable"
      content={
        <>
          <div>
            <p className="x16">тип</p>
            <SelectBox
              value={formData.type}
              item={currency}
              handleSelect={handleChange}
            />
          </div>
          <TabButton
            icon={darkAdd}
            title={
              formData.type === "Text" ? "Выбрать изображение" : "Выбрать видео"
            }
            onChange={handleFileChange}
          />
          {formData.files && (
            <Typography> Выбранный файл: {formData.files.name}</Typography>
          )}
          <Input
            value={formData.name}
            item={inputinfo[0]}
            handleChange={handleChange}
          />
          <TextArea
            name={inputinfo[1].name}
            placeholder={inputinfo[1].placeholder}
            onChange={handleChange}
            value={formData.content}
          />
          <div>
            <p className="x16" style={{ marginBottom: "12px" }}>
              Очередь
            </p>
            <Slider
              min={0}
              max={100}
              value={formData.queue}
              name="queue"
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
          </div>
          {/* <div>
            <p className='x16'>{displayType.title}</p>
            <SelectBox value={formData[displayType.name]} item={displayType} handleSelect={handleChange} />
          </div> */}
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6">{displayType.title}</Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={displayType.option}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.checkbox}
              onChange={(event, newValue) => {
                setFormData({ ...formData, displayType: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Click to Add more"
                  className="InputText x14 alignCenter"
                  sx={{ backgroundColor: "white" }}
                />
              )}
            />
          </Box>
          
          {loading && (
            <LoadingProgress />
          )}
        </>
      }
    />
  );
};

export default NewReview;
