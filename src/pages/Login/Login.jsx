import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from './page.module.css';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setValueTrue } from '../../redux/slices/TureOr';
export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const dispatch = useDispatch();
    const [userDetails, setuserDetails] = useState({
        email: "",
        password: "",
    });
    const getuser = (e) => {
        let myuser = { ...userDetails };
        myuser[e.target.name] = e.target.value;
        setuserDetails(myuser);
        console.log(myuser);
    };
    function submitLogin(e) {
        e.preventDefault();
        setisLoading(true);
        axios
            .post("https://backend-kappa-beige.vercel.app/auth/login", userDetails)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("userToken", response.data.result);
                setisLoading(false);
                if (response.data.success) {
                    dispatch(setValueTrue())
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully going to home"
                    }).then(() => {
                        navigate("/home");
                    });
                }
            })
            .catch((error) => {
                console.log(error.data);
                setisLoading(false);
            });

    }
    return (
        <div className="d-flex align-items-center p-3 h-100" style={{ background: "#D9B282" }}>
            <div className="container mb-5 my-md-5">
                <h2 className="my-5" style={{ color: 'var(--white_color)' }}>Login Now</h2>
                <form className="py-0" onSubmit={submitLogin}>
                    <div className="d-flex gap-5 flex-column my-4">
                        <div className={style.group}>
                            <input
                                onChange={getuser}
                                required
                                type="text"
                                name="email"
                                id="email"
                                className={style.input} />
                            <label className={style.label}>Email</label>
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
                    </div>
                    <button className={style.submit} type="submit">
                        {isLoading ? <span className={style.loader}></span> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}
