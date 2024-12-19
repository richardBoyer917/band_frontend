import React from "react";

import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { BlackButtonBorderWhite, DefaultButton } from "../Buttons";
import { CaseCatalogSelectBoxInfo } from "../../constant/group";
import '../../styles/components/ComboBox.css';

const ComboBox = () => {
    return (
        <form>
            <div className="comboBoxMobile">

                {
                    CaseCatalogSelectBoxInfo.map((item, index) => (
                        <div key={index} style={{ padding: '15px 0' }}>
                            <label style={{ color: '#FFFFFF' }}>{item.label}</label><br /><br />
                            <select className="selectBox">
                                {item.option.map((optionValue, optionIndex) => (
                                    <option key={optionIndex} value={optionValue} style={{ color: '#686868' }}>
                                        {optionValue}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))
                }
            </div>
            <FormGroup style={{ color: 'white', marginTop: '20px' }}>
                <FormControlLabel control={<Checkbox style={{ color: 'white' }} />} label="С 3D-визуализацией" />
                <FormControlLabel control={<Checkbox style={{ color: 'white' }} />} label="С генератором" />
            </FormGroup>
            <div style={{ display: 'flex', justifyContent: 'left', gap: '10px', padding: '30px 0' }}>
                <DefaultButton title="применить" />
                <BlackButtonBorderWhite title="сбросить" />
            </div>
        </form>
    )
}

export default ComboBox;