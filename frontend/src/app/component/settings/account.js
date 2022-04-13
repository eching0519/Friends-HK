import React, { useEffect, useState } from "react";
import UploadPicture from "./uploadPicture";
import $ from 'jquery';
import { Form } from 'react-bootstrap';
const querystring = require('querystring');

const AccountSettings = (props) => {
    const [user, setUser] = useState(props.user)
    const [email, setEmail] = useState(user===null?'':user.email)
    const [uname, setUName] = useState(user===null?'':user.name)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isLoaded, setLoaded] = useState(false)   // Check if page is loaded

    $('.form-control').addClass('form-control-lg')
    
    // Run when form is changed
    useEffect(()=> {
        if (!isLoaded) {
            setLoaded(true);
            return
        }

        props.setFormChanged(true)
        $("#submitBtn").removeClass('disabled')
    }, [email, uname, password, newPassword]);

    const sendResetPwRequest = async () => {
        // Preparing data to send POST request
        let url = 'http://localhost:8080/user/profile/update';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                name: uname,
                password: password,
                newPassword: newPassword
            })
        });

        // Get server response's data
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

        // Use the data to process
        if (!data.success) {
            props.setAlert({
                visible: true,
                strongMsg: 'Sorry!',
                msg: `${data.message}`
            })
            return;
        }

        setUser(data.user);
        props.setUser(data.user)
        window.alert("Your information is updated")
        resetForm();
    };

    const resetForm = () => {
        $('#submitBtn').addClass('disabled').promise().then("class added")
        setEmail(user.email)
        // setUName(user.name)
        setPassword('')
        setNewPassword('')
    }

    return (
        <>
        {/* <div className="card-body">
            <h4 className="card-title">Account</h4>

            <UploadPicture user={user} setUser={props.setUser} setAlert={props.setAlert} />
        </div> */}
        <div className="card-body">
            <h4 className="card-title">Account</h4>
            <p className="card-description">Update your account password and display name</p>
            <form className="forms-sample" onSubmit={async (e)=>{
                e.preventDefault();
                sendResetPwRequest()
                return false;
            }}> 

                <Form.Group className="row">
                    <label for="emailInput" className="col-sm-3 col-form-label">Email Address</label>
                    <div className="col-sm-9">
                        <Form.Control placeholder="Email Address (Required)" type="email" id="emailInput" readOnly value={email} required />
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label for="nameInput" className="col-sm-3 col-form-label">Display Name</label>
                    <div className="col-sm-9">
                        <Form.Control placeholder="Display Name (Required)" type="text" id="nameInput" value={uname} required onChange={(e) => setUName(e.target.value)} />
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label for="passwordInput" className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                        <Form.Control placeholder="Password (Required)" type="password" id="passwordInput" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label for="newPasswordInput" className="col-sm-3 col-form-label">New Password</label>
                    <div className="col-sm-9">
                        <Form.Control placeholder="Password" type="password" id="newPasswordInput" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                </Form.Group>
                <div class="text-right">
                <button type="submit" id="submitBtn" className="btn btn-gradient-primary mr-2 disabled" onClick={(e)=>{
                    if (e.target.classList.contains('disabled'))
                        e.preventDefault();
                }}>Save Change</button>
                <button type="reset" className="btn btn-light" onClick={(e)=>{e.preventDefault(); resetForm();}}>Reset</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default AccountSettings;