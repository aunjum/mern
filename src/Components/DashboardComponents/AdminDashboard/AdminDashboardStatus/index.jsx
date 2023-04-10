import { AiOutlineFileSearch, AiOutlineHeart } from "react-icons/ai";
import { BiMapPin, BiError } from "react-icons/bi";
import styles from "./AdminDashboardStatus.module.css";

const AdminDashboardStatus = () => {
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
          <p>50000</p>
          <h6>Total number of user</h6>
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
          <p>40000</p>
          <h6>Active User</h6>
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
          <p>9000</p>
          <h6>Inactive User</h6>
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
          <p>1000</p>
          <h6>Total Number of Staff</h6>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default AdminDashboardStatus