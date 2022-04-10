import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './MessageBox.css'

const Messagesbox = (props) => {
    //console.log("Messagesbox", props)

    var lastMsgSender = 'admin';
    return (
        <>
            {
                props.messageList.map((value, i) => 
                { 
                    //console.log("Messagesbox", value)
                    //console.log("Messagesbox", i)
                    let item = (
                        <div key={i}>
                            <Message 
                                    message={value} 
                                    userName={props.userName} 
                                    userId={props.userId} 
                                    chatRoom={props.chatRoom}
                                    lastMsgSender={lastMsgSender}
                                    setTarget={props.setTarget} />
                        </div>
                    );
                    lastMsgSender = value.senderId
                    return item
                })
            }
            {/* {(props.messageList.length > 0) ?
                props.messageList.map((message, i) =>
                    <div key={i}>
                        <Message message={message} userName={props.userName} userId={props.userId} chatRoom={props.chatRoom} />
                    </div>
                    //better put system message here:
                ) : <h2>Loading</h2> // Loading placeholder
            } */}
        </>
    )
}

export default Messagesbox;