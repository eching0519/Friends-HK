import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginVerify = props => {
    const [verifyCode, setVerifyCode] = useState('');
    const [disableInput, setDisableInput] = useState(false);

    const sendVerifyRequest = async () => {
        let url = '/user/login/verify';
        let body = `code=${verifyCode}`;

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
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

        // setDisableInput(false);
        if (data.success) {
            props.setAlert({visible: false});
            sessionStorage.setItem('UserProfile', JSON.stringify(data.user));
            // props.setUser(data.user);
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
                        sendVerifyRequest();
                        return false;
                    }}>
                <div className="form-group">
                        <label for="emailInput">Email address</label>
                        <input type="email" id="emailInput" placeholder="Email" size="lg" className="form-control form-control-lg" value={props.userName} readOnly required/>
                </div>

                <div className="form-group">
                    <label for="verifyCodeInput">Verification Code</label>
                    <div className="input-group">
                        <input placeholder="Email verification Code" type="text" id="verifyCodeInput" className="form-control form-control" required onChange={(event) => {
                        setVerifyCode(event.target.value);
                    }} disabled={disableInput} />
                        <div className="input-group-append"><button className="btn btn-sm btn-gradient-primary" type="button" onClick={()=> props.sendVerifyEmail()}
                        >Resend</button></div>
                    </div>
                </div>

                <div className="mt-3">
                    <button type="submit" className="btn btn-gradient-primary mr-2 w-100 mb-2">Confirm</button>

                    <button type="button" className="btn btn-light mr-2 w-100 mb-2" onClick={() => {
                        props.setAlert({visible: false});
                        props.setloginState('password');
                    }}>Login By Password</button>

                    <button type="button" className="btn btn-light w-100" onClick={() => {
                        props.setAlert({visible: false});
                        setVerifyCode('');
                        props.setloginState('login');
                    }}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default LoginVerify;