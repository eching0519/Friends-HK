import React from "react";

function Chatbox(props) {
    return (
        <>
            <h1>Chatbox!</h1>
            <h1>{props.name}</h1>
            <h1>{props.number}</h1>
        </>
       
    )
}

export default Chatbox;