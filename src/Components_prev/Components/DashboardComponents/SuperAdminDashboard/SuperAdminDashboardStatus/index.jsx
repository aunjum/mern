import { AiOutlineFileSearch, AiOutlineHeart } from "react-icons/ai";
import { BiMapPin, BiError } from "react-icons/bi";
import styles from "./SuperAdminDashboardStatus.module.css";

const SuperAdminDashboardStatus = () => {
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
          <p>100</p>
          <h6>Total number of Active Organization</h6>
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
          <p>4</p>
          <h6>Total Number of Inactive Organization</h6>
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
          <p>100</p>
          <h6>Total number of Admin</h6>
        </div>
      </div>
      {/* <div className={styles["dashboardStatuses-singleStatus"]}>
        <div
          className={`${styles["dashboardStatuses-singleStatus-leftSide"]} ${styles["fourth-status"]}`}
        >
          <div
            className={
              styles["dashboardStatus-singleStatus-leftSide-icon-wrapper"]
            }
          >
            <BiError />
          </div>
        </div>
        <div className={styles["dashboardStatuses-singleStatus-rightSide"]}>
          <p>1000</p>
          <h6>Total Number of Staff</h6>
        </div>
      </div> */}
      
    </div>
    </>
  )
}

export default SuperAdminDashboardStatus