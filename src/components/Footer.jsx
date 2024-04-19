import React from 'react'
import logo from '../images/logo-no-background.png';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaCcApplePay, FaCcMastercard, FaCcPaypal, FaCcVisa, FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiVodafone } from "react-icons/si";
export default function Footer() {
    return (
        <div className={style.footer}>
            <div className='container p-4'>
                <div className="row row-gap-3">
                    <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column gap-3" id={style.first}>
                        <img src={logo} alt="logo" />
                        <p>You place to Found the Product that confirm Your thougths</p>
                        <div className="d-flex gap-4">
                            <Link to={'/https://www.facebook.com/profile.php?id=100080623690922'} className="d"><FaFacebook size={30} /></Link>
                            <Link to={'/https://www.linkedin.com/in/ehabyousef/'} className="d"><FaLinkedinIn size={30} /></Link>
                            <Link to={'/'} className="d"><FaInstagram size={30} /></Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-start">
                        <h2>Useful Links</h2>
                        <ul>
                            <li>about</li>
                            <li>shop</li>
                            <li>faq</li>
                            <li>contact</li>
                            <li>login</li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <h2>Customer Service</h2>
                        <ul>
                            <li>payment</li>
                            <li>returns</li>
                            <li>shipping</li>
                            <li>terms and conditions</li>
                            <li>privacy</li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <h2>My Account</h2>
                        <ul>
                            <li>sign in</li>
                            <li>cart</li>
                            <li>wishlis</li>
                            <li>orders</li>
                            <li>Help</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between w-100">
                    <p className='m-0'>Copyright © 2024 Hedaya Store. All Rights Reserved.</p>
                    <div className="d-flex align-items-center justify-content-center gap-4">
                        <FaCcVisa size={30} />
                        <FaCcMastercard size={30} />
                        <FaCcPaypal size={30} />
                        <FaCcApplePay size={30} />
                        <SiVodafone size={30} />
                    </div>
                </div>
            </div>
        </div>
    )
}
