<<<<<<< HEAD
import React, { useContext } from 'react';
import Home from '../../Home';
import SideNav from '../SideNav/SideNav';
import styles from './AdminLanding.module.css';
import {IoMdArrowDropright} from 'react-icons/io';
import {Link} from 'react-router-dom';
import TopNav from '../TopNav/TopNav';
import { EditContext } from '../../../contexts/editContext';
const AdminLanding = () => {
  const { editMode, handleEditMode} = useContext(EditContext);
=======
import React, { useState } from "react";
import Home from "../../Home";
import SideNav from "../SideNav/SideNav";
import styles from "./AdminLanding.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import "./AdminLanding.css";
const AdminLanding = () => {
    const editContent = () => {
        document.querySelector('.editBtn').hidden = true;
       [ ...document.querySelectorAll('.content-editable')].forEach((element)=>{
           element.setAttribute('contenteditable', true);
           element.classList.add('edit-mode');
       })
    }
>>>>>>> master
    return (
        <div className={styles.wrapper}>
            <TopNav/>
            <div className={styles.container}>
            <section className={styles.sidenav}>
                <div className={styles.navLink}>
                    <Link to="/dashboard" className={styles.dashboardLink}>Dashboard</Link>
                    <IoMdArrowDropright color="#F26678" size="25px"/>
                    <Link to="/landing" className={styles.landingLink}>Landing Page</Link>
                </div>
                <SideNav/>
            </section>
            <section className={styles.main}>
<<<<<<< HEAD
            {!editMode ?
                (<button className={styles.editBtn} onClick={handleEditMode}>Edit it</button>) :
                (<div>
                  <button className={styles.svrBtn}>Save it</button>
                  <button className={styles.svrBtn}>View it</button>
                  <button className={styles.svrBtn}>Release it</button>
                 </div>
                )
                }
                {  <Home contentEditable={editMode ? true : false} editMode={editMode}/> }
=======
                <button className="editBtn" onClick={()=>editContent()}>Edit it</button>
                <Home/>
>>>>>>> master
            </section>
            </div>
          </div>
  );
};

export default AdminLanding;
