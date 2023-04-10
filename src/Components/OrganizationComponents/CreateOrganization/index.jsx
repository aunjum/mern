// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
// import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./CreateOrganization.module.css";
import CloseIcon from '@mui/icons-material/Close';
import CreateOrganizationApi from "./OrganizationApi/CreateOrganizationApiHandler";
// import { ToastContainer, toast } from 'react-toastify';
// import ETTMSText from "/public/locals";
// import forgetPasswordApi from "./forgetPasswordApi";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateOrganization = ({setNextButton}) => {
//   const { locale } = useRouter();
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isOrganizationCreate, setIsOrganizationCreate] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status,setStatus] = useState(false);
  const handleClose = () => {
    setIsOrganizationCreate(false);
    setIsError(false);
    setOpen(false);
    //formik form reset
    // Formik.resetForm();

  };

  const initialValues = {
    organizationInitial: "",
    organizationNameEn: "",
    organizationNameJp: "",
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};
    if (!values.organizationInitial) {
      errors.organizationInitial = "Organization initial is required";
      setIsValid(false);
    }

    if (!values.organizationNameEn) {
      errors.organizationNameEn = "Organization name is required";
      setIsValid(false);
    }
    if (!values.organizationNameJp) {
      errors.organizationNameJp = "Organization name is required";
      setIsValid(false);
    }


    // if (!values.email) {
    //   errors.email = "email is required";
    //   setIsValid(false);
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email = "invalid email address";
    //   setIsValid(false);
    // }

    return errors;
  };

  // const loginFormSubmit = (e) => {
  //   e.preventDefault()
  //   router.push('/home')
  // }
  const onSubmit = async (values) => {
    console.log(values);
    setStatus(true);
    const res = await CreateOrganizationApi(values);
    console.log(res);
    if(res.success === true)
    {
      console.log("organization create successfull")
      setNextButton(true);
      setIsOrganizationCreate(true);
      setIsError(false);
    }
    else{
      console.log("fail")
      setNextButton(true);
      setIsError(true);
      setIsOrganizationCreate(false);
    }
    // handleNext();
    // if (res.success) {
    //   console.log(res);
    //   console.log(" forget password success");
    //   setIsEmailSended(true);
    // } else {
    //   console.log(res);
    //   console.log(" forget password failed");
    //   setIsError(true);
    // }
    // console.log("forgetPassword res", res);
    // e.preventDefault()
    // router.push('/home')
  };

  return (
    <>
      {/* <div>
        <ToastContainer />
      </div> */}
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {(formik) => {
        return (
          <>
            {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            > */}
              {/* <Box sx={style}>
                <div className={styles.closeButton}>
                  <Button onClick={handleClose}>
                    <CloseIcon />
                  </Button>
                </div> */}
                 {isOrganizationCreate && (
                  <div className={styles["password-reset-email-success"]}>
                    Organization create successfull
                  </div>
                )}
                {isError && (
                  <div className={styles["password-reset-email-error"]}>
                    Organization already exists
                  </div>
                )}
                
                {/*
                <p id="modal-modal-title" variant="h6" component="h2">
                 { ETTMSText[locale].welcomePage.forgetPassword.forgetPasswordHeader}
                </p> */}
                
                <h3>Create Organization</h3>
                <div className={styles["login-input-field"]}>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="organizationInitial"
                      name="organizationInitial"
                      label= "Organization Initial"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.organizationInitial}
                      error={
                        formik.touched.organizationInitial &&
                        Boolean(formik.errors.organizationInitial)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.organizationInitial && formik.errors.organizationInitial ? (
                        <div>{formik.errors.organizationInitial}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="organizationNameEn"
                      name="organizationNameEn"
                      label= "Organization Name English"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.organizationNameEn}
                      error={
                        formik.touched.organizationNameEn &&
                        Boolean(formik.errors.organizationNameEn)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.organizationNameEn && formik.errors.organizationNameEn ? (
                        <div>{formik.errors.organizationNameEn}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="organizationNameJp"
                      name="organizationNameJp"
                      label= "Organization Name Japanese"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.organizationNameJp}
                      error={
                        formik.touched.organizationNameJp &&
                        Boolean(formik.errors.organizationNameJp)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.organizationNameJp && formik.errors.organizationNameJp ? (
                        <div>{formik.errors.organizationNameJp}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  
                  {/* <Stack justifyContent="center">
                  <Button
                    type="Submit"
                    variant="contained"
                    className={styles["login-in-btn"]}
                    onClick={formik.handleSubmit}
                  >
                   Create
                  </Button>
                </Stack> */}
                </div>
                <Stack justifyContent="center">
                  <Button
                    type="Submit"
                    variant="contained"
                    // className={styles["login-in-btn"]}
                    onClick={formik.handleSubmit}
                   
                  >
                   Create
                  </Button>
                </Stack>
              {/* </Box>
            </Modal> */}
            {/* <div className={styles["organization-button-control"]}>
                <Button variant="contained"  onClick={handleOpen} >Create Organization</Button>
            </div> */}
            {/* <Button
              onClick={handleOpen}
              className={styles["login-forget-password"]}
            >
              ki khobor
            </Button> */}
          </>
        );
      }}
    </Formik>
    </>
  );
};

export default CreateOrganization;
