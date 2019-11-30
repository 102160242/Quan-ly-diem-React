import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import * as auth from "../../store/ducks/auth.duck";
import { register } from "../../crud/auth.crud";

function Registration(props) {
  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title">
          <h3>
            Đăng ký
          </h3>
        </div>

        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
            acceptTerms: true,
            password_confirmation: ""
          }}
          validate={values => {
            const errors = {};

            // if (!values.email) {
            //   errors.email = intl.formatMessage({
            //     id: "AUTH.VALIDATION.REQUIRED_FIELD"
            //   });
            // } else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            // ) {
            //   errors.email = intl.formatMessage({
            //     id: "AUTH.VALIDATION.INVALID_FIELD"
            //   });
            // }

            // if (!values.fullname) {
            //   errors.fullname = intl.formatMessage({
            //     id: "AUTH.VALIDATION.REQUIRED_FIELD"
            //   });
            // }

            // if (!values.username) {
            //   errors.username = intl.formatMessage({
            //     id: "AUTH.VALIDATION.REQUIRED_FIELD"
            //   });
            // }

            // if (!values.password) {
            //   errors.password = intl.formatMessage({
            //     id: "AUTH.VALIDATION.REQUIRED_FIELD"
            //   });
            // }

            // if (!values.confirmPassword) {
            //   errors.confirmPassword = intl.formatMessage({
            //     id: "AUTH.VALIDATION.REQUIRED_FIELD"
            //   });
            // } else if (values.password !== values.confirmPassword) {
            //   errors.confirmPassword =
            //     "Password and Confirm Password didn't match.";
            // }

            if (!values.acceptTerms) {
              errors.acceptTerms = "Accept Terms";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            register({
              "email": values.email,
              "name": values.name,
              "password": values.password,
              "password_confirmation": values.password_confirmation
            })
              .then(({ data: { data: { token } } }) => {
                props.register(token);
              })
              .catch((e) => {
                var messages;
                if (e.response == null) {
                  messages = ["Có lỗi xảy ra!"]
                }
                else {
                  messages = e.response.data.messages
                }
                setSubmitting(false);
                setStatus(
                  messages
                );
              });
          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                {status && status.map((i, k) => {
                  return (
                    <div role="alert" className="alert alert-danger" key={k}>
                      <div className="alert-text">{i}</div>
                    </div>
                  )
                })
                }

                <div className="form-group mb-0">
                  <TextField
                    margin="normal"
                    label="Tên"
                    className="kt-width-full"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    helperText={touched.name && errors.name}
                    error={Boolean(touched.name && errors.name)}
                  />
                </div>

                <div className="form-group mb-0">
                  <TextField
                    label="Email"
                    margin="normal"
                    className="kt-width-full"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                  />
                </div>

                <div className="form-group mb-0">
                  <TextField
                    type="password"
                    margin="normal"
                    label="Mật khẩu"
                    className="kt-width-full"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    helperText={touched.password && errors.password}
                    error={Boolean(touched.password && errors.password)}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    type="password"
                    margin="normal"
                    label="Xác nhận Mật khẩu"
                    className="kt-width-full"
                    name="password_confirmation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password_confirmation}
                    helperText={touched.password_confirmation && errors.password_confirmation}
                    error={Boolean(
                      touched.password_confirmation && errors.password_confirmation
                    )}
                  />
                </div>

                <div className="form-group mb-0">
                  <FormControlLabel
                    label={
                      <>
                        I agree the{" "}
                        <Link
                          to="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms & Conditions
                      </Link>
                      </>
                    }
                    control={
                      <Checkbox
                        color="primary"
                        name="acceptTerms"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        checked={values.acceptTerms}
                      />
                    }
                  />
                </div>

                <div className="kt-login__actions">
                  <Link
                    to="/auth/forgot-password"
                    className="kt-link kt-login__link-forgot"
                  >
                    Quên mật khẩu?
                </Link>

                  <Link to="/auth">
                    <button type="button" className="btn btn-secondary btn-elevate kt-login__btn-secondary">
                      Back
                  </button>
                  </Link>

                  <button
                    disabled={isSubmitting || !values.acceptTerms}
                    className="btn btn-primary btn-elevate kt-login__btn-primary"
                  >
                    Đăng ký
                </button>
                </div>
              </form>
            )}
        </Formik>
      </div>
    </div>
  );
}

export default connect(null, auth.actions)(Registration);

