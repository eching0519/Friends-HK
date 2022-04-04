import React, { useState } from "react";
import { Link } from "react-router-dom";
const querystring = require('querystring');
// import ReactSession from 'react-client-session';

function RegisterBox(props) {
    let name;
    let email;
    let password;

    const userRegistration = async () => {
        let url = '/user/register';
        // let body = `code=${verifyCode}`;

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: querystring.stringify({
                name: name,
                email: email,
                password: password
            })
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
            props.setRegisterSuccess(true);
        } else {
            props.setAlert({
                visible: true,
                strongMsg: 'Sorry!',
                msg: data.message
            })
        }
    }

    return (
        <>
            <div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3" onSubmit={(e) => {
                        e.preventDefault();
                        userRegistration(); 
                        return false;
                    }}>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" name="name" placeholder="Name" required onChange={(event) => {
                            name = event.target.value;
                        }} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control form-control-lg" name="email" placeholder="Email" required onChange={(event) => {
                            email = event.target.value;
                        }} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" name="password" placeholder="Password" required onChange={(event) => {
                            password = event.target.value;
                        }} />
                    </div>
                    <div className="mb-4">
                    <div className="form-check">
                        <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" required />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                        </label>
                    </div>
                    </div>
                    <div className="mt-3">
                    <button type='submit' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                    {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN UP</Link> */}
                    </div>
                </form>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account? <Link to="/login" className="text-primary">Login</Link>
                </div>
            </div>  
        </>

    )
}

export default RegisterBox;