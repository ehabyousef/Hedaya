import React from "react";
import style from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

// import required modules
import { Pagination } from "swiper/modules";
import ProductCard from "../../components/ProductCard";
import {
    FaCcApplePay,
    FaCcMastercard,
    FaCcPaypal,
    FaCcVisa,
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
    FaUserCircle,
} from "react-icons/fa";
export default function About() {
    return (
        <div className="container">
            <div className={style.head_bg}>
                <h1>About Us</h1>
                <p className="fs-3 fw-bold">who we are</p>
            </div>
            <div className="row my-5">
                <div className="col-12 col-md-6">
                    <h3>Our Vision</h3>
                    <p>
                        Our vision is to provide a diverse range of Islamic products that
                        cater to the spiritual and lifestyle needs of both men and women,
                        adhering strictly to halal standards. We envision a platform where
                        individuals can seamlessly integrate their faith into their everyday
                        lives, finding products that align with their Islamic values while
                        embracing modernity.
                    </p>
                </div>
                <div className="col-12 col-md-6">
                    <h3>Our Mission</h3>
                    <p>
                        Our mission is to curate a comprehensive collection of
                        halal-certified products, spanning from fashion and accessories to
                        personal care and home essentials. We strive to foster a community
                        where customers feel empowered to express their faith through their
                        choices, while also promoting ethical sourcing and sustainable
                        practices. Through our commitment to quality, inclusivity, and
                        authenticity, we aim to become the premier destination for Islamic
                        products globally, enriching lives and strengthening faith
                        connections.
                    </p>
                </div>
            </div>
            <hr />
            <br />
            <div className="row">
                <h2 className="text-center fw-bold text-capitalize my-4">
                    meet our team
                </h2>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    breakpoints={{
                        330: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    grabCursor={true}
                    loop={true}
                    modules={[Pagination]}
                    className={style.swiper}
                    style={{ margin: "1rem" }}
                >
                    <SwiperSlide className={style.swiper_slide}>
                        <div className={style.card_info_1}>
                            <div className={style.content}>
                                <motion.h2
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Ehab Yousef
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Front-end Developer
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="d-flex align-items-center justify-content-center gap-4"
                                >
                                    <FaFacebook size={30} />
                                    <FaLinkedinIn size={30} />
                                    <FaInstagram size={30} />
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <div className={style.card_info_2}>
                            <div className={style.content}>
                                <motion.h2
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Mariam Khalid
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Back-end Developer
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="d-flex align-items-center justify-content-center gap-4"
                                >
                                    <FaFacebook size={30} />
                                    <FaLinkedinIn size={30} />
                                    <FaInstagram size={30} />
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <div className={style.card_info_3}>
                            <div className={style.content}>
                                <motion.h2
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Elboob
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Ui/ux developer
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="d-flex align-items-center justify-content-center gap-4"
                                >
                                    <FaFacebook size={30} />
                                    <FaLinkedinIn size={30} />
                                    <FaInstagram size={30} />
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <hr />
            <br />
            <div className="row my-4">
                <h2 className="text-center fw-bold text-capitalize my-4">
                    What Customer Say About Us
                </h2>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    grabCursor={true}
                    loop={true}
                    modules={[Pagination]}
                    className={style.swiper}
                    style={{ margin: "1rem" }}
                >
                    <SwiperSlide className={style.swiper_slide}>
                        <div className="d-flex justify-content-center align-items-center flex-column gap-2 text-center">
                            <motion.h2>
                                <FaUserCircle />
                            </motion.h2>
                            <motion.p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Aliquam ullam inventore accusantium vero iusto velit alias
                                cupiditate repellat, consectetur harum deleniti possimus illo
                                nobis similique expedita atque, magnam vel neque?
                            </motion.p>
                            <motion.p>Ahmed ammer</motion.p>
                            <motion.p>customer</motion.p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <div className="d-flex justify-content-center align-items-center flex-column gap-2 text-center">
                            <motion.h2>
                                <FaUserCircle />
                            </motion.h2>

                            <motion.p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Aliquam ullam inventore accusantium vero iusto velit alias
                                cupiditate repellat, consectetur harum deleniti possimus illo
                                nobis similique expedita atque, magnam vel neque?
                            </motion.p>
                            <motion.p>Ahmed ammer</motion.p>
                            <motion.p>customer</motion.p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
