import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  ButtonGroup,
  FormGroup,
  Menu,
  MenuItem,
  Slider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BlackButton,
  BlackButtonBorderWhite,
  DefaultButton,
  OutLinedButton,
} from "../../../components/Buttons";
import { CaseCatalogCard } from "../../../components/Cards";
import {
  CheckBox1,
  DropdownCheckBox,
  MobileCheckBox,
  SelectBox1,
} from "../../../components/Inputs";
import "../../../styles/pages/cases/caseCatalog.css";

const CustomSlider = styled(Slider)({
  color: "#1976d2",
  margin: 0,
  "& .MuiSlider-thumb": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiSlider-rail": {
    color: "var(--secondaryWhiteColor)",
    opacity: "1",
  },
  "& .MuiSlider-track": {
    color: "#FFFFFF",
    border: "none",
  },
});

const MobileCustomSlider = styled(Slider)({
  color: "#1976d2",
  margin: 0,
  "& .MuiSlider-thumb": {
    backgroundColor: "rgba(104, 104, 104, 1)",
  },
  "& .MuiSlider-rail": {
    color: "rgba(104, 104, 104, 1)",
  },
  "& .MuiSlider-track": {
    color: "rgba(207, 207, 207, 1)",
  },
});

const DetailSection = ({ type, data, progress, fieldInfo, checkText }) => {
  const moreTitle =
    type === "case"
      ? "КЕЙСЫ"
      : type === "platform"
      ? "ПЛОЩАДКИ"
      : "ОБОРУДОВАНИЕ";
  const [result, setResult] = useState([]);
  const [sliceData, setSliceData] = useState([]);
  const [fieldData, setFieldData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [searchData, setSearchData] = useState({
    blog_type: "",
    site_type: "",
    startDate: "",
    venue: "",
    cities: "",
    equipment: "",
    name: "",
    categoryType: "",
    brand: "",
    visualization: false,
    generator: false,
    capacity: "",
    default_site: "",
    default_equipment: "",
  });
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const marks = [
    { value: 0, capacity: 0, label: "0" },
    { value: 1, capacity: 30, label: "30" },
    { value: 2, capacity: 50, label: "50" },
    { value: 3, capacity: 100, label: "100" },
    { value: 4, capacity: 150, label: "150" },
    { value: 5, capacity: 200, label: "200" },
    { value: 6, capacity: 300, label: "300" },
    { value: 7, capacity: 500, label: "500" },
    { value: 8, capacity: 700, label: "700" },
    { value: 9, capacity: 1000, label: "1000+" },
  ];

  const handleCheckboxChange = (id, event, optionValue) => {
    const currentValues = selectedValues[id] || [];
    let newValues;
    if (currentValues.includes(optionValue)) {
      newValues = currentValues.filter((val) => val !== optionValue);
    } else {
      newValues = [...currentValues, optionValue];
    }
    setSelectedValues({ ...selectedValues, [id]: newValues });

    setSearchData((prevData) => ({
      ...prevData,
      [id]: newValues,
    }))
  };

  const handleMenuClick = (id, option) => {
    handleCheckboxChange(id, null, option);
  };

  useEffect(() => {
    const newFieldInfo = fieldInfo.map((field) => {
      switch (field?.name) {
        case "startDate":
        case "venue":
        case "name":
        case "series":
        case "categoryType":
        return {
        ...field,
        option: Array.from(new Set(data?.map((item) => item[field.name]))),
        };
        // case "equipment":
        //   return {
        //     ...field,
        //     option: Array.from(
        //       new Set(data?.map((item) => item.equipment_names).flat())
        //     ),
        //   };

        case "blog_type":
          return {
                ...field,
                option: Array.from(
                  new Set(data?.map((item) => item.blog_type).flat())
                ),
              };
        case "site_type":
          return {
                ...field,
                option: Array.from(
                  new Set(data?.map((item) => item.site_type).flat())
                ),
              };
        case "cities":
          return {
            ...field,
                option: Array.from(
                  new Set(data?.map((item) => item.cities).flat())
                ),
              };
        default:
          return field;
      }
    });
    setResult(data);
    setFieldData(newFieldInfo);
    setSliceData(data?.slice(0, 8));
  }, [data, fieldInfo]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    
    setSearchData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "capacity"
          ? marks[value].capacity
          : value,
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchData({
      blog_type: "",
      site_type: "",
      date: "",
      venue: "",
      cities: "",
      equipment: "",
      name: "",
      default_site: "",
      default_equipment: "",
      visualization: false,
      generator: false,
    });
    setSelectedValues({})
    setResult(data);
    setSliceData(data.slice(0, 8));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleClose();
    
    const filteredData = data.filter(
      (item) =>
        (!searchData.blog_type ||
          item.blog_type.some((blog_type) =>
            blog_type.toUpperCase().includes(searchData.blog_type.toUpperCase())
          )) &&
        (!searchData.site_type ||
          item.site_type.some((site_type) =>
            site_type.toUpperCase().includes(searchData.site_type.toUpperCase())
          )) &&
        (!searchData.default_site ||
          searchData.default_site.every(default_site => 
            item.site_type.includes(default_site))
        ) &&
        (!searchData.type ||
          item.type.toUpperCase().includes(searchData.type.toUpperCase())) &&
        (!searchData.startDate ||
          item.startDate
            .toUpperCase()
            .includes(searchData.startDate.toUpperCase())) &&
        (!searchData.venue ||
          item.venue.toUpperCase().includes(searchData.venue.toUpperCase())) &&
        (!searchData.cities ||
          item.cities.some((cities) =>
            cities.toUpperCase().includes(searchData.cities.toUpperCase())
          )) &&
        (!searchData.equipment ||
          item.equipment_names.some((equipment) =>
            equipment.toUpperCase().includes(searchData.equipment.toUpperCase())
          )) &&
        (!searchData.default_equipment ||
          searchData.default_equipment.every(default_equipment => item.equipment_type.includes(default_equipment))
        ) &&
        (!searchData.name || item.name.includes(searchData.name)) &&
        (!searchData.visualization || item.tags.includes("3D")) &&
        (!searchData.generator || item.tags.includes("Репетиционная база")) &&
        (!searchData.capacity || item.capacity >= searchData.capacity) &&
        (!searchData.series || item.series === searchData.series) &&
        (!searchData.categoryType ||
          item.categoryType === searchData.categoryType)
    )

    setResult(filteredData);
    setSliceData(filteredData.slice(0, 8));
  };

  const addUsers = () => {
    setSliceData(result);
  };

  const reduceUsers = () => setSliceData(result.slice(0, 8));

  return (
    <section className="flexWrapBetween">
      <form className="selectBoxSquare">
        <Box className="mobileShow ">
          {fieldData &&
            fieldData.map((item, index) => (
              <div key={index}>
                {
                  item.name.indexOf('default')> -1 ?
                    <DropdownCheckBox
                      item={item}
                      selectedValues={selectedValues}
                      handleCheckboxChange={handleCheckboxChange}
                      handleMenuClick={handleMenuClick}
                    />
                    :
                    <SelectBox1
                      item={item}
                      value={searchData[item.name] || ""}
                      handleSelect={handleChange}
                    />
                }
              </div>
            ))}


            
          {progress && (
            <div style={{ paddingBottom: "30px", width: "100%" }}>
              <div
                className="spaceBetween"
                style={{ color: "white", marginBottom: "10px" }}
              >
                <p>{progress}</p>
                <p>{searchData.capacity}</p>
              </div>
              <CustomSlider
                aria-label="Restricted values"
                valueLabelDisplay="auto"
                name="capacity"
                step={null}
                marks={marks}
                min={0}
                max={9}
                onChange={handleChange}
              />
              <div className="spaceBetween slideNumber">
                <p>0</p>
                <p>1000+</p>
                {/* {marks.map((item, index) => (
                  <p key={index} className="slideNumber">
                    {item.label}
                  </p>
                ))} */}
              </div>
            </div>
          )}
          <FormGroup>
            {checkText &&
              checkText.map((item, index) => (
                <CheckBox1
                  key={index}
                  name={item.name}
                  title={item.label}
                  checked={searchData[item.name] || false}
                  onChange={handleChange}
                />
              ))}
          </FormGroup>
          <ButtonGroup sx={{ mt: 4, gap: "10px" }}>
            <DefaultButton onClick={handleSearch} title="применить" />
            <BlackButtonBorderWhite onClick={handleReset} title="сбросить" />
          </ButtonGroup>
        </Box>
        <Box className="selectBoxSquare mobileHidden">
          <div
            style={{ width: "100%", marginBottom: "30px" }}
            id="demo-positioned-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <label style={{ color: "#FFFFFF" }}>Фильтр</label>
            <div className="custom-select">
              <select className="selectBox">
                <option value="Все кейсы">Все кейсы</option>
              </select>
            </div>
          </div>
          <Menu
            id="demo-positioned-menu"
            className="mobileHidden"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {fieldData &&
              fieldData.map((item, index) => (
                <MenuItem key={index} sx={{ p: 0, m: 0 }}>
                  {
                    item.name.indexOf('default')> -1 ?
                      <DropdownCheckBox
                        item={item}
                        selectedValues={selectedValues}
                        handleCheckboxChange={handleCheckboxChange}
                        handleMenuClick={handleMenuClick}
                        mobile={true}
                      />
                      :
                      <SelectBox1
                        key={index}
                        item={item}
                        value={searchData[item.name] || ""}
                        handleSelect={handleChange}
                        mobile={true}
                      />
                  }
                </MenuItem>
              ))}
            {progress && (
              <div style={{ padding: "10px 0", width: "90%", margin: "auto" }}>
                <div
                  className="spaceBetween"
                  style={{ color: "rgba(104, 104, 104, 1)" }}
                >
                  <p>{progress}</p>
                  <p>{searchData.capacity}</p>
                </div>
                <MobileCustomSlider
                  aria-label="Restricted values"
                  valueLabelDisplay="auto"
                  name="capacity"
                  step={null}
                  marks={marks}
                  min={0}
                  max={9}
                  onChange={handleChange}
                />
                <div
                  className="spaceBetween slideNumber"
                  style={{ color: `var(--primaryBgColor)` }}
                >
                  <p>0</p>
                  <p>1000+</p>
                  {/* {marks.map((item, index) => (
                    <p key={index} className="slideNumber">
                      {item.label}
                    </p>
                  ))} */}
                </div>
              </div>
            )}
            {checkText &&
              checkText.map((item, index) => (
                <MenuItem key={index}>
                  <MobileCheckBox
                    key={index}
                    name={item.name}
                    title={item.label}
                    onChange={handleChange}
                  />
                </MenuItem>
              ))}
            <MenuItem sx={{ mt: 2, gap: "10px" }}>
              <BlackButton onClick={handleSearch} title="применить" />
              <OutLinedButton onClick={handleReset} title="сбросить" />
            </MenuItem>
          </Menu>
        </Box>
      </form>

      <div
        className="caseImageSquare flexWrapBetween"
        style={{ gap: "clamp(20px, 1.5vw, 30px)" }}
      >
        {sliceData?.map((item, index) => (
          <CaseCatalogCard
            key={index}
            type={type}
            item={item}
            onClick={() => {
              navigate(
                type === "case"
                  ? `/case-one/${item?.id}`
                  : type === "platform"
                  ? `/site-one/${item?.id}`
                  : `/equipment-one/${item?.id}`
              );
            }}
          />
        ))}
        <div
          className="itemCenter"
          style={{ paddingTop: "clamp(40px, 4vw, 45px)", width: "100%" }}
        >
          {result?.length > 8 && (
            <>
              {sliceData.length === result.length ? (
                <DefaultButton
                  onClick={reduceUsers}
                  title={`СКРЫТЬ БОЛЬШЕ ${moreTitle}`}
                />
              ) : (
                <DefaultButton
                  onClick={addUsers}
                  title={`СМОТРЕТЬ ЕЩЁ ${moreTitle}`}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailSection;
