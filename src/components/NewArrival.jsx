import React, { useEffect, useState } from 'react'
import css from './New.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';
import axios from "axios";

export default function NewArrival() {
    const [activeBtn, setactiveBtn] = useState('all')
    const [Products, setProducts] = useState([])

    const handleAllProducts = () => {
        setactiveBtn('all')
        axios.get("https://backend-kappa-beige.vercel.app/product?category=660dafb95737493603ed9ef8")
            .then((res) => {
                setProducts(res.data.result)
            }).catch((err) => {
                console.log(err);
            })
    };
    const handleWomenButtonClick = () => {
        setactiveBtn('women'); // Update the activeBtn state
        axios
            .get('https://backend-kappa-beige.vercel.app/product?subCategory=660dce5572576adbe362b2c6')
            .then((res) => {
                setProducts(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleMenButtonClick = () => {
        setactiveBtn('men'); // Update the activeBtn state
        axios
            .get('https://backend-kappa-beige.vercel.app/product?subCategory=660db0425737493603ed9efd')
            .then((res) => {
                setProducts(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        handleAllProducts()
    }, [])
    return (
        <div className="d">
            <div className='my-5 d-flex align-items-center justify-content-center flex-column'>
                <h1>New Arrivals</h1>
                <div className="d-flex align-items-center justify-content-center gap-3 my-4">
                    <button onClick={handleAllProducts} className={`${css.filterBtn} ${activeBtn === 'all' ? css.activeBtn : ''}`}>All</button>
                    <button
                        onClick={handleWomenButtonClick}
                        className={`${css.filterBtn} ${activeBtn === 'women' ? css.activeBtn : ''}`}
                    >
                        Women's
                    </button>
                    <button onClick={handleMenButtonClick} className={`${css.filterBtn} ${activeBtn === 'men' ? css.activeBtn : ''}`}>Men's</button>
                </div>
            </div>
            <Swiper
                breakpoints={{
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 1,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 1,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 1,
                    },
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                grabCursor={true}
                modules={[Pagination]}
                className={css.swiper}
            >
                {Products.slice(0, 5).map((x, ind) => {
                    return (

                        <SwiperSlide className={css.swiper_slide}>
                            <ProductCard allPRoduct={x} ProdImage={x.defaultImage.url} secondImage={x.image[0].url} name={x.name} descripe={x.description} price={x.finalPrice} oldprice={x.price} prodId={x.id} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
