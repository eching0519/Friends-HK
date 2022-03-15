import React from "react";
import { Link } from "react-router-dom";

function LoginBox(props) {
    return (
        <form className="pt-3">
            <div className="d-flex search-field">
                <input type="email" placeholder="Username" size="lg" className="h-auto" onChange={(event) => {
                    props.setUserName(event.target.value);
                }} />
            </div>
            <div className="d-flex search-field">
                <input type="password" placeholder="Password" size="lg" className="h-auto" onChange={(event) => {
                    props.setUserPassword(event.target.value);
                }} />
            </div>
            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={
                    () => {
                        props.sendLoginRequest();
                        //localStorage.setItem('token', 12345);
                    }
                }>Login</button>
                <Link className="btn btn-primary" to='/home' onClick={
                    () => {
                        localStorage.setItem('token', 12345);
                    }
                }>Login (Link)</Link>
            </div>
            <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Keep me signed in
                    </label>
                </div>
                <a href="!#" className="auth-link text-black">Forgot password?</a>
            </div>
            <div className="mb-2">
                <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                    <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                </button>

            </div>
            <div className="text-center mt-4 font-weight-light">
                Don't have an account? <Link to="/" className="text-primary">Create</Link>
            </div>
        </form>
    )
}

export default LoginBox;