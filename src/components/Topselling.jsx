import React, { useEffect, useState } from "react";
import css from "./New.module.css";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllProducts,
  fetchFilteredProducts,
  setActiveFilter,
} from "../redux/slices/Products";
import { fetchCategories } from "../redux/slices/categoriesSlice";

export default function Topselling() {
  const [activeBtn, setactiveBtn] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: allProducts, loading } = useSelector(
    (state) => state.allProducts
  );
  const { data: categories } = useSelector((state) => state.categories);

  console.log("🚀 ~ Topselling ~ allProducts:", allProducts);
  console.log("🚀 ~ Topselling ~ categories:", categories);

  const handleAllProducts = () => {
    setactiveBtn("all");
    dispatch(setActiveFilter(null));
    // Fetch ALL products when "All" button is clicked
    dispatch(fetchAllProducts());
  };

  const handleCategoryFilter = (categoryId, buttonName) => {
    setactiveBtn(buttonName);
    dispatch(setActiveFilter({ categoryId }));
    // Fetch FILTERED products for the selected category
    dispatch(fetchFilteredProducts({ categoryId }));
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d">
      <div className="my-5 d-flex align-items-center justify-content-center flex-column">
        <h1>Top selling</h1>
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
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="row row-gap-2 my-5">
        {allProducts?.slice(0, 8).map((x, ind) => {
          return (
            <div key={ind} className="col-12 col-sm-6 col-md-4 col-lg-3">
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
            </div>
          );
        })}
      </div>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={css.animated_button}
      >
        <span onClick={() => navigate("/allProducts")} className={css.text}>
          View all Products
        </span>
        <span className={css.circle}></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={css.arr_1}
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
      </motion.button>
    </div>
  );
}
