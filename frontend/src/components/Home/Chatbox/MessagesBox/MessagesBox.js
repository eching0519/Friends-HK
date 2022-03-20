import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './MessageBox.css'

function Messagesbox(props) {
    return (
        <ScrollToBottom className="messages">
            {props.messages.map((message, i) => 
                <div key={i}>
                    <Message message={message} />
                </div>
            )}
        </ScrollToBottom>
    )
}

export default Messagesbox;