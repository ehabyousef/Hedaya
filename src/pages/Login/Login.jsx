import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./page.module.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  clearError,
  clearSuccess,
} from "../../redux/slices/authSlice";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, loginSuccess, user } = useSelector(
    (state) => state.auth
  );

  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  });

  const getuser = (e) => {
    let myuser = { ...userDetails };
    myuser[e.target.name] = e.target.value;
    setuserDetails(myuser);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(loginUser(userDetails));
  };

  useEffect(() => {
    if (loginSuccess && user) {
      if (user.isAdmin) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully, redirecting to dashboard",
        }).then(() => {
          dispatch(clearSuccess());
          navigate("/dashboard");
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully, redirecting to home",
        }).then(() => {
          dispatch(clearSuccess());
          navigate("/");
        });
      }
    }
  }, [loginSuccess, user, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error,
      });
    }
  }, [error]);
  return (
    <div
      className="d-flex align-items-center p-3 h-100"
      style={{ background: "#D9B282" }}
    >
      <div className="container mb-5 my-md-5">
        <h2 className="my-5" style={{ color: "var(--white_color)" }}>
          Login Now
        </h2>
        <form className="py-0" onSubmit={submitLogin}>
          <div className="d-flex gap-5 flex-column my-4">
            <div className={style.group}>
              <input
                onChange={getuser}
                required
                type="text"
                name="email"
                id="email"
                className={style.input}
              />
              <label className={style.label}>Email</label>
            </div>
            <div className={style.group}>
              <input
                onChange={getuser}
                required
                type="password"
                name="password"
                id="password"
                className={style.input}
              />
              <label className={style.label}>password</label>
            </div>
          </div>
          <div className="text-center d-flex w-100 justify-content-between align-items-center">
            <button className={style.submit} type="submit">
              {isLoading ? <span className={style.loader}></span> : "Login"}
            </button>
            <Link
              to="/auth/forget-password"
              className="text-decoration-none"
              style={{ color: "var(--white_color)", fontSize: "14px" }}
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
