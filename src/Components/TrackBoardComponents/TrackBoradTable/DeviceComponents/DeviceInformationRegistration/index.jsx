// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
// import { useRouter } from "next/router";
import { useState ,useEffect, useContext} from "react";
import styles from "./DeviceInformationRegistration.module.css";
import CloseIcon from '@mui/icons-material/Close';
//import { ToastContainer, toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { maxWidth } from "@mui/system";
import DeviceInformationRegistrationApiHandler from "../DeviceApiHandler/DeviceInformationRegistrationApiHandler";
import FetchAllDeviceTypeApiHandler from "../DeviceApiHandler/FetchAllDeviceTypeApiHandler";

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

const DeviceInformationRegistration = ({setNextFinishButton, id}) => {
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
  const [allDeviceData, setAllDeviceData] = useState([]);
  const handleClose = () => {
    setIsProjectCreate(false);
    setIsError(false);
    setOpen(false);
    //formik form reset
    // Formik.resetForm();

  };

  const initialValues = {
    deviceType: "",
    vendor: "",
    modelNo: "",
    serial: "",
    spacification: "",
    state: "",
    comment: ""
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};
    if (!values.deviceType) {
      errors.deviceType = "Device type is required";
      setIsValid(false);
    }
    if (!values.vendor) {
      errors.vendor = "Vendor name is required";
      setIsValid(false);
    }

    if (!values.modelNo) {
      errors.modelNo = "Model number is required";
      setIsValid(false);
    }
    if (!values.serial) {
      errors.serial = "Serial number is required";
      setIsValid(false);
    }

    return errors;
  };

  // const loginFormSubmit = (e) => {
  //   e.preventDefault()
  //   router.push('/home')
  // }
  useEffect( () =>{
    const FetchDeviceTypeData = async() =>{
      const allData = await FetchAllDeviceTypeApiHandler(); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setAllDeviceData(await allData.body);
           
       }
          
    }
    FetchDeviceTypeData();
  },[])
 
  const onSubmit = async (values, { resetForm }) => {
    console.log("device information value",values);
    setStatus(true);
    setNextFinishButton(true);
    const res = await DeviceInformationRegistrationApiHandler(values,id);
    console.log("create project",res);
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
                    Device registration successful
                  </div>
                )}
                {isError && (
                  <div className={styles["password-reset-email-error"]}>
                    Device already exists
                  </div>
                )}
                
                {/*
                <p id="modal-modal-title" variant="h6" component="h2">
                 { ETTMSText[locale].welcomePage.forgetPassword.forgetPasswordHeader}
                </p> */}
                
                <h3 className={styles['group-header-center']}>Device Information Registration</h3>
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
                  
                  <div className={styles['topMarginForMaker']}>
                  <FormControl required className={styles["login-form"]} fullWidth>
                    <InputLabel id="organization-initial-label">Device Type</InputLabel>
                        {/* {formik.values.organizationInitial ? setOrganizationInitialName(formik.values.organizationInitial): null} */}
                        <Select
                              labelId="demo-simple-select-label"
                              id="deviceType"
                              name="deviceType"
                              value={formik.values.deviceType}
                              label= "Device Type"
                              size="small"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.deviceType &&
                                Boolean(formik.errors.deviceType)
                              }
                            >
                            
                              {allDeviceData && allDeviceData.map((deviceData) => (
                                <MenuItem
                                  key={deviceData._id}
                                  value={deviceData._id}
                                >
                                  {deviceData.name_en}
                                </MenuItem>
                              ))}
                              {/* <MenuItem
                              key={10}
                              value={'10'} 
                              >
                              Group 1
                              </MenuItem>
                              <MenuItem
                              key={20}
                              value={'20'} 
                              >
                              Group 2
                              </MenuItem> */}
                              
                            </Select>
                            <span className={styles["error"]}>
                              {formik.touched.deviceType &&
                              formik.errors.deviceType ? (
                                <div>{formik.errors.deviceType}</div>
                              ) : null}
                            </span>
                        
                

                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="vendor"
                      name="vendor"
                      label= "Enter vendor Name"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.vendor}
                      error={
                        formik.touched.vendor &&
                        Boolean(formik.errors.vendor)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.vendor && formik.errors.vendor ? (
                        <div>{formik.errors.vendor}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  </div>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="modelNo"
                      name="modelNo"
                      label= "Enter Model Number"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.modelNo}
                      error={
                        formik.touched.modelNo &&
                        Boolean(formik.errors.modelNo)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.modelNo && formik.errors.modelNo ? (
                        <div>{formik.errors.modelNo}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="serial"
                      name="serial"
                      label= "Enter Serial Number"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.serial}
                      error={
                        formik.touched.serial &&
                        Boolean(formik.errors.serial)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.serial && formik.errors.serial ? (
                        <div>{formik.errors.serial}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>

                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="spacification"
                      name="spacification"
                      label= "Enter Spacification"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.spacification}
                      error={
                        formik.touched.spacification &&
                        Boolean(formik.errors.spacification)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.spacification && formik.errors.spacification ? (
                        <div>{formik.errors.spacification}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="state"
                      name="state"
                      label= "Enter State"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.state}
                      error={
                        formik.touched.state &&
                        Boolean(formik.errors.state)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.state && formik.errors.state ? (
                        <div>{formik.errors.state}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>

                  <FormControl className={styles["login-form"]} fullWidth>
                <div className="control">
                  <TextareaAutosize
                    id="comment"
                    name="comment"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment}
                    placeholder="Enter Comment"
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

export default  DeviceInformationRegistration;
