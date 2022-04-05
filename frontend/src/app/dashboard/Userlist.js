import React, { Component, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import {Bar, Doughnut} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
// import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
const querystring = require('querystring');
// import "react-datepicker/dist/react-datepicker.css";



const Userlist = (props) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const sendAdminLoginRequest = async () => {
    let url = '/admin/userList';

    let res = await fetch(url, {
        method: 'GET', //GET or remain it as POST?
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify({
          id : {userName},
          pw: {userPassword}
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
    
    if (!data.success) {
        props.setAlert({
          visible: true,
          strongMsg: 'Sorry!',
          msg: '${data.message}'
      })
      return;
    }
    else{
      window.location.replace("/admin");
    }
  }

  return (
  <div>
    <div className="d-flex align-items-center auth px-0">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              <img src={require("../../assets/images/logo.svg")} alt="logo" />
            </div>
            <h4>Hello! let's get started</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <Form className="pt-3">
              <Form.Group className="d-flex search-field">
                {/* What should be the form?? */}
                <Form.Control value={userName} type="email" placeholder="Username" size="lg" className="h-auto" onChange={(event)=> setUserName(event.target.value)}/>
              </Form.Group>
              {/* What should be the form?? */}
              <Form.Group className="d-flex search-field">
                <Form.Control value = {userPassword} type="password" placeholder="Password" size="lg" className="h-auto" onChange={(event)=> setUserPassword(event.target.value)}/>
              </Form.Group>
              <div className="mt-3">
                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/admin">SIGN IN</Link>
              </div>
              <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input"/>
                    <i className="input-helper"></i>
                    Keep me signed in
                  </label>
                </div>
                <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
              </div>
              <div className="mb-2">
                <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                  <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                </button>
              </div>
              <div className="text-center mt-4 font-weight-light">
                Don't have an account? <Link to="/user/register" className="text-primary">Create</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>  
  </div>

)
}

export default Userlist;
