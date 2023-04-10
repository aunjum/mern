import React, {useEffect, useState} from 'react'
import { AiOutlineFileSearch, AiOutlineHeart } from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import styles from "./UserDashboardStatus.module.css";

const UserDashboardStatus = () => {
  const [projectCount, setProjectCount] = useState(0);

  useEffect(()=>{
    const accessToken = localStorage.getItem('access_token');
    const FetchData = async() => {
      const response = await fetch('https://tracktest.ultra-x.jp/backend/users/showAllProjectsDetailsOfFollowingUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const statusData = await response.json();
      console.log('__status data', statusData);
      setProjectCount(statusData?.body?.projects?.length);
      console.log('__project count', projectCount);
    }
    FetchData()
  },[projectCount])

  return (
    <>
    <div className={styles["dashboardStatuses-wrapper"]}>
      <div className={styles["dashboardStatuses-singleStatus"]}>
        <div
          className={`${styles["dashboardStatuses-singleStatus-leftSide"]} ${styles["first-status"]}`}
        >
          <div
            className={
              styles["dashboardStatus-singleStatus-leftSide-icon-wrapper"]
            }
          >
            <AiOutlineHeart />
          </div>
        </div>
        <div className={styles["dashboardStatuses-singleStatus-rightSide"]}>
          <p>{projectCount}</p>
          <h6>Total number of Project</h6>
        </div>
      </div>
      <div className={styles["dashboardStatuses-singleStatus"]}>
        <div
          className={`${styles["dashboardStatuses-singleStatus-leftSide"]} ${styles["second-status"]}`}
        >
          <div
            className={
              styles["dashboardStatus-singleStatus-leftSide-icon-wrapper"]
            }
          >
            <AiOutlineFileSearch />
          </div>
        </div>
        <div className={styles["dashboardStatuses-singleStatus-rightSide"]}>
          <p>476</p>
          <h6>Total Number of track ID</h6>
        </div>
      </div>
      <div className={styles["dashboardStatuses-singleStatus"]}>
        <div
          className={`${styles["dashboardStatuses-singleStatus-leftSide"]} ${styles["third-status"]}`}
        >
          <div
            className={
              styles["dashboardStatus-singleStatus-leftSide-icon-wrapper"]
            }
          >
            <BiMapPin />
          </div>
        </div>
        <div className={styles["dashboardStatuses-singleStatus-rightSide"]}>
          <p>947</p>
          <h6>Total number of device ID</h6>
        </div>
      </div>
      
    </div>
    
    </>
  )
}

export default UserDashboardStatus