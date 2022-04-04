import React from "react";

import "./StatusBar.css"

function StatusBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">{props.roomName}</span>
            </div>
        </nav>
    )
}

export default StatusBar;