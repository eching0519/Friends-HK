import React, { useState } from "react";
const querystring = require('querystring');

const PrivacySettings = (props) => {

    let user = props.user
    console.log("PrivacySettings:")
    console.log(user)

    const sendResetPwRequest = async () => {
        let url = '/user/forgotPassword/reset';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                email: 'email',
                code: 'verifyCode',
                password: 'password'
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
    };

    return (
        <>
            <div className="card-body">
            <h4 className="card-title">Privacy</h4>
            <p className="card-description"> Basic form layout </p>
            <form className="forms-sample">
                <div className="form-group">
                    <label for="exampleInputUsername1">Username</label>
                    <input placeholder="Username" type="text" id="exampleInputUsername1" className="form-control form-control-lg" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input placeholder="Email" type="email" id="exampleInputEmail1" className="form-control form-control" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input placeholder="Password" type="password" id="exampleInputPassword1" className="form-control form-control" />
                </div>
                <div className="form-check">
                    <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-gradient-primary mr-2">Submit</button>
                <button className="btn btn-light">Cancel</button>
            </form>
            </div>
        </>
    )
}

export default PrivacySettings;