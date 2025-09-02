"use client";
import React, { useEffect } from "react";
import style from "./users.module.css";
import { TbEdit } from "react-icons/tb";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../../redux/slices/usersSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { data: users = [], loading } = useSelector(
    (s) => s.users || { data: [], loading: false }
  );
  console.log("🚀 ~ Users ~ users:", users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => dispatch(deleteUser(id));
  const handleToggleAdmin = (u) =>
    dispatch(updateUser({ id: u._id, data: { isAdmin: !u.isAdmin } }));

  return (
    <div className="px-5 my-4">
      <div
        className="my-4 rounded-3 p-3"
        style={{ background: "var(--text_white)" }}
      >
        <table className={style.table}>
          <thead>
            <tr className={style.Table_head}>
              <th className={style.head_table}>user</th>
              <th className={style.head_table}>email</th>
              <th className={style.head_table}>admin</th>
              <th className={style.head_table}></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className={style.body_table} colSpan={4}>
                  Loading…
                </td>
              </tr>
            )}
            {!loading && users.length === 0 && (
              <tr>
                <td className={style.body_table} colSpan={4}>
                  No users
                </td>
              </tr>
            )}
            {!loading &&
              users.map((u) => (
                <tr key={u._id}>
                  <td className={` ${style.body_table}`}>
                    <span>{u.userName}</span>
                  </td>
                  <td className={style.body_table}>{u.email}</td>
                  <td className={style.body_table}>
                    {u.isAdmin ? "Yes" : "No"}
                  </td>
                  <td className={style.body_table}>
                    {/* <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleToggleAdmin(u)}
                    >
                      <TbEdit />
                    </button> */}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u._id)}
                    >
                      <CiTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
