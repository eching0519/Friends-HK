import React from "react";
import { Link } from "react-router-dom";

const LoginVerify = props => {
    const [verifyCode, setVerifyCode] = useState('');

    const sendVerifyRequest = async () => {
        
        let url = '/user/login/verify';
        let res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                code: verifyCode
            })
        });
        let data = await res.json();
        console.log(data);
        setDisableInput(false);
        if (data.success) {
            props.setloginState('success');
        }

    };

    return (
        <form className="pt-3">
            <div className="d-flex search-field">
                <input type="text" placeholder="n-digit code" size="lg" className="h-auto" onChange={(event) => {
                    setVerifyCode(event.target.value);
                }} />
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={
                    () => {
                        sendVerifyRequest();
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