import React, {useContext, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {CartContext} from "../../../contexts/CartContext";
import {AuthContext} from "../../../contexts/AuthContext";


function NavBar() {
    const {cartProducts} = useContext(CartContext)
    const auth = useContext(AuthContext)

    return (
        <div className="navbar">
            <Link to="/">خانه</Link>
            {auth.token && <Link to="/profile">پروفایل</Link>}
            {auth.token && <Link to="/profile/orders">سفارشات</Link>}
            {!auth.token && <Link to="/login">ورود</Link>}
            {!auth.token && <Link to="/signup">ثبت نام</Link>}
            <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart}/> {cartProducts.count} </Link>
            {auth.token && <Link to="#" onClick={e => auth.logout()}>خروج</Link>}
            <Link to="/about-us">رتباط با ما</Link>
        </div>
    );
}

export default NavBar;