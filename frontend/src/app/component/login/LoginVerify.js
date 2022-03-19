import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginVerify = props => {
    const [verifyCode, setVerifyCode] = useState('');
    const [disableInput, setDisableInput] = useState(false);

    const sendVerifyRequest = async () => {
        // let url = '/user/login/verify';
        // let body = `code=${verifyCode}`;

        // let res = await fetch(url, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     body: body
        // });

        // let data
        // try {
        //     data = await res.json();
        // } catch (error) {
        //     props.setAlert({
        //         visible: true,
        //         strongMsg: 'Error!',
        //         msg: 'Please try again later. (' + error.message + ')'
        //     })
        //     return;
        // }

        // setDisableInput(false);
        // if (data.success) {
        //     //console.log('finally!!!!')
        //     props.setloginState('success');
        // } else {
        //     props.setAlert({
        //         visible: true,
        //         strongMsg: 'Sorry!',
        //         msg: data.message
        //       })
        // }

    };

    return (
        <form className="pt-3">
            <div className="form-group">
                    <label for="emailInput">Email address</label>
                    <input type="email" id="emailInput" placeholder="Email" size="lg" className="form-control form-control-lg" value={props.userName} disabled="disabled" />
            </div>

            <div className="form-group">
                <label for="verifyCodeInput">Verification Code</label>
                <div className="input-group">
                    <input placeholder="Email verification Code" type="text" id="verifyCodeInput" className="form-control form-control" onChange={(event) => {
                    setVerifyCode(event.target.value);
                }} disabled={disableInput} />
                    <div className="input-group-append"><button className="btn btn-sm btn-gradient-primary" type="button" onClick={
                        ()=> {
                            props.sendVerifyEmail()
                        }
                    }
                    >Resend</button></div>
                </div>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-gradient-primary mr-2 w-100 mb-2" onClick={
                    sendVerifyRequest()
                }>Confirm</button>
                <button type="button" className="btn btn-light w-100" onClick={
                    () => {
                        props.setloginState('password');
                    }
                }>Login By Password</button>
            </div>
        </form>
    )
}

export default LoginVerify;