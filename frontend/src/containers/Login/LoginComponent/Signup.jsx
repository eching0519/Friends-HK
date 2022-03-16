import React, { useState } from "react";

function Signup(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [disableInput, setDisableInput] = useState(false);

    const sendRegisterRequest = async () => {
        let url = '/user/register';
        let res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: userEmail,
                name: userName,
                password: userPassword
            })
        });
        let data = await res.json();
        console.log(data);
        setDisableInput(false);
        if (data.success) {
            props.setloginState('verify');
            //setloginState('success');
        }
    };

    return (
        <>
            <h6 className="font-weight-light">Create a new account:</h6>
            <form className="pt-3">
                <div className="d-flex search-field">
                    <input type="email" placeholder="Username" size="lg" className="h-auto" onChange={(event) => {
                        setUserName(event.target.value);
                    }} />
                </div>
                <div className="d-flex search-field">
                    <input type="text" placeholder="Username" size="lg" className="h-auto" onChange={(event) => {
                        setUserEmail(event.target.value);
                    }} />
                </div>
                <div className="d-flex search-field">
                    <input type="password" placeholder="Password" size="lg" className="h-auto" onChange={(event) => {
                        setUserPassword(event.target.value);
                    }} />
                </div>
                <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={
                        () => {
                            sendRegisterRequest();
                        }
                    } disabled={disableInput}>Confirm</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                    <a className="nav-link active" aria-current="page" herf='#' onClick={() => {props.setloginState('login');}}>Back</a>
                </div>
                <div className="mb-2">
                    

                </div>
                <div className="text-center mt-4 font-weight-light">
                    
                </div>
            </form>
        </>

    )
}

export default Signup;