import React, { Fragment } from "react";
import edit from "./gift.module.css";

const GifCard = () => {
  return (
    <Fragment>
      <div className={edit.place}>
        <div className={edit.form}>
          <p className={edit.head}>Gif</p>
          <p className={edit.subhead}>
            The size of the gif should be maximum 5mb, and the format need to be
            GIF.
          </p>
          <div className={edit.upload}>
            <input type="file" name="images" />
            <button className={edit.btn} accept="video/*,.gif">
              Upload gif
            </button>
          </div>
        </div>
        <div className={edit.command}>
          <p id="apply">Apply</p>
          <p id="cancel">Cancel</p>
        </div>
      </div>
    </Fragment>
  );
};

export default GifCard;
