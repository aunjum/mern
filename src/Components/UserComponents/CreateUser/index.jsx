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
import styles from "./CreateUser.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import FetchAllGroupApi from "./CreateUserApi/FetchAllGroupApi";
import FetchAllPermissionApi from "./CreateUserApi/FetchAllPermissionApi";
import SendUserRegistrationMailApiHandler from "./CreateUserApi/SendUserRegistrationMailApiHandler";
// import OrganizationApiFetchHandle from "./OrganizationApi/OrganizationApiFetchHandle";
// import OrganizationSendMailApiHandler from "./OrganizationApi/OrganizationSendMailApiHandler";
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

const CreateUser = () => {
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
  const [groupData, setGroupData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedGroupName, setSelectedGroupName] = useState([]);
  console.log("checkfr data",organizationInitialName);
  console.log("group nam", selectedGroupName)
  // console.log(organization)
  
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
    groupName: "",
    permissionName: "",
    email: ""
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};
    if (!values.groupName) {
      errors.groupName = "Group name is required";
      setIsValid(false);
       }
    if (!values.permissionName) {
        errors.permissionName = "Permission name is required";
        setIsValid(false);
         }
 
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
    // console.log("organiztion value is", organization)
    const response = await SendUserRegistrationMailApiHandler(values, selectedGroupName);
    // console.log(res);
    // // const res = await forgetPasswordApi(values);
    if (response.success === true) {
      setIsEmailSended(true);
      setIsError(false);
     
    } else {
      setIsError(true);
      setIsEmailSended(false);
    }
    // console.log("forgetPassword res", res);
    // e.preventDefault()
    // router.push('/home')
  };

  useEffect( () =>{
    const FetchGroupData = async() =>{
      const allData = await FetchAllGroupApi(); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setGroupData(await allData.body);
        console.log("data aise ")
           
       }
          
    }
    FetchGroupData();
  },[])

  useEffect( () =>{
    const FetchPermissionData = async() =>{
      const allData = await FetchAllPermissionApi(); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setPermissionData(await allData.body);
        console.log("data aise ")
           
       }
          
    }
    FetchPermissionData();
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
                
                <h3 className={styles['group-header-center']}>Create User</h3>
                
                <div className={styles["login-input-field"]}>
                  <FormControl required className={styles["login-form"]} fullWidth>
                    <InputLabel id="organization-initial-label">Group Name</InputLabel>
                        {formik.values.groupName ? setSelectedGroupId(formik.values.groupName): null}
                        {groupData.map((i)=>(
                               selectedGroupId === i._id ? setSelectedGroupName(i.name_en): null
                        ))}
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
                            
                              {groupData && groupData.map((group) => (
                                <MenuItem
                                  key={group._id}
                                  value={group._id}
                                >
                                  {group.name_en}
                                </MenuItem>
                              ))}
                              
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
                    <InputLabel id="organization-initial-label">Permission Name</InputLabel>
                        {/* {formik.values.organizationInitial ? setOrganizationInitialName(formik.values.organizationInitial): null} */}
                        <Select
                              labelId="demo-simple-select-label"
                              id="permissionName"
                              name="permissionName"
                              value={formik.values.permissionName}
                              label= "Permission Name"
                              size="small"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.permissionName &&
                                Boolean(formik.errors.permissionName)
                              }
                            >
                            
                              {permissionData && permissionData.map((permission) => (
                                <MenuItem
                                  key={permission._id}
                                  value={permission._id}
                                >
                                  {permission.title}
                                </MenuItem>
                              ))}
                              
                            </Select>
                            <span className={styles["error"]}>
                              {formik.touched.permissionName &&
                              formik.errors.permissionName ? (
                                <div>{formik.errors.permissionName}</div>
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
                   Send Mail
                  </Button>
                </Stack>
              
          </>
        );
      }}
    </Formik>
  );
};

export default CreateUser;
