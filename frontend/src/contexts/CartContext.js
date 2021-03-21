import React, {createContext, useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

export const CartContext = createContext()

const CartContextProvider = (props) => {

    const [cartProducts, setProductsToCart] = useState(() => {
        const localData = localStorage.getItem("cart")
        return localData ? JSON.parse(localData) : {total: 0, count: 0, items: []}
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartProducts))
    }, [cartProducts]) // Every time change books set All books to localStorage


    const addProductToCart = (id, name, price, image) => {

        let is_found_product = false

        if (cartProducts.items) {
            if (cartProducts.items.length === 0) {

                setProductsToCart({
                    total: price,
                    count: 1,
                    items: [...cartProducts.items, {id, name, quantity: 1, price, total: price, image}]
                })

                is_found_product = true

            } else {

                for (let i = 0; i < cartProducts.items.length; i++) {
                    // console.log("Before : ", id, title, i)
                    if (cartProducts.items[i].id === id) {

                        // Update items filed in cart
                        cartProducts.items[i].quantity += 1
                        cartProducts.items[i].total += price

                        // Update cart common field
                        cartProducts.total += price
                        cartProducts.count += 1

                        // Replace new cart for refresh page
                        setProductsToCart({
                            total: cartProducts.total,
                            count: cartProducts.count,
                            items: [...cartProducts.items]
                        })

                        is_found_product = true
                        break
                    }
                }
            }
        }


        if (!is_found_product) {

            let count = cartProducts.count + 1

            // Replace new cart for refresh page
            setProductsToCart({
                total: cartProducts.total + price,
                count: count,
                items: [...cartProducts.items, {id, name, quantity: 1, price, total: price, image}]
            })

        }
    }

    const removeProductToCart = (id) => {

        for (let i = 0; i < cartProducts.items.length; i++) {
            if (cartProducts.items[i].id === id) {

                // Update cart common field
                cartProducts.total -= cartProducts.items[i].price * cartProducts.items[i].quantity
                cartProducts.count -= cartProducts.items[i].quantity

                // Remove item i of cart
                cartProducts.items.splice(i, 1)

                // Replace new cart for refresh page
                setProductsToCart({
                    total: cartProducts.total,
                    count: cartProducts.count,
                    items: [...cartProducts.items]
                })

                break
            }
        }


    }

    const incrementProductToCart = (id) => {

        for (let i = 0; i < cartProducts.items.length; i++) {
            if (cartProducts.items[i].id === id) {

                // Update items filed in cart
                cartProducts.items[i].quantity += 1;
                cartProducts.items[i].total += cartProducts.items[i].price;

                // Update cart common field
                cartProducts.total += cartProducts.items[i].price
                cartProducts.count += 1

                // Replace new cart for refresh page
                setProductsToCart({
                    total: cartProducts.total,
                    count: cartProducts.count,
                    items: [...cartProducts.items]
                })

                break
            }
        }
    }

    const decrementProductOfCart = (id) => {
        for (let i = 0; i < cartProducts.items.length; i++) {
            if (cartProducts.items[i].id === id) {

                let old_quantity = cartProducts.items[i].quantity;

                if (old_quantity > 1) {

                    // Update items filed in cart
                    cartProducts.items[i].quantity -= 1;
                    cartProducts.items[i].total -= cartProducts.items[i].price;

                    // Update cart common field
                    cartProducts.total -= cartProducts.items[i].price
                    cartProducts.count -= 1

                    // Replace new cart for refresh page
                    setProductsToCart({
                        total: cartProducts.total,
                        count: cartProducts.count,
                        items: [...cartProducts.items]
                    })

                } else {

                    // Update cart common field
                    cartProducts.total -= cartProducts.items[i].price
                    cartProducts.count -= 1

                    // Remove item i of cart
                    cartProducts.items.splice(i, 1)

                    // Replace new cart for refresh page
                    setProductsToCart({
                        total: cartProducts.total,
                        count: cartProducts.count,
                        items: [...cartProducts.items]
                    })
                }
            }
        }
    }


    return (
        <CartContext.Provider
            value={{
                cartProducts,
                addProductToCart,
                removeProductToCart,
                decrementProductOfCart,
                incrementProductToCart
            }}>
            {props.children}
        </CartContext.Provider>
    )
}


export default CartContextProvider