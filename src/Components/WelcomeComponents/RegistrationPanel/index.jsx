import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
  } from "@mui/material";
  import { Form, Formik } from "formik";
  import debounce from "lodash.debounce";
//   import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import SyncLoader from "react-spinners/SyncLoader";
import LoginFooter from "../LoginFooter";
import LoginHeader from "../LoginHeader";
import WelcomeAnimation from "../WelcomeAnimation";
import WelcomeSlider from "../WelcomeSlider";
import RegistrationForm from "./RegistrationForm";
//   import registrationApi from "./registrationApiHandler/registrationApi";
//   import RegistrationErrorMsg from "./registrationMsg/RegistrationErrorMsg";
//   import RegistrationSuccessMsg from "./registrationMsg/RegistrationSuccessMsg";
  import styles from "./RegistrationPanel.module.css";
//   import ETTMSText from "/public/locals";

const Registration = () => {

    // const { locale } = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [age, setAge] = useState("");
  const [groupLevel, setGroupLevel] = useState([]);
  const [prevUserName, setPrevUserName] = useState("");
  const [userNameErrorFlag, setUserNameErrorFlag] = useState(false);
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registrationMsg, setRegistrationMsg] = useState({
    registrationSuccess: false,
    registrationError: false,
  });

  const registrationMsgClose = () => {
    setRegistrationMsg({
      registrationSuccess: false,
      registrationError: false,
    });
  };

//   useEffect(() => {
//     if (groupIds.success) {
//       setGroupLevel(groupIds.results);
//     }
//   }, [groupIds]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    //validUsername(event.target.value);
    console.log("userName", username);
  };

//   const validUsername = debounce(async (username) => {
//     if (!username) return false;
//     setPrevUserName(username);
//     setUsername(username);

//     console.log("====>", username);
//     const res = await fetch(
//       `https://tracktest.ultra-x.jp/api/user/check_username`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Accept: "application/json",
//         },
//         body: JSON.stringify({
//           username: username,
//           // password: values.password,
//         }),
//       }
//     );
//     const value = await res.json();
//     // const value = {
//     //   success: false
//     // };
//     console.log("user value", value);
//     if (value.success === true) {
//       setUserNameErrorFlag(false);
//     } else if (value.success === false) {
//       // False means usernam already exists
//       setUserNameErrorFlag(true);
//       setIsValid(false);
//     }
//     // return value.success;
//   }, 3000);

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    userLevel: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = async (values) => {
    setIsValid(true);
    let errors = {};

    if (!values.firstName) {
      errors.firstName =  "first name is required";
      setIsValid(false);
    }

    if (!values.lastName) {
      errors.lastName =  "last name is required";
      setIsValid(false);
    }

    if (!values.userName) {
      errors.userName =  "user name is required";
      setIsValid(false);
    } 
    // else if (values.userName !== prevUserName) {
    //   validUsername(values.userName);
      
    // }
   

    if (!values.userLevel) {
      errors.userLevel =  "userlavel is required";
      setIsValid(false);
    }

    if (!values.email) {
      errors.email =  "email is required";
      setIsValid(false);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email ="email match is required";
      setIsValid(false);
    }

    if (!values.password) {
      errors.password =  "password is required";
      setIsValid(false);
    } else if (
      !values.password.match(
        new RegExp("^(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z]).{8,72}$")
      )
    ) {
      errors.password = "at least 8 charactre long with letter";
      setIsValid(false);
    }

    if (!values.confirmPassword) {
      errors.confirmPassword =  "confirm password is required";
      setIsValid(false);
    } else if (values.confirmPassword != values.password) {
      errors.confirmPassword ="confirm password mismatch";
      setIsValid(false);
    }

    return errors;
  };

  
  const onSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    // create a timeout function for 5 second
    // setTimeout(() => {
    //   // after 5 second, redirect to home page
    //   setSubmitting(false);
    // }, 5000);
    //const res = await registrationApi(values);
    // const res = await fetch(
    //   "https://tracktest.ultra-x.jp/api/user/registration",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify({
    //       name1: values.firstName,
    //       name2: values.lastName,
    //       username: values.userName,
    //       group_id: values.userLevel,
    //       email: values.email,
    //       password: values.password,
    //     }),
    //   }
    // );
    // const value = await res.json();
    // console.log("Regi complete value", res);
    // if (res.success === true) {
    //   setRegistrationMsg({
    //     registrationSuccess: true,
    //     registrationError: false,
    //   });
    //   resetForm();
    //   // setRegiSuccessData(values);
    // } else {
    //   setRegistrationMsg({
    //     registrationSuccess: false,
    //     registrationError: true,
    //   });
    // }
    // setSubmitting(false);

    // alert(JSON.stringify(values, null, 2));
    // e.preventDefault()
    // router.push('/home')
  };
  return (
    <>

<div className={styles["welcome-panel-wrapper"]}>
     <LoginHeader/>
     <Grid container justifyContent="center" spacing={3} mt={1} ml={10}>
          <Grid
            item
            sm={0}
            md={4}
            mt={4}
            className={styles["registration-lottie-wrapper"]}
          >
            
            {/* <WelcomeSlider/> */}
            <WelcomeAnimation/>
          </Grid>
          <Grid item md={6} xs={12} justifyContent="center">
            <Box
              sx={{
                marginLeft: "5px",
              }}
            >
              
              {/* <Box
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
              </Box> */}
              <Box
                sx={{ width: "100%" }}
                className={styles["welcome-login-reg-side-wrapper"]}
              >
                <RegistrationForm/>
              </Box>

            </Box>
          </Grid>
        </Grid>
     <LoginFooter/>
   </div>
    
    </>
  )
}

export default Registration