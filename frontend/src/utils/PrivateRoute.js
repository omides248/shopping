import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";


function PrivateRoute({ component: Component, ...rest }) {
    const auth = useContext(AuthContext)
    console.log("auth.token " + auth.token)
    console.log("rest " + rest)
    return (

        <Route
            {...rest}
            render={props =>
                auth.token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}

export default PrivateRoute;