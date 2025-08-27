import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GiHotMeal, GiShinyApple } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { PiShirtFoldedDuotone } from "react-icons/pi";
import { BsDatabaseAdd } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { toggleValue } from "../../redux/slices/TureOr";
import { useDispatch } from "react-redux";
function Sidebar() {
  const [choosen, setChoosen] = useState("Prdoucts");
  const location = useLocation();
  const dispatch = useDispatch();
  // const logOut = () => {
  //   dispatch(clearCart());
  //   dispatch(clearWishlist());
  //   localStorage.clear()
  //   dispatch(toggleValue());
  // }; 
  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") {
      setChoosen("Prdoucts");
    } else if (path === "/dashboard/users") {
      setChoosen("users");
    } else if (path === "/dashboard/add") {
      setChoosen("Add");
    } else if (path === "/dashboard/recipes") {
      setChoosen("Recipes");
    } else if (path === "/dashboard/dash_prdoucts") {
      setChoosen("Prdoucts");
    }
  }, [location.pathname]);

  return (
    <div className={style.main_div}>
      <Link to={"/"} className={style.logo}>
        Fast Plate
      </Link>
      <div className={style.divider}></div>
      <div className="d-flex flex-column gap-5 my-5 align-items-start ps-3 ps-lg-5">
        <Link to={"/dashboard/dash_prdoucts"}>
          <div
            onClick={() => setChoosen("Prdoucts")}
            className={`d-flex gap-3 align-items-center ${style.title_div}  ${
              choosen === "Prdoucts" ? style.active : ""
            }`}
          >
            <PiShirtFoldedDuotone size={40} />
            <h4 className="d-none d-lg-block m-0">Prdoucts</h4>
          </div>
        </Link>
        <Link to={"/dashboard/users"}>
          <div
            onClick={() => setChoosen("users")}
            className={`d-flex gap-3 align-items-center ${style.title_div}  ${
              choosen === "users" ? style.active : ""
            }`}
          >
            <FaUsers size={40} />
            <h4 className="d-none d-lg-block m-0">users</h4>
          </div>
        </Link>
        <Link to={"/dashboard/add"}>
          <div
            onClick={() => setChoosen("Add")}
            className={`d-flex gap-3 align-items-center ${style.title_div}  ${
              choosen === "Add" ? style.active : ""
            }`}
          >
            <BsDatabaseAdd size={40} />
            <h4 className="d-none d-lg-block m-0">Add</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
