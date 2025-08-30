import React, { useEffect } from "react";
import style from "./page.module.css";
import { CiTrash } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
  fetchWishlist,
} from "../../redux/slices/wishlistSlice";
import { IoIosRepeat } from "react-icons/io";
import Loading from "../../components/Loading";

export default function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems, isLoading } = useSelector(
    (state) => state.whish
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await dispatch(removeFromWishlist(productId)).unwrap();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Wishlist</h1>
      <table className={style.table}>
        <thead>
          <tr className={style.Table_head}>
            <th className={style.head_table}>product</th>
            <th className={style.head_table}>name</th>
            <th className={style.head_table}>price</th>
            <th className={style.head_table}></th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems && wishlistItems.length > 0 ? (
            wishlistItems.map((product) => (
              <tr key={product._id || product.id}>
                <td className={` ${style.body_table}`}>
                  <img
                    src={product.defaultImage?.url || product.image}
                    alt="img"
                    width={100}
                    height={100}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/productDetails/${product._id || product.id}`);
                    }}
                  />
                </td>
                <td className={style.body_table}>{product.name}</td>
                <td className={style.body_table}>
                  {product.finalPrice || product.price}
                </td>
                <td className={style.body_table}>
                  <CiTrash
                    cursor={"pointer"}
                    onClick={() =>
                      handleRemoveFromWishlist(product._id || product.id)
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No items in wishlist
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
        <p className="m-0 fs-5">continue shipping</p>
        <IoIosRepeat size={30} />
      </Link>
    </div>
  );
}
