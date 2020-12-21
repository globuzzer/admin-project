import React from "react";
import commune from "./commune.module.css";
import FontWeight from "./../GifCard/FontDropdown/FontWeight";
import FontSizeDropdown from "./../GifCard/FontDropdown/FontSizeDropdown";
import align from "./../../assets/align.svg"

const TextForm = () => {
  return (
    <div>
      {/* Creating edit tooltip box for text*/}
      <span className={commune.tooltiptext}>
        <div className={commune.arrowDown} />
        {/* Font size fontweight change */}
        <div className="col-sm-4 col-sm-push-4">
          <FontSizeDropdown />
          <FontWeight />
        </div>
        <div>
          <input type="color" className="coloured" defaultValue="#C4C4C4" />
        </div>
        <img src={align} alt="align-text" />
      </span>
    </div>
  );
};

export default TextForm;
