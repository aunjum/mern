import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
// import { useRouter } from "next/router";
import { useState, useContext } from "react";
import SyncLoader from "react-spinners/SyncLoader";
// import { clearCookie } from "../../../commonHandler/clearCookie";
// import ForgetPassword from "../ForgetPassword";
// import checkUserVerify from "./loginApiHandler/checkUserVerify";
// import loginApi from "./loginApiHandler/loginApi";
// import EmptyEmailErrorMsg from "./loginErrorMsg/EmptyEmailErrorMsg";
// import UnapprovedUserErrorMsg from "./loginErrorMsg/UnapprovedUserErrorMsg";
// import UnknownError from "./loginErrorMsg/UnknownError";
// import UnverifiedEmailErrorMsg from "./loginErrorMsg/UnverifiedEmailErrorMsg";
// import UsernameOrPassErrorMsg from "./loginErrorMsg/UsernameOrPassErrorMsg";
import styles from "./LoginForm.module.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginApi from "../LoginApiHandler/LoginApi";
import { TokenContext } from "../../../CommonComponents/Contexts/TokenContext";
// import ETTMSText from "/public/locals";

const LoginForm = () => {
  // const tokenValue = useContext(TokenContext);
  // console.log("inside the logoin",tokenValue);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [logingError, setLogingError] = useState({
    unKnownError: false,
    unverifiedEmailError: false,
    unapprovedUserError: false,
    emptyEmailError: false,
    usernameOrPassError: false,
  });
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();
  // const { locale } = useRouter();
  // const router = useRouter();

  const errorClose = () => {
    setLogingError({
      unKnownError: false,
      unverifiedEmailError: false,
      unapprovedUserError: false,
      emptyEmailError: false,
      usernameOrPassError: false,
    });
  };

  const HandleLoginRedirect = () =>{
    navigate('/home')
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};

    // if (!values.userName) {
    //   errors.userName = "username is required";
    //   setIsValid(false);
    // }
    if (!values.email) {
      errors.email =  "Email is required";
      setIsValid(false);
    } 
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email ="Email address mismatch";
      setIsValid(false);
    }

    if (!values.password) {
      errors.password = "Password is required";
      setIsValid(false);
    }

    return errors;
  };

  // const loginFormSubmit = (e) => {
  //   e.preventDefault()
  //   router.push('/home')
  // }
  const onSubmit = async (values) => {
    // alert(JSON.stringify(values))
    // console.log(values)
    
    // setIsLoading(true);
    // clearCookie();
    localStorage.removeItem('access_token');
    const res = await LoginApi(values);
    console.log("login res", res);
    if(res.success === true)
    {
      localStorage.setItem("access_token", res.access_token)
      console.log(localStorage.getItem('access_token'));
      setIsLoginSuccess(true);
      setIsError(false);
      setTimeout(HandleLoginRedirect, 1000)
      //navigate("/home")
    }
    else{
      setIsLoginSuccess(false);
      setIsError(true);
    }
    // if (res.success && res.verified) {
    //   console.log(res);
    //   console.log(" login success");
    //   document.cookie = `accessToken=${res.token}; path=/`;
    //   setAccessToken(res.token);
    //   router.push("/home");
    // } else if (res.success && res.verified === false) {
    //   document.cookie = `accessToken=${res.token}; path=/`;
    //   setAccessToken(res.token);

    //   const userVerifyType = await checkUserVerify(res.token);
    //   console.log("verify res", userVerifyType);

    //   if (userVerifyType.success && userVerifyType.email === "") {
    //     setLogingError({
    //       unKnownError: false,
    //       unverifiedEmailError: false,
    //       unapprovedUserError: false,
    //       emptyEmailError: true,
    //       usernameOrPassError: false,
    //     });
    //   } else if (userVerifyType.success && !userVerifyType.email_verified) {
    //     setLogingError({
    //       unKnownError: false,
    //       unverifiedEmailError: true,
    //       unapprovedUserError: false,
    //       emptyEmailError: false,
    //       usernameOrPassError: false,
    //     });
    //   } else if (userVerifyType.success && !userVerifyType.user_verified) {
    //     setLogingError({
    //       unKnownError: false,
    //       unverifiedEmailError: false,
    //       unapprovedUserError: true,
    //       emptyEmailError: false,
    //       usernameOrPassError: false,
    //     });
    //   } else {
    //     setLogingError({
    //       unKnownError: true,
    //       unverifiedEmailError: false,
    //       unapprovedUserError: false,
    //       emptyEmailError: false,
    //       usernameOrPassError: false,
    //     });
    //     clearCookie();
    //   }
    //   console.log(res);
    // } else if (
    //   !res.success &&
    //   (res.error_code === 12100 || res.error_code === 12150)
    // ) {
    //   setLogingError({
    //     unKnownError: false,
    //     unverifiedEmailError: false,
    //     unapprovedUserError: false,
    //     emptyEmailError: false,
    //     usernameOrPassError: true,
    //   });
    //   clearCookie();
    // } else {
    //   setLogingError({
    //     unKnownError: true,
    //     unverifiedEmailError: false,
    //     unapprovedUserError: false,
    //     emptyEmailError: false,
    //     usernameOrPassError: false,
    //   });
    //   clearCookie();
    // }
    // setIsLoading(false);
  };

  return (
    <>
    <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => {
          return (
            <Form>
              <div className={styles["login-wrapper"]}>
                <h2 className={styles["login-header"]}>
                  Login
                </h2>
                <Divider />
                {isLoginSuccess && (
                  <div className={styles["login-success-message"]}>
                    Congratulation successfully login
                  </div>
                )}
                {isError && (
                  <div className={styles["login-error-message"]}>
                    Email or Password is Incorrect
                  </div>
                )}
                <hr/>
                <br />
                <Box
                  sx={{
                    "& > :not(style)": {
                      m: 0,
                      width: "100%",
                      marginBottom: "1rem",
                    },
                  }}
                >
                  <div>
                    <FormControl className={styles["login-form"]} fullWidth>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={
                          formik.touched.email &&
                          Boolean(formik.errors.email)
                        }
                      />
                      <span className={styles["error"]}>
                        {formik.touched.email && formik.errors.email ? (
                          <div>{formik.errors.email}</div>
                        ) : null}
                      </span>
                    </FormControl>
                  </div>

                  <div className={styles["login-input-field"]}>
                    <FormControl className={styles["login-form"]} fullWidth>
                      <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                      />
                      <span className={styles["error"]}>
                        {formik.touched.password && formik.errors.password ? (
                          <div>{formik.errors.password}</div>
                        ) : null}
                      </span>
                    </FormControl>
                  </div>
                </Box>
                <Stack>
            
                  {/* <ForgetPassword /> */}
                </Stack>
                <Stack>
                  
                  <Button
                    type="submit"
                    disabled={!isValid && !isLoading}
                    variant="contained"
                    id={styles["login-in-btn"]}
                  >
                    {isLoading ? (
                      <SyncLoader />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Stack>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  )
}

export default LoginForm;