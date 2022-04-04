import React, { useState } from "react";
import { Link } from "react-router-dom";

function AlertMessage(props) {
    const [alert, setAlert] = useState(props.alert);

    return (
        <>
            <div className="alert alert-danger fade show alert-dismissible " role="alert">
                <div>
                <strong>{alert.strongMsg}</strong> {alert.msg}
                </div>
                <button type="button" className="close" onClick={()=>props.setAlert({visible:false})}>
                    <span aria-hidden="true">×</span>
                </button>
            </div>
        </>
    )
}

export default AlertMessage;