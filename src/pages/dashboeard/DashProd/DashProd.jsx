import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { fetchAllProducts } from "../../../redux/slices/Products";
import css from "../../../components/productCart.module.css";
import { TbEdit } from "react-icons/tb";
import { CiTrash } from "react-icons/ci";
import axios from "axios";
import Swal from "sweetalert2";
const itemsPerPage = 12;
export default function DashProd() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hoverd, sethoverd] = useState(false);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts.data);
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = allProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const delteProd = (id) => {
    axios
      .delete(
        `https://backend-kappa-beige.vercel.app/product/deleteProduct/${id}`
      )
      .then((res) => {
        dispatch(fetchAllProducts());
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "warning",
          title: "Item Deleted successfully",
        });
      });
  };
  function handlePageChange(event, page) {
    setCurrentPage(page);
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [currentPage, dispatch]);
  useEffect(() => {
    if (allProducts.length > 0) {
      setLoading(false);
    }
  }, [allProducts]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row my-5 row-gap-5" style={{ minHeight: "650px" }}>
        {visibleProducts.map((product, index) => (
          <div
            className="col-12 col-md-4 col-lg-2 d-flex justify-content-center"
            key={index}
          >
            <div style={{ width: "100%" }}>
              <div className={css.content}>
                <img
                  onMouseLeave={() => sethoverd(false)}
                  src={
                    product.images && product.images[0]
                      ? product.images[0].url
                      : product.defaultImage?.url
                  }
                  alt="hi"
                  className={css.img}
                />
                <div className={css.body}>
                  <h3>{product.name}</h3>
                  <h5 className={css.decrip}>{product.description}</h5>
                  <span className="fs-4">
                    {product.finalPrice}
                    <span
                      className="mx-2 fs-5"
                      style={{
                        color: "var(--brown)",
                        textDecoration: "line-through",
                      }}
                    >
                      {product.price}
                    </span>
                  </span>
                  <div
                    className="d-flex align-items-center justify-content-center gap-3"
                    id={css.view}
                  >
                    <div
                      className="d-flex align-items-center gap-3"
                      style={{ cursor: "pointer" }}
                    >
                      <CiTrash size={20} color="red" />
                      <h6
                        className="m-0 p-0"
                        onClick={() => delteProd(product.id)}
                      >
                        Remove{" "}
                      </h6>
                    </div>

                    <div
                      className="d-flex align-items-center gap-3"
                      style={{ cursor: "pointer" }}
                    >
                      <TbEdit size={20} color="blue" />
                      <h6 className="m-0 p-0">Edit </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
