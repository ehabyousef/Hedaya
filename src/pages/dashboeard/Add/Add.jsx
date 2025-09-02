import React, { useState } from "react";
import style from "./add.module.css";
import { CiCamera } from "react-icons/ci";
import { PiShirtFoldedDuotone } from "react-icons/pi";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  fetchAllProducts,
} from "../../../redux/slices/Products";
import { fetchCategories } from "../../../redux/slices/categoriesSlice";
import { fetchUsers } from "../../../redux/slices/usersSlice";
import { fetchSubcategories } from "../../../redux/slices/subcategoriesSlice";
import { useEffect } from "react";

export default function Add() {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.categories?.data || []);
  const users = useSelector((s) => s.users?.data || []);
  const subcategories = useSelector((s) => s.subcategories?.data || []);
  const [defaultImage, setDefaultImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [prod, setProd] = useState({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    status: "new",
    availableItems: 0,
    category: "",
    subCategory: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDefaultImageChange = (e) => {
    setDefaultImage(e.target.files[0]);
  };

  const handleSubImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 6); // allow multiple images
    setSubImages(files);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setProd((prev) => ({
      ...prev,
      subCategory: selectedValue,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setProd((prev) => ({ ...prev, category: selectedValue, subCategory: "" }));
  };

  const handleCreatedByChange = (e) => {
    const selectedValue = e.target.value;
    setProd((prev) => ({ ...prev, createdBy: selectedValue }));
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUsers());
    dispatch(fetchSubcategories());
  }, [dispatch]);

  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Required primitives
    formData.append("name", prod.name);
    formData.append("description", prod.description);
    formData.append("price", String(prod.price));
    formData.append("discount", String(prod.discount));
    formData.append("status", prod.status);
    formData.append("availableItems", String(prod.availableItems));
    formData.append("category", prod.category);
    formData.append("subCategory", prod.subCategory);
    // createdBy selected from admins list
    if (prod.createdBy) formData.append("createdBy", prod.createdBy);
    // Files
    if (defaultImage) formData.append("defaultImage", defaultImage);
    subImages.forEach((image) => formData.append("images", image));
    dispatch(createProduct(formData)).then(() => {
      Swal.fire({
        icon: "success",
        title: "Product Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchAllProducts());
      setDefaultImage(null);
      setSubImages([]);
      setProd({
        name: "",
        description: "",
        price: 0,
        discount: 0,
        status: "new",
        availableItems: 0,
        category: "",
        subCategory: "",
        createdBy: "",
      });
    });
  };

  return (
    <div className="p-5">
      <form
        onSubmit={addProduct}
        className="d-flex align-items-center justify-content-center flex-column"
      >
        <div className="form-floating w-75 my-4">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={prod.name}
            onChange={handleChange}
          />
          <label htmlFor="name"> Product Name</label>
        </div>
        <div className="form-floating w-75 mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="description"
            value={prod.description}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product description</label>
        </div>
        <div className="form-floating w-75 mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            name="availableItems"
            value={prod.availableItems}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product availableItems</label>
        </div>
        <div className="form-floating w-75 mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            name="price"
            value={prod.price}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product Price</label>
        </div>

        <div className="form-floating w-75 mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            name="discount"
            value={prod.discount}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput"> Product discount</label>
        </div>
        <div
          className="d-flex align-items-center gap-4 flex-column flex-md-row my-3 flex-wrap"
          style={{ minHeight: "350px" }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <label htmlFor="defaultImage" className={style.custom_file_upload}>
              {defaultImage ? (
                <img
                  src={URL.createObjectURL(defaultImage)}
                  alt="Selected"
                  className={style.display_image}
                  width={100}
                  height={100}
                />
              ) : (
                <div className="d">
                  <div className={style.icon}>
                    <PiShirtFoldedDuotone size={100} />
                  </div>
                  <div className={style.text}>
                    <CiCamera size={36} />
                    <span>Upload the default image</span>
                  </div>
                </div>
              )}
              <input
                id="defaultImage"
                type="file"
                accept="image/*"
                onChange={handleDefaultImageChange}
              />
            </label>
          </div>
          <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
            <label htmlFor="subImages" className={style.custom_file_upload}>
              <div className="d">
                <div className={style.icon}>
                  <PiShirtFoldedDuotone size={100} />
                </div>
                <div className={style.text}>
                  <CiCamera size={36} />
                  <span>Upload up to 2 sub images</span>
                </div>
              </div>
              <input
                id="subImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleSubImagesChange}
              />
            </label>
            <div className="d-flex gap-2">
              {subImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`sub ${index + 1}`}
                  className={style.display_image}
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 w-100">
            <div className="d-flex align-items-center gap-2 w-100">
              <p className="m-0 fs-6" style={{ minWidth: 90 }}>
                Category
              </p>
              <select
                className="form-select p-2"
                id={style.select}
                value={prod.category}
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.id} value={cat._id || cat.id}>
                    {cat.name || cat.title || cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-center gap-2 w-100">
              <p className="m-0 fs-6" style={{ minWidth: 90 }}>
                Sub Category
              </p>
              <select
                className="form-select p-2"
                id={style.select}
                value={prod.subCategory}
                onChange={handleSelectChange}
              >
                <option value="">Select subcategory</option>
                {subcategories
                  .filter((sub) => {
                    const catId = prod.category;
                    if (!catId) return true;
                    return (
                      sub.category === catId ||
                      sub.categoryId === catId ||
                      (sub.category &&
                        (sub.category._id === catId ||
                          sub.category.id === catId))
                    );
                  })
                  .map((sub) => (
                    <option key={sub._id || sub.id} value={sub._id || sub.id}>
                      {sub.name || sub.title || sub.label}
                    </option>
                  ))}
              </select>
            </div>
            <div className="d-flex align-items-center gap-2 w-100">
              <p className="m-0 fs-6" style={{ minWidth: 90 }}>
                Created By
              </p>
              <select
                className="form-select p-2"
                id={style.select}
                value={prod.createdBy}
                onChange={handleCreatedByChange}
              >
                <option value="">Select admin</option>
                {users
                  .filter((u) => u.isAdmin)
                  .map((u) => (
                    <option key={u._id || u.id} value={u._id || u.id}>
                      {u.userName || u.email}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}
