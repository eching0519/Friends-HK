import React, { useState } from "react";
const querystring = require('querystring');

const ForgotPassword = props => {
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [password, setPassword] = useState('');

    const sendVerifyEmail = async () => {
        if (email === '') {
            props.setAlert({
                visible: true,
                strongMsg: '',
                msg: 'Please enter your email address'
              })
            return
        } else {
            props.setAlert({visible: false})
        }

        let url = '/user/forgotPassword/mail';
        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${email}`,
        });
  
        let data = await res.json();
        console.log(data)
  
        if (!data.success) {
          props.setAlert({
            visible: true,
            strongMsg: 'Sorry!',
            msg: data.message
          })
        } else {
          console.log("Email sent")
        }
      }

    const sendResetPwRequest = async () => {
        let url = '/user/forgotPassword/reset';
        let body = querystring.stringify({
            email: email,
            code: verifyCode,
            password: password
        });

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

        if (data.success) {
            props.setAlert({visible: false})
            props.setloginState('resetPwAlready');
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
        <h4 className="card-title">Forgot Password</h4>
        <form className="pt-3" onSubmit={(e) => {
            e.preventDefault();
            sendResetPwRequest();
            return false;
        }}>
            <div className="form-group">
                    <label for="emailInput">Email address</label>
                    <input type="email" id="emailInput" placeholder="Email" size="lg" className="form-control form-control-lg" required onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
            </div>

            <div className="form-group">
                <label for="verifyCodeInput">Verification Code</label>
                <div className="input-group">
                    <input placeholder="Email verification Code" type="text" id="verifyCodeInput" className="form-control form-control" required onChange={(event) => {
                    setVerifyCode(event.target.value);
                }} />
                    <div className="input-group-append"><button className="btn btn-sm btn-gradient-primary" type="button" onClick={()=> sendVerifyEmail()}
                    >Send</button></div>
                </div>
            </div>

            <div className="form-group">
                <label for="passwordInput">New Password</label>
                <input type="password" id="passwordInput" placeholder="New Password" size="lg" className="form-control form-control" required onChange={(event) => {
                    setPassword(event.target.value);
                }} value={props.userPassword} />
            </div>

            <div className="mt-3">
                <button type="submit" className="btn btn-gradient-primary mr-2 w-100 mb-2">Reset Password</button>
                <button type="button" className="btn btn-light w-100" onClick={() => {
                    props.setAlert({visible: false});
                    props.setloginState('login');
                }}><i className="mdi mdi-keyboard-backspace"></i>Back</button>
            </div>
        </form>
        </>
    )
}

export default ForgotPassword;