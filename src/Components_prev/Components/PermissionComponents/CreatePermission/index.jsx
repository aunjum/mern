// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik ,Field} from "formik";
// import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./CreatePermission.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import FetchPermissionListApi from "./CreatePermissionApi/FetchPermissionListApi";
import CreatePermissionApiHandler from "./CreatePermissionApi/CreatePermissionApiHandler";
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

const CreatePermission = () => {
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
  const [selectPermissionData, setSelectPermissionData] = useState([]);
  const [isPermissionCreate, setIsPermissionCreate] = useState(false);
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
    permissionTitle: "",
    checked: []
   
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};
    if (!values.permissionTitle) {
      errors.permissionTitle = "Permission name is required";
      setIsValid(false);
       }
    // if (!values.permissionName) {
    //     errors.permissionName = "Permission name is required";
    //     setIsValid(false);
    //      }
 
    // if (!values.email) {
    //   errors.email = "Email is required";
    //   setIsValid(false);
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email = "Invalid email address";
    //   setIsValid(false);
    // }

    return errors;
  };

  // const loginFormSubmit = (e) => {
  //   e.preventDefault()
  //   router.push('/home')
  // }

  useEffect( () =>{
    const FetchSelectPermissionData = async() =>{
      const allData = await FetchPermissionListApi(); 
      console.log(allData.body);
       if(allData.success === true)
       {
        setSelectPermissionData(await allData.body);
        console.log("data aise ")
           
       }
          
    }
    FetchSelectPermissionData();
  },[])
  const onSubmit = async (values, { resetForm }) => {
   // alert("hhahahahah");
    console.log("permission value is ",values);
    
    const res = await CreatePermissionApiHandler(values);
    console.log("cfeate jpermisisisi",res);
    if(res.success === true)
    {
      setIsPermissionCreate(true);
      setIsError(false);
      resetForm();
    }
    else{
      setIsError(true);
      setIsPermissionCreate(false);
    }
   
  };

//   useEffect( () =>{
//     const FetchOrganizationData = async() =>{
//       const allData = await OrganizationApiFetchHandle(); 
//       console.log(allData.body);
//        if(allData.success === true)
//        {
//         setOrganizationData(await allData.body);
//         console.log("data aise ")
           
//        }
          
//     }
//     FetchOrganizationData();
//   },[])


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {(formik) => {
        return (
          <>
           
               {isPermissionCreate && (
                  <div className={styles["password-reset-email-success"]}>
                    Permission Create successfully
                  </div>
                )}
                {isError && (
                  <div className={styles["password-reset-email-error"]}>
                    Permission already exist
                  </div>
                )}
                
                <h3 className={styles['group-header-center']}>Create Permission</h3>
                
                <div className={styles["login-input-field"]}>
                  

                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="permissionTitle"
                      name="permissionTitle"
                      label= "Enter permission name"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.permissionTitle}
                      error={
                        formik.touched.permissionTitle &&
                        Boolean(formik.errors.permissionTitle)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.permissionTitle && formik.errors.permissionTitle ? (
                        <div>{formik.errors.permissionTitle}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>

                  <FormControl className={styles["login-form"]} fullWidth>
                  <FormGroup>
                  <div id="checkbox-group">Selected Permission:</div>
                  <div className={styles['checkbox-align']} role="group" aria-labelledby="checkbox-group">
          {selectPermissionData && selectPermissionData.map((permission)=>(
            <div>
            <label>
              <Field type="checkbox" name="checked" value={permission._id} />
              {permission.task_title}
            </label>
            </div>
            ))}
            {/* <div>
            <label>
              <Field type="checkbox" name="checked" value="create group" />
              Create Group
            </label>
            </div>
            <div>
            <label>
              <Field type="checkbox" name="checked" value="create user" />
              Create User
            </label>
            </div> */}
          </div>
          <br/>
          </FormGroup>

      {/* <FormControlLabel control={<Checkbox/>} label="Label" >
      <Field type="checkbox" name="checked" value="Three" />
      </FormControlLabel>
          */}
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
              
          </>
        );
      }}
    </Formik>
  );
};

export default CreatePermission;
