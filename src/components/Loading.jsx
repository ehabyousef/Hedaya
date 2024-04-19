import React from 'react'
import logo from '../images/logo-no-background.png';
import style from './loa.module.css';
export default function Loading() {
    return (
        <div style={{ height: '100vh', width: '98vw' }}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100" >
                <img src={logo} alt="logo" className={style.img_lo} />
            </div>
        </div>
    )
}
