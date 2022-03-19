import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginByPassword = props => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [disableInput, setDisableInput] = useState(false);

    const sendLoginRequest = async () => {
          let url = '/user/login';
          let res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `email=${props.userName}&password=${props.userPassword}`
          });

          let data
          try {
            data = await res.json();
          } catch (error) {
            props.setAlert({
                visible: true,
                strongMsg: 'Error!',
                msg: 'Please try again later. (' + error.message + ')'
            })
            return;
          }
          
          if (data.success) {
              // setloginState('verify');
              props.setloginState('success');
          } else {
            props.setAlert({
              visible: true,
              strongMsg: 'Sorry!',
              msg: data.message
            })
          }
      };

    return (
        <form className="pt-3">
            <div className="form-group">
                    <label for="emailInput">Email address</label>
                    <input type="email" id="emailInput" placeholder="Email" size="lg" className="form-control form-control-lg" value={props.userName} disabled="disabled" />
            </div>
            <div className="form-group">
                <label for="passwordInput">Password</label>
                <input type="password" id="passwordInput" placeholder="password" size="lg" className="form-control form-control" onChange={(event) => {
                    props.setUserPassword(event.target.value);
                }} value={props.userPassword} disabled={disableInput} />
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-gradient-primary mr-2 w-100 mb-2" onClick={
                    () => {
                        sendLoginRequest();
                    }
                }>Confirm</button>
                <button type="button" className="btn btn-light w-100" onClick={
                    () => {
                        props.setloginState('verify');
                        props.sendVerifyEmail();
                    }
                }>Login By Email Verification</button>
            </div>
        </form>
    )
}

export default LoginByPassword;