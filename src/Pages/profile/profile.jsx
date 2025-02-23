import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./profile.module.css";
import MainContainer from "../../components/maincontainer/maincontainer";
import SubContainer from "../../components/subcontainer/subcontainer";
import Axios from "../../api/agent";
import { AiFillDollarCircle, AiFillHeart, AiFillCreditCard, AiFillCalculator } from "react-icons/ai";
import ProfileModal from "../../components/profilemodal/profilemodal";
import BadgeModal from "../../components/profilemodal/badgemodal";
import BioModal from "../../components/profilemodal/biomodal";

import { CiCirclePlus } from "react-icons/ci";

function Profile() {
  const [userData, setUserData] = useState(null);
  const { username } = useParams();
  const [modal, setModal] = useState(false);
  const [badgeModal, setBadgeModal] = useState(false);
  const [bioModal, setBioModal] = useState(false);
  const [currentID, setCurrentID] = useState(0);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleBadgeModal = (newID) => {
    setCurrentID(newID);
    setBadgeModal(!badgeModal);
  };

  const toggleBioModal = () => {
    setBioModal(!bioModal);
  }
  const renderBadges = () => {
    if (userData && userData.badges) {
      const filteredBadges = Object.values(userData.badges).filter((badge) => badge.value === 1 && badge.profilePosition !== -1);
      filteredBadges.sort((a, b) => a.profilePosition - b.profilePosition);

      const badgeComponents = [];
      const maxBadges = 4;

      filteredBadges.slice(0, maxBadges).forEach((badge, index) => {
        const badgeComponent = (
          <div
            key={index}
            className={styles.badge}
            onClick={() => {
              toggleBadgeModal(index);
            }}
          >
            <img src={badge.image} className={styles.badgeImage} />
          </div>
        );
        badgeComponents.push(badgeComponent);
      });

      const emptySlots = maxBadges - badgeComponents.length;
      for (let i = 0; i < emptySlots; i++) {
        badgeComponents.push(
          <div
            key={`empty-${i}`}
            className={styles.badge}
            onClick={() => {
              toggleBadgeModal(i + 1);
            }}
          >
            <CiCirclePlus />
          </div>
        );
      }

      return <div className={styles.badgeRow}>{badgeComponents}</div>;
    }
    return null;
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await Axios("/api/user/username/exists", "POST", {
          username,
        });
        const userID = response.id;

        const date = new Date(response.registeredAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);

        const formattedDay = day < 10 ? "0" + day : day;
        const formattedMonth = month < 10 ? "0" + month : month;

        const finalDate = `${formattedDay}/${formattedMonth}/${year}`;
        response.registeredAt = finalDate;

        setUserData(response);
        // setUserPos(leaderboardPos)
      } catch (error) {
        // throw error using toast
      }
    };

    if (username) {
      getUser();
    }
  }, [username]);

  if (!username || !userData)
    return (
      <MainContainer>
        <SubContainer>
          <div className={styles.subContainer} />
        </SubContainer>
      </MainContainer>
    );

  return (
    <>
      <MainContainer>
        <SubContainer>
          <ProfileModal modal={modal} toggleModal={toggleModal}></ProfileModal>
          <BadgeModal modal={badgeModal} toggleModal={toggleBadgeModal} positionID={currentID}></BadgeModal>
          <BioModal modal={bioModal} toggleModal={toggleBioModal}></BioModal>
          <div className={styles.flex}>
            <div className={styles.subContainer}>
              <div className={styles.subContainerSep}>
                <div className={styles.subContainerTitle}>
                  <div className={styles.avatarWrapper}>
                    <img data-testid="cypress-profile-picture" src={`${userData.profilePicture}`} alt=" " className={styles.avatar} onClick={() => toggleModal()}></img>
                  </div>
                  <span>{userData ? userData.username : ""}</span>
                </div>

                <div className={styles.metricFlex}>
                  <div className={styles.metricBlock}>
                    <div className={styles.metricTitleContainer}>
                      <div className={styles.metricTitle}> Net Worth </div>
                      <div className={styles.metricTitleValue}>
                        <AiFillCreditCard size={22} />
                      </div>
                    </div>
                    <div className={styles.metricValueNetWorth}>
                      <span className={styles.dollarNetWorth}>$</span>
                      {userData.netWorth.toFixed(2)}
                    </div>
                  </div>

                  <div className={styles.metricBlock}>
                    <div className={styles.metricTitleContainer}>
                      <div className={styles.metricTitle}> Balance </div>
                      <div className={styles.metricTitleValue}>
                        <AiFillCalculator size={22} />
                      </div>
                    </div>
                    <div className={styles.metricValue}>
                      <span className={styles.dollar}>$</span>
                      {userData.balance.toFixed(2)}
                    </div>
                  </div>

                  <div className={styles.metricBlock}>
                    <div className={styles.metricTitleContainer}>
                      <div className={styles.metricTitle}> Leaderboard Position </div>
                      <div className={styles.metricTitleValue}>
                        {" "}
                        <AiFillDollarCircle size={22} />
                      </div>
                    </div>
                    <div className={styles.metricValue}>
                      <span className={styles.dollar}>#</span>123
                    </div>
                  </div>

                  <div className={styles.metricBlock}>
                    <div className={styles.metricTitleContainer}>
                      <div className={styles.metricTitle}> Join Date </div>
                      <div className={styles.metricTitleValue}>
                        <AiFillHeart size={22} />
                      </div>
                    </div>
                    <div className={styles.metricValue}>
                      <span className={styles.dollar}></span>
                      {userData.registeredAt}
                    </div>
                  </div>
                </div>
                <div className={styles.bioBlock} onClick={() => toggleBioModal()}>
                  <div className={styles.bioTitle}>Profile Bio</div>
                  <div className={styles.bioBody}>{userData.bio}</div>
                </div>

                <div className={styles.badgeBlock}>
                  <div className={styles.bioTitle}>Badge Showcase</div>
                  <div className={styles.bioBody}>
                    <div className={styles.badgeContainer}>{renderBadges()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SubContainer>
      </MainContainer>
    </>
  );
}

export default observer(Profile);
