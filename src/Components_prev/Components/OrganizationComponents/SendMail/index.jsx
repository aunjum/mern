// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik } from "formik";
// import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./SendMail.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import OrganizationApiFetchHandle from "./OrganizationApi/OrganizationApiFetchHandle";
import OrganizationSendMailApiHandler from "./OrganizationApi/OrganizationSendMailApiHandler";
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

const SendMail = ({setNextMailButton}) => {
//   const { locale } = useRouter();
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isError, setIsError] = useState(false);
  const [age, setAge] = useState('');
  const [organization, setOrganization] = useState([]);
  const [organizationInitialName, setOrganizationInitialName] = useState('');
  const [organizationNameEn, setOrganizationNameEn] = useState('');
  const [organizationNameJp, setOrganizationNameJp] = useState('');
  const [organizationData, setOrganizationData] = useState([]);
  console.log("checkfr data",organizationData);
  console.log(organization)
  
  const handleChange = (event) => {
    setOrganizationInitialName(event.target.value);
    
  };
//console.log("aita e too", organizationInitial)
  // const handleChange = (event) => {
  //   setAge(event.target.value);
    
  // };
  const handleClose = () => {
    setIsEmailSended(false);
    setIsError(false);
    setOpen(false);
    //formik form reset
    // Formik.resetForm();

  };

  

  const initialValues = {
    organizationInitial: "",
    // organizationNameEn: "",
    // organizationNameJp: "",
    email: ""
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};
    if (!values.organizationInitial) {
      errors.organizationInitial = "Organization initial is required";
      setIsValid(false);
       }
    // if (!values.organizationNameEn) {
    //   errors.organizationNameEn = "Organization name is required";
    //   setIsValid(false);
    // }
    // if (!values.organizationNameJp) {
    //   errors.organizationNameJp = "Organization name is required";
    //   setIsValid(false);
    // }

    if (!values.email) {
      errors.email = "Email is required";
      setIsValid(false);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
      setIsValid(false);
    }

    return errors;
  };

  // const loginFormSubmit = (e) => {
  //   e.preventDefault()
  //   router.push('/home')
  // }
  const onSubmit = async (values) => {
   // alert("hhahahahah");
    console.log("mail value is ",values);
    console.log("organiztion value is", organization)
    const res = await OrganizationSendMailApiHandler(values,organization);
    console.log(res);
    // const res = await forgetPasswordApi(values);
    if (res.success === true) {
      setIsEmailSended(true);
      setIsError(false);
      setNextMailButton(true);
    } else {
      setIsError(true);
      setIsEmailSended(false);
    }
    // console.log("forgetPassword res", res);
    // e.preventDefault()
    // router.push('/home')
  };

  useEffect( () =>{
    const FetchOrganizationData = async() =>{
      const allData = await OrganizationApiFetchHandle(); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setOrganizationData(await allData.body);
        console.log("data aise ")
           
       }
          
    }
    FetchOrganizationData();
  },[])


  return (
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
               {isEmailSended && (
                  <div className={styles["password-reset-email-success"]}>
                    Mail send successfully
                  </div>
                )}
                {isError && (
                  <div className={styles["password-reset-email-error"]}>
                    Something went wrong !!!!!
                  </div>
                )}
                 {/* 
                <p id="modal-modal-title" variant="h6" component="h2">
                 { ETTMSText[locale].welcomePage.forgetPassword.forgetPasswordHeader}
                </p> */}
                <h3>Send mail</h3>
                
                
                
                <div className={styles["login-input-field"]}>
                  <FormControl required className={styles["login-form"]} fullWidth>
                    {/* <TextField
                      id="organizationInitial"
                      name="organizationInitial"
                      label= "Organization Initial"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value="HP"
                      InputProps={{
                        readOnly: true,
                      }}
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
                    </span> */}
                    
                      
                    <InputLabel id="organization-initial-label">Organization Initial</InputLabel>
                    
                          {/* <Select
                          labelId="organization-initial-label"
                          id="organizationInitial"
                          name="organizationInitial"
                          value={organizationInitial}
                          label="Organization-Initial"
                          onChange={handleChange}
                        >
                          {organizationData.map((i)=>
                          <MenuItem value={i.initial}>{i.initial}</MenuItem>
                        )}
                        </Select> */}
                        {/* {formik.values.organizationInitial ? setOrganizationInitialName(formik.values.organizationInitial): null} */}
                        {formik.values.organizationInitial ? setOrganizationInitialName(formik.values.organizationInitial): null}
                        <Select
                              labelId="demo-simple-select-label"
                              // id="demo-simple-select"
                              id="organizationInitial"
                              name="organizationInitial"
                              //value={age}
                              value={formik.values.organizationInitial}
                              label= "Organization Initial"
                              size="small"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.organizationInitial &&
                                Boolean(formik.errors.organizationInitial)
                              }
                            >
                            
                              {organizationData.map((organization) => (
                                <MenuItem
                                  key={organization._id}
                                  value={organization.initial}
                                >
                                  {organization.initial}
                                </MenuItem>
                              ))}
                              
                            </Select>
                            <span className={styles["error"]}>
                              {formik.touched.organizationInitial &&
                              formik.errors.organizationInitial ? (
                                <div>{formik.errors.organizationInitial}</div>
                              ) : null}
                            </span>
                        
                

                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                  {/* {organizationData.map((i)=>
    organizationInitial === i.initial ? console.log("english name", setOrganizationNameEn(i.name_en) + "jp name  " + i.name_jp) : console.log(null)
  )} */}
  {organizationData.map((i)=>
    organizationInitialName === i.initial ? setOrganization(i) : null
  )}
                    <TextField
                      id="organizationNameEn"
                      name="organizationNameEn"
                      label= "Organization Name English"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value= {organization.name_en}
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
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
                  {/* {organizationData.map((i)=>
                    organizationInitialName === i.initial ? setOrganizationNameJp(i.name_jp) : null
                  )} */}
                    <TextField
                      id="organizationNameJp"
                      name="organizationNameJp"
                      label= "Organization Name Japanese"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={organization.name_jp}
                      defaultValue=" "
                      InputProps={{
                        readOnly: true,
                      }}
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

                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="email"
                      name="email"
                      label= "Enter Email"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      error={
                        formik.touched.email &&
                        Boolean(formik.errors.email)
                      }
                      type="email"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
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
                   Submit
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
  );
};

export default SendMail;
