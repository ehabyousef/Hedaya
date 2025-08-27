import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
export default function Auth(props) {
  const [menuClicked, setMenuClicked] = useState(false);
  const [menuClicked2, setMenuClicked2] = useState(false);

  const handleMenuClick = () => {
    setMenuClicked(true);
    setMenuClicked2(true);
  };
  const handleMenuClick2 = () => {
    setMenuClicked(false);
    setMenuClicked2(false);
  };
  useEffect(() => {
    props.showFooter(false);
    return () => {
      props.showFooter(true);
    };
  }, [props]);

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center "
        style={{ height: "85vh", width: "100vw" }}
      >
        <div
          className="d-flex overflow-hidden position-relative shadow rounded-5 p-0"
          style={{ height: "80vh", width: "80vw" }}
        >
          <div className="col-12 col-md-6  " id={style.logDiv}>
            <Login />
          </div>
          <div className="col-12 col-md-6  " id={style.regDiv}>
            <Register />
          </div>
          <div
            id={style.menu}
            className={`col-12 col-md-6 d-flex justify-content-center align-items-center flex-column gap-3 ${
              menuClicked ? style.menuClicked : ""
            }`}
          >
            <h1>Hello, friend</h1>
            <h5>personal data and enjoy</h5>
            <b>already have an account</b>
            <button onClick={handleMenuClick2} className={style.cta}>
              <span className={style.hover_underline_animation}> Log in </span>
              <svg
                id="arrow-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={10}
                viewBox="0 0 46 16"
              >
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                  transform="translate(30)"
                />
              </svg>
            </button>
          </div>
          <div
            id={style.menu2}
            className={`col-12 col-md-6 d-flex justify-content-center align-items-center flex-column gap-3 ${
              menuClicked2 ? style.menuClicked2 : ""
            }`}
          >
            <h1 className="text-center">welcome Back, friend</h1>
            <p>your personal data and enjoy</p>
            <b>don't have an account</b>
            <button onClick={handleMenuClick} className={style.cta}>
              <span className={style.hover_underline_animation}> sign up </span>
              <svg
                id="arrow-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={10}
                viewBox="0 0 46 16"
              >
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                  transform="translate(30)"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
