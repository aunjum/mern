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
import { useParams } from "react-router-dom";
  import SyncLoader from "react-spinners/SyncLoader";
// import LoginFooter from "../LoginFooter";
// import LoginHeader from "../LoginHeader";
// import WelcomeSlider from "../WelcomeSlider";
//   import registrationApi from "./registrationApiHandler/registrationApi";
//   import RegistrationErrorMsg from "./registrationMsg/RegistrationErrorMsg";
//   import RegistrationSuccessMsg from "./registrationMsg/RegistrationSuccessMsg";
  import styles from "./RegistrationForm.module.css";
  import jwt_decode from "jwt-decode";
import RegistrationApiHandlerForAdmin from "../RegistrationApiHandler/RegistrationApiHandlerForAdmin";
import { useNavigate } from "react-router-dom";
import RegistrationApiHandlerForUser from "../RegistrationApiHandler/RegistrationApiHandlerForUser";
//   import ETTMSText from "/public/locals";

const RegistrationForm = () => {

    // const { locale } = useRouter();
    const navigate = useNavigate();
    const {token} = useParams();
    const decodedToken = jwt_decode(token);
    const {organization_id,organization_name,group_id, group_name,email, permission_id,admin} = decodedToken;
    console.log(token);
    console.log("bla bla")
    console.log("id",organization_id);
    console.log("name",organization_name);
    console.log("group id",group_id);
    console.log("group name",group_name);
    console.log("email",email);
    console.log("permission id",permission_id);
    console.log("check admin", admin);
  const [isValid, setIsValid] = useState(false);
  const [age, setAge] = useState("");
  const [groupLevel, setGroupLevel] = useState([]);
  const [prevUserName, setPrevUserName] = useState("");
  const [userNameErrorFlag, setUserNameErrorFlag] = useState(false);
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isAdminCreate, setIsAdminCreate] = useState(false);
  const [isError, setIsError] = useState(false);
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

  const HandleRegistrationRedirect = () =>{
              navigate('/');  
  }

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
    password: "",
    confirmPassword: "",
  };

  const validate = async (values) => {
    setIsValid(true);
    let errors = {};

    if (!values.firstName) {
      errors.firstName =  "First name is required";
      setIsValid(false);
    }

    if (!values.lastName) {
      errors.lastName =  "Last name is required";
      setIsValid(false);
    }

    // if (!values.userName) {
    //   errors.userName =  "user name is required";
    //   setIsValid(false);
    // } 
    // else if (values.userName !== prevUserName) {
    //   validUsername(values.userName);
      
    // }
   

    // if (!values.userLevel) {
    //   errors.userLevel =  "userlavel is required";
    //   setIsValid(false);
    // }

    // if (!values.email) {
    //   errors.email =  "Email is required";
    //   setIsValid(false);
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email ="Email match is required";
    //   setIsValid(false);
    // }

    if (!values.password) {
      errors.password =  "Password is required";
      setIsValid(false);
    } else if (
      !values.password.match(
        new RegExp("^(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z]).{8,72}$")
      )
    ) {
      errors.password = "At least 8 character long with UpperCase, lowerCase and number";
      setIsValid(false);
    }

    if (!values.confirmPassword) {
      errors.confirmPassword =  "Confirm password is required";
      setIsValid(false);
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword ="Confirm password mismatch";
      setIsValid(false);
    }

    return errors;
  };

  
  const onSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    console.log("registration",values)
    console.log("inside submit", organization_name)
    if(admin === true)
    {
      const res = await RegistrationApiHandlerForAdmin(values,email,organization_id,permission_id)
      console.log("admin response", res);
      if(res.success === true)
    {
      console.log("admin create successfull")
      setIsAdminCreate(true);
      setIsError(false);
      setTimeout(HandleRegistrationRedirect, 1000)
    }
    else{
      console.log("fail")
      setIsError(true);
      setIsAdminCreate(false);
      setTimeout(HandleRegistrationRedirect, 2000)
    }
    }
    else{
      const res = await RegistrationApiHandlerForUser(values, email,organization_id,permission_id, group_id)
      console.log("user response", res);
      if(res.success === true)
    {
      console.log("user create successfull")
      setIsAdminCreate(true);
      setIsError(false);
      setTimeout(HandleRegistrationRedirect, 1000)
    }
    else{
      console.log("fail")
      setIsError(true);
      setIsAdminCreate(false);
      setTimeout(HandleRegistrationRedirect, 2000)
    }
    }
   
    // if(res.success === true)
    // {
    //   console.log("admin create successfull")
    //   setIsAdminCreate(true);
    //   setIsError(false);
    //   setTimeout(HandleRegistrationRedirect, 1000)
    // }
    // else{
    //   console.log("fail")
    //   setIsError(true);
    //   setIsAdminCreate(false);
    //   setTimeout(HandleRegistrationRedirect, 2000)
    // }
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


    <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => {
          return (
            <Form>
              <div className={styles["registration-wrapper"]}>
                <h2 className={styles["registration-header"]}>
                  Registration
                </h2>
                <Divider />
                {isAdminCreate && (
                  admin === true ?
                  <div className={styles["password-reset-email-success"]}>
                   Admin registration successfull
                  </div>
                  :
                  <div className={styles["password-reset-email-success"]}>
                  User registration successfull
                 </div>
                  
                )}
                {isError && (
                  admin === true ?
                  <div className={styles["password-reset-email-error"]}>
                    Admin already exists, Please Login
                  </div>
                  :
                  <div className={styles["password-reset-email-error"]}>
                  User already exists, Please Login
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
                 
                >   {admin === true ?
                    <div className={styles["registration-input-field"]}>
                    <FormControl fullWidth>
                      <TextField
                        id="organization"
                        name="organization"
                        label="Organization"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={organization_name}
                        InputProps={{
                            readOnly: true,
                          }}
                        error={
                          formik.touched.organization && Boolean(formik.errors.organization)
                        }
                      />
                      <span className={styles["error"]}>
                        {formik.touched.organization && formik.errors.organization ? (
                          <div>{formik.errors.organization}</div>
                        ) : null}
                      </span>
                    </FormControl>
                  </div>
                  :
                  <div className={styles["registration-input-field"]}>
                    <FormControl fullWidth>
                      <TextField
                        id="group"
                        name="group"
                        label="Group"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={group_name}
                        InputProps={{
                            readOnly: true,
                          }}
                        error={
                          formik.touched.group && Boolean(formik.errors.group)
                        }
                      />
                      <span className={styles["error"]}>
                        {formik.touched.group && formik.errors.group ? (
                          <div>{formik.errors.group}</div>
                        ) : null}
                      </span>
                    </FormControl>
                  </div>
                    } 

                  <div className={styles["registration-input-field"]}>
                    <FormControl fullWidth>
                      <TextField
                        id="user"
                        name="user"
                        label="User Name"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={email}
                        InputProps={{
                            readOnly: true,
                          }}
                        error={
                          formik.touched.user && Boolean(formik.errors.user)
                        }
                      />
                      <span className={styles["error"]}>
                        {formik.touched.user && formik.errors.user ? (
                          <div>{formik.errors.user}</div>
                        ) : null}
                      </span>
                    </FormControl>
                  </div>

                  <div className={styles["registration-input-field"]}>
                    <FormControl fullWidth>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <TextField
                              id="firstName"
                              name="firstName"
                              label="First Name"
                              variant="outlined"
                              size="small"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.firstName}
                              error={
                                formik.touched.firstName &&
                                Boolean(formik.errors.firstName)
                              }
                            />
                            <span className={styles["error"]}>
                              {formik.touched.firstName &&
                              formik.errors.firstName ? (
                                <div>{formik.errors.firstName}</div>
                              ) : null}
                            </span>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <TextField
                              id="lastName"
                              name="lastName"
                              label="Last Name"
                              variant="outlined"
                              size="small"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.lastName}
                              error={
                                formik.touched.lastName &&
                                Boolean(formik.errors.lastName)
                              }
                            />
                            <span className={styles["error"]}>
                              {formik.touched.lastName &&
                              formik.errors.lastName ? (
                                <div>{formik.errors.lastName}</div>
                              ) : null}
                            </span>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </div>

                  <div className={styles["registration-input-field"]}>
                    <FormControl fullWidth>
                      <TextField
                        id="password"
                        name="password"
                        label="password"
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
                  <div className={styles["registration-input-field"]}>
                    <FormControl fullWidth>
                      <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        label="confirm password"
                        type="password"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        error={
                          formik.touched.confirmPassword &&
                          Boolean(formik.errors.confirmPassword)
                        }
                      />
                      <span className={styles["error"]}>
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                          <div>{formik.errors.confirmPassword}</div>
                        ) : null}
                      </span>
                    </FormControl>
                  </div>
                </Box>
                <Stack>
                  {submitting ? (
                    <Button
                      type="submit"
                      variant="contained"
                      id={styles["registration-in-btn"]}
                    >
                      <SyncLoader />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      id={styles["registration-in-btn"]}
                    >
                      Registration
                    </Button>
                  )}
                </Stack>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  )
}

export default RegistrationForm