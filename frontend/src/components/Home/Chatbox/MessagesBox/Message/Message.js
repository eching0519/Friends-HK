import React, { useEffect } from 'react';

import './Message.css';

const Message = (props) => {
    let isSentByCurrentUser = false;

    /**
    useEffect(() => {
        //console.log(props.message.text)
    }, [])
     */
    
    //const trimmedName = name.trim().toLowerCase();

    /*
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }
    */

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">from me</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{props.message.text}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{props.message.text}</p>
                    </div>
                    <p className="sentText pl-10 ">admin</p>
                </div>
            )
    );
}

export default Message;