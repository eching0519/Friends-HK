import React from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login() {
    let navigate = useNavigate();
    return (
        <div className="login-page">
            <div className="row w-100 mx-0"><h1>Login!</h1>
                <div className="col-lg-8 mx-auto login-icon-fragment">
                    <h2>Welcome!</h2>
                    <p>Add icon here</p>
                    <p>
                        Use Frends-HK to meet new friends!
                    </p>
                </div>
                <div className="col-lg-4 mx-auto login-box-fragment">
                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div className="brand-logo">
                        </div>
                        <h4>Hello! let's get started</h4>
                        <h6 className="font-weight-light">Sign in to continue.</h6>
                        <form className="pt-3">
                            <div className="d-flex search-field">
                                <input type="email" placeholder="Username" size="lg" className="h-auto" />
                            </div>
                            <div className="d-flex search-field">
                                <input type="password" placeholder="Password" size="lg" className="h-auto" />
                            </div>
                            <div className="mt-3">
                                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">SIGN IN</Link>
                                <Link className="btn btn-primary" to='/home' onClick={
                                    () => {
                                        localStorage.setItem('token', 12345);
                                    }
                                }>Login</Link>
                            </div>
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
                            <div className="mb-2">
                                <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                                    <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                                </button>

                            </div>
                            <div className="text-center mt-4 font-weight-light">
                                Don't have an account? <Link to="/" className="text-primary">Create</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;