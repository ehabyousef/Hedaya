import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoRocketOutline } from "react-icons/io5";
import { BsArrowRepeat } from "react-icons/bs";
import { LuBadgeInfo } from "react-icons/lu";
import { GrSupport } from "react-icons/gr";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import style from './page.module.css';
import { motion } from "framer-motion"
import ProductCard from '../../components/ProductCard';
import NewArrival from '../../components/NewArrival';
import soak from "../../images/soak.jpg";
import women from "../../images/women.jpg";
import men from "../../images/men.jpg";
import Topselling from '../../components/Topselling';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className={style.swiper}
            >
                <SwiperSlide className={style.swiper_slide}>
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >Modern Galabia designs</motion.h1>
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={style.animated_button}>
                        <Link to={'/allProducts'} className={style.text}>Shop now</Link>
                        <span className={style.circle}></span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={style.arr_1} viewBox="0 0 24 24">
                            <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                            ></path>
                        </svg>
                    </motion.button>
                </SwiperSlide>
                <SwiperSlide className={style.swiper_slide}>
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}>
                        Modern Hijab designs
                    </motion.h1>
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={style.animated_button}>
                        <Link to={'/allProducts'} className={style.text}>Shop now</Link>
                        <span className={style.circle}></span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={style.arr_1} viewBox="0 0 24 24">
                            <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                            ></path>
                        </svg>
                    </motion.button>
                </SwiperSlide>
                <SwiperSlide className={style.swiper_slide}>
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ color: "white" }}>Books and islamic acccessories</motion.h1>
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={style.animated_button}>
                        <Link to={'/allProducts'} className={style.text}>Shop now</Link>
                        <span className={style.circle}></span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={style.arr_1} viewBox="0 0 24 24">
                            <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                            ></path>
                        </svg>
                    </motion.button>
                </SwiperSlide>
            </Swiper>
            {/* end of swipper  */}
            {/* start categories section  */}
            <div className="row my-4">
                <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                    <div className="d-flex gap-2 align-items-center">
                        <div className="d-flex w-100 flex-column gap-3 justify-content-end align-items-start" id={style.first_card}>
                            <p className='m-0'>new arrival</p>
                            <h3>Mos7af & mo7afes</h3>
                            <button className={style.animated_button}>
                                <Link to={'/allProducts'} className={style.text}>Shop now</Link>
                                <span className={style.circle}></span>
                            </button>
                        </div>
                        <div className="d-flex w-100 h-100 flex-column gap-3 justify-content-end align-items-start" id={style.sec_card}>
                            <p className='m-0'>new arrival</p>
                            <Link to={'/allProducts'}>seb7a & accessory</Link>
                            <button className={style.animated_button}>
                                <Link to={'/allProducts'} className={style.text}>Shop now</Link>
                                <span className={style.circle}></span>
                            </button>
                        </div>
                    </div>
                    <div className="d">
                        <div className="d-flex flex-column gap-3 justify-content-end align-items-start" id={style.third_card}>
                            <p className='m-0'>new arrival</p>
                            <h3>Hijab & negab</h3>
                            <button className={style.animated_button}>
                                <Link to={'/allProducts'} className={style.text}>Shop now</Link>
                                <span className={style.circle}></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-4 d-none d-lg-block">
                    <div className="d-flex h-100 flex-column gap-3 justify-content-end align-items-start" id={style.fourth_card}>
                        <p className='m-0'>new arrival</p>
                        <h3 >Keftan & galabia</h3>
                        <button className={style.animated_button}>
                            <Link to={'/allProducts'} className={style.text}>Shop now</Link>
                            <span className={style.circle}></span>
                        </button>
                    </div>
                </div>
            </div>

            <NewArrival />
            {/* start section  */}
            <br />
            <div className="row my-5">
                <div className="col">
                    <div className={style.content}>
                        <img src={men} alt="hi" className={style.img} />
                        <div className={style.body}>
                            <h3>Men's</h3>
                            <h4>125 product</h4>
                            <Link to={'/allProducts'}>
                                shop Now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className={style.content}>
                        <img src={women} alt="hi" className={style.img} />
                        <div className={style.body}>
                            <h3>women's</h3>
                            <h4>125 product</h4>
                            <Link to={'/allProducts'}>
                                shop Now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className={style.content}>
                        <img src={soak} alt="hi" className={style.img} />
                        <div className={style.body}>
                            <h3>things</h3>
                            <h4>125 product</h4>
                            <Link to={'/allProducts'}>
                                shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* end section  */}
            <Topselling />
            <br />
            <div className="row my-5" id={style.service}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="col d-flex  justify-content-center gap-3">
                    <IoRocketOutline size={50} color='var(--blue)' />
                    <div className="c">
                        <h4>FREE SHIPPING</h4>
                        <p>Orders $50 or more</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="col d-flex  justify-content-center gap-3">
                    <BsArrowRepeat size={50} color='var(--blue)' />
                    <div className="c">
                        <h4>FREE RETURNS</h4>
                        <p>Within 30 days</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="col d-flex  justify-content-center gap-3">
                    <LuBadgeInfo size={50} color='var(--blue)' />
                    <div className="c">
                        <h4>GET 20% OFF ITEMS</h4>
                        <p>When you sign up</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="col d-flex  justify-content-center gap-3">
                    <GrSupport size={50} color='var(--blue)' />
                    <div className="c">
                        <h4>WE SUPPORT</h4>
                        <p>24/7 amazing services</p>
                    </div>
                </motion.div>

            </div>
        </div >
    )
}
