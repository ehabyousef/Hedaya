import React, { useEffect, useState } from "react";
import css from "./New.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchFilteredProducts,
  setActiveFilter,
} from "../redux/slices/Products";
import { fetchCategories } from "../redux/slices/categoriesSlice";

export default function NewArrival() {
  const [activeBtn, setactiveBtn] = useState("all");
  const dispatch = useDispatch();

  const {
    data: allProducts,
    filterd,
    loading,
    activeFilter,
  } = useSelector((state) => state.allProducts);
  const { data: categories } = useSelector((state) => state.categories);

  // Show all products on mount
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategories());
    setactiveBtn("all");
  }, [dispatch]);

  // When a category is clicked
  const handleAllProducts = () => {
    setactiveBtn("all");
    dispatch(setActiveFilter(null));
    dispatch(fetchAllProducts());
  };

  const handleCategoryFilter = (categoryId, buttonName) => {
    setactiveBtn(buttonName);
    dispatch(setActiveFilter({ categoryId }));
    dispatch(fetchFilteredProducts({ categoryId }));
  };

  // Determine which products to display
  const productsToShow = activeBtn === "all" ? allProducts : filterd;

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="d">
      <div className="my-5 d-flex align-items-center justify-content-center flex-column">
        <h1>New Arrivals</h1>
        <div className="d-flex align-items-center justify-content-center gap-3 my-4">
          <button
            onClick={handleAllProducts}
            className={`${css.filterBtn} ${
              activeBtn === "all" ? css.activeBtn : ""
            }`}
          >
            All
          </button>
          {categories?.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryFilter(category._id, category.name)}
              className={`${css.filterBtn} ${
                activeBtn === category.name ? css.activeBtn : ""
              }`}
            >
              {category.name === "رجال" ? "رجال" : category.name}
            </button>
          ))}
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
        {productsToShow?.slice(0, 5).map((x, ind) => {
          return (
            <SwiperSlide key={ind} className={css.swiper_slide}>
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
  );
}
