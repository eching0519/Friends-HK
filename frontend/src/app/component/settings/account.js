import React, { useState } from "react";
import UploadPicture from "./uploadPicture";
const querystring = require('querystring');

const AccountSettings = (props) => {

    let user = props.user

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
            <h4 className="card-title">Account</h4>
            <form className="forms-sample" onSubmit={(e)=>{
                e.preventDefault();
                props.setAlert({visible:true});
                // return false;
            }}> 
                <UploadPicture user={user} setUser={props.setUser} setAlert={props.setAlert} />

                {/* <img src={(user==null||user.picture==null)? require("../../../assets/images/emptyFace.png") : props.user.picture} alt="" className="img-thumbnail"></img>
                <div className="form-group">
                    <label>File upload</label>
                    <div className="custom-file">
                        <input lang="es" type="file" id="customFileLang" className="form-control visibility-hidden form-control-file" />
                        <label className="custom-file-label" for="customFileLang">Upload image</label>
                    </div>
                </div> */}
                <div className="form-group">
                    <label for="emailInput">Email Address</label>
                    <input placeholder="Email Address" type="text" id="emailInput" className="form-control form-control-lg" readOnly value={user.email} />
                </div>
                <div className="form-group">
                    <label for="nameInput">Display Name</label>
                    <input placeholder="Display Name" type="email" id="nameInput" className="form-control form-control" value={user.name} />
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
        </>
    )
}

export default AccountSettings;