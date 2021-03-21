import React, {useState} from 'react';
import "./SignUp.css"
import axios from "axios";
import host from "../../config/config";
import {Link} from "react-router-dom";

function SignUp() {

    const [phoneNumber, setPhoneNumber] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const signUpSubmitHandler = async (event) => {
        event.preventDefault()
        console.log("11111111111111")
        await axios.post(host + "sign-up", {
            phone_number: phoneNumber,
            first_name: firstName,
            last_name: lastName,
            password: password,
            confirm_password: confirmPassword
        }).then(response => {
            console.log("222222222222222")
            setError(false)
            setSuccess(true)
        }).catch(error => {
            console.log("333333333333333")
            console.log(error.response.data)
            setSuccess(false)
            setError(error.response.data)
            console.log("eeeeee:", error)
        })
    }

    return (

        <div className="div-form-signup">

            <form className="form-signup-tag" action="" onSubmit={signUpSubmitHandler}>
                <div className="container-signup-form">
                    <h1 style={{textAlign: "center"}}>ثبت نام</h1>
                    <p style={{textAlign: "center"}}>برای ساخت حساب کاربری اطلاعات زیر را وارد نمایید</p>
                    <hr/>

                    {success ? <h1 style={{color: "green", textAlign: "center"}}>شما با موفقیت ثبت نام شدید</h1> :
                        <span></span>}

                    {error ? <h1 style={{color: "red", textAlign: "center"}}>
                        {error["phone_number"]} {error["first_name"]}
                        {error["last_name"]} {error["password"]}
                        {error["confirm_password"]}
                    </h1> : <span></span>}

                    <label htmlFor="username"><b>شماره تلفن</b></label>
                    <label>
                        <input type="text" placeholder="شماره تلفن خود را وارد نمایید" name="username" required
                               onChange={(event => setPhoneNumber(event.target.value))}/>
                    </label>

                    <label htmlFor="first_name"><b>نام</b></label>
                    <label>
                        <input type="text" placeholder="نام خود را وارد نمایید" name="first_name" required
                               onChange={(event => setFirstName(event.target.value))}/>
                    </label>

                    <label htmlFor="last_name"><b>نام خانوادگی</b></label>
                    <label>
                        <input type="text" placeholder="نام خانوادگی خود را وارد نمایید" name="last_name" required
                               onChange={event => setLastName(event.target.value)}/>
                    </label>

                    <label htmlFor="psw"><b>رمز عبور</b></label>
                    <label>
                        <input type="password" placeholder="رمز عبور خود را وارد نمایید" name="psw" required
                               onChange={event => setPassword(event.target.value)}/>
                    </label>

                    <label htmlFor="psw-repeat"><b>تکرار رمز عبور</b></label>
                    <label>
                        <input type="password" placeholder="رمز عبور خود را مجدد وارد نمایید" name="psw-repeat" required
                               onChange={event => setConfirmPassword(event.target.value)}/>
                    </label>

                    <p>برای ساخت حساب کاربری باید قوانین را قبول کنید <a href="#">قوانین ما</a>.</p>

                    <div className="clearfix-form-tag">
                        <Link to={"/login"}><button type="button" className="cancelbtn-tag">بزن بریم صفحه ورود</button></Link>
                        <button type="submit" className="signupbtn-tag">ثبت نام</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;