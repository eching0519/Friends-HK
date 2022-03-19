import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import LoginBox from "../component/login/LoginBox";
import LoginByPassword from "../component/login/LoginByPassword";
import LoginVerify from "../component/login/LoginVerify";
import AlertMessage from '../component/common/AlertMessage';

const Login = () => {
    const [loginState, setloginState] = useState('login');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [alert, setAlert] = useState('');

    let navigate = useHistory();

    useEffect(() => {
        console.log(`changed to ${loginState}`)
        if (loginState === 'success') {
            navigate("/home");
        }
    }, [loginState]);

    const sendVerifyEmail = async () => {
      let url = '/user/login/email';
      let res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `email=${userName}`,
      });

      console.log(`email=${userName}`);

      let data = await res.json();
      console.log(data)

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
              msg: 'Please try again later. (' + error.message + ')'
          })
          return false
      }

      const loginVerification = data.verification;
      if (loginVerification) {
          if (loginVerification.email === userName && loginVerification.verified) {
              return true
          }
      }

      return false
    }

    let loginplaceholder = 0;
    if (loginState === 'login') {
        loginplaceholder = <LoginBox setUserName={setUserName} setloginState={setloginState} setAlert={setAlert} alreadyLoggedin={alreadyLoggedin} />;
    }

    if (loginState === 'password') {
      console.log(userName)
      loginplaceholder = <LoginByPassword userName={userName} userPassword={userPassword} setUserPassword={setUserPassword} setloginState={setloginState} sendVerifyEmail={sendVerifyEmail} setAlert={setAlert} alreadyLoggedin={alreadyLoggedin} />;
    }

    if (loginState === 'verify') {
        loginplaceholder = <LoginVerify userName={userName} setloginState={setloginState} sendVerifyEmail={sendVerifyEmail} setAlert={setAlert} alreadyLoggedin={alreadyLoggedin} />;
    }

    return (
      <div>
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
              {alert.visible === true && <AlertMessage strongMsg={alert.strongMsg} msg={alert.msg} />}
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Hello! let's get started</h4>
                  {loginplaceholder}

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
                  <div className="text-center mt-4 font-weight-light">
                      Don't have an account? <a href='/register' type="button" className="btn btn-link text-primary">Create</a>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login
