import { useState } from "react";
import {
  Autocomplete,
  Box,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.module.css";
import { insertEquip, updateEquip } from "../../../api/equipAPI";
import { Dropzone, FileMosaic } from "@files-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "../../../components/Buttons";
import { darkAdd } from "../../../assets";
import { Input, SelectBox } from "../../../components/Inputs";

const NewEquip = () => {
  const location = useLocation();
  const { Data } = location.state || {};
  const [formData, setFormData] = useState({
    name: Data?.name || "",
    equipment_type: Data?.equipment_type[0] || "",
    site_type: Data?.site_type || [],
    blog_type: Data?.blog_type || [],
    categoryType: Data?.categoryType || "",
    brand: Data?.name || "",
    description: Data?.description || "",
    manufacturer: Data?.manufacturer || "",
    weight: Data?.weight || "",
    series: Data?.series || "",
    queue: Data?.queue || 0,
    dimension: {
      width: Data?.dimension?.width || "",
      depth: Data?.dimension?.depth || "",
      height: Data?.dimension?.height || "",
    },
    images: [],
  });
  const navigate = useNavigate();

  const currency = [
    {
      title: "ВИДЫ ОСНАЩЕНИЯ",
      name: "equipment_type",
      option: ["свет", "звук", "видео"],
    },
    {
      title: "Тип категории",
      name: "categoryType",
      option: [
        "Светодиодный прожектор",
        "LED-панель",
        "Басовый кабинет 2х10",
        "Сценический монитор активный",
        "Конденсаторный микрофон",
        "Цифровой микшерный пульт",
        "Проектор",
        "Проекционный экран: 3 мм, 8х6 м",
      ],
    },
  ];
  const inputinfo = [
    { title: "Имя", name: "name", type: "text", placeholder: "Введите имя" },
    {
      title: "Бренд",
      name: "brand",
      type: "text",
      placeholder: "Введите Бренд",
    },
    {
      title: "Описание",
      name: "description",
      type: "text",
      placeholder: "Введите Описание",
    },
    {
      title: "Производитель",
      name: "manufacturer",
      type: "text",
      placeholder: "Введите Производитель",
    },
    {
      title: "Масса",
      name: "weight",
      type: "text",
      placeholder: "Введите Масса",
    },
    {
      title: "серия",
      name: "series",
      type: "text",
      placeholder: "Введите серия",
    },
  ];

  const dimensionInfo = [
    {
      title: "Ширина",
      name: "width",
      type: "text",
      placeholder: "Введите Ширина",
    },
    {
      title: "Глубина",
      name: "depth",
      type: "text",
      placeholder: "Введите Глубина",
    },
    {
      title: "Высота",
      name: "height",
      type: "text",
      placeholder: "Введите Высота",
    },
  ];

  const typeSite = [
    "Рестораны",
    "Конференц-залы",
    "Загородные площадки",
    "Концертные залы",
  ];
  const typeBlog = ["частное", "тур", "корпоративное", "городское"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["width", "depth", "height"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        dimension: {
          ...prevData.dimension,
          [name]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files[0] });
  };

  const updateFiles = (incomingFiles) => {
    setFormData({ ...formData, images: incomingFiles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "tags") {
        formData[key].forEach((item) => newFormData.append("tags[]", item));
      } else if (key === "images") {
        formData[key].forEach((file) =>
          newFormData.append("images[]", file.file)
        );
      } else if (key === "equipment_type") {
        newFormData.append("equipment_type[]", formData[key]);
      } else if (key === "site_type") {
        formData[key].forEach((item) =>
          newFormData.append("site_type[]", item)
        );
      } else if (key === "blog_type") {
        formData[key].forEach((item) =>
          newFormData.append("blog_type[]", item)
        );
      } else if (key === "dimension") {
        newFormData.append("dimension", JSON.stringify(formData[key]));
      } else {
        newFormData.append(key, formData[key]);
      }
    });

    Data
      ? updateEquip(Data?._id, newFormData).then((data) => {
          if (data && data.error) {
            console.log(data.error);
          } else {
            navigate("/admin/equipmentTable");
          }
        })
      : insertEquip(newFormData).then((data) => {
          if (data && data.error) {
            console.log(data.error);
          } else {
            navigate("/admin/equipmentTable");
          }
        });
  };

  return (
    <CreatePageWrapper
      title="Введите данные вашего оборудования здесь"
      handleSubmit={handleSubmit}
      link="/admin/equipmentTable"
      content={
        <>
          <TabButton
            icon={darkAdd}
            title="Выбрать файл"
            onChange={handleFileChange}
          />
          {formData.files && (
            <Typography>Выбранный файл: {formData.files.name}</Typography>
          )}
          {currency.map((item, index) => (
            <div key={index}>
              <p className="x16">{item.title}</p>
              <SelectBox
                value={formData[item.name]}
                item={item}
                handleSelect={handleChange}
              />
            </div>
          ))}
          {inputinfo.map((item, index) => (
            <div key={index}>
              <p className="x16">{item.title}</p>
              <Input
                value={formData[item.name]}
                item={item}
                handleChange={handleChange}
              />
            </div>
          ))}
          <p className="x16">габариты Ш×Г×В</p>
          <div
            style={{ display: "flex", justifyContent: "space-between", gap: 5 }}
          >
            {dimensionInfo.map((item, index) => (
              <Input
                key={index}
                value={formData.dimension[item.name]}
                item={item}
                handleChange={handleChange}
              />
            ))}
          </div>
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
            <Typography variant="h6">ТИП КЕЙСА</Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={typeBlog}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.blog_type}
              onChange={(event, newValue) => {
                setFormData({ ...formData, blog_type: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Click to Add more" />
              )}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6">ТИП ПЛОЩАДКИ</Typography>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={typeSite}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              value={formData?.site_type}
              onChange={(event, newValue) => {
                setFormData({ ...formData, site_type: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Click to Add more" />
              )}
            />
          </Box>
          <Dropzone onChange={updateFiles} value={formData.images}>
            {formData.images.map((file) => (
              <FileMosaic {...file} preview />
            ))}
          </Dropzone>
        </>
      }
    />
  );
};

export default NewEquip;
