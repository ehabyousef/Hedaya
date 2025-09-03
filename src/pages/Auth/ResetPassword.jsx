import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import style from "./page.module.css";
import Swal from "sweetalert2";
import {
  resetPassword,
  clearError,
  clearSuccess,
} from "../../redux/slices/authSlice";
import { FaEye } from "react-icons/fa6";

export default function ResetPassword(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const { isLoading, error, resetPasswordSuccess } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const minLength = 6;
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long`;
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Validate password on change
    if (name === "password") {
      const passwordError = validatePassword(value);
      if (passwordError) {
        setFormErrors((prev) => ({
          ...prev,
          password: passwordError,
        }));
      }
    }

    // Validate confirm password on change
    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      const passwordToCheck = name === "password" ? value : formData.password;
      const confirmPasswordToCheck =
        name === "confirmPassword" ? value : formData.confirmPassword;

      if (
        confirmPasswordToCheck &&
        passwordToCheck !== confirmPasswordToCheck
      ) {
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }
  };

  const submitResetPassword = (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {};

    if (!formData.password) {
      errors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        errors.password = passwordError;
      }
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(clearError());
    dispatch(
      resetPassword({
        id,
        token,
        password: formData.password,
      })
    );
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      Swal.fire({
        title: "Success!",
        text: "Your password has been reset successfully. You can now login with your new password.",
        icon: "success",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/auth");
      });
      dispatch(clearSuccess());
    }
  }, [resetPasswordSuccess, dispatch, navigate]);

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
    // Validate that we have both id and token
    if (!id || !token) {
      Swal.fire({
        title: "Invalid Link!",
        text: "This password reset link is invalid or has expired.",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/auth");
      });
    }
  }, [id, token, navigate]);

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
            <h2 className="mb-3">Reset Password</h2>
            <p className="text-muted">Enter your new password below.</p>
          </div>

          <form onSubmit={submitResetPassword}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FaEye color="blcak" size={20} />
                </button>
              </div>
              {formErrors.password && (
                <div className="invalid-feedback d-block">
                  {formErrors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${
                    formErrors.confirmPassword ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FaEye color="blcak" size={20} />
                </button>
              </div>
              {formErrors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {formErrors.confirmPassword}
                </div> 
              )}
            </div>

            <button
              type="submit"
              className={`btn w-100 mb-3 ${style.submitBtn || "btn-primary"}`}
              disabled={
                isLoading ||
                !formData.password ||
                !formData.confirmPassword ||
                Object.keys(formErrors).some((key) => formErrors[key])
              }
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
