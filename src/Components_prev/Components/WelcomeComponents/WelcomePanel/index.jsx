
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import LoginFooter from "../LoginFooter";
import LoginHeader from "../LoginHeader";
// import LoginHeader from "../../commonComponents/Header";
// import LoginFooter from "../LoginFooter";
// import Login from "../LoginPanel";
// import RegistrationLottie from "../registration-lottie";
// import Registration from "../RegistrationPanel";
import styles from "./WelcomePanel.module.css";
import {
    Routes,
    Route,
    useSearchParams,
    useHistory,
    BrowserRouter
  } from "react-router-dom"
import { useLocation,useNavigate } from 'react-router-dom';
import Login from "../LoginPanel";
import Registration from "../RegistrationPanel";
import WelcomeSlider from "../WelcomeSlider";
// import { useRouter } from "../../CustomHooks/CustomUseRouterHook";

const WelcomePanel = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const location = useLocation()
    const navigate = useNavigate();
    console.log(location.pathname);
    const [searchParams] = useSearchParams();
    // const [queryParameters] = useSearchParams();
    const search = useLocation().search;
    

    useEffect(() => {
      
        const tab =
        new URLSearchParams(search).get("tab") === "login"
            ? 0
            :  new URLSearchParams(search).get("tab") === "registration"
            ? 1
            : 0;
        setSelectedTab(tab);
        console.log(new URLSearchParams(search).get("tab"));
        console.log(tab);
        console.log(selectedTab)
        // const url = new URLSearchParams(search).get("tab");
        // url === "login" ? setSelectedTab(0): url ==="registration"? setSelectedTab(1): setSelectedTab(0)
      });

    const handleTabChange = (event, newValue) =>{
      newValue === 0 ? navigate("/?tab=login") : navigate("/?tab=registration")
      
        // if (newValue === 0) {
        //     navigate("/?tab=login");
        //   } else {
        //    navigate("/?tab=registration");
        //   }
       
    }
  return (
   <>
   <div className={styles["welcome-panel-wrapper"]}>
     <LoginHeader/>
     <Grid container justifyContent="center" spacing={3} mt={1} ml={10}>
          <Grid
            item
            sm={0}
            md={4}
            className={styles["registration-lottie-wrapper"]}
          >
            
            <WelcomeSlider/>
          </Grid>
          <Grid item md={6} xs={12} justifyContent="center">
            <Box
              sx={{
                marginLeft: "5px",
              }}
            >
              
              <Box
                sx={{
                  width: "50vw",
                  bgcolor: "background.paper",
                  marginBottom: "1rem",
                  marginTop: "0rem",
                  // marginLeft: "5px",
                }}
              >
                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                  <Tab label={"Login"} />
                  <Tab
                    label={"Registration"}
                  />
                </Tabs>
              </Box>
              <Box
                sx={{ width: "100%" }}
                className={styles["welcome-login-reg-side-wrapper"]}
              >
                { new URLSearchParams(search).get("tab") === "login" ? (
                  // <Login />
                  <Login/>
                ) :  new URLSearchParams(search).get("tab") === "registration" ? (
                  // <Registration groupIds={groupIds} />
                  // <Registration/>
                  <h1>registration</h1>
                ) : (
                  <Login />
                  
                )}
              </Box>

            </Box>
          </Grid>
        </Grid>
     <LoginFooter/>
   </div>
   </>
  )
}

export default WelcomePanel;