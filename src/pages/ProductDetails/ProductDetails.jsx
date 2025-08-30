import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./page.module.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Mousewheel, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../../redux/slices/wishlistSlice";
export default function ProductDetails() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [Products, setProducts] = useState([]);
  const [image, setimage] = useState("one");
  const [value, setvalue] = useState(1);
  const [appear, setappear] = useState(false);
  const cart = useSelector((state) => state.cart.data || []);
  const whishlist = useSelector((state) => state.whish.items || []);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const validCart = cart.filter((item) => item !== null);
  const validWishlist = whishlist?.filter((item) => item !== null);

  const isInCart =
    item?.id &&
    validCart.some(
      (x) => x.product._id === item.id || x.product.id === item.id
    );
  const isInWishlist =
    item?.id &&
    validWishlist.some((x) => x._id === item.id || x.id === item.id);
  const handleWishlistAction = async () => {
    if (!isAuthenticated) {
      // Handle non-authenticated user
      return;
    }

    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(item.id || item._id)).unwrap();
      } else {
        await dispatch(addToWishlist(item.id || item._id)).unwrap();
      }
    } catch (error) {
      console.error("Error with wishlist action:", error);
    }
  };

  const increse = () => {
    setvalue(value + 1);
  };
  const decrese = () => {
    setvalue((prevValue) => (prevValue >= 2 ? prevValue - 1 : 1));
  };

  useEffect(() => {
    const getProduct = () => {
      axios
        .get(`https://backend-kappa-beige.vercel.app/product/single/${id}`)
        .then((resp) => {
          setItem(resp.data.result);
        })
        .catch((err) => {});
    };

    const handleSubProducts = () => {
      if (item && item.subCategory) {
        axios
          .get(
            `https://backend-kappa-beige.vercel.app/product?subCategory=${item.subCategory}`
          )
          .then((res) => {
            setProducts(res.data.result);
          })
          .catch((err) => {
            //
          });
      }
    };

    getProduct();
    handleSubProducts();
  }, [id, item]);

  // Fetch wishlist when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  if (!item) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className="row my-5 row-gap-3">
        <div className="col-12 col-md-6 d-flex flex-md-row flex-column row-gap-2">
          <div className="col-4 d-flex flex-row  flex-md-column align-items-center gap-4 gap-md-4  order-1 order-md-0">
            <img
              onClick={() => setimage("one")}
              src={item.defaultImage?.url}
              alt="img"
              className={style.smallImg}
            />
            <img
              onClick={() => setimage("two")}
              src={item.images && item.images[0] ? item.images[0].url : ""}
              alt="img"
              className={style.smallImg}
            />
            <img
              onClick={() => setimage("three")}
              src={item.images && item.images[1] ? item.images[1].url : ""}
              alt="img"
              className={style.smallImg}
            />
          </div>
          <div className="col-md-8 order-0 order-md-1">
            {image === "one" ? (
              <img
                onClick={() => setappear(true)}
                src={item.defaultImage?.url}
                alt=""
                width="100%"
                height="100%"
              />
            ) : image === "two" ? (
              <img
                onClick={() => setappear(true)}
                src={item.images && item.images[0] ? item.images[0].url : ""}
                alt=""
                width="100%"
                height="100%"
              />
            ) : image === "three" ? (
              <img
                onClick={() => setappear(true)}
                src={item.images && item.images[1] ? item.images[1].url : ""}
                alt=""
                width="100%"
                height="100%"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-between gap-2">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <h5>
            price : <span className="fs-3">{item.finalPrice} eg</span>
          </h5>
          <div className="d-flex align-items-center gap-3">
            <span className="fs-5">Qty : </span>
            <span
              className="border border-black rounded-1 d-flex"
              style={{ width: "fit-content" }}
            >
              <div onClick={decrese} className="btn count">
                -
              </div>
              <big className="px-4 border-start border-end border-dark">
                {value}
              </big>
              <div onClick={increse} className="btn count">
                +
              </div>
            </span>
          </div>
          <div className="d-flex gap-3">
            <div
              onClick={() => {
                if (isInCart) {
                  dispatch(removeFromCart(item._id || item.id));
                } else {
                  dispatch(
                    addToCart({
                      product: item._id || item.id,
                      quantity: value,
                      price: parseFloat(item.finalPrice),
                    })
                  );
                }
              }}
              className="d-flex align-items-center px-3 py-2 gap-3"
              style={{ cursor: "pointer", border: "1px solid var(--blue)" }}
            >
              <MdOutlineAddShoppingCart size={20} />
              {isInCart ? (
                <div className=" " style={{ color: "var(--red_color)" }}>
                  remove from cart
                </div>
              ) : (
                <div className=" " style={{ color: "var(--black)" }}>
                  Add to cart
                </div>
              )}
            </div>
            <div
              className="d-flex align-items-center px-3 py-2 gap-3"
              style={{ cursor: "pointer", border: "1px solid var(--blue)" }}
            >
              {isInWishlist ? (
                <div
                  className="d-flex align-items-center gap-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleWishlistAction}
                >
                  <FaRegHeart size={20} color="red" />
                  <h6 className="m-0 p-0">Remove from wishlist</h6>
                </div>
              ) : (
                <div
                  className="d-flex align-items-center gap-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleWishlistAction}
                >
                  <FaRegHeart size={20} color="black" />
                  <h6 className="m-0 p-0">Add to wishlist</h6>
                </div>
              )}
            </div>
          </div>
          <div className="border-top p-2">
            <p className="m-0 fs-5">
              category : <span className="fs-4">islamic Products</span>
            </p>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <div className="row " style={{ margin: "6rem 0" }}>
        <h3 className="text-center">You May Also Like</h3>
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
          className={style.swiper}
        >
          {Products.map((x, ind) => {
            return (
              <SwiperSlide className={style.swiper_slide}>
                <ProductCard
                  allPRoduct={x}
                  ProdImage={x.defaultImage?.url}
                  secondImage={
                    x.images && x.images[0] ? x.images[0].url : undefined
                  }
                  name={x.name}
                  descripe={x.description}
                  price={x.finalPrice}
                  oldprice={x.price}
                  prodId={x.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {appear ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="d"
        >
          <Swiper
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={1}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            modules={[Mousewheel, Pagination]}
            className={style.Swiper}
            style={{
              height: "80vh",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              borderRadius: "20px",
            }}
          >
            <SwiperSlide className="position-relative">
              <p
                onClick={() => setappear(false)}
                className="position-absolute "
                style={{ top: "2vh", right: "2vw", cursor: "pointer" }}
              >
                <IoIosCloseCircleOutline size={45} />
              </p>
              <img
                src={item.defaultImage?.url}
                alt="img"
                width="100%"
                height="100%"
              />
            </SwiperSlide>
            <SwiperSlide>
              <p
                onClick={() => setappear(false)}
                className="position-absolute "
                style={{ top: "2vh", right: "2vw", cursor: "pointer" }}
              >
                <IoIosCloseCircleOutline size={45} />
              </p>
              <img
                src={item.images && item.images[0] ? item.images[0].url : ""}
                alt="img"
                width="100%"
                height="100%"
              />
            </SwiperSlide>
            <SwiperSlide>
              <p
                onClick={() => setappear(false)}
                className="position-absolute "
                style={{ top: "2vh", right: "2vw", cursor: "pointer" }}
              >
                <IoIosCloseCircleOutline size={45} />
              </p>
              <img
                src={item.images && item.images[1] ? item.images[1].url : ""}
                alt="img"
                width="100%"
                height="100%"
              />
            </SwiperSlide>
          </Swiper>
        </motion.div>
      ) : (
        ""
      )}
    </div>
  );
}
