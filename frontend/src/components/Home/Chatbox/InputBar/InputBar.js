import React from "react";

import './InputBar.css';

function InputBar(props) {
    return (
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={props.message}
                onChange={({ target: { value } }) => props.setMessage(value)}
                onKeyPress={event => event.key === 'Enter' ? props.sendMessage(event) : null}
            />
            <button className="sendButton" onClick={e => props.sendMessage(e)}>Send</button>
        </form>
    )
}

export default InputBar;