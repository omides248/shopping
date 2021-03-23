import {useContext, useEffect, useState} from "react";
import axios from "axios";
import host from "../config/config";
import {AuthContext} from "../contexts/AuthContext";

export const useFetch = (url) => {


    const [data, setData] = useState([])
    const [success, setSuccess] = useState(false)

    const auth = useContext(AuthContext)

    let headers = {}

    if (auth.token) {
        headers = {Authorization: `Bearer ${auth.token}`}
    }

    const config = {
        headers: headers
    };

    useEffect(() => {
        const sendRequest = async () => {
            const res = await axios.get(host + "products")
            setData(res.data)
            setSuccess(true)
            // console.log(res.data)
        }
        sendRequest()
        // console.log(11111, data, success)
    }, [url])

    return {data, success}
}


export const UseFetchPost = (url, requestBody) => {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState(false)


    const sendRequest = async () => {
        const res = await axios.post(host + url, {
            ...requestBody
        })
        setData(res.data)
        setSuccess(true)
    }
    sendRequest()
    console.log(11111, data, success)


    return {data, success}
}
