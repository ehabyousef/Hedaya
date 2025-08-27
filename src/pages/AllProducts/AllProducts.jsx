import React, { useEffect, useState } from "react";
import style from "./ss.module.css";
import ProductCard from "../../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchFilteredProducts,
} from "../../redux/slices/Products";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import Loading from "../../components/Loading";
const itemsPerPage = 8; // Number of items per page

export default function AllProducts() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setsortValue] = useState("");
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts.data);
  const filteredProducts = useSelector((state) => state.allProducts.filterd);
  const categories = useSelector((state) => state.categories.data);
  const productsLoading = useSelector((state) => state.allProducts.loading);
  const [filterOption, setFilterOption] = useState("all"); // State to store filter option

  useEffect(() => {
    // Fetch categories on component mount
    dispatch(fetchCategories());
    // Fetch all products initially
    dispatch(fetchAllProducts(sortValue));
  }, [dispatch, sortValue]);

  useEffect(() => {
    // Set loading to false when we have data
    if (allProducts.length > 0 || filteredProducts.length > 0) {
      setLoading(false);
    }
  }, [allProducts, filteredProducts]);

  useEffect(() => {
    setCurrentPage(1); // Reset currentPage when filter changes

    // Handle filtering logic
    if (filterOption === "all") {
      dispatch(fetchAllProducts(sortValue));
    } else {
      // Filter by category ID
      dispatch(
        fetchFilteredProducts({
          categoryId: filterOption,
          subCategoryId: null,
        })
      );
    }
  }, [filterOption, dispatch, sortValue]);

  function handleProducts() {
    // Use filtered products if we have a filter applied, otherwise use all products
    const currentProducts =
      filterOption === "all" ? allProducts : filteredProducts;

    const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
    return {
      totalPages,
      products: currentProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    };
  }

  function handleFilterChange(event) {
    setFilterOption(event.target.value); // Update filter option state
  }

  function handlePageChange(event, page) {
    setCurrentPage(page);
  }
  const handleSelectChange = (event) => {
    setsortValue(event.target.value); // Update sortValue state when select value changes
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const { totalPages, products } = handleProducts();
  const totalProductsCount =
    filterOption === "all" ? allProducts.length : filteredProducts.length;

  return (
    <div className="container">
      <div className="row my-3">
        <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center row-gap-3">
          <p>
            Showing <span className="fw-bold">{products.length}</span> of{" "}
            <span className="fw-bold">{totalProductsCount}</span> Products
          </p>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
            <p className="m-0 fs-5">Filter</p>
            <select
              className="form-select"
              aria-label="Default select example"
              id={style.select}
              onChange={handleFilterChange}
              value={filterOption}
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
            <p className="m-0 fs-5">Sort</p>
            <select
              className="form-select p-2"
              aria-label="Default select example"
              id={style.select}
              onChange={handleSelectChange}
            >
              <option selected value={" "}>
                Default
              </option>
              <option value={"-finalPrice"}>price low to high</option>
              <option value={"finalPrice"}>price high to low</option>
              <option value={"-availableItems"}>
                availableItems low to high
              </option>
              <option value={"availableItems"}>
                availableItems high to low
              </option>
            </select>
          </div>
          <div className={style.input_wrapper}>
            <button className={style.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="25px"
                width="25px"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#fff"
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#fff"
                  d="M22 22L20 20"
                />
              </svg>
            </button>
            <input
              placeholder="search.."
              className={style.input}
              name="text"
              type="text"
            />
          </div>
        </div>
      </div>
      {productsLoading ? (
        <p>loading .... </p>
      ) : (
        <div className="row my-5 row-gap-3">
          {products.map((product, index) => (
            <div
              className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center"
              key={index}
            >
              <div style={{ width: "100%" }}>
                <ProductCard
                  allPRoduct={product}
                  ProdImage={product.defaultImage?.url}
                  secondImage={
                    product.images && product.images[0]
                      ? product.images[0].url
                      : undefined
                  }
                  name={product.name}
                  descripe={product.description}
                  price={product.finalPrice}
                  oldprice={product.price}
                  prodId={product.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="row">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            color="primary"
            style={{ margin: "1rem auto" }}
          />
        </Stack>
      </div>
    </div>
  );
}
