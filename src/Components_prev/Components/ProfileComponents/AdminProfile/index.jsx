import React from 'react'
import { Button, FormControl, Grid, Stack, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import styles from "./AdminProfile.module.css";
import Layout from '../../CommonComponents/Layout';

const AdminProfile = () => {
  const [isValid, setIsValid] = useState(false);
  const [successMsgOpen, setSuccessMsgOpen] = useState(false);
  const [failedMsgOpen, setFailedMsgOpen] = useState(false);

  const initialValues = {
    organization: "UXD",
    group: "UXDTest",
    firstName: "test",
    lastName: "khan",
    email: "test@test.com",
    confirmEmail: "",
    contact: "01611756322",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validate = (values) => {
    setIsValid(true);
    let errors = {};

    if (!values.firstName) {
      errors.firstName = "First name is required";
      setIsValid(false);
    } else if (!values.firstName.match(new RegExp("^[a-z0-9_-]{3,15}$"))) {
      errors.firstName = "Invalid name";
      setIsValid(false);
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required";
      setIsValid(false);
    } else if (!values.lastName.match(new RegExp("^[a-z0-9_-]{3,15}$"))) {
      errors.lastName = "Invalid name";
      setIsValid(false);
    }

    if (!values.email) {
      errors.email = "Email is required";
      setIsValid(false);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
      setIsValid(false);
    }
    if (!values.confirmEmail) {
      errors.confirmEmail = "Email is required";
      setIsValid(false);
    } else if (values.confirmEmail !== values.email) {
      errors.confirmEmail = "Email doesn't match";
      setIsValid(false);
    }

    if (!values.contact) {
      errors.contact = "Contact is required";
      setIsValid(false);
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(values.contact)) {
      errors.contact = "Invalid contact";
      setIsValid(false);
    }

    if (!values.currentPassword) {
      errors.currentPassword = "Password is Required";
      setIsValid(false);
    } else if (values.currentPassword !== "12345678") {
      errors.currentPassword = "Password doesn't match";
      setIsValid(false);
    }

    if (!values.newPassword) {
      errors.newPassword = "Password is Required";
      setIsValid(false);
    } else if (!values.newPassword.match(new RegExp("^(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z]).{8,72}$"))) {
      errors.newPassword = "Uppercase, lowercase and number with 8 characters long";
      setIsValid(false);
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Password confirmation is Required";
      setIsValid(false);
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = "Password doesn't match";
      setIsValid(false);
    }

    return errors;
  };

  const onSubmit = (values) => {
    handleSuccessMsgOpen();
  };

  const handleSuccessMsgOpen = () => {
    setSuccessMsgOpen(true);
  };

  const handleFailedMsgOpen = () => {
    setFailedMsgOpen(true);
  };

  return (
    <>
    <Layout>
          <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => {
          return (
            <Form>
              <div className={styles["admin-profileForm-wrapper"]}>
                <h2>Update Admin Profile</h2>

                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                    <FormControl
                        fullWidth
                        size={`small`}
                        variant={`outlined`}
                        margin={"normal"}
                      >
                        <TextField
                          id="organization"
                          name="organization"
                          label=""
                          size="small"
                          value={formik.values.organization}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>

                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <FormControl
                        fullWidth
                        size={`small`}
                        variant={`outlined`}
                        margin={"normal"}
                      >
                        <TextField
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          size="small"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firstName}
                          error={
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                          }
                        />
                        <span className={styles["error"]}>
                          {formik.touched.firstName &&
                          formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                          ) : null}
                        </span>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <FormControl
                        fullWidth
                        size={`small`}
                        variant={`outlined`}
                        margin={"normal"}
                      >
                        <TextField
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          size="small"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastName}
                          error={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                          }
                        />
                        <span className={styles["error"]}>
                          {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                          ) : null}
                        </span>
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
                <br />
                <div>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                  <FormControl
                    fullWidth
                    size={`small`}
                    variant={`outlined`}
                    margin={"normal"}
                  >
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      size="small"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                    />
                    <span className={styles["error"]}>
                      {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                      ) : null}
                    </span>
                  </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                  <FormControl
                    fullWidth
                    size={`small`}
                    variant={`outlined`}
                    margin={"normal"}
                  >
                    <TextField
                      id="confirmEmail"
                      name="confirmEmail"
                      label="Confirm Email"
                      size="small"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmEmail}
                      error={
                        formik.touched.confirmEmail &&
                        Boolean(formik.errors.confirmEmail)
                      }
                    />
                    <span className={styles["error"]}>
                      {formik.touched.confirmEmail &&
                      formik.errors.confirmEmail ? (
                        <div>{formik.errors.confirmEmail}</div>
                      ) : null}
                    </span>
                  </FormControl>
                  </Grid>
                  </Grid>
                </div>
                <br />
                <div>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                <FormControl
                    fullWidth
                    size={`small`}
                    variant={`outlined`}
                    margin={"normal"}
                  >
                    <TextField
                      id="contact"
                      name="contact"
                      label="Contact"
                      size="small"
                      type="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.contact}
                      error={
                        formik.touched.contact &&
                        Boolean(formik.errors.contact)
                      }
                    />
                    <span className={styles["error"]}>
                      {formik.touched.contact &&
                      formik.errors.contact ? (
                        <div>{formik.errors.contact}</div>
                      ) : null}
                    </span>
                  </FormControl>
                  </Grid>
                  </Grid>
                </div>
                <br/>
                <div>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                <FormControl
                    fullWidth
                    size={`small`}
                    variant={`outlined`}
                    margin={"normal"}
                  >
                    <TextField
                      id="currentPassword"
                      name="currentPassword"
                      label="Current Password"
                      size="small"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                    />
                    <span className={styles["error"]}>
                      {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                      ) : null}
                    </span>
                  </FormControl>
                  </Grid>
                  </Grid>
                  <div>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                  <FormControl
                    fullWidth
                    size={`small`}
                    variant={`outlined`}
                    margin={"normal"}
                  >
                    <TextField
                      id="password"
                      name="password"
                      label="New Password"
                      size="small"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      error={
                        formik.touched.newPassword &&
                        Boolean(formik.errors.newPassword)
                      }
                    />
                    <span className={styles["error"]}>
                      {formik.touched.newPassword && formik.errors.newPassword ? (
                        <div>{formik.errors.newPassword}</div>
                      ) : null}
                    </span>
                  </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                  <FormControl
                    fullWidth
                    size={`small`}
                    variant={`outlined`}
                    margin={"normal"}
                  >
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm New Password"
                      size="small"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                    />
                    <span className={styles["error"]}>
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <div>{formik.errors.confirmPassword}</div>
                      ) : null}
                    </span>
                  </FormControl>
                  </Grid>
                  </Grid>
                  </div>
                </div>
                <br />
                <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                <Stack>
                  <Button
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    size="small"
                    endIcon={<AiOutlineCheck />}
                  >
                    Update
                  </Button>
                </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                <Stack>
                  <Button
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    size="small"
                    endIcon={<AiOutlineClose />}
                  >
                    Cancel
                  </Button>
                </Stack>
                </Grid>
                </Grid>
              </div>
            </Form>
          );
        }}
      </Formik>
      </Layout>
    </>
  )
}

export default AdminProfile