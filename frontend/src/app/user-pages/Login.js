import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import LoginBox from "../component/login/LoginBox";
import LoginByPassword from "../component/login/LoginByPassword";
import LoginVerify from "../component/login/LoginVerify";
import AlertMessage from '../component/common/AlertMessage';
import ForgotPassword from '../component/login/ForgotPassword';
import ResetPasswordSuccess from '../component/login/ResetPasswordSuccess';
const querystring = require('querystring');

const Login = (props) => {
  // get alert message
  let urlData = window.location.search;
  let queryData = new URLSearchParams(urlData);
  let msg = queryData.get('msg');
  let smsg = queryData.get('smsg');

    const [loginState, setloginState] = useState('login');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [alert, setAlert] = useState(msg===null?{ visible: false }:{ visible: true, strongMsg: smsg, msg: msg});
    const [user, setUser] = useState(null);

    const loginSuccess = () => {
      window.location.pathname = "/home";
    };

    const sendVerifyEmail = async () => {
      let url = '/user/login/email';
      let res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: querystring.stringify({
            email: userName
          })
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        setAlert({
          visible: true,
          strongMsg: 'Error!',
          msg: `Unexpected error. (${error.message})`
        })
        return;
      }
      
      // console.log(data)

      if (!data.success) {
        setAlert({
          visible: true,
          strongMsg: 'Sorry!',
          msg: data.message
        })
      } else {
        console.log("Email sent")
      }
    }

    const alreadyLoggedin = async () => {
      // Check session
      let url = '/checkSession';
      let res = await fetch(url, {
          method: 'GET',
      });

      let data;
      try {
          data = await res.json();
      } catch (error) {
          setAlert({
              visible: true,
              strongMsg: 'Error!',
              msg: `Unexpected error. (${error.message})`
          })
          return false
      }

      const loginVerification = data.verification;
      if (loginVerification) {
          if (loginVerification.email === userName && loginVerification.verified) {
              // setUser(loginVerification)
              sessionStorage.setItem('UserProfile', JSON.stringify(loginVerification));
              return true
          }
      }

      return false
    }

    let loginplaceholder = 0;
    if (loginState === 'login') {
        loginplaceholder = <LoginBox setUserName={setUserName} setloginState={setloginState} setAlert={setAlert} setUser={setUser} alreadyLoggedin={alreadyLoggedin} loginSuccess={loginSuccess} />;
    }

    if (loginState === 'password') {
      loginplaceholder = <LoginByPassword userName={userName} userPassword={userPassword} setUserPassword={setUserPassword} setloginState={setloginState} sendVerifyEmail={sendVerifyEmail} setAlert={setAlert} setUser={setUser} alreadyLoggedin={alreadyLoggedin} loginSuccess={loginSuccess} />;
    }

    if (loginState === 'verify') {
        loginplaceholder = <LoginVerify userName={userName} setloginState={setloginState} sendVerifyEmail={sendVerifyEmail} setAlert={setAlert}setUser={setUser}  alreadyLoggedin={alreadyLoggedin} loginSuccess={loginSuccess} />;
    }

    if (loginState === 'forgot') {
      loginplaceholder = <ForgotPassword userName={userName} setloginState={setloginState} sendVerifyEmail={sendVerifyEmail} setAlert={setAlert} alreadyLoggedin={alreadyLoggedin} />;
    }

    if (loginState === 'resetPwAlready') {
      loginplaceholder = <ResetPasswordSuccess setloginState={setloginState} setAlert={setAlert} />;
    }

    return (
      <>
        <div className='d-flex align-items-center auth p-5 make-friends-background'>
          <div className="row w-100 mx-0">
            <div className="col-md-7 grid-margin">
              <div className="pt-5 pl-5 pr-5">
                <h1>Welcome!</h1>
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <div>Let's meet friends in Frends-HK!</div>
              </div>
            </div>
            <div className="col-md-5 grid-margin stretch-card">
              <div>
              {alert.visible === true && <AlertMessage alert={alert} setAlert={setAlert} />}
              <div className="card">
                <div className="card-body">
                  {loginplaceholder}
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <a href='/register' type="button" className="btn btn-link text-primary">Create</a>
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Login
