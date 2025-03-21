import React, { useEffect, useState } from 'react';
import css from './New.module.css';
import ProductCard from './ProductCard';
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from '../redux/slices/getAllProducts';
import { fetchMenProducts } from '../redux/slices/getMenProducts';

export default function Topselling() {
    const [activeBtn, setactiveBtn] = useState('all');
    const [loading, setLoading] = useState(true); // Track loading state
    const [Products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProducts.data);
    const menProducts = useSelector((state) => state.menProducts.data);
    const handleAllProducts = () => {
        setactiveBtn('all');
        setProducts(allProducts);
    };

    const handleMenButtonClick = () => {
        setactiveBtn('men');
        setProducts(menProducts);
    };

    const handleWomenButtonClick = () => {
        setactiveBtn('women');
        axios
            .get('https://backend-kappa-beige.vercel.app/product?subCategory=660dce5572576adbe362b2c6')
            .then((res) => {
                setProducts(res.data.result);

            })
            .catch((err) => {

            });
    };

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(fetchMenProducts());
    }, [dispatch]);

    useEffect(() => {
        if (allProducts.length > 0 && menProducts.length > 0) {
            setLoading(false);
            handleAllProducts();
        }
    }, [allProducts, menProducts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="d">
            <div className='my-5 d-flex align-items-center justify-content-center flex-column'>
                <h1>Top selling</h1>
                <div className="d-flex align-items-center justify-content-center gap-3 my-4">
                    <button onClick={handleAllProducts} className={`${css.filterBtn} ${activeBtn === 'all' ? css.activeBtn : ''}`}>All</button>
                    <button onClick={handleWomenButtonClick} className={`${css.filterBtn} ${activeBtn === 'women' ? css.activeBtn : ''}`}>Women's</button>
                    <button onClick={handleMenButtonClick} className={`${css.filterBtn} ${activeBtn === 'men' ? css.activeBtn : ''}`}>Men's</button>
                </div>
            </div>
            <div className="row row-gap-2 my-5">
                {Products.slice(0, 8).map((x, ind) => {
                    return (
                        <div key={ind} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <ProductCard allPRoduct={x} ProdImage={x.defaultImage.url} secondImage={x.image[0].url} name={x.name} descripe={x.description} price={x.finalPrice} oldprice={x.price} prodId={x.id} />
                        </div>
                    );
                })}
            </div>
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={css.animated_button}>
                <span onClick={() => navigate('/allProducts')} className={css.text}>View all Products</span>
                <span className={css.circle}></span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={css.arr_1}
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                </svg>
            </motion.button>
        </div>
    );
}
