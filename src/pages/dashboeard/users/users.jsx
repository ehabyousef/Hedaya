"use client";
import React, { useState } from "react";
import style from "./users.module.css";
import { TbEdit } from "react-icons/tb";
import { CiTrash } from "react-icons/ci";
// import Pagination from "../../../components/pagination/pagination";
export default function Users() {
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
              <th className={style.head_table}>eamil</th>
              <th className={style.head_table}>location</th>
              <th className={style.head_table}>phone Number</th>
              <th className={style.head_table}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={` ${style.body_table}`}>
                <svg
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#5CB85F"
                    fill-opacity="0.64"
                  />
                  <path
                    d="M20.5 8.5C22.0913 8.5 23.6174 9.13214 24.7426 10.2574C25.8679 11.3826 26.5 12.9087 26.5 14.5C26.5 16.0913 25.8679 17.6174 24.7426 18.7426C23.6174 19.8679 22.0913 20.5 20.5 20.5C18.9087 20.5 17.3826 19.8679 16.2574 18.7426C15.1321 17.6174 14.5 16.0913 14.5 14.5C14.5 12.9087 15.1321 11.3826 16.2574 10.2574C17.3826 9.13214 18.9087 8.5 20.5 8.5ZM20.5 23.5C27.13 23.5 32.5 26.185 32.5 29.5C32.5 31.1569 31.1569 32.5 29.5 32.5H11.5C9.84315 32.5 8.5 31.1569 8.5 29.5C8.5 26.185 13.87 23.5 20.5 23.5Z"
                    fill="white"
                  />
                </svg>
                <span>Elboob</span>
              </td>
              <td className={style.body_table}>ehab@gmail.com</td>
              <td className={style.body_table}>
                <p className="m-0">Egypt , elsharqia </p>
                <p className={style.address}>mnia-elqamh, sunhot</p>
              </td>
              <td className={style.body_table}>01066241727</td>
              <td className={style.body_table}>
                <TbEdit />
                <CiTrash />
              </td>
            </tr>
            <tr>
              <td className={` ${style.body_table}`}>
                <svg
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#5CB85F"
                    fill-opacity="0.64"
                  />
                  <path
                    d="M20.5 8.5C22.0913 8.5 23.6174 9.13214 24.7426 10.2574C25.8679 11.3826 26.5 12.9087 26.5 14.5C26.5 16.0913 25.8679 17.6174 24.7426 18.7426C23.6174 19.8679 22.0913 20.5 20.5 20.5C18.9087 20.5 17.3826 19.8679 16.2574 18.7426C15.1321 17.6174 14.5 16.0913 14.5 14.5C14.5 12.9087 15.1321 11.3826 16.2574 10.2574C17.3826 9.13214 18.9087 8.5 20.5 8.5ZM20.5 23.5C27.13 23.5 32.5 26.185 32.5 29.5C32.5 31.1569 31.1569 32.5 29.5 32.5H11.5C9.84315 32.5 8.5 31.1569 8.5 29.5C8.5 26.185 13.87 23.5 20.5 23.5Z"
                    fill="white"
                  />
                </svg>
                <span>Elboob</span>
              </td>
              <td className={style.body_table}>ehab@gmail.com</td>
              <td className={style.body_table}>
                <p className="m-0">Egypt , elsharqia </p>
                <p className={style.address}>mnia-elqamh, sunhot</p>
              </td>
              <td className={style.body_table}>01066241727</td>
              <td className={style.body_table}>
                <TbEdit />
                <CiTrash />
              </td>
            </tr>
            <tr>
              <td className={` ${style.body_table}`}>
                <svg
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#5CB85F"
                    fill-opacity="0.64"
                  />
                  <path
                    d="M20.5 8.5C22.0913 8.5 23.6174 9.13214 24.7426 10.2574C25.8679 11.3826 26.5 12.9087 26.5 14.5C26.5 16.0913 25.8679 17.6174 24.7426 18.7426C23.6174 19.8679 22.0913 20.5 20.5 20.5C18.9087 20.5 17.3826 19.8679 16.2574 18.7426C15.1321 17.6174 14.5 16.0913 14.5 14.5C14.5 12.9087 15.1321 11.3826 16.2574 10.2574C17.3826 9.13214 18.9087 8.5 20.5 8.5ZM20.5 23.5C27.13 23.5 32.5 26.185 32.5 29.5C32.5 31.1569 31.1569 32.5 29.5 32.5H11.5C9.84315 32.5 8.5 31.1569 8.5 29.5C8.5 26.185 13.87 23.5 20.5 23.5Z"
                    fill="white"
                  />
                </svg>
                <span>Elboob</span>
              </td>
              <td className={style.body_table}>ehab@gmail.com</td>
              <td className={style.body_table}>
                <p className="m-0">Egypt , elsharqia </p>
                <p className={style.address}>mnia-elqamh, sunhot</p>
              </td>
              <td className={style.body_table}>01066241727</td>
              <td className={style.body_table}>
                <TbEdit />
                <CiTrash />
              </td>
            </tr>
            <tr>
              <td className={` ${style.body_table}`}>
                <svg
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#5CB85F"
                    fill-opacity="0.64"
                  />
                  <path
                    d="M20.5 8.5C22.0913 8.5 23.6174 9.13214 24.7426 10.2574C25.8679 11.3826 26.5 12.9087 26.5 14.5C26.5 16.0913 25.8679 17.6174 24.7426 18.7426C23.6174 19.8679 22.0913 20.5 20.5 20.5C18.9087 20.5 17.3826 19.8679 16.2574 18.7426C15.1321 17.6174 14.5 16.0913 14.5 14.5C14.5 12.9087 15.1321 11.3826 16.2574 10.2574C17.3826 9.13214 18.9087 8.5 20.5 8.5ZM20.5 23.5C27.13 23.5 32.5 26.185 32.5 29.5C32.5 31.1569 31.1569 32.5 29.5 32.5H11.5C9.84315 32.5 8.5 31.1569 8.5 29.5C8.5 26.185 13.87 23.5 20.5 23.5Z"
                    fill="white"
                  />
                </svg>
                <span>Elboob</span>
              </td>
              <td className={style.body_table}>ehab@gmail.com</td>
              <td className={style.body_table}>
                <p className="m-0">Egypt , elsharqia </p>
                <p className={style.address}>mnia-elqamh, sunhot</p>
              </td>
              <td className={style.body_table}>01066241727</td>
              <td className={style.body_table}>
                <TbEdit />
                <CiTrash />
              </td>
            </tr>
            <tr>
              <td className={` ${style.body_table}`}>
                <svg
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#5CB85F"
                    fill-opacity="0.64"
                  />
                  <path
                    d="M20.5 8.5C22.0913 8.5 23.6174 9.13214 24.7426 10.2574C25.8679 11.3826 26.5 12.9087 26.5 14.5C26.5 16.0913 25.8679 17.6174 24.7426 18.7426C23.6174 19.8679 22.0913 20.5 20.5 20.5C18.9087 20.5 17.3826 19.8679 16.2574 18.7426C15.1321 17.6174 14.5 16.0913 14.5 14.5C14.5 12.9087 15.1321 11.3826 16.2574 10.2574C17.3826 9.13214 18.9087 8.5 20.5 8.5ZM20.5 23.5C27.13 23.5 32.5 26.185 32.5 29.5C32.5 31.1569 31.1569 32.5 29.5 32.5H11.5C9.84315 32.5 8.5 31.1569 8.5 29.5C8.5 26.185 13.87 23.5 20.5 23.5Z"
                    fill="white"
                  />
                </svg>
                <span>Elboob</span>
              </td>
              <td className={style.body_table}>ehab@gmail.com</td>
              <td className={style.body_table}>
                <p className="m-0">Egypt , elsharqia </p>
                <p className={style.address}>mnia-elqamh, sunhot</p>
              </td>
              <td className={style.body_table}>01066241727</td>
              <td className={style.body_table}>
                <TbEdit />
                <CiTrash />
              </td>
            </tr>
            <tr>
              <td className={` ${style.body_table}`}>
                <svg
                  style={{ marginRight: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#5CB85F"
                    fill-opacity="0.64"
                  />
                  <path
                    d="M20.5 8.5C22.0913 8.5 23.6174 9.13214 24.7426 10.2574C25.8679 11.3826 26.5 12.9087 26.5 14.5C26.5 16.0913 25.8679 17.6174 24.7426 18.7426C23.6174 19.8679 22.0913 20.5 20.5 20.5C18.9087 20.5 17.3826 19.8679 16.2574 18.7426C15.1321 17.6174 14.5 16.0913 14.5 14.5C14.5 12.9087 15.1321 11.3826 16.2574 10.2574C17.3826 9.13214 18.9087 8.5 20.5 8.5ZM20.5 23.5C27.13 23.5 32.5 26.185 32.5 29.5C32.5 31.1569 31.1569 32.5 29.5 32.5H11.5C9.84315 32.5 8.5 31.1569 8.5 29.5C8.5 26.185 13.87 23.5 20.5 23.5Z"
                    fill="white"
                  />
                </svg>
                <span>Elboob</span>
              </td>
              <td className={style.body_table}>ehab@gmail.com</td>
              <td className={style.body_table}>
                <p className="m-0">Egypt , elsharqia </p>
                <p className={style.address}>mnia-elqamh, sunhot</p>
              </td>
              <td className={style.body_table}>01066241727</td>
              <td className={style.body_table}>
                <TbEdit />
                <CiTrash />
              </td>
            </tr>
          </tbody>
        </table>
        {/* <Pagination /> */}
      </div>
    </div>
  );
}
