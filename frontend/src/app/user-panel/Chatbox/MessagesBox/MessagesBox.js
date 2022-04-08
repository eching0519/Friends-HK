import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './MessageBox.css'

const Messagesbox = (props) => {
    return (
        <>
            {(props.messageList.length > 0) ?
                props.messageList.map((message, i) =>
                    <div key={i}>
                        <Message message={message} userName={props.userName} userId={props.userId} chatRoom={props.chatRoom} />
                    </div>
                ) : <></>
            }
            <div>
                {/* <div className="text-center"> */}
                    <div className="system-message"><div>{props.systemMessage.message}</div></div>
                {/* </div> */}
            </div>
        </>
    )
}

export default Messagesbox;