import React, { Fragment, useState } from "react";
import edit from "./gift.module.css";
import { app, firestore } from "../../utils/firebase.utils";

const GifCard = ({ communityVideo, setVideoEdit }) => {
  //state for gifs
  const [videos, setVideos] = useState(null);

  //uploading videos files on firestore
  const onVideoChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVideos(await fileRef.getDownloadURL());
    console.log("Uploaded video", file.name);
    // fileRef.put(file).then(() => {
    //   console.log("Uploaded video", file.name);
    // });
  };

  //updating video in firestore
  const updateVideoItem = (id) => {
    firestore.collection("video").doc("XPiJEPjddIdj2rf7404a").update({
      gif: videos,
    });
  };
  //update video content
  const updateVideoValue = () => {
    // console.log("Updated");
    const newVideo = { ...communityVideo };
    const id = newVideo.id;
    newVideo.gif = videos;
    setVideos(newVideo);
    // console.log("newVideo: ", newVideo);
    updateVideoItem(id);
  };

  //close video upload form
  const cancelVideoValue = () => {
    // console.log("Cancelled");
    setVideoEdit(false);
  };

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
            <input
              type="file"
              name="images"
              accept="video/*,.gif"
              onChange={onVideoChange}
            />
            <button className={edit.btn}>Upload gif</button>
          </div>
        </div>
        <div className={edit.command}>
          <p id="apply" onClick={updateVideoValue}>
            Apply
          </p>
          <p id="cancel" onClick={cancelVideoValue}>
            Cancel
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default GifCard;
