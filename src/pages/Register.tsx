import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import { register } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import Helmet from "../components/Helmet";
import logo from "../images/logo.png";

import "../styles/Register.css"

let schema = yup.object().shape({
  email: yup
    .string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Email should be valid")
    .required("Email is Required"),
  fullname: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Full Name should only contain letters")
    .required("Full Name is Required"),
  username: yup.string().required("Username is Required"),
  password: yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/,
      "Password must contain at least one number, one uppercase letter, one lowercase letter, one special character, and be 8-13 characters long"
    ).required("Password is Required"),
});

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  const { auth } = useSelector((state: RootState) => state);
  const { user, message } = auth;

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (
      formik.values.password.length >= 6 &&
      formik.values.email.length > 0 &&
      formik.values.fullname.length > 0 &&
      formik.values.username.length > 0
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    formik.values.email.length,
    formik.values.fullname.length,
    formik.values.password.length,
    formik.values.username.length,
  ]);

  const [typePass, setTypePass] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [userExist, setUserExist] = useState<boolean>(false);
  return (
    <Helmet title="Sign up • Socito">
      <div className="register-page">
        <div className="main-register-page">
          <div className="form-data-register">
            <form onSubmit={formik.handleSubmit}>
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>

              <div className="register-text">
                Sign up to see photos from your friends.
              </div>


              <input
                type="Email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="mb-1" style={{ color: "red" }}>
                  {formik.errors.email}
                </div>
              ) : null}

              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={formik.handleChange("fullname")}
                onBlur={formik.handleBlur("fullname")}
                value={formik.values.fullname}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="mb-1" style={{ color: "red" }}>
                  {formik.errors.fullname}
                </div>
              ) : null}

              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={formik.handleChange("username")}
                onBlur={formik.handleBlur("username")}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="mb-1" style={{ color: "red" }}>
                  {formik.errors.username}
                </div>
              ) : null}

              <div className="pass">
                <input
                  className="input-password form-data-register-password"
                  type={typePass ? "text" : "password"}
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                  name="password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="mb-1" style={{ color: "red" }}>
                    {formik.errors.password}
                  </div>
                ) : null}

                <h6 onClick={() => setTypePass(!typePass)}>
                  {typePass }
                </h6>
              </div>





              <button
              onClick={()=>{
                setUserExist(true);
                
              }}
                type="submit"
                className={
                  isActive ? "form-btn active-btn" : "form-btn pe-none"
                }
                disabled={
                  formik.values.email &&
                    formik.values.username &&
                    formik.values.fullname &&
                    formik.values.password
                    ? false
                    : true
                }
              >
                Next
              </button>

       {userExist && 
              <div
                className="text-danger text-center my-3"
                style={{ fontSize: "0.8rem" }}
              >
                {message !== "success" ? message : ""}
              </div>}


            </form>
            <div className="sign-up">
              Have an account?{" "}
              <Link className="sign-up-btn" to="/login">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};
export default Register;
