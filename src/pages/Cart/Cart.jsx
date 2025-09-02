import React, { useEffect } from "react";
import style from "../Whishlist/page.module.css";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "../../redux/slices/cartSlice";
import { IoIosRepeat } from "react-icons/io";
import { Link } from "react-router-dom";
export default function Cart() {
  const cart = useSelector((state) => state.cart.data || []);
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const loading = useSelector((state) => state.cart.loading);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Helper to safely get product id from various shapes
  const getProductId = (item) =>
    item?.product?._id ||
    item?.product?.id ||
    item?.productId ||
    (typeof item?.product === "string" ? item.product : undefined) ||
    item?._id;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromCart = (productId) => {
    if (!productId) return;
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId, currentQuantity) => {
    if (!productId) return;
    dispatch(updateCartQuantity({ productId, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (!productId) return;
    if (currentQuantity > 1) {
      dispatch(
        updateCartQuantity({ productId, quantity: currentQuantity - 1 })
      );
    }
  };

  const getTotalCartPrice = () => {
    if (cartInfo?.totalPrice) {
      return cartInfo.totalPrice.toFixed(2);
    }
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  if (!isAuthenticated) {
    return (
      <div className="container text-center my-5">
        <h3>Please login to view your cart</h3>
        <Link to="/auth" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="container text-center my-5">Loading...</div>;
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container text-center my-5">
        <h3>Your cart is empty</h3>
        <Link to="/allProducts" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Cart</h1>
      <table className={style.table}>
        <thead>
          <tr className={style.Table_head}>
            <th className={style.head_table}>product</th>
            <th className={style.head_table}>name</th>
            <th className={style.head_table}>price</th>
            <th className={style.head_table}>Quantity</th>
            <th className={style.head_table}>total</th>
            <th className={style.head_table}></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => {
            const pid = getProductId(item);
            const product =
              item.product && typeof item.product === "object"
                ? item.product
                : null;
            const imgSrc = product?.defaultImage?.url || "/placeholder.jpg";
            const name = product?.name || "Product";
            return (
              <tr key={pid || index}>
                <td className={` ${style.body_table}`}>
                  <img src={imgSrc} alt="img" width={100} height={100} />
                </td>
                <td className={style.body_table}>{name}</td>
                <td className={style.body_table}>{item.price}</td>
                <td className={style.body_table}>
                  <span
                    className="border border-black rounded-1 d-flex mx-auto"
                    style={{ width: "fit-content" }}
                  >
                    <div
                      onClick={() => handleDecreaseQuantity(pid, item.quantity)}
                      className="btn count"
                    >
                      -
                    </div>
                    <p className="px-4 mx-0 my-2">{item.quantity}</p>
                    <div
                      onClick={() => handleIncreaseQuantity(pid, item.quantity)}
                      className="btn count"
                    >
                      +
                    </div>
                  </span>
                </td>
                <td className={style.body_table}>
                  {(item.quantity * item.price).toFixed(2)}
                </td>
                <td className={style.body_table}>
                  <CiTrash
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveFromCart(pid)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Cart Summary */}
      <div className="row justify-content-end my-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h4>Cart Summary</h4>
            <div className="d-flex justify-content-between">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total Quantity:</span>
              <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-5 fw-bold">
              <span>Total Price:</span>
              <span>${getTotalCartPrice()}</span>
            </div>
            <button className="btn btn-primary mt-3">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <Link
        to={"/allProducts"}
        className="d-flex justify-content-center align-items-center gap-3 p-2"
        style={{
          border: "1px solid var(--blue)",
          width: "fit-content",
          margin: "1rem auto",
          cursor: "pointer",
        }}
      >
        <p className="m-0 fs-5">continue shopping</p>
        <IoIosRepeat size={30} />
      </Link>
    </div>
  );
}
