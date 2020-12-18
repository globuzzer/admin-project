import React, { Fragment, useContext } from "react";
import { EditContext } from "./../../contexts/editContext";
import "./style.css";

export const HomeValue = ({ homeData, handleShowFeature }) => {
  const { editStyle } = useContext(EditContext);

  return (
    <Fragment>
      <div className="home_value_container">
        {homeData.map(({ image, title, text, id }, index) => (
          <div key={id} style={editStyle}>
            <div
              className="home_value"
              onClick={() => handleShowFeature(index)}
            >
              <img
                src={image}
                alt="iconic"
                className="value_img"
                width="48"
                height="48"
              />
              <div>
                <p type="text" className="value_caption">
                  {title}
                </p>
                <p className="value_description">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
