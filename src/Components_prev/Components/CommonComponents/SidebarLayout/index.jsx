import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaHome,
  FaRegCircle,
  FaRegDotCircle,
  FaTable,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdAppRegistration } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
// import TableViewIcon from '@mui/icons-material/TableView';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
// import { redirect } from "react-router-dom";
import { useNavigate,Link,useLocation} from "react-router-dom";

import "react-pro-sidebar/dist/css/styles.css";
// import { clearCookie } from "../../../commonHandler/clearCookie";
import styles from "./SidebarLayout.module.css";

const SidebarLayout = () => {

    const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  // const { pathname, locale, locales, defaultLocale, asPath } = useRouter();
 // const router = useRouter();
  const location = useLocation()
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(location.pathname);
  console.log(selectedItem);
  const matches = useMediaQuery("(max-width:1150px)");
  console.log(matches);
  useEffect(() => {
    if (matches) {
      setCollapsedSidebar(true);
    } else {
      setCollapsedSidebar(false);
    }
  }, [matches]);

  const logout = async () => {
    //clearCookie();
    //router.push("/");
    localStorage.removeItem('access_token');
    navigate('/')
  };
  return (
    <>
   <div id="sidebar">
      <ProSidebar
        style={{backgroundColor: "#fff" }}
        //className={styles["proSidebar-bgColor"]}
        // className={styles["prosidebar-main"]}
        collapsed={collapsedSidebar}
        // className={styles[`prosidebar-main`]}
      >
        <div className={styles["sidebar-header-wrapper"]}>
          <SidebarHeader onClick={() => setCollapsedSidebar((prev) => !prev)}>
            <h4 className={styles[`sideabar-header`]}>ETTMS</h4>
            <h2 className={styles[`sidebar-toggle-btn`]}>
              {collapsedSidebar === true ? (
                <FaArrowCircleRight />
              ) : (
                <FaArrowCircleLeft />
              )}
            </h2>
          </SidebarHeader>
        </div>

        <SidebarContent className={styles["sidebar-content"]}>
          {/* <Link href="/dashboard"> */}

          <Menu iconShape="circle" popperArrow={true}>
            <div
              className={
                selectedItem === "/home"
                  ? `${styles[`active-side-menu`]}`
                  : null
              }
            >
              <Tooltip
                title="Home"
                placement="right"
                arrow
                PopperProps={{
                  disablePortal: !collapsedSidebar,
                }}
              >
                <MenuItem
                  icon={<FaHome className={styles[`sidebar-menu-icon`]} />}
                  onClick={
                    () => navigate("/home")
                    // router.push("/dashboard", "/dashboard", locale = { locale })
                  }
                >
                  {/* <Link to="/home">Home</Link> */}
                  
                    Home
                </MenuItem>
              </Tooltip>
            </div>
            <div
              className={
                selectedItem === "/superAdminDashboard"
                  ? `${styles[`active-side-menu`]}`
                  : null
              }
            >
              <Tooltip
                title="Super Admin Dashboard"
                placement="right"
                arrow
                PopperProps={{
                  disablePortal: !collapsedSidebar,
                }}
              >
                <MenuItem
                  icon={
                    <RiDashboardLine className={styles[`sidebar-menu-icon`]} />
                  }
                  onClick={
                    () => navigate("/superAdminDashboard")
                    // router.push("/dashboard", "/dashboard", locale = { locale })
                  }
                >
                  {/* <Link to="/adminDashboard">Dashboard</Link> */}
                  
                  Super Admin Dashboard
                </MenuItem>
              </Tooltip>
            </div>
            <div
              className={
                selectedItem === "/adminDashboard"
                  ? `${styles[`active-side-menu`]}`
                  : null
              }
            >
              <Tooltip
                title="Admin Dashboard"
                placement="right"
                arrow
                PopperProps={{
                  disablePortal: !collapsedSidebar,
                }}
              >
                <MenuItem
                  icon={
                    <RiDashboardLine className={styles[`sidebar-menu-icon`]} />
                  }
                  onClick={
                    () => navigate("/adminDashboard")
                    // router.push("/dashboard", "/dashboard", locale = { locale })
                  }
                >
                  {/* <Link to="/adminDashboard">Dashboard</Link> */}
                  
                  Admin Dashboard
                </MenuItem>
              </Tooltip>
            </div>

            <div
              className={
                selectedItem === "/userDashboard"
                  ? `${styles[`active-side-menu`]}`
                  : null
              }
            >
              <Tooltip
                title="User Dashboard"
                placement="right"
                arrow
                PopperProps={{
                  disablePortal: !collapsedSidebar,
                }}
              >
                <MenuItem
                  icon={
                    <RiDashboardLine className={styles[`sidebar-menu-icon`]} />
                  }
                  onClick={
                    () => navigate("/userDashboard")
                    // router.push("/dashboard", "/dashboard", locale = { locale })
                  }
                >
                  {/* <Link to="/adminDashboard">Dashboard</Link> */}
                  
                  User Dashboard
                </MenuItem>
              </Tooltip>
            </div>
            <div
              className={
                selectedItem === "/trackBoard"
                  ? `${styles[`active-side-menu`]}`
                  : null
              }
            >
              <Tooltip
                title="TrackBoard"
                placement="right"
                arrow
                PopperProps={{
                  disablePortal: !collapsedSidebar,
                }}
              >
                <MenuItem
                  icon={
                    <RiDashboardLine className={styles[`sidebar-menu-icon`]} />
                  }
                  onClick={
                    () => navigate("/trackBoard")
                    // router.push("/dashboard", "/dashboard", locale = { locale })
                  }
                >
                  {/* <Link to="/adminDashboard">Dashboard</Link> */}
                  
                  Track Board
                </MenuItem>
              </Tooltip>
            </div>
            <div
              className={
                selectedItem === "/adminProfile"
                  ? `${styles[`active-side-menu`]}`
                  : null
              }
            >
              <Tooltip
                title="Admin Profile"
                placement="right"
                arrow
                PopperProps={{
                  disablePortal: !collapsedSidebar,
                }}
              >
                <MenuItem
                  icon={
                    <RiDashboardLine className={styles[`sidebar-menu-icon`]} />
                  }
                  onClick={
                    () => navigate("/adminProfile")
                  }
                >
                  
                  Admin Profile
                </MenuItem>
              </Tooltip>
            </div>
            </Menu>
            </SidebarContent>
        
        <SidebarFooter className={styles[`sidebar-footer`]}>
          <Menu
            iconShape="square"
            className={
              collapsedSidebar === false
                ? [
                    styles["sidebar-footer-menu"],
                    styles["sidebar-footer-menu-open"],
                  ].join(" ")
                : styles["sidebar-footer-menu"]
            }
          >
            <Tooltip
              title="Log out"
              placement="top"
              arrow
              PopperProps={{
                disablePortal: false,
              }}
            >
              <span onClick={() => logout()}>
                <MenuItem icon={<FiLogOut />}>LOG OUT</MenuItem>
              </span>
            </Tooltip>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
    </>
  )
}

export default SidebarLayout