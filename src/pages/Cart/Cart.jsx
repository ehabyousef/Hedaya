import React, { } from 'react';
import style from '../Whishlist/page.module.css';
import { CiTrash } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/slices/CartClice';
import { IoIosRepeat } from "react-icons/io";
import { Link } from 'react-router-dom';
export default function Cart() {

    const cart = useSelector((state) => state.Cart)
    const dispatch = useDispatch()
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ id: productId }));
    };
    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseQuantity({ id: productId }));
    };
    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseQuantity({ id: productId }));
    };
    return (
        <div className='container'>
            <h1>Cart</h1>
            <table className={style.table}>
                <thead>
                    <tr className={style.Table_head}>
                        <th className={style.head_table}>product</th>
                        <th className={style.head_table}>name</th>
                        <th className={style.head_table}>price</th>
                        <th className={style.head_table}>Quantity</th>
                        <th className={style.head_table}>total</th>
                        <th className={style.head_table}></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <tr key={product.id}>
                            <td className={` ${style.body_table}`}>
                                <img src={product.defaultImage.url} alt="img" width={100} height={100} />
                            </td>
                            <td className={style.body_table}>{product.name}</td>
                            <td className={style.body_table}>{product.finalPrice}</td>
                            <td className={style.body_table}>
                                <span className="border border-black rounded-1 d-flex mx-auto" style={{ width: 'fit-content' }}>
                                    <div onClick={() => handleDecreaseQuantity(product.id)} className="btn count">
                                        -
                                    </div>
                                    <p className="px-4 mx-0 my-2">
                                        {product.qty}
                                    </p>
                                    <div onClick={() => handleIncreaseQuantity(product.id)} className="btn count">
                                        +
                                    </div>
                                </span>
                            </td>
                            <td className={style.body_table}>{(product.qty * product.finalPrice).toFixed(3)}</td>
                            <td className={style.body_table} onClick={handleRemoveFromCart}>
                                <CiTrash style={{ cursor: 'pointer' }} onClick={() => { dispatch(removeFromCart(product)) }} />
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
