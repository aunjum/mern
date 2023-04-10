// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
// import { useRouter } from "next/router";
import { useState ,useEffect, useContext} from "react";
import styles from "./CreateDeviceType.module.css";
import CloseIcon from '@mui/icons-material/Close';
//import { ToastContainer, toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { maxWidth } from "@mui/system";
import CreateDeviceTypeApiHandler from "../DeviceApiHandler/CreateDeviceTypeApiHandler";

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

const CreateDeviceType = ({setNextButton}) => {
   // const {tokenValue} = useContext(TokenContext);
   // console.log("group", tokenValue)
//   const { locale } = useRouter();
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isProjectCreate, setIsProjectCreate] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status,setStatus] = useState(false);
  const [allGroupData, setAllGroupData] = useState([]);
  const handleClose = () => {
    setIsProjectCreate(false);
    setIsError(false);
    setOpen(false);
    //formik form reset
    // Formik.resetForm();

  };

  const initialValues = {
    deviceNameEn: "",
    deviceNameJp: "",
    deviceDetailsEn: "",
    deviceDetailsJp: ""
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};
    if (!values.deviceNameEn) {
      errors.deviceNameEn = "Device name is required";
      setIsValid(false);
    }

    if (!values.deviceNameJp) {
      errors.deviceNameJp = "Device name is required";
      setIsValid(false);
    }
    if (!values.deviceDetailsEn) {
      errors.deviceDetailsEn = "Device details is required";
      setIsValid(false);
    }
    if (!values.deviceDetailsJp) {
      errors.deviceDetailsJp = "Device details is required";
      setIsValid(false);
    }


    return errors;
  };

  // const loginFormSubmit = (e) => {
  //   e.preventDefault()
  //   router.push('/home')
  // }

 
  const onSubmit = async (values, { resetForm }) => {
    console.log("device value value",values);
    setStatus(true);
    setNextButton(true);
    const res = await CreateDeviceTypeApiHandler(values);
    console.log("create device",res);
    if(res.success === true)
    {
      setIsProjectCreate(true);
      setIsError(false);
      resetForm();
    }
    else{
      setIsError(true);
      setIsProjectCreate(false);
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
                 {isProjectCreate && (
                  <div className={styles["password-reset-email-success"]}>
                    Device Type register successful
                  </div>
                )}
                {isError && (
                  <div className={styles["password-reset-email-error"]}>
                    Device type already exists
                  </div>
                )}
                
                {/*
                <p id="modal-modal-title" variant="h6" component="h2">
                 { ETTMSText[locale].welcomePage.forgetPassword.forgetPasswordHeader}
                </p> */}
                
                <h3 className={styles['group-header-center']}>Create Device Type</h3>
                <div className={styles["login-input-field"]}>
                  {/* <FormControl className={styles["login-form"]} fullWidth>
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
                  </FormControl> */}
                  
                  
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="deviceNameEn"
                      name="deviceNameEn"
                      label= "Device Name English"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.deviceNameEn}
                      error={
                        formik.touched.deviceNameEn &&
                        Boolean(formik.errors.deviceNameEn)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.deviceNameEn && formik.errors.deviceNameEn ? (
                        <div>{formik.errors.deviceNameEn}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="deviceNameJp"
                      name="deviceNameJp"
                      label= "Device Name Japanese"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.deviceNameJp}
                      error={
                        formik.touched.deviceNameJp &&
                        Boolean(formik.errors.deviceNameJp)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.deviceNameJp && formik.errors.deviceNameJp ? (
                        <div>{formik.errors.deviceNameJp}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                <div className="control">
                  <TextareaAutosize
                    id="deviceDetailsEn"
                    name="deviceDetailsEn"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.deviceDetailsEn}
                    placeholder="Device Details English"
                    style={{ width: '99%', maxWidth: '100%',height:50, maxHeight:100 ,fontSize:'17px', fontWeight:"none", textIndent:'10px'}}
                  />
                </div>
              
              <br />
                  </FormControl>

                  <FormControl className={styles["login-form"]} fullWidth>
                <div className="control">
                  <TextareaAutosize
                    id="deviceDetailsJp"
                    name="deviceDetailsJp"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.deviceDetailsJp}
                    placeholder="Device Details Japanese"
                    style={{ width: '99%', maxWidth: '100%',height:50, maxHeight:100 ,fontSize:'17px', fontWeight:"none", textIndent:'10px'}}
                  />
                </div>
              
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

export default CreateDeviceType;
