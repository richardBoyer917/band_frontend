import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.module.css";
import { insertSite, updateSite } from "../../../api/siteAPI";
import { CreatePageWrapper } from "../AdminSection";
import { Input, SelectBox } from "../../../components/Inputs";
import { TabButton } from "../../../components/Buttons";
import { darkAdd } from "../../../assets";
import LoadingProgress from "../../../components/Loading/Loading";

const NewSite = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const { Data } = location.state || {};

  const [formData, setFormData] = useState({
    name: Data?.name || "",
    site_type: Data?.site_type || [],
    capacity: Data?.capacity || "",
    address: Data?.address || "",
    link_page: Data?.link_page || "",
    tags: Data?.tags || [],
    equipment_type: Data?.equipment_type || [],
    blog_type: Data?.blog_type[0] || "",
    queue: Data?.queue || 0,
    cities: Data?.cities[0] || "",
  });

  const inputinfo = [
    {
      title: "ФИО",
      name: "name",
      type: "text",
      placeholder: "ВХОДНАЯ ФИО",
    },
    {
      title: "ТИП ПЛОЩАДКИ",
      name: "site_type",
      placeholder: "ВХОДНАЯ ТИП",
      option: [
        "Рестораны",
        "Конференц-залы",
        "Загородные площадки",
        "Концертные залы",
      ],
    },
    {
      title: "ЕМКОСТЬ",
      name: "capacity",
      type: "number",
      placeholder: "ВХОДНАЯ ЕМКОСТЬ",
    },
    {
      title: "АДРЕС",
      name: "address",
      type: "text",
      placeholder: "ВХОДНАЯ АДРЕС",
    },
    {
      title: "ССЫЛКА СТРАНИЦА",
      name: "link_page",
      type: "text",
      placeholder: "ВХОДНАЯ ССЫЛКА СТРАНИЦА",
    },
    {
      title: "ГОРОД",
      name: "cities",
      type: "text",
      placeholder: "ВХОДНАЯ ГОРОД",
    },
    {
      title: "ТИП КЕЙСА",
      name: "blog_type",
      placeholder: "ВХОДНАЯ ТИП",
      option: ["частное", "тур", "корпоративное", "городское"],
    },
  ];

  const tagCurrencies = [
    "Свет",
    "Звук",
    "Видео",
    "3D",
    "Одежда сцены",
    "Репетиционная база",
  ];
  const typeEquipment = [
    "Парковка",
    "Гримёрные комнаты",
    "Проекторы и экраны",
  ];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "tags") {
        formData[key].forEach((item) => newFormData.append("tags[]", item));
      } else if (key === "cities") {
        newFormData.append("cities[]", formData[key]);
      } else if (key === "equipment_type") {
        formData[key].forEach((item) =>
          newFormData.append("equipment_type[]", item)
        );
      } else if (key === "site_type") {
        formData[key].forEach((item) => 
          newFormData.append("site_type[]", item)
        )
      } else if (key === "blog_type") {
        // formData[key].forEach((item) =>
        //   newFormData.append("blog_type[]", item)
        // );
        newFormData.append("blog_type[]", formData[key])
      } else {
        newFormData.append(key, formData[key]);
      }
    });

    // Data
    //   ? updateSite(Data._id, newFormData).then((data) => {
    //       if (data && data.error) {
    //         console.log(data.error);
    //       } else {
    //         navigate("/admin/sitesTable");
    //       }
    //     })
    //   : insertSite(newFormData).then((data) => {
    //       if (data && data.error) {
    //         console.log(data.error);
    //       } else {
    //         navigate("/admin/sitesTable");
    //       }
    //     });

    const request = Data
      ? updateSite(Data?.id, newFormData)
      : insertSite(newFormData)

    request.then((data) => {
      if(data && data.error){
        console.log(data.error)
      } else {
        navigate("/admin/sitesTable")
      }
    }).finally(() => {
      setLoading(false)
    })
  };

  return (
    <CreatePageWrapper
      title="Введите данные вашего сайта здесь"
      handleSubmit={handleSubmit}
      link="/admin/sitesTable"
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

           {inputinfo?.map((item, index) => {
            if (index === 6) {
              // Skip this index.
              return null;
            }

            if (index === 1) {
              // Special case for "site_type".
              return (
                <div key={index}>
                  <Typography variant="x16">{item.title}</Typography>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={item.option}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    value={formData?.site_type}
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, site_type: newValue });
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
                </div>
              );
            }

          // Default case for other inputs.
          return (
            <div key={index}>
              <Typography className="x16" style={{ marginBottom: "12px" }}>
                {item.title}
              </Typography>
              <Input
                value={formData[item.name]}
                item={item}
                handleChange={handleChange}
              />
            </div>
          );
        })}

          <Box sx={{ width: "100%" }}>
            <Typography variant="x16">Event Cases CheckBox</Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={tagCurrencies}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.tags}
              onChange={(event, newValue) => {
                setFormData({ ...formData, tags: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Click to Add more" className="InputText x14 alignCenter" sx={{ backgroundColor: "white" }} />
              )}
            />
          </Box>
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
          <Box sx={{ width: "100%" }}>
            <Typography variant="x16">Event Cases CheckBox</Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={typeEquipment}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.equipment_type}
              onChange={(event, newValue) => {
                setFormData({ ...formData, equipment_type: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Click to Add more" className="InputText x14 alignCenter" sx={{ backgroundColor: "white" }} />
              )}
            />
          </Box>
          <Box sx={{width: "100%"}}>
            <Typography>{inputinfo[6].title}</Typography>
            <SelectBox
              value={formData[inputinfo[6].name]}
              item={inputinfo[6]}
              handleSelect={handleChange}
            />
          </Box>
          
           {
            loading && (
              <LoadingProgress />
            )
          }
        </>
      }
    />
  );
};

export default NewSite;
