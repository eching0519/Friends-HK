import React, { useEffect, useState } from "react";
import UploadPicture from "./uploadPicture";
const querystring = require('querystring');

const AccountSettings = (props) => {
    const [user, setUser] = useState(props.user)
    const [email, setEmail] = useState(props.user===null?'':props.user.email)
    const [uname, setUName] = useState(props.user===null?'':props.user.name)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(()=> {
        props.setFormChanged(true)
        console.log("Form has changed")
    }, [email, uname, password, newPassword]);

    const sendResetPwRequest = async () => {
        let url = '/user/forgotPassword/reset';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                email: 'email',
                code: 'verifyCode',
                password: 'password'
            })
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
    };

    return (
        <>
            <h4 className="card-title">Account</h4>

            <UploadPicture user={user} setUser={props.setUser} setAlert={props.setAlert} />

            <form className="forms-sample" onSubmit={(e)=>{
                e.preventDefault();
                props.setAlert({visible:true, strongMsg: "Testing", msg: "Message"});
                return false;
            }}> 

                <div className="form-group">
                    <label for="emailInput">Email Address</label>
                    <input placeholder="Email Address (Required)" type="email" id="emailInput" className="form-control form-control-lg" readOnly value={email} required />
                </div>
                <div className="form-group">
                    <label for="nameInput">Display Name</label>
                    <input placeholder="Display Name (Required)" type="text" id="nameInput" className="form-control form-control"  value={uname} required onChange={(e) => setUName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="passwordInput">Password</label>
                    <input placeholder="Password (Required)" type="password" id="passwordInput" className="form-control form-control" value={password} required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="newPasswordInput">New Password</label>
                    <input placeholder="Password" type="password" id="newPasswordInput" className="form-control form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-gradient-primary mr-2">Save Change</button>
                <button className="btn btn-light">Reset</button>
            </form>
        </>
    )
}

export default AccountSettings;