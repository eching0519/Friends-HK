import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './MessageBox.css'

const Messagesbox = (props) => {
    console.log("Messagesbox", props)
    return (
        <>
            {
                props.messageList.map((value, i) => 
                { 
                    console.log("Messagesbox", value)
                    console.log("Messagesbox", i)
                    return (
                    <div key={i}>
                        <Message 
                                message={value} 
                                userName={props.userName} 
                                userId={props.userId} 
                                chatRoom={props.chatRoom} />
                    </div>
                    )
                })
            }
        </>
    )
}

export default Messagesbox;