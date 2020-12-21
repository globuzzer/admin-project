import Dropdown from "./../../pages/Admin/BannerForm/Dropdown";
import { sizes, weights, aligns } from "./../../pages/Admin/BannerForm/Data";
import React, { useState, useContext, useEffect } from "react";
import { EditContext } from "./../../contexts/editContext";
import edit from "./../../pages/Admin/BannerForm/BannerForm.module.css";

const TextEditForm = () => {
  // values for drop-down lists
  const [fontSizes] = useState(sizes);
  const [fontWeights] = useState(weights);
  const [textAligns] = useState(aligns);

  const {
    showTextForm,
    setShowTextForm,
    headerID,
    currentText,
    showJoinTextForm,
    setShowJoinTextForm,
    headerJoinID,
  } = useContext(EditContext);

  // manage display and position of popping-up forms
  const formTextStyle = !showJoinTextForm
    ? { display: "none" }
    : {
        position: "",
        top: headerJoinID === 1 ? "300px" : "400px",
        left: "750px",
      };
  // set the default values for drop-down lists font size and weight
  const [defaultSize, setDefaultSize] = useState("");
  const [defaultWeight, setDefaultWeight] = useState("");
  const [defaultColor, setDefaultColor] = useState("");
  const [defaultAlign, setDefaultAlign] = useState("");

  useEffect(() => {
    setDefaultSize(currentText.style.fontSize.substring(0, 2, -1));
    setDefaultWeight(currentText.style.fontWeight);
    setDefaultColor(currentText.style.color);
    setDefaultAlign(currentText.style.textAlign);
  }, [currentText]);

  const handleColorChange = (e) => {
    currentText.style.color = e.target.value;
    setDefaultColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    e.preventDefault();
    currentText.style.fontSize = e.target.value + "px";
    setDefaultSize(e.target.value);
  };

  const handleWeightChange = (e) => {
    currentText.style.fontWeight = e.target.value;
    setDefaultWeight(e.target.value);
  };

  const handleAlignChange = (e) => {
    currentText.style.textAlign = e.target.value;
    setDefaultAlign(e.target.value);
  };

  return (
    <div>
      <div
        className={edit.title}
        style={formTextStyle}
        onClick={() => setShowJoinTextForm(false)}
      >
        {/* <div className={edit.arrowDown}></div> */}
        <span>
          <Dropdown
            items={fontSizes}
            defaultValue={defaultSize}
            styleChange={handleSizeChange}
          />
        </span>
        <span>
          <Dropdown
            items={fontWeights}
            defaultValue={defaultWeight}
            styleChange={handleWeightChange}
          />
        </span>
        <form>
          <input
            type="color"
            value={defaultColor}
            name="style.color"
            onChange={handleColorChange}
          />
        </form>
        {/* <img src="/images/sizer.png" alt="" /> */}
        <Dropdown
          items={textAligns}
          defaultValue={defaultAlign}
          styleChange={handleAlignChange}
        />
      </div>
    </div>
  );
};

export default TextEditForm;
