import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MemberNearYou } from "../MemberNearYou/MemberNearYou";
import MemberNearYouData from "../../Data/MemberNearYouData";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
// import join from "./join.module.css";

import Gunjan from "../../assets/Gunjan.png";
import Chloe from "../../assets/Chloe.png";
import Jonathan from "../../assets/Jonathan.png";
import Chloé from "../../assets/Asya.png";

export const JoinCommunity = () => {
  const { width } = GetWindowDimension();
  const Join = () => (
    <section className={join.join}>
      <div className={join.joinvideocontainer}>
        <video
          width="100%"
          autoPlay
          playsInline
          loop
          muted
          poster="https://www.mightynetworks.com/wp-content/themes/_mn2018/img/video-home-page-poster-new.png"
          className={join.video}
        >
          <source
            src="https://staging1.globuzzer.com/globuzzer_Liu/pages/vid.mp4"
            type="video/mp4"
          />
          <track kind="captions" />
        </video>
      </div>

      <div className={join.join_info}>
        <p id="join_title">Connect with expats and locals around the world</p>
        <p id="join_header">More than 180K expats and 32K members globally</p>
        <div className={join.join_member_list}>
          {MemberNearYouData.map((memberData, index) => (
            <MemberNearYou memberData={memberData} key={index} />
          ))}
        </div>
        <button type="button" className={join.joinbutton}>
          <Link to="/signup" className={join.joinbuttonanchor}>
            Join us
          </Link>
        </button>
      </div>
    </section>
  );
  const JoinMobile = () => (
    <div>
      <SectionHeader header="Top members to meet" />
      <div className={join.membermeetgrid}>
        <div />
        <div className={join.memberavacontainer}>
          <img src={Gunjan} alt="ava" className={join.memberava} />
          <p className={join.memberavaname}>Gunjan</p>
          <p className={join.memberavacity}>Lives in Stockholm</p>
        </div>
        <div />
        <div className={join.memberava_container}>
          <img src={Chloe} alt="ava" className={join.memberava} />
          <p className={join.memberavaname}>Chloe</p>
          <p className={join.memberavacity}>Lives in Amsterdam</p>
        </div>
        <div className={join.flipcard}>
          <div className={join.flipcardinner}>
            <div className={join.flipcardfront}>
              <FiPlus className={join.memberjoinicon} />
            </div>
            <button type="button" className={join.flipcardback}>
              <Link to="/signup" className={join.joinbuttonanchor}>
                Join us
              </Link>
            </button>
          </div>
        </div>
        <div className={join.memberavacontainer}>
          <img src={Chloé} alt="ava" className={join.memberava} />
          <p className={join.memberavaname}>Chloé</p>
          <p className={join.memberavacity}>Lives in Paris</p>
        </div>
        <div />
        <div className={join.memberavacontainer}>
          <img src={Jonathan} alt="ava" className={join.memberava} />
          <p className={join.memberavaname}>Jonathan</p>
          <p className={join.memberavacity}>Lives in Stockholm</p>
        </div>
        <div />
      </div>
    </div>
  );
  return <>{width > 1100 ? <Join /> : <JoinMobile />}</>;
};
