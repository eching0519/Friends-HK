import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Register extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3" method='POST' action='http://localhost:8080/user/register'>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" name="name" placeholder="Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" name="email" placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" name="username" placeholder="Username" required />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" name="password" placeholder="Password" required />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button type='submit' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                    {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN UP</Link> */}
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  registerHandler(params) {
    return
  }
}

export default Register
