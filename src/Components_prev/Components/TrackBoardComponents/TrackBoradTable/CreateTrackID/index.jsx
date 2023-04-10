// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
// import { useRouter } from "next/router";
import { useState ,useEffect, useContext} from "react";
import styles from "./CreateTrackID.module.css";
import CloseIcon from '@mui/icons-material/Close';
// import { ToastContainer, toast } from 'react-toastify';
// import { TokenContext } from "../../CommonComponents/Contexts/TokenContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { maxWidth } from "@mui/system";
import FetchAllGroupApiDataHandler from "../../../ProjectComponents/CreateProject/CreateProjectApi/FetchAllGroupApiDataHandler";
import FetchAllActiveProjectByGroupApiHandler from "./CreateTrackApi/FetchAllActiveProjectByGroupApi";
import FetchAllRequestTypeApiHandler from "./CreateTrackApi/FetchAllRequestTypeApiHandler";
import FetchUnoccupiedTagsApi from "./CreateTrackApi/FetchUnoccupiedTagsApi";
import CreateTrackApiHandler from "./CreateTrackApi/CreateTrackApiHandler";
// import FetchAllGroupApiDataHandler from "./CreateProjectApi/FetchAllGroupApiDataHandler";
// import CreateProjectApiHandler from "./CreateProjectApi/CreateProjectApiHandler";
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

const CreateTrackID = ({setNextMailButton}) => {
   // const {tokenValue} = useContext(TokenContext);
   // console.log("group", tokenValue)
//   const { locale } = useRouter();
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isProjectCreate, setIsProjectCreate] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status,setStatus] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [allGroupData, setAllGroupData] = useState([]);
  const [allProjectData, setAllProjectData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [unoccupiedTags, setUnoccupiedTags] = useState([]);
  const [trackTags, setTrackTags] = useState(unoccupiedTags);
  const handleClose = () => {
    setIsProjectCreate(false);
    setIsError(false);
    setOpen(false);
    //formik form reset
    // Formik.resetForm();

  };
  console.log("aita e data",unoccupiedTags)
//   unoccupiedTags.map((row)=>
//          console.log(row._id)
//   )

  const initialValues = {
    groupName: "",
    projectName: "",
    requestType: "",
    trackDetails: ""
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};
    if (!values.groupName) {
        errors.groupName = "Group name is required";
        setIsValid(false);
      }
    if (!values.projectName) {
      errors.projectName = "Project name is required";
      setIsValid(false);
    }

    if (!values.requestType) {
      errors.requestType = "Request type is required";
      setIsValid(false);
    }
    // if (!values.projectNameJp) {
    //   errors.projectNameJp = "Project name is required";
    //   setIsValid(false);
    // }


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

  useEffect( () =>{
    const FetchOrganizationData = async() =>{
      const allData = await FetchAllActiveProjectByGroupApiHandler(groupData); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setAllProjectData(await allData.body);
        console.log("project data ")
           
       }
          
    }
    FetchOrganizationData();
  },[groupData])

  useEffect( () =>{
    const FetchOrganizationData = async() =>{
      const allData = await FetchAllRequestTypeApiHandler(); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setRequestData(await allData.body);
        console.log("data aise ")
           
       }
          
    }
    FetchOrganizationData();
  },[])

  useEffect( () =>{
    const FetchOrganizationData = async() =>{
      const allData = await FetchUnoccupiedTagsApi(); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setUnoccupiedTags(await allData.body[0]._id);
           
       }
          
    }
    FetchOrganizationData();
  },[])

//   useEffect( () =>{
//     const FetchOrganizationData = async() =>{
//       const allData = await FetchAllGroupApiDataHandler(); 
//       console.log(allData.body);
//        if(allData.success === true)
//        {
//         setAllGroupData(await allData.body);
//         console.log("data aise ")
           
//        }
          
//     }
//     FetchOrganizationData();
//   },[])
  const onSubmit = async (values, { resetForm }) => {
    console.log("track value value",values);
    setStatus(true);
    const res = await CreateTrackApiHandler(values, unoccupiedTags);
    console.log("create project",res);
    if(res.success === true)
    {
      setIsProjectCreate(true);
      setIsError(false);
      setNextMailButton(true);
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
                    Track ID create successfully
                  </div>
                )}
                {isError && (
                  <div className={styles["password-reset-email-error"]}>
                    Something went wrong !!!! 
                  </div>
                )}
                
                {/*
                <p id="modal-modal-title" variant="h6" component="h2">
                 { ETTMSText[locale].welcomePage.forgetPassword.forgetPasswordHeader}
                </p> */}
                
                <h3 className={styles['group-header-center']}>Create Track ID</h3>
                <div className={styles["login-input-field"]}>

                <FormControl required className={styles["login-form"]} fullWidth>
                    <InputLabel id="organization-initial-label">Group Name</InputLabel>
                        {formik.values.groupName ? setGroupData(formik.values.groupName): null}
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
                  
                  <FormControl required className={styles["login-form"]} fullWidth>
                    <InputLabel id="organization-initial-label">Project Name</InputLabel>
                        {/* {formik.values.organizationInitial ? setOrganizationInitialName(formik.values.organizationInitial): null} */}
                        <Select
                              labelId="demo-simple-select-label"
                              id="projectName"
                              name="projectName"
                              value={formik.values.projectName}
                              label= "Project Name"
                              size="small"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.projectName &&
                                Boolean(formik.errors.projectName)
                              }
                            >
                            
                              {allProjectData && allProjectData.map((projectData) => (
                                <MenuItem
                                  key={projectData._id}
                                  value={projectData._id}
                                >
                                  {projectData.name_en}
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
                              {formik.touched.projectName &&
                              formik.errors.projectName ? (
                                <div>{formik.errors.projectName}</div>
                              ) : null}
                            </span>
                        
                

                    <br />
                  </FormControl>

                  <FormControl required className={styles["login-form"]} fullWidth>
                    <InputLabel id="organization-initial-label">Request Type</InputLabel>
                        {/* {formik.values.organizationInitial ? setOrganizationInitialName(formik.values.organizationInitial): null} */}
                        <Select
                              labelId="demo-simple-select-label"
                              id="requestType"
                              name="requestType"
                              value={formik.values.requestType}
                              label= "Request Type"
                              size="small"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.requestType &&
                                Boolean(formik.errors.requestType)
                              }
                            >
                            
                              {requestData && requestData.map((row) => (
                                <MenuItem
                                  key={row._id}
                                  value={row._id}
                                >
                                  {row.title_en}
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
                              {formik.touched.requestType &&
                              formik.errors.requestType ? (
                                <div>{formik.errors.requestType}</div>
                              ) : null}
                            </span>
                        
                

                    <br />
                  </FormControl>
                  
                  <FormControl className={styles["login-form"]} fullWidth>
                <div className="control">
                  <TextareaAutosize
                    id="trackDetails"
                    name="trackDetails"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.trackDetails}
                    placeholder="Track Details"
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

export default CreateTrackID;
