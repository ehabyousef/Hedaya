import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./page.module.css";
import Swal from "sweetalert2";
import {
  forgetPassword,
  clearError,
  clearSuccess,
} from "../../redux/slices/authSlice";

export default function ForgetPassword(props) {
  const dispatch = useDispatch();
  const { isLoading, error, forgetPasswordSuccess } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue && !validateEmail(emailValue)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const submitForgetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    dispatch(clearError());
    dispatch(forgetPassword({ email }));
  };

  useEffect(() => {
    if (forgetPasswordSuccess) {
      Swal.fire({
        title: "Email Sent!",
        text: "Please check your email for password reset instructions.",
        icon: "success",
        confirmButtonText: "OK",
      });
      dispatch(clearSuccess());
    }
  }, [forgetPasswordSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    props.showFooter && props.showFooter(false);
    return () => {
      props.showFooter && props.showFooter(true);
    };
  }, [props]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "85vh", width: "100vw" }}
    >
      <div
        className="d-flex justify-content-center align-items-center shadow rounded-5 p-5"
        style={{
          minHeight: "60vh",
          width: "90vw",
          maxWidth: "500px",
          background: "rgb(217, 178, 130)",
        }}
      >
        <div className="w-100">
          <div className="text-center mb-4">
            <h2 className="mb-3">Forgot Password?</h2>
            <p className="text-muted">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={submitForgetPassword}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>

            <button
              type="submit"
              className={`btn w-100 mb-3 ${style.submitBtn || "btn-primary"}`}
              disabled={isLoading || emailError || !email}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                "Send Reset Email"
              )}
            </button>
          </form>

          <div className="text-center">
            <Link to="/auth" className="text-decoration-none">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
