import React from "react";
import ReactDOM from 'react-dom';

function Button(props) {
    return (
        //<button type="button" className="btn btn-primary">First Button</button> 
        <button type="button" className="btn btn-primary" onClick={this.props.onClick}>First Button {this.props.name}</button>
    )
}

export default Button;