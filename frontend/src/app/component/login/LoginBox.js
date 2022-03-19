import React, { useState } from "react";
import { Link } from "react-router-dom";
// import ReactSession from 'react-client-session';

function LoginBox(props) {
    const [userName, setUserName] = useState('');
    const [disableInput, setDisableInput] = useState(false);

    const sendLoginRequest = async () => {
        if (await props.alreadyLoggedin()) {
            props.setAlert({visible: false})
            props.setloginState('success');
        } else {
            // if not yet login, enter password
            props.setAlert({visible: false})
            props.setloginState('password');
        }
    };

    return (
        <>
            <h4 className="card-title">Hello! let's get started</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <form className="pt-3" onSubmit={(e) => {
                                e.preventDefault();
                                // setDisableInput(true);
                                sendLoginRequest();
                                return false;
                            }}>
                <div className="form-group">
                    <label for="emailInput">Email address</label>
                    <input type="email" id="emailInput" placeholder="Email" size="lg" className="form-control form-control-lg" required onChange={(event) => {
                        setUserName(event.target.value);
                        props.setUserName(event.target.value);
                    }} disabled={disableInput} />
                
                    <div className="mt-3">
                        <button type="submit" className="btn btn-gradient-primary mr-2 w-100 mb-2" disabled={disableInput}>Login</button>
                        <Link to='/home' className="btn btn-light w-100" onClick={
                            () => {
                                sessionStorage.setItem('token', 12345);
                            }
                        }>Go To Home directly</Link>
                    </div>
                </div>
            </form>
            <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                    <label className="form-check-label text-muted">
                        <input type="hidden" className="form-check-input" />
                    </label>
                </div>
                <a href="!#" className="auth-link text-black" onClick={(e) => {
                e.preventDefault();
                props.setAlert({visible: false})
                props.setloginState('forgot');
                return false;
                }}>Forgot password?</a>
            </div>
        </>

    )
}

export default LoginBox;