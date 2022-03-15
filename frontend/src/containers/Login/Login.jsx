import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginBox from "./LoginComponent/LoginBox";
import LoginVerify from "./LoginComponent/LoginVerify";
import './Login.css';

function Login() {
    const [loginState, setloginState] = useState("login");
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        if (loginState === 'success') {
            navigate("/home");
        }
    }, [loginState]);

    const sendLoginRequest = async () => {
        let url = '/user/login';
        let res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "email": userName,
                "password": userPassword
            })
        });
        let data = await res.json();
        console.log(data);
        if (data.success) {
            setloginState('verify');
            //setloginState('success');
        }


        /*
        fetch(url, {
            method: 'POST',
            //mode: 'no-cors',
            body: JSON.stringify({
                "email": userName,
                "password": userPassword
            })
        }).then((res) => {
            let data = await res.json();
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
        */
    };
    let loginplaceholder = 0;
    if (loginState === 'login') {
        loginplaceholder = <LoginBox setUserName={setUserName} setUserPassword={setUserPassword} sendLoginRequest={sendLoginRequest} />;
    }

    if (loginState === 'verify') {
        loginplaceholder = <LoginVerify />;
    }


    return (
        <div className="login-page">
            <div className="row w-100 mx-0"><h1>Login!</h1>
                <div className="col-lg-8 mx-auto login-icon-fragment">
                    <h2>Welcome!</h2>
                    <p>Add icon here</p>
                    <p>
                        Use Frends-HK to meet new friends!
                    </p>
                </div>
                <div className="col-lg-4 mx-auto login-box-fragment">
                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div className="brand-logo">
                        </div>
                        <h4>Hello! let's get started</h4>
                        <h6 className="font-weight-light">Sign in to continue.</h6>
                        {loginplaceholder}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

//<Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">SIGN IN</Link>