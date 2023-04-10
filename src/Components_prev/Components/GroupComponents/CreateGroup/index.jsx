// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
// import { useRouter } from "next/router";
import { useState , useContext} from "react";
import styles from "./CreateGroup.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { TokenContext } from "../../CommonComponents/Contexts/TokenContext";
import CreateGroupApiHandler from "./GroupApiHandler/CreateGroupApiHandler";
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

const CreateGroup = () => {
    const {tokenValue} = useContext(TokenContext);
    console.log("group", tokenValue)
//   const { locale } = useRouter();
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isGroupCreate, setIsGroupCreate] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status,setStatus] = useState(false);
  const handleClose = () => {
    setIsGroupCreate(false);
    setIsError(false);
    setOpen(false);
    //formik form reset
    // Formik.resetForm();

  };

  const initialValues = {
    groupNameEn: "",
    groupNameJp: "",
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};

    if (!values.groupNameEn) {
      errors.groupNameEn = "Group name is required";
      setIsValid(false);
    }
    if (!values.groupNameJp) {
      errors.groupNameJp = "Group name is required";
      setIsValid(false);
    }


    return errors;
  };

  // const loginFormSubmit = (e) => {
  //   e.preventDefault()
  //   router.push('/home')
  // }
  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    setStatus(true);
    const res = await CreateGroupApiHandler(values);
    console.log(res);
    if(res.success === true)
    {
      setIsGroupCreate(true);
      setIsError(false);
      resetForm();
    }
    else{
      setIsError(true);
      setIsGroupCreate(false);
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
                 {isGroupCreate && (
                  <div className={styles["password-reset-email-success"]}>
                    Group create successfully
                  </div>
                )}
                {isError && (
                  <div className={styles["password-reset-email-error"]}>
                    Group already exists
                  </div>
                )}
                
                {/*
                <p id="modal-modal-title" variant="h6" component="h2">
                 { ETTMSText[locale].welcomePage.forgetPassword.forgetPasswordHeader}
                </p> */}
                
                <h3 className={styles['group-header-center']}>Create Group</h3>
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
                      id="groupNameEn"
                      name="groupNameEn"
                      label= "Group Name English"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.groupNameEn}
                      error={
                        formik.touched.groupNameEn &&
                        Boolean(formik.errors.groupNameEn)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.groupNameEn && formik.errors.groupNameEn ? (
                        <div>{formik.errors.groupNameEn}</div>
                      ) : null}
                    </span>
                    <br />
                  </FormControl>
                  <FormControl className={styles["login-form"]} fullWidth>
                    <TextField
                      id="groupNameJp"
                      name="groupNameJp"
                      label= "Group Name Japanese"
                      variant="outlined"
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.groupNameJp}
                      error={
                        formik.touched.groupNameJp &&
                        Boolean(formik.errors.groupNameJp)
                      }
                      type="text"
                    />
                    <span className={styles["error"]}>
                      {formik.touched.groupNameJp && formik.errors.groupNameJp ? (
                        <div>{formik.errors.groupNameJp}</div>
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

export default CreateGroup;
