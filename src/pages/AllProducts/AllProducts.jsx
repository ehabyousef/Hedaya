import React, { useEffect, useState } from 'react';
import style from './ss.module.css';
import ProductCard from '../../components/ProductCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/slices/getAllProducts';
import { fetchMenProducts } from '../../redux/slices/getMenProducts';
import { fetchwoMenProducts } from '../../redux/slices/getWomenProducts';
import { fetchThingsProducts } from '../../redux/slices/getThings';
const itemsPerPage = 8; // Number of items per page

export default function AllProducts() {
    const [loading, setLoading] = useState(true); // Track loading state
    const [currentPage, setCurrentPage] = useState(1);
    const [sortValue, setsortValue] = useState('')
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProducts.data);
    const menProducts = useSelector((state) => state.menProducts.data);
    const womenProducts = useSelector((state) => state.womenProducts.data);
    const thingsProducts = useSelector((state) => state.thingsProducts.data);
    const [filterOption, setFilterOption] = useState('all'); // State to store filter option

    useEffect(() => {
        dispatch(fetchAllProducts(sortValue));
        dispatch(fetchMenProducts(sortValue));
        dispatch(fetchwoMenProducts(sortValue));
        dispatch(fetchThingsProducts(sortValue));
    }, [currentPage, dispatch, sortValue]); // Fetch products when currentPage changes

    useEffect(() => {
        if (allProducts.length > 0 && menProducts.length > 0 && womenProducts.length > 0) {
            setLoading(false);
        }
    }, [allProducts, menProducts, womenProducts, thingsProducts]);

    useEffect(() => {
        setCurrentPage(1); // Reset currentPage when filter changes
    }, [filterOption]);

    function handleProducts() {
        let filteredProducts = [];
        if (filterOption === 'all') {
            filteredProducts = allProducts;
        } else if (filterOption === '1') {
            filteredProducts = menProducts;
        } else if (filterOption === '2') {
            filteredProducts = womenProducts;
        } else if (filterOption === '3') {
            filteredProducts = thingsProducts;
        }
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        return {
            totalPages,
            products: filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
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
        console.log(sortValue);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const { totalPages, products } = handleProducts();

    return (
        <div className="container">
            <div className="row my-3">
                <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center row-gap-3">
                    <p>
                        Showing <span className="fw-bold">{itemsPerPage}</span> of <span className="fw-bold">{products.length}</span> Products
                    </p>
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                        <p className="m-0 fs-5">Filter</p>
                        <select className="form-select" aria-label="Default select example" id={style.select} onChange={handleFilterChange} value={filterOption}>
                            <option value="all">All</option>
                            <option value="1">Men</option>
                            <option value="2">Women</option>
                            <option value="3">Things</option>
                        </select>
                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                        <p className="m-0 fs-5">Sort</p>
                        <select className="form-select" aria-label="Default select example" id={style.select} onChange={handleSelectChange}>
                            <option selected value={' '}>Default</option>
                            <option value={'-finalPrice'}>price -</option>
                            <option value={'finalPrice'}>Price +</option>
                            <option value={'-availableItems'}>availableItems -</option>
                            <option value={'availableItems'}>availableItems +</option>
                        </select>
                    </div>
                    <div className={style.input_wrapper}>
                        <button className={style.icon}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" />
                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M22 22L20 20" />
                            </svg>
                        </button>
                        <input placeholder="search.." className={style.input} name="text" type="text" />
                    </div>
                </div>
            </div>
            <div className="row my-5 row-gap-3">
                {products.map((product, index) => (
                    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center" key={index}>
                        <div style={{ width: '100%' }}>
                            <ProductCard
                                allPRoduct={product}
                                ProdImage={product.defaultImage.url}
                                secondImage={product.image[0].url}
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
                        style={{ margin: '1rem auto' }}
                    />
                </Stack>
            </div>
        </div>
    );
}
