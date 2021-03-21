import React, {useContext, useEffect, useState} from 'react';
import './ShowOrder.css'
import {AuthContext} from "../../contexts/AuthContext";
import host from "../../config/config";
import axios from "axios";


function ShowOrderDetail(props) {

    const [orderPk, setOrderPk] = useState(props.location.data)
    const [data, setData] = useState([])

    const auth = useContext(AuthContext)
    const config = {
        headers: {Authorization: `Bearer ${auth.token}`}
    };

    console.log("pk", props.location)

    useEffect(() => {

        (
            async () => {
                await axios.get(
                    host + `orders/${orderPk}/items/`,
                    config
                ).then(response => {
                    const data = response.data
                    setData(data)
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })


            }
        )()
    }, [])

    console.log("dddd", data)
    return (

        <div className="div-table">


            <table className="table-cart">
                <thead>
                <tr>
                    <th className="th-image-tag">نام</th>
                    <th>قیمت</th>
                    <th>تخفیف</th>
                    <th className="th-remove-tag">تعداد</th>
                </tr>
                </thead>

                <tbody>
                {data && data && data.map(orderItem => {
                    return (
                        <tr key={orderItem.id}>
                            <td className="td-remove-tag-right">{orderItem.name}</td>
                            <td>{orderItem.price}</td>
                            <td>{orderItem.off}</td>
                            <td className="td-remove-tag-left">{orderItem.quantity}</td>
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

export default ShowOrderDetail;