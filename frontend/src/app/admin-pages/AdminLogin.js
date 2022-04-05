import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
const querystring = require('querystring');

const AdminLogin = (props) => {
    const [adminName, setAdminName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

  const sendAdminLoginRequest = async () => {
    let url = '/admin/login';

    let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify({
          id : {adminName},
          pw: {adminPassword}
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
                  <Form.Control value={adminName} type="email" placeholder="Username" size="lg" className="h-auto" onChange={(event)=> setAdminName(event.target.value)}/>
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control value = {adminPassword} type="password" placeholder="Password" size="lg" className="h-auto" onChange={(event)=> setAdminPassword(event.target.value)}/>
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

export default AdminLogin;
