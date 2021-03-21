import React, {useState, useCallback, useEffect} from "react";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {AuthContext} from "./contexts/AuthContext";
import CartContextProvider from "./contexts/CartContext";
import ProductList from "./components/products/ProductList";
import NavBar from "./components/shared/navbar/NavBar";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import Cart from "./components/cart/Cart";
import ShowOrder from "./components/order/ShowOrder";
import Profile from "./components/profile/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import ShowOrderDetail from "./components/order/ShowOrderDetail";
import ProfileUpdate from "./components/profile/ProfileUpdate";


function App() {

    const [token, setToke] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((token, userId) => {
        setToke(token)
        setUserId(userId)
        localStorage.setItem("userData", JSON.stringify({token: token, userId: userId}))
    }, [])

    const logout = useCallback(() => {
        setToke(null)
        setUserId(null)
        localStorage.removeItem("userData")
    }, [])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"))
        if (storedData && storedData.token) {
            login(storedData.token, storedData.userId)
        }
    }, [login])


    return (
        <BrowserRouter>
            <AuthContext.Provider value={{token: token, login: login, logout: logout, userId: userId}}>
                <CartContextProvider>
                    <NavBar/>
                    <main>
                        <Switch>
                            {console.log("token ---> " + token )}
                            <Route path="/" exact={true} component={ProductList}/>
                            <Route path="/cart" exact={true} component={Cart}/>
                            <Route path="/profile" exact={true} component={Profile}/>
                            <Route path="/profile/orders" exact={true} component={ShowOrder}/>
                            <Route path="/profile/orders/detail" exact={true} component={ShowOrderDetail}/>
                            <Route path="/profile/:id" exact={true} component={ProfileUpdate}/>
                            <Route path="/signup" exact={true} component={SignUp}/>
                            <Route path="/login" exact={true} component={Login}/>
                            <Redirect to="/"/>
                        </Switch>
                    </main>
                </CartContextProvider>
            </AuthContext.Provider>
        </BrowserRouter>

    );
}

export default App;
