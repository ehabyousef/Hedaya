import Users from "./users/users";
import DashNav from "../../components/dashNav/dashNav";
import Sidebar from "../../components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import DashProd from "./DashProd/DashProd";
import Add from "./Add/Add";

export default function Dashboard(props) {
  useEffect(() => {

    props.showNav(false)
    props.showFooter(false)
    return () => {
      props.showNav(true)
      props.showFooter(true)
    }
  }, [props])
  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="d-flex flex-column w-100 overflow-hidden"
        style={{ background: "var(--body)" }}
      >
        <DashNav />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/dash_prdoucts" element={<DashProd />} />
          <Route path="/" element={<DashProd />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </div>
  );
}
