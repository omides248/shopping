import React, {useContext, useEffect, useState} from 'react';
import './Profile.css'
import {Redirect} from "react-router-dom";
import host from "../../config/config";
import {AuthContext} from "../../contexts/AuthContext";
import axios from "axios";


function ProfileUpdate(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [redirect, setRedirect] = useState(false)

    const auth = useContext(AuthContext)
    // const auth = JSON.parse(localStorage.getItem("userData"))
    const config = {
        headers: {Authorization: `Bearer ${auth.token}`}
    };

    useEffect(() => {
        (
            async () => {
                await axios.get(
                    host + `profile/${props.match.params.id}`,
                    config
                ).then(response => {
                    const data = response.data
                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })


            }
        )()
    }, [])


    const submit = async (e) => {
        e.preventDefault()


        await axios.put(host + `profile/${props.match.params.id}/`,
            {
                first_name: firstName,
                last_name: lastName
            },
            config
        ).then(response => {
            console.log(1111111111111111111111111111111123123123123213123123123123123)
            setRedirect(true)
            console.log(response)
        }).catch(error => {
            console.log(error)
        })


    }

    if (redirect) {
        return <Redirect to="/profile"/>
    }

    return (
        <form action="" method="post" className="form-login" style={{border: "0px"}} onSubmit={submit}>
            <div className="imgcontainer">
                <h2>تغییر پروفایل</h2>
            </div>

            <div className="container">
                <label htmlFor="username"><b>نام</b></label>
                <label>
                    <input type="text" placeholder="" name="username" value={firstName}
                           required
                           className="input-login" onChange={(event) => {
                        setFirstName(event.target.value)
                    }}/>
                </label>

                <label htmlFor="psw"><b>نام خانوادگی</b></label>
                <label>
                    <input type="text" placeholder="" name="psw" value={lastName}
                           required
                           className="input-login" onChange={(event) => {
                        setLastName(event.target.value)
                    }}/>
                </label>

                <button type="submit" className="button-login">اعمال تغییرات</button>

            </div>

        </form>
    )
}

export default ProfileUpdate;