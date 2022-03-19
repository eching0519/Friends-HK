import React, { useState } from "react";
import { Link } from "react-router-dom";
// import ReactSession from 'react-client-session';

function LoginBox(props) {
    const [disableInput, setDisableInput] = useState(false);

    const sendLoginRequest = async () => {
        if (await props.alreadyLoggedin()) {
            props.setloginState('success');
        } else {
            // if not yet login, enter password
            props.setloginState('password');
        }
    };

    return (
        <>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <form className="pt-3">
                <div className="form-group">
                    <label for="emailInput">Email address</label>
                    <input type="email" id="emailInput" placeholder="Email" size="lg" className="form-control form-control-lg" onChange={(event) => {
                        props.setUserName(event.target.value);
                    }} disabled={disableInput} />
                
                    <div className="mt-3">
                        <button type="button" className="btn btn-gradient-primary mr-2 w-100 mb-2" onClick={
                            () => {
                                setDisableInput(true);
                                sendLoginRequest().catch((error) => {
                                    setDisableInput(false);
                                    console.error('server have some problem... probably node server havent start');
                                })
                            }
                        } disabled={disableInput}>Login</button>
                        <Link to='/home' className="btn btn-light w-100" onClick={
                            () => {
                                sessionStorage.setItem('token', 12345);
                            }
                        }>Go To Home directly</Link>
                    </div>
                </div>
            </form>
        </>

    )
}

export default LoginBox;