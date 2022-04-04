import React from "react";

import "./StatusBar.css"

function StatusBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">{props.room}</span>
            </div>
        </nav>
    )
}

export default StatusBar;