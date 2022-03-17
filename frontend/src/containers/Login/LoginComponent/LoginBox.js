import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginBox(props) {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [disableInput, setDisableInput] = useState(false);

    const sendLoginRequest = async () => {
        
        let url = '/user/login';
        let res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: userName,
                password: userPassword
            })
        });
        let data = await res.json();
        console.log(data);
        setDisableInput(false);
        if (data.success) {
            props.setloginState('verify');
            //setloginState('success');
        }

    };

    return (
        <>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <form className="pt-3">
                <div className="d-flex search-field">
                    <input type="email" placeholder="Username" size="lg" className="h-auto" onChange={(event) => {
                        setUserName(event.target.value);
                    }} disabled={disableInput}/>
                </div>
                <div className="d-flex search-field">
                    <input type="password" placeholder="Password" size="lg" className="h-auto" onChange={(event) => {
                        setUserPassword(event.target.value);
                    }} disabled={disableInput}/>
                </div>
                <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={
                        () => {
                            setDisableInput(true);
                            sendLoginRequest();
                            //sessionStorage.setItem('token', 12345);
                        }
                    } disabled={disableInput}>Login</button>
                    <Link to='/home' className="btn btn-primary"  onClick={
                        () => {
                            sessionStorage.setItem('token', 12345);
                        }
                    }>Go To Home directly</Link>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                        <label className="form-check-label text-muted">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                            Keep me signed in
                        </label>
                    </div>
                    <a href="!#" className="auth-link text-black">Forgot password?</a>
                </div>
                <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                        <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>

                </div>
                <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <button type="button" className="btn btn-link text-primary" onClick={() => {props.setloginState('signup');}}>Create</button>
                </div>
            </form>
        </>

    )
}

export default LoginBox;