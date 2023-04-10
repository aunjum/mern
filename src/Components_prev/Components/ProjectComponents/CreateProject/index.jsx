// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
// import { useRouter } from "next/router";
import { useState ,useEffect, useContext} from "react";
import styles from "./CreateProject.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { TokenContext } from "../../CommonComponents/Contexts/TokenContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { maxWidth } from "@mui/system";
import FetchAllGroupApiDataHandler from "./CreateProjectApi/FetchAllGroupApiDataHandler";
import CreateProjectApiHandler from "./CreateProjectApi/CreateProjectApiHandler";
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

const CreateProject = () => {
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
    groupName: "",
    projectNameEn: "",
    projectNameJp: "",
    projectDetails: ""
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};
    if (!values.groupName) {
      errors.groupName = "Group name is required";
      setIsValid(false);
    }

    if (!values.projectNameEn) {
      errors.projectNameEn = "Project name is required";
      setIsValid(false);
    }
    if (!values.projectNameJp) {
      errors.projectNameJp = "Project name is required";
      setIsValid(false);
    }


    return errors;
  };

  // const loginFormSubmit = (e) => {
  //   e.preventDefault()
  //   router.push('/home')
  // }

  useEffect( () =>{
    const FetchOrganizationData = async() =>{
      const allData = await FetchAllGroupApiDataHandler(); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setAllGroupData(await allData.body);
        console.log("data aise ")
           
       }
          
    }
    FetchOrganizationData();
  },[])
  const onSubmit = async (values, { resetForm }) => {
    console.log("project value",values);
    setStatus(true);
    const res = await CreateProjectApiHandler(values);
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
                    Project create successfully
                  </div>
                )}
                {isError && (
                  <div className={styles["password-reset-email-error"]}>
                    Project already exists
                  </div>
                )}
                
                {/*
                <p id="modal-modal-title" variant="h6" component="h2">
                 { ETTMSText[locale].welcomePage.forgetPassword.forgetPasswordHeader}
                </p> */}
                
                <h3 className={styles['group-header-center']}>Create Project</h3>
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
                  <FormControl required className={styles["login-form"]} fullWidth>
                    <InputLabel id="organization-initial-label">Group Name</InputLabel>
                        {/* {formik.values.organizationInitial ? setOrganizationInitialName(formik.values.organizationInitial): null} */}
                        <Select
                              labelId="demo-simple-select-label"
                              id="groupName"
                              name="groupName"
                              value={formik.values.groupName}
                              label= "Group Name"
                              size="small"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.groupName &&
                                Boolean(formik.errors.groupName)
                              }
                            >
                            
                              {allGroupData && allGroupData.map((groupData) => (
                                <MenuItem
                                  key={groupData._id}
                                  value={groupData._id}
                                >
                                  {groupData.name_en}
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
                              {formik.touched.groupName &&
                              formik.errors.groupName ? (
                                <div>{formik.errors.groupName}</div>
                              ) : null}
                            </span>
                        
                

                    <br />
                  </FormControl>
                  
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="projectNameEn"
                      name="projectNameEn"
                      label= "Project Name English"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.projectNameEn}
                      error={
                        formik.touched.projectNameEn &&
                        Boolean(formik.errors.projectNameEn)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.projectNameEn && formik.errors.projectNameEn ? (
                        <div>{formik.errors.projectNameEn}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="projectNameJp"
                      name="projectNameJp"
                      label= "Project Name Japanese"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.projectNameJp}
                      error={
                        formik.touched.projectNameJp &&
                        Boolean(formik.errors.projectNameJp)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.projectNameJp && formik.errors.projectNameJp ? (
                        <div>{formik.errors.projectNameJp}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                <div className="control">
                  <TextareaAutosize
                    id="projectDetails"
                    name="projectDetails"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projectDetails}
                    placeholder="Project Details"
                    style={{ width: '99%', maxWidth: '100%',height:50, maxHeight:100 ,fontSize:'17px', fontWeight:"none"}}
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

export default CreateProject;
