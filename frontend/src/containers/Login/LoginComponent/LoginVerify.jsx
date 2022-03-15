import React from "react";
import { Link } from "react-router-dom";

function LoginVerify(props) {
    return (
        <form className="pt-3">
            <div className="d-flex search-field">
                <input type="text" placeholder="n-digit code" size="lg" className="h-auto" onChange={(event) => {
                    props.setUserName(event.target.value);
                }} />
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={
                    () => {
                        props.sendLoginRequest();
                        //localStorage.setItem('token', 12345);
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