import axios from 'axios';
import React, { useState } from 'react';
import style from './add.module.css';
import { CiCamera } from 'react-icons/ci';
import { PiShirtFoldedDuotone } from 'react-icons/pi';
import Swal from 'sweetalert2';

export default function Add() {
    const [defaultImage, setDefaultImage] = useState(null);
    const [subImages, setSubImages] = useState([]);
    const [prod, setProd] = useState({
        name: "",
        price: 0,
        availableItems: 0,
        discount: 0,
        description: "",
        category: '660dafb95737493603ed9ef8',
        subCategory: '660db0425737493603ed9efd',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProd((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(prod);
    };

    const handleDefaultImageChange = (e) => {
        setDefaultImage(e.target.files[0]);
    };

    const handleSubImagesChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 2); // Allow only up to 2 files
        setSubImages(files);
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setProd((prev) => ({
            ...prev,
            subCategory: selectedValue,
        }));
        console.log(prod);
    };

    const userToken = localStorage.getItem("userToken");
    const config = {
        headers: {
            token: userToken,
        },
    };

    const addProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('defaultImage', defaultImage);
        subImages.forEach((image) => {
            formData.append('subImages', image); // Use 'subImages' for each sub-image file
        });
        for (const key in prod) {
            formData.append(key, prod[key]);
        }

        axios.post('https://backend-kappa-beige.vercel.app/product/createProduct', formData, config)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(res.data);
            }).catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <div className="p-5">
            <form onSubmit={addProduct} className='d-flex align-items-center justify-content-center flex-column'>
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
                <div className="d-flex align-items-center gap-4 flex-column flex-md-row my-3 flex-wrap" style={{ minHeight: "350px" }}>
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
                            <input id="defaultImage" type="file" accept="image/*" onChange={handleDefaultImageChange} />
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
                            <input id="subImages" type="file" accept="image/*" multiple onChange={handleSubImagesChange} />
                        </label>
                        <div className="d-flex gap-2">
                            {subImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Sub Image ${index + 1}`}
                                    className={style.display_image}
                                    width={100}
                                    height={100}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                        <p className="m-0 fs-5">Type</p>
                        <select className="form-select p-2" aria-label="Default select example" id={style.select} onChange={handleSelectChange}>
                            <option value={'660db0425737493603ed9efd'}>Men</option>
                            <option value={'660dce5572576adbe362b2c6'}>Women</option>
                            <option value={'661020599e25e92a647b7672'}>Requirments</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
}
