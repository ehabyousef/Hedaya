import React, { useEffect, useState } from 'react';
import style from './page.module.css';
import { CiTrash } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/slices/wishlistSlices';
import { IoIosRepeat } from 'react-icons/io';
import Loading from '../../components/Loading';

export default function Wishlist() {
    const [value, setValue] = useState({}); // State to store quantity of each product
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.wishlist);

    const whishlistProd = useSelector((state) => state.whish.filter(product => product !== null)); // Filter out null products
    console.log(whishlistProd);

    useEffect(() => {
        // Initialize the value state with default quantity 1 for each product
        const initialValue = {};
        products.forEach(product => {
            initialValue[product.id] = 1;
        });
        setValue(initialValue);
    }, [products]);

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <div className='container'>
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
                    {whishlistProd.map(product => (
                        <tr key={product.id}>
                            <td className={` ${style.body_table}`}>
                                <img src={product.defaultImage.url} alt="img" width={100} height={100} style={{ cursor: 'pointer' }} onClick={() => { navigate(`/productDetails/${product.id}`) }} />
                            </td>
                            <td className={style.body_table}>{product.name}</td>
                            <td className={style.body_table}>{product.finalPrice}</td>
                            <td className={style.body_table}>
                                <CiTrash cursor={'pointer'} onClick={() => dispatch(removeFromWishlist(product))} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/allProducts'} className="d-flex justify-content-center align-items-center gap-3 p-2" style={{
                border: "1px solid var(--blue)",
                width: "fit-content",
                margin: '1rem auto',
                cursor: 'pointer',
            }}>
                <p className='m-0 fs-5'>continue shipping</p>
                <IoIosRepeat size={30} />
            </Link>
        </div>
    );
}
