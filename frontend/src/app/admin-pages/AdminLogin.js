import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import AlertMessage from '../component/common/AlertMessage';
const querystring = require('querystring');

const AdminLogin = (props) => {
    const [adminName, setAdminName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [alert, setAlert] = useState({ visible: false, strongMsg: "123", msg: "456"});

  const sendAdminLoginRequest = async () => {
    let url = '/admin/login';

    let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify({
          id : adminName,
          pw: adminPassword
        })
    });

    let data
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
    
    if (!data.success) {
        setAlert({
          visible: true,
          strongMsg: 'Sorry!',
          msg: data.message
      })
      return;
    }
    else{
      // window.location.replace("/admin");
      sessionStorage.setItem('AdminProfile', JSON.stringify(data.admin));
      window.location.pathname = "/admin";
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
              {alert.visible === true && <AlertMessage alert={alert} setAlert={setAlert} />}
              <h4>Administrator Portal</h4>
              <Form className="pt-3" onSubmit={(e) => {
                e.preventDefault();
                sendAdminLoginRequest();
                return false;
                }}>
                <Form.Group className="d-flex search-field">
                  <Form.Control value={adminName} type="text" placeholder="Username" size="lg" className="h-auto" onChange={(event)=> setAdminName(event.target.value)}/>
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control value = {adminPassword} type="password" placeholder="Password" size="lg" className="h-auto" onChange={(event)=> setAdminPassword(event.target.value)}/>
                </Form.Group>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input"/>
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
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
