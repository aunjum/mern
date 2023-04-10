import { AiOutlineFileSearch, AiOutlineHeart } from "react-icons/ai";
import { BiMapPin, BiError } from "react-icons/bi";
import styles from "./ChartStatus.module.css";

const ChartStatus = () => {
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
          <p>165</p>
          <h6>Number of Track ID</h6>
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
          <p>30</p>
          <h6>Tracking</h6>
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
          <p>12</p>
          <h6>Terminated Tracking</h6>
        </div>
      </div>
      <div className={styles["dashboardStatuses-singleStatus"]}>
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
          <p>123</p>
          <h6>Tracking Not Started</h6>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default ChartStatus