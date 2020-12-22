import React, { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MemberNearYou } from "../MemberNearYou/MemberNearYou";
import MemberNearYouData from "../../Data/MemberNearYouData";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import "./style.css";
import commune from "./commune.module.css";
//import align from "./../../assets/align.svg";
// import arrow from "./../../assets/arrowdown.svg";

import Gunjan from "../../assets/Gunjan.png";
import Chloe from "../../assets/Chloe.png";
import Jonathan from "../../assets/Jonathan.png";
import Chloé from "../../assets/Asya.png";
import { FaJournalWhills } from "react-icons/fa";
import GifCard from "../GifCard/GifCard";
import FontSizeDropdown from "../GifCard/FontDropdown/FontSizeDropdown";
import FontWeight from "../GifCard/FontDropdown/FontWeight";
import { EditContext } from "../../contexts/editContext";
import TextEditForm from "../TextEditForm/TextEditForm";
import TextForm from "./TextForm";
import { firestore } from "../../utils/firebase.utils";
import { Fragment } from "react";

export const JoinCommunity = ({ contentEditable }) => {
  //state for edit video form
  const [showVideoEdit, setVideoEdit] = useState(false);

  //toggling edit video form
  const handleVideoEdit = () => setVideoEdit(true);

  const { width } = GetWindowDimension();
  const {
    editStyle,
    communityText,
    handleCommChangeText,
    handleShowJoinForm,
    setCommCurrentText,
  } = useContext(EditContext);

  // select the clicked 'text'
  const getCurrentCommText = (e) => {
    const newCommunityText = communityText.filter((community) => {
      return community.id === e.target.id;
    });
    setCommCurrentText(newCommunityText[0]);
  };

  const Join = () => (
    <Fragment>
      <div className="join_video_container joiners" onClick={handleVideoEdit}>
        {communityText.reduce((currentValue, video) => {
          return (
            <video
              key={video.id}
              id={video.id}
              name={video.id}
              style={{ ...editStyle, ...video.style }}
              width="100%"
              autoPlay
              playsInline
              loop
              muted
              poster="https://www.mightynetworks.com/wp-content/themes/_mn2018/img/video-home-page-poster-new.png"
              className="video"
            >
              <source src={video.gif} type="video/mp4" />
              <track kind="captions" />
            </video>
          );
        }, "")}
      </div>
      {showVideoEdit && (
        <GifCard setVideoEdit={setVideoEdit} communityText={communityText} />
      )}
    </Fragment>
  );

  const JoinMobile = () => (
    <div>
      <SectionHeader header="Top members to meet" />
      <div className="member_meet_grid">
        <div />
        <div className="member_ava_container">
          <img src={Gunjan} alt="ava" className="member_ava" />
          <p className="member_ava_name">Gunjan</p>
          <p className="member_ava_city">Lives in Stockholm</p>
        </div>
        <div />
        <div className="member_ava_container">
          <img src={Chloe} alt="ava" className="member_ava" />
          <p className="member_ava_name">Chloe</p>
          <p className="member_ava_city">Lives in Amsterdam</p>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <FiPlus className="member_join_icon" />
            </div>
            <button type="button" className="flip-card-back">
              <Link to="/signup" className="join_button_anchor">
                Join us
              </Link>
            </button>
          </div>
        </div>
        <div className="member_ava_container">
          <img src={Chloé} alt="ava" className="member_ava" />
          <p className="member_ava_name">Chloé</p>
          <p className="member_ava_city">Lives in Paris</p>
        </div>
        <div />
        <div className="member_ava_container">
          <img src={Jonathan} alt="ava" className="member_ava" />
          <p className="member_ava_name">Jonathan</p>
          <p className="member_ava_city">Lives in Stockholm</p>
        </div>
        <div />
      </div>
    </div>
  );

  return <>{width > 1100 ? <Join /> : <JoinMobile />}</>;
};
