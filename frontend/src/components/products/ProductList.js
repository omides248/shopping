import React, {useContext} from 'react';
import './ProductList.css';
import {CartContext} from "../../contexts/CartContext";
import {useFetch} from "../../hooks/UseFetch"


function ProductList() {

    const {data, success} = useFetch("products")

    const {addProductToCart} = useContext(CartContext)

    return (
        <>
            {!success ? <div style={{textAlign: "center"}}>loading</div> : data && data.map(product => {
                return (
                    <div className="column" key={product.id}>
                        <div className="card">
                            <img src={product.image} alt="Denim Jeans"
                                 style={{width: "100px", height: "100px", objectFit: "contain"}}/>
                            <h3>{product.name}</h3>
                            <p className="price">{product.price} تومان</p>
                            <p>{product.description ? product.description.substring(0, 10) : ""}</p>
                            <p>
                                <button type="submit"
                                        onClick={() => addProductToCart(product.id, product.name, product.price, product.image)}>افزودن
                                    به سبد خرید
                                </button>
                            </p>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default ProductList;