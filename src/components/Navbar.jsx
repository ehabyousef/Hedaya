import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "../images/logo-no-background.png";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleValue } from "../redux/slices/TureOr";
import { removeFromCart, fetchCart } from "../redux/slices/cartSlice";
import { clearWishlist, fetchWishlist } from "../redux/slices/wishlistSlice";
import { CiTrash } from "react-icons/ci";
import { motion } from "framer-motion";

export default function Navbar() {
  const cart = useSelector((state) => state.cart.data);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const whish = useSelector((state) => state.whish.items || []);
  const isValueTrue = useSelector((state) => state.TureOr.isValueTrue);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch cart and wishlist data when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const logOut = () => {
    // Clear local cart data on logout
    dispatch(clearWishlist());
    localStorage.clear();
    dispatch(toggleValue());
  };
  function getTotalPrice() {
    // Use totalPrice from API if available, otherwise calculate manually
    if (cartInfo?.totalPrice) {
      return cartInfo.totalPrice.toFixed(2);
    }

    let totalPrice = 0;
    if (cart && Array.isArray(cart)) {
      cart.forEach((item) => {
        totalPrice += parseFloat(item.price) * item.quantity;
      });
    }
    return totalPrice.toFixed(2);
  }

  return (
    <div>
      <nav
        id={style.nav}
        className="navbar navbar-expand-lg bg-body-tertiary py-1"
      >
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
          <div
            className="collapse navbar-collapse d-lg-flex justify-content-end"
            id="navbarSupportedContent"
          >
            <ul
              className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center gap-4 me-3"
              id={style.ul}
            >
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
                {isValueTrue ? (
                  <Link className="nav-link" to="/auth" onClick={logOut}>
                    Log out
                  </Link>
                ) : (
                  <Link className="nav-link" to="/auth">
                    Sign in
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/favourite">
                  favourite
                  <span className={style.cart_num}>
                    {isValueTrue ? `${whish.length}` : 0}
                  </span>
                </Link>
              </li>
              <li className="nav-item position-relative" id={style.cart_link}>
                <Link className="nav-link position-relative" to="/cart">
                  <BsCart3 size={30} color="var(--blue)" />
                  <span className={style.cart_num}>
                    {isAuthenticated && cart ? cart.length : 0}
                  </span>
                </Link>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${style.mini_cart} row row-gap-3  rounded-2`}
                >
                  <div
                    className=""
                    style={{
                      maxHeight: "300px",
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cart && cart.length > 0 ? (
                      cart.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex border-bottom my-2 py-3"
                        >
                          <div className="col-6 d-flex align-items-start flex-column ">
                            <div>
                              <p>{item.product?.name || "Product"}</p>
                            </div>
                            <div style={{ color: "var(--red_color)" }}>
                              {item.price} $ x {item.quantity}
                            </div>
                          </div>
                          <div className="col-6 d-flex justify-content-end align-items-center gap-3 flex-row">
                            <img
                              src={
                                item.product?.defaultImage?.url ||
                                "/placeholder.jpg"
                              }
                              alt="img"
                              width={60}
                              height={60}
                            />
                            <CiTrash
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleRemoveFromCart(
                                  item.product._id || item.product.id
                                );
                              }}
                              size={20}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>no items in cart</p>
                    )}
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center fs-4">
                    Total price: <span> {getTotalPrice()} $</span>
                  </div>
                  <Link to={"/cart"} className={style.toCart}>
                    View Cart
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
