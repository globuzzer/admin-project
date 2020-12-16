import React, { useState, Fragment } from "react";
import size from "./font.module.css";


const options = ["18", "16", "14", "13", "12", "11", "10", "9", "8", "7"];

const FontSizeDropdown = () => {
  const [fontSize, setfontSize] = useState("14");

  const changeFont = (e) => {
    setfontSize(e.target.value);
  };
  return (
    <Fragment>
      <select value={fontSize} onChange={changeFont} className={size.numberbox}>
        {options.map((option) => {
          return (
            <option value={option} key={option} className={size.number}>
              {option}
            </option>
          );
        })}
      </select>
    </Fragment>
  );
};

export default FontSizeDropdown;
