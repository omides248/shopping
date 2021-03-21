import React, {useContext, useEffect, useState} from 'react';
import './ShowOrder.css'
import {AuthContext} from "../../contexts/AuthContext";
import host from "../../config/config";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faInfoCircle, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Link, Redirect} from "react-router-dom";


function ShowOrder() {

    const [data, setData] = useState([])
    const [redirect, setRedirect] = useState(false)
    const auth = useContext(AuthContext)

    console.log(444444444444444444444444444444444444444444)
    useEffect(() => {
        (
            async () => {

                let headers = {}

                console.log("auth.token " + auth.token)

                if (auth.token) {
                    headers = {Authorization: `Bearer ${auth.token}`}


                    const config = {
                        headers: headers
                    };

                    await axios.get(host + "orders/", config).then(response => {
                        setData(response.data)
                    }).catch(error => {
                    })

                }


            }

        )()
    }, [auth])


    return (

        <div className="div-table">


            <table className="table-cart">
                <thead>
                <tr>
                    <th className="th-image-tag">شماره سفارش</th>
                    <th>نام</th>
                    <th>شماره تلفن</th>
                    <th>قیمت کل</th>
                    <th>تاریخ ثبت</th>
                    <th className="th-remove-tag">جزیات</th>
                </tr>
                </thead>

                <tbody>
                {data && data.results && data.results.map(order => {
                    return (
                        <tr key={order.id}>
                            <td className="td-remove-tag-right">{order.order_number}</td>
                            <td>{order.first_name} {order.last_name}</td>
                            <td>{order.phone_number}</td>
                            <td>{order.total_cost}</td>
                            <td>{order.created_at}</td>
                            <td className="td-remove-tag-left">
                                <Link to={{pathname: "orders/detail", data: order.id}}><FontAwesomeIcon
                                    icon={faInfoCircle} className="info-circle"/></Link>
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td className="td-remove-tag-right"/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                </tr>
                </tbody>

            </table>
        </div>


    )
}

export default ShowOrder;