import React, {useContext, useEffect, useState} from 'react';
import './Profile.css'
import {Link} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import host from "../../config/config";
import axios from "axios";


function Profile() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    // const auth = useContext(AuthContext)
    const userData = JSON.parse(localStorage.getItem("userData"))

    useEffect(() => {
        (
            async () => {
                console.log(userData)
                console.log(userData.token)
                const config = {
                    headers: {Authorization: `Bearer ${userData.token}`}
                };

                await axios.get(host + `profile/${userData.userId}`, config).then(response => {
                    const data = response.data
                    console.log("d " + data.first_name)
                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setPhoneNumber(data.phone_number)
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })


            }
        )()
    }, [])

    return (
        <ul>
            <li style={{listStyleType: "none"}}>
                <span>شماره تلفن: </span><span>{phoneNumber}</span>
            </li>
            <li style={{listStyleType: "none"}}><span>نام: </span><span>{firstName}</span></li>
            <li style={{listStyleType: "none"}}><span>نام خانوادگی: </span><span>{lastName}</span></li>
            <Link to={`profile/${userData.userId}`}>
                <button style={{listStyleType: "none"}}>تغییر پروفایل</button>
            </Link>
        </ul>
    )
}

export default Profile;