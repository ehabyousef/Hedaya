import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from '../Login/page.module.css';
import Swal from 'sweetalert2';
export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);

    const [userDetails, setuserDetails] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });
    const getuser = (e) => {
        let myuser = { ...userDetails };
        myuser[e.target.name] = e.target.value;
        setuserDetails(myuser);
        console.log(myuser);
    };
    function submitRegister(e) {
        e.preventDefault();
        setisLoading(true);
        axios
            .post("https://backend-kappa-beige.vercel.app/auth/register", userDetails)
            .then((response) => {
                console.log(response.data);
                setisLoading(false);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "registerd successfuly please check your mail"
                });
            })
            .catch((error) => {
                console.log(error.data);
                setisLoading(false);
            });

    }
    return (
        <div className="d-flex align-items-center p-3 h-100" style={{ background: "#D9B282" }}>
            <div className="container my-5">
                <h2 className="my-md-5" style={{ color: 'var(--white_color)' }}>Register Now</h2>
                <form className="py-0" onSubmit={submitRegister}>
                    <div className="d-flex gap-1 gap-md-4 flex-wrap flex-md-column my-4">
                        <div className={style.group}>
                            <input required type="text"
                                id="userName"
                                name="userName"
                                onChange={getuser}
                                className={style.input} />
                            <label className={style.label}>Name</label>
                        </div>
                        <div className={style.group}>
                            <input
                                onChange={getuser}
                                required
                                type="email"
                                name="email"
                                id="email"
                                className={style.input} />
                            <label className={style.label}>email</label>
                        </div>
                        <div className={style.group}>
                            <input
                                onChange={getuser}
                                required
                                type="password"
                                name="password"
                                id="password"
                                className={style.input} />
                            <label className={style.label}>password</label>
                        </div>
                        <div className={style.group}>
                            <input
                                onChange={getuser}
                                required
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className={style.input} />
                            <label className={style.label}>confirmPassword</label>
                        </div>
                    </div>
                    <div className={style.butonsDiv}>
                        <button className={style.submit} type="submit">
                            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
                        </button>
                        <p className='fs-2' style={{ color: 'var(--white_color)' }}>or</p>
                        <button className={style.submit} type="submit" style={{ width: '12vw', height: '6vh' }}>
                            Login With Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
