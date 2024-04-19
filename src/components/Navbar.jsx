import React from "react";
import { Link } from "react-router-dom";
import style from './Navbar.module.css';
import logo from '../images/logo-no-background.png';
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleValue } from "../redux/slices/TureOr";
import { clearCart } from "../redux/slices/CartClice";
import { clearWishlist } from "../redux/slices/wishlistSlices";

export default function Navbar() {
    const cart = useSelector((state) => state.Cart);
    const whish = useSelector((state) => state.whish);
    const isValueTrue = useSelector((state) => state.TureOr.isValueTrue);
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(clearCart());
        dispatch(clearWishlist());
        localStorage.clear()
        dispatch(toggleValue());
    };
    return (
        <div>
            <nav id={style.nav} className="navbar navbar-expand-lg bg-body-tertiary py-1">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" id={style.logo}>
                        <img src={logo} alt="logo" className={style.logo} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end " id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center gap-4 me-3" id={style.ul}>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allProducts">
                                    Shop
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                {isValueTrue ?
                                    <Link className="nav-link" to="/auth" onClick={logOut}>
                                        Log out
                                    </Link>
                                    :
                                    <Link className="nav-link" to="/auth">
                                        Sign in
                                    </Link>
                                }
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link position-relative" to="/favourite">
                                    favourite
                                    <span className={style.cart_num}>{isValueTrue ? `${whish.length}` : 0}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link position-relative" to="/cart" >
                                    <BsCart3 size={30} color="var(--blue)" />
                                    <span className={style.cart_num}>{isValueTrue ? `${cart.length}` : 0}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
