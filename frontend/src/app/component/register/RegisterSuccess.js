import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterSuccess(props) {
    return (
        <>
        <div className="text-center">
            <h1>Success!</h1>
            <p>We have sent an email for your account verification.<br/>Please check your registered email inbox.</p>
            <div className="text-center mt-4 font-weight-light">
                Back to <Link to="/login" className="text-primary">Login</Link> page
            </div>
        </div>
        </>
    )
}

export default RegisterSuccess;