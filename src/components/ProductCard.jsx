import { useState } from "react";
import css from "./productCart.module.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  fetchCart,
} from "../redux/slices/cartSlice.js";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../redux/slices/wishlistSlice.js";
import Swal from "sweetalert2";

export default function ProductCard({
  allPRoduct,
  ProdImage,
  name,
  descripe,
  price,
  oldprice,
  prodId,
  secondImage,
}) {
  const navigate = useNavigate();
  const [hoverd, sethoverd] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const cart = useSelector((state) => state.cart.data || []);
  const whishlist = useSelector((state) => state.whish.items || []);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validCart = cart?.filter((item) => item !== null);
  const validWhishlist = Array.isArray(whishlist)
    ? whishlist.filter((item) => item !== null)
    : [];

  const isInCart = validCart.some((item) => {
    const cartProductId = item.product._id || item.product.id;
    const currentProductId = prodId || allPRoduct._id || allPRoduct.id;
    return cartProductId === currentProductId;
  });
  const isInWishlist = validWhishlist?.some((item) => {
    const wishlistProductId =
      item._id || item.id || item.product?._id || item.product?.id;
    const currentProductId = prodId || allPRoduct._id || allPRoduct.id;
    return wishlistProductId === currentProductId;
  });
  console.log("🚀 ~ ProductCard ~ isInWishlist:", isInWishlist);

  // Load cart data when component mounts if user is authenticated
  // NOTE: cart is fetched centrally (e.g. in App) to avoid multiple requests

  const handleCartAction = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to login to add items to cart",
        confirmButtonText: "Login",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth");
        }
      });
      return;
    }

    setCartLoading(true);
    try {
      const productId = prodId || allPRoduct._id || allPRoduct.id;
      if (isInCart) {
        await dispatch(removeFromCart(productId)).unwrap();
        // Refresh cart to update UI immediately
        await dispatch(fetchCart());
        Swal.fire({
          icon: "success",
          title: "Removed from cart",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        await dispatch(
          addToCart({
            productId: productId,
            quantity: 1,
          })
        ).unwrap();
        // Refresh cart to update UI immediately
        await dispatch(fetchCart());
        Swal.fire({
          icon: "success",
          title: "Added to cart",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong",
      });
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistAction = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to login to add items to wishlist",
        confirmButtonText: "Login",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth");
        }
      });
      return;
    }

    try {
      const productId = prodId || allPRoduct._id || allPRoduct.id;

      let res;
      if (isInWishlist) {
        res = await dispatch(removeFromWishlist(productId)).unwrap();
      } else {
        res = await dispatch(addToWishlist(productId)).unwrap();
      }

      // Optional toast with backend message if provided
      if (res?.message) {
        Swal.fire({
          icon: "success",
          title: res.message,
          toast: true,
          position: "top-end",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      // Refresh wishlist to update UI immediately
      await dispatch(fetchWishlist());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong",
      });
    }
  };
  return (
    <div className={css.content}>
      {hoverd ? (
        <img
          onMouseLeave={() => sethoverd(false)}
          src={secondImage}
          alt={name}
          className={css.img}
          onClick={() =>
            navigate(
              `/productDetails/${prodId || allPRoduct._id || allPRoduct.id}`
            )
          }
        />
      ) : (
        <img
          onMouseEnter={() => sethoverd(true)}
          src={ProdImage}
          alt={name}
          className={css.img}
          onClick={() =>
            navigate(
              `/productDetails/${prodId || allPRoduct._id || allPRoduct.id}`
            )
          }
        />
      )}
      <div className={css.body}>
        <h3>{name}</h3>
        <h5 className={css.decrip}>{descripe}</h5>
        <div className={css.price_section}>
          <span className={css.current_price}>{price}$</span>
          {oldprice && <span className={css.old_price}>{oldprice}$</span>}
        </div>
        <div
          className="d-flex align-items-center justify-content-center gap-2"
          id={css.view}
        >
          <div
            onClick={handleCartAction}
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer", opacity: cartLoading ? 0.6 : 1 }}
          >
            <MdOutlineAddShoppingCart size={16} />
            {cartLoading ? (
              <h6 className="m-0 p-0">Loading...</h6>
            ) : isInCart ? (
              <h6 className="m-0 p-0 text-danger">Remove</h6>
            ) : (
              <h6 className="m-0 p-0">Add to cart</h6>
            )}
          </div>
          {isInWishlist ? (
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={handleWishlistAction}
            >
              <FaRegHeart size={16} color="red" />
              <h6 className="m-0 p-0">Remove</h6>
            </div>
          ) : (
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={handleWishlistAction}
            >
              <FaRegHeart size={16} color="black" />
              <h6 className="m-0 p-0">Wishlist</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
