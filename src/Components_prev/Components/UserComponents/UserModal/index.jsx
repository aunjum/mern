// import CloseIcon from "@mui/icons-material/Close";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
// import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./UserModal.module.css";
import CloseIcon from '@mui/icons-material/Close';
import CreateUser from "../CreateUser";
// import ETTMSText from "/public/locals";
// import forgetPasswordApi from "./forgetPasswordApi";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserModal = () => {
//   const { locale } = useRouter();
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const handleOpen = () => setOpen(true);
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleClose = () => {
    setIsEmailSended(false);
    setIsError(false);
    setOpen(false);
    //formik form reset
    // Formik.resetForm();

  };


  return (
   
          <>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className={styles.closeButton}>
                  <Button onClick={handleClose}>
                    <CloseIcon />
                  </Button>
                </div>
                <CreateUser/>
                
              </Box>
            </Modal>
            <div className={styles["organization-button-control"]}>
                <Button variant="contained"  onClick={handleOpen} >Add User</Button>
            </div>
            
          </>  
      
   
  );
};

export default UserModal;
