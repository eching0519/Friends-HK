import React from "react";

function ResetPasswordSuccess(props) {
    return (
        <>
        <div className="text-center">
            <h1>Success!</h1>
            <p>Your password has been reset.</p>
            <div className="text-center mt-4 font-weight-light">
                Back to <a href="#" className="text-primary" onClick={(e)=>{
                    e.preventDefault();
                    props.setAlert({visible: false});
                    props.setloginState('login');
                    return false;
                }}>Login</a> page
            </div>
        </div>
        </>
    )
}

export default ResetPasswordSuccess;