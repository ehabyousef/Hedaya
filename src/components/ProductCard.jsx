import React, { useState, useEffect } from "react";
import css from "./productCart.module.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { fetchDelWhishlist, fetchWhishlist } from "../redux/slices/whishlistSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/CartClice.js";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlices.js";

export default function ProductCard({ allPRoduct, ProdImage, name, descripe, price, oldprice, prodId, secondImage }) {
    const navigate = useNavigate();
    const [hoverd, sethoverd] = useState(false);
    const cart = useSelector((state) => state.Cart);
    const whishlist = useSelector((state) => state.whish);
    const dispatch = useDispatch(); // Get the dispatch function
    // const wishlistProducts = useSelector((state) => state.wishlist.products);
    console.log(whishlist);
    const isInCart = cart.some(item => item.id === prodId);
    const isInWishlist = whishlist.some(item => item.id === prodId);
    // const addToWishlist = () => {
    //     dispatch(fetchWhishlist({ itemID: prodId }));
    //     setIsInWishlist(!isInWishlist);
    // };

    // const DelFromWishlist = () => {
    //     dispatch(fetchDelWhishlist({ itemID: prodId }));
    //     setIsInWishlist(!isInWishlist);
    // };

    // Update isInWishlist when wishlistProducts changes
    // useEffect(() => {
    //     const isInWishlist = wishlistProducts.some(item => item.id === prodId);
    //     setIsInWishlist(isInWishlist);
    // }, [wishlistProducts, prodId]);

    return (
        <div className={css.content}>
            {hoverd
                ? <img onMouseLeave={() => sethoverd(false)} src={secondImage} alt="hi" className={css.img} onClick={() => navigate(`/productDetails/${prodId}`)} />
                : <img onMouseEnter={() => sethoverd(true)} src={ProdImage} alt="hi" className={css.img} onClick={() => navigate(`/productDetails/${prodId}`)} />
            }
            <div className={css.body}>
                <h3>{name}</h3>
                <h5 className={css.decrip}>{descripe}</h5>
                <span className="fs-4">
                    {price}<span className="mx-2 fs-5" style={{ color: 'var(--brown)', textDecoration: 'line-through' }}>{oldprice}</span>
                </span>
                <div className="d-flex align-items-center justify-content-center gap-3" id={css.view}>  
                    <div onClick={() => {
                        if (isInCart) {
                            dispatch(removeFromCart(allPRoduct));
                        } else {
                            dispatch(addToCart(allPRoduct));
                        }
                    }} className="d-flex align-items-center gap-3" style={{ cursor: "pointer" }}>
                        <MdOutlineAddShoppingCart size={20} />
                        {isInCart ?
                            <h6 className="m-0 p-0">Remove From cart</h6>
                            : <h6 className="m-0 p-0">add to cart</h6>
                        }
                    </div>
                    {isInWishlist ?
                        <div className="d-flex align-items-center gap-3" style={{ cursor: "pointer" }} onClick={() => dispatch(removeFromWishlist(allPRoduct))}>
                            <FaRegHeart size={20} color='red' />
                            <h6 className="m-0 p-0">Remove from wishlist</h6>
                        </div>
                        : <div className="d-flex align-items-center gap-3" style={{ cursor: "pointer" }} onClick={() => dispatch(addToWishlist(allPRoduct))}>
                            <FaRegHeart size={20} color='black' />
                            <h6 className="m-0 p-0">Add to wishlist</h6>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
