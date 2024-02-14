"use client";
import styles from "./maincontainer.module.css";
import { AiOutlineStock, AiOutlineSlack, AiOutlineSliders, AiOutlineSetting, AiOutlineDeploymentUnit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {React, useState} from 'react';

const MainContainer = ({ children, className = " ", ...props }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const selectTab = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.welcomebox}>
          <img src="/circlepfp.png" alt=' ' className={styles.avatar}></img>
          <div>Bahpu</div>
        </div>
        <hr className={styles.divider}></hr>
        <div>
        <div className={`${styles.navbutton} ${selectedTab === 1 ? styles.selected : ''}`} onClick={() => { selectTab(1); navigate('/dashboard/mainpage');}}> <AiOutlineSliders /> Tracker</div>
        <div className={`${styles.navbutton} ${selectedTab === 2 ? styles.selected : ''}`} onClick={() => {navigate('/dashboard/'); selectTab(2)}}>  <AiOutlineDeploymentUnit /> Dashboard </div>
        <div className={`${styles.navbutton} ${selectedTab === 3 ? styles.selected : ''}`} onClick={() => {navigate('/dashboard/investments'); selectTab(3)}}>  <AiOutlineStock /> Investments</div>
        <div className={`${styles.navbutton} ${selectedTab === 4 ? styles.selected : ''}`} onClick={() => {navigate('/dashboard/inventory'); selectTab(4)}}> <AiOutlineSlack /> Inventory</div>
        <div className={`${styles.navbutton} ${selectedTab === 5 ? styles.selected : ''}`} onClick={() => {navigate('/dashboard/tracker'); selectTab(5)}}> <AiOutlineSliders /> Tracker</div>
        <div className={styles.navbutton}> <AiOutlineSetting /> Settings</div>
        </div>
        <hr className={styles.divider}></hr>
        <div>
          <div className={styles.navbutton}>Later Use</div>
          <div className={styles.navbutton}>Graph</div>
          <div className={styles.navbutton}>Kutta</div>
          <div className={styles.navbutton}>Misc #2</div>
        </div>
        <hr className={styles.divider}></hr>
      </div>
      <div className={styles.right}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
