import { Button, Drawer, Tooltip } from "@mui/material";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
// import SettingsSidebar from "../SettingsSidebar";
import styles from "./Header.module.css";
// import ETTMSText from "/public/locals";

const Header = () => {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
      };
  return (
    <>
    <div className={styles["LoginHeader-wrapper"]}>
      {/* <p>{ETTMSText[locale].welcomePage.headerTitle}</p> */}
      <p>Home</p>
      <Tooltip
        title= "Home Page"
        placement="bottom"
        arrow
      >
        <Button
          onClick={toggleDrawer("right", true)}
          id={styles["loginHeader-settings-btn"]}
        >
          <FiSettings />
        </Button>
      </Tooltip>

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <div>
          {/* <SettingsSidebar onClose={toggleDrawer("right", false)} /> */}
        </div>
      </Drawer>
    </div>
    </>
  )
}

export default Header