import React, { useState } from "react";
import { Link } from "react-router-dom";

function AlertMessage(props) {
    return (
        // alert-dismissible 
        <>
            <div className="alert alert-danger fade show" role="alert">
                <div>
                <strong>{props.strongMsg}</strong> {props.msg}
                </div>
                {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button> */}
            </div>
        </>
    )
}

export default AlertMessage;