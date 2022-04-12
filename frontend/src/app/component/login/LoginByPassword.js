import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginByPassword = props => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [disableInput, setDisableInput] = useState(false);

    const sendLoginRequest = async () => {
        let url = '/user/login';
        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${props.userName}&password=${props.userPassword}`
        });

        let data
        try {
        data = await res.json();
        } catch (error) {
        props.setAlert({
            visible: true,
            strongMsg: 'Error!',
            msg: `Unexpected error. (${error.message})`
        })
        return;
        }
        
        if (data.success) {
            props.setAlert({visible: false});
            // props.setUser(data.user);
            sessionStorage.setItem('UserProfile', JSON.stringify(data.user));
            props.loginSuccess();
        } else {
        props.setAlert({
            visible: true,
            strongMsg: 'Sorry!',
            msg: data.message
        })
        }
      };

    return (
        <>
        <h4 className="card-title">Hello! let's get started</h4>
        <h6 className="font-weight-light">Sign in to continue.</h6>
        <form className="pt-3" onSubmit={(e) => {
                    e.preventDefault();
                    sendLoginRequest();
                    return false;
                }}>
            <div className="form-group">
                    <label for="emailInput">Email address</label>
                    <input type="email" id="emailInput" placeholder="Email" size="lg" className="form-control form-control-lg" value={props.userName} readOnly required />
            </div>
            <div className="form-group">
                <label for="passwordInput">Password</label>
                <input type="password" id="passwordInput" placeholder="Password" size="lg" className="form-control form-control" required onChange={(event) => {
                    props.setUserPassword(event.target.value);
                }} value={props.userPassword} disabled={disableInput} />
            </div>

            <div className="mt-3">
                <button type="submit" className="btn btn-gradient-primary mr-2 w-100 mb-2">Confirm</button>
                <button type="button" className="btn btn-inverse-primary w-100 mb-2" onClick={
                    () => {
                        props.setAlert({visible: false})
                        props.setloginState('verify');
                        props.sendVerifyEmail();
                    }
                }>Login By Email Verification</button>
                <button type="button" className="btn btn-light w-100" onClick={
                    () => {
                        props.setAlert({visible: false})
                        props.setloginState('login');
                        props.setUserPassword('');
                    }
                }>Cancel</button>
            </div>
        </form>
        <div className="my-2 d-flex justify-content-between align-items-center">
            <div className="form-check">
                <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input" />
                    <i className="input-helper"></i>
                    Keep me signed in
                </label>
            </div>
            <a href="!#" className="auth-link text-black" onClick={(e) => {
            e.preventDefault();
            props.setAlert({visible: false})
            props.setloginState('forgot');
            return false;
            }}>Forgot password?</a>
        </div>
        </>
    )
}

export default LoginByPassword;