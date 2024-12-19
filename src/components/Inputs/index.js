import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  ListItemText,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { greySearch } from "../../assets";
import "../../styles/components/input.css";

export const Input = ({ color, item, value, handleChange, onKeyDown, disabled }) => {
  return (
    <input
      className="InputText x14 alignCenter"
      style={{ backgroundColor: disabled ? "#f9f9f9" : color, 
      }}
      placeholder={item.placeholder}
      name={item.name}
      type={item.type}
      onChange={handleChange}
      value={value}
      onKeyDown={onKeyDown}
      required
      disabled={disabled}
    />
  );
};

export const TextArea = ({ name, placeholder, onChange, value }) => {
  return (
    <textarea
      className="textArea"
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      required
    />
  );
};

export const DetailDataInput = ({ item, index }) => (
  <div
    key={index}
    className="spaceBetween auditoriumContentCard auditoriumTextSize"
    style={{ paddingTop: index === 0 && 0 }}
  >
    <p>{item.text}</p>
    <p style={{ fontWeight: "700" }}>{item.number}</p>
  </div>
);

export const DetailDataInput1 = ({ item, index, length }) => (
  <div
    key={index}
    className="spaceBetween auditoriumContentCard auditoriumTextSize"
    style={{
      paddingTop: index === 0 && 0,
      paddingBottom: index === length - 1 ? 0 : item.text && "14px",
      borderBottom: index === length - 1 && "none",
    }}
  >
    <div>
      <div className="alignCenter">
        {item.img && (
          <img
            src={item.img}
            alt="questionImg"
            className="questionImg"
            style={{ marginRight: "10px" }}
          />
        )}
        <p>{item.title}</p>
      </div>
      {item.text && (
        <p className="graySceneText" style={{}}>
          &nbsp;
        </p>
      )}
    </div>
    <div>
      <p
        className="auditoriumTextSize"
        style={{ fontWeight: "700", textAlign: "right" }}
      >
        {item.scene}
      </p>
      <p className="graySceneText" style={{}}>
        {item.text}
      </p>
    </div>
  </div>
);

export const SearchInputBasic = ({ onChange, placeholder }) => {
  return (
    <div className="searchSquare alignCenter">
      <img src={greySearch} alt="greySearch" />
      <input
        type="text"
        className="searchInput"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export const SelectBox1 = ({ item, value, handleSelect, mobile }) => {
  return (
    <Box sx={{ mb: !mobile ? 3.5 : 0 }}>
      {!mobile && <label style={{ color: "#FFFFFF" }}>{item?.label}</label>}
      <FormControl fullWidth>
        <Select
          displayEmpty
          name={item.name}
          onChange={handleSelect}
          value={value}
          variant="standard"
          className="selectBox"
        >
          <MenuItem value="">Все {item.label}</MenuItem>
          {item?.option.map(
            (optionValue, optionIndex) =>
              optionValue && (
                <MenuItem
                  key={optionIndex}
                  value={optionValue}
                  style={{ color: "#686868" }}
                >
                  {optionValue}
                </MenuItem>
              )
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export const DropdownCheckBox = ({ item, selectedValues, handleCheckboxChange, handleMenuClick, mobile }) => {
  return (
    <Box sx={{mb: !mobile ? 3.5 : 0}} style={{ marginBottom: "20px" }}>
      {!mobile && <label style={{ color: "#FFFFFF" }}>{item.label}</label>}
      <FormControl fullWidth>
        <Select
          displayEmpty
          variant="standard"
          className="selectBox"
          value={selectedValues[item.name] || []} // Use the ID to fetch the correct selected values
          renderValue={(selected) =>
            selected.length > 0 ? selected.join(", ") : "Все " + item.label
          }
          multiple
        >
          {item.option.map((option, index) => (
            <MenuItem
              key={index}
              value={option}
              onClick={() => handleMenuClick(item.name, option)}
            >
              <ListItemText primary={option} />
              <Checkbox
                checked={(selectedValues[item.name] || []).includes(option)}
                onChange={(e) => handleCheckboxChange(item.name, e, option)}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};


export const SelectBox = ({ item, value, handleSelect, disabled }) => (
  <Box>
    <label style={{ color: "#FFFFFF" }}>{item?.label}</label>
    <FormControl fullWidth>
      <Select
        displayEmpty
        name={item.name}
        onChange={handleSelect}
        value={value}
        variant="standard"
        className="selectBox"
        sx={{ height: "50px" }}
        disabled={disabled}
      >
        <MenuItem value="" disabled hidden>
          Все
        </MenuItem>
        {item?.option.map(
          (optionValue, optionIndex) =>
            optionValue && (
              <MenuItem
                key={optionIndex}
                value={optionValue}
                style={{ color: "#686868" }}
              >
                {optionValue}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  </Box>
);

export const NewEventSelectBox = ({ cases, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <Select
        labelId="case-select-label"
        value={value}
        onChange={onChange}
        displayEmpty
      >
        {cases.map((caseItem) => (
          <MenuItem key={caseItem.id} value={caseItem.name}>
            {caseItem.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const CaseDataSelect = ({ item, value, handleSelect }) => (
  <Box>
    <FormControl fullWidth>
      <Select
        displayEmpty
        name="eventSelect"
        onChange={handleSelect}
        value={value}
        variant="standard"
        className="selectBox"
        sx={{ height: "50px" }}
      >
        <MenuItem value="" disabled hidden>
          Пожалуйста, выберите случай события
        </MenuItem>
        {item.map((event, index) => (
          <MenuItem
            key={index}
            value={event} // Assuming each event has a `name` property
            style={{ color: "#686868" }}
          >
            {event.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export const CheckBox1 = ({
  name,
  title,
  checked,
  value,
  textColor,
  onChange,
}) => (
  <FormControlLabel
    sx={{
      color: textColor ? textColor : `var(--secondaryWhiteColor)`,
      "& .MuiFormControlLabel-label": {
        fontSize: "14px",
        fontWeight: 400,
      },
    }}
    control={
      <Checkbox
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        sx={{
          padding: "3px 8px",
          "& .MuiSvgIcon-root": {
            fontSize: "28px",
            color: "#CFCFCF",
          },
        }}
        color="default"
      />
    }
    label={title}
  />
);

export const MobileCheckBox = ({
  name,
  title,
  checked,
  value,
  textColor,
  onChange,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        sx={{
          fontSize: "20px",
          color: "#686868",
        }}
        color="default"
      />
    }
    label={title}
  />
);
