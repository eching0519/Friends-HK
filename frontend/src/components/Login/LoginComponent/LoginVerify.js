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
        let data = await res.json();
        console.log(data);

        setDisableInput(false);
        if (data.success) {
            console.log('finally!!!!')
            props.setloginState('success');
        }

    };

    return (
        <form className="pt-3">
            <div className="d-flex search-field">
                <input type="text" placeholder="n-digit code" size="lg" className="h-auto" onChange={(event) => {
                    setVerifyCode(event.target.value);
                }} disabled={disableInput} />
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={
                    () => {
                        sendVerifyRequest().catch((error) => {
                            setDisableInput(false);
                            console.log('server have some problem...');
                        });
                    }
                }>Confirm</button>
            </div>
            <div className="my-2 d-flex justify-content-between align-items-center">
                <a href="!#" className="auth-link text-black">Forgot password?</a>
            </div>
        </form>
    )
}

export default LoginVerify;