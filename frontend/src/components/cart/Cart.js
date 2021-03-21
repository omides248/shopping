import React, {useContext, useState} from 'react';
import './Cart.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import {CartContext} from "../../contexts/CartContext";
import {AuthContext} from "../../contexts/AuthContext";
import axios from "axios";
import host from "../../config/config";

function Cart(props) {

    const {cartProducts, removeProductToCart, decrementProductOfCart, incrementProductToCart} = useContext(CartContext)
    const auth = useContext(AuthContext)

    const [data, setData] = useState([])
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const registerOrderSubmitHandler = async (event) => {
        event.preventDefault()
        const cart = localStorage.getItem("cart")
        const cartData = JSON.parse(cart)

        let requestBody = []
        if (cartData && cartData.items) {
            for (let i = 0; i < cartData.items.length; i++) {
                requestBody.push({
                    product_id: cartData.items[i]["id"],
                    quantity: cartData.items[i]["quantity"]
                })
            }

            const config = {
                headers: { Authorization: `Bearer ${auth.token}` }
            };

            await axios.post(host + "orders/",
                requestBody,
                config
            ).then(response => {
                setData(response.data)
                setSuccess(true)
                setError(false)
            }).catch(error => {
                setSuccess(false)
                setError(true)
            })
        }


    }

    return (
        <div className="div-table">
            {success && <h1 style={{color: "green", textAlign: "center"}}>شفارش شما با موفقیت ثبت پرداخت شد</h1>}

            {error &&<h1 style={{color: "red", textAlign: "center"}}>
                ثبت سفارش شما به مشکل برخورد لطفا مجدد تلاش کنید
            </h1>}
            <table className="table-cart">
                <thead>
                <tr>
                    <th className="th-image-tag">حذف</th>
                    <th>تصویر</th>
                    <th>نام کالا</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                    <th className="th-remove-tag">قیمت کل</th>

                </tr>
                </thead>

                <tbody>
                {cartProducts.items && cartProducts.items.map(product => {
                    return (
                        <tr key={product.id}>
                            <td className="td-remove-tag-right"><FontAwesomeIcon icon={faTrash}
                                                                                 className="trash-icon-cart"
                                                                                 onClick={() => removeProductToCart(product.id)}/>
                            </td>
                            <td><img src={product.image} style={{width: "50px", height: "50px", objectFit: "contain"}}
                                     alt={product.name}/></td>
                            <td>{product.name}</td>
                            <td><FontAwesomeIcon icon={faMinus} onClick={() => decrementProductOfCart(product.id)}
                                                 className="icon-decrement-cart"/> {product.quantity} <FontAwesomeIcon
                                icon={faPlus} onClick={() => incrementProductToCart(product.id)}
                                className="icon-increment-cart"/></td>
                            <td>{product.price}</td>
                            <td className="td-remove-tag-left">{product.total || product.price}</td>

                        </tr>
                    )
                })}
                <tr>
                    <td className="td-remove-tag-right"/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td className="td-remove-tag-left">{cartProducts.total}</td>

                </tr>
                </tbody>

            </table>
            {auth.token &&
            <form action="" onSubmit={registerOrderSubmitHandler}>
                <div className="div-button">
                    <button type="submit" className="button-cart">پرداخت</button>
                </div>
            </form>
            }
        </div>
    );
}

export default Cart;