import React, { useEffect, useState, useContext } from "react";

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';

// const socket = io({ //no url: default to localhost:8080
//     autoConnect: false
// });

const ChatroomBox = (props) => {
    console.log("ChatroomBox", props.chatroomList)
    // chatroomList
    // user
    // sendMessage
    const [message, setMessage] = useState('');

    console.log()

    return Object.entries(props.chatroomList).map(([roomId, chatroom]) => {
        console.log("ChatroomBox", roomId)
        console.log("ChatroomBox", chatroom)
    return (
                        <Box 
                            // key={index} 
                            chatroom={chatroom} 
                            user={props.user}
                            // systemMessage={chatroom.systemMessage}
                            message={message}
                            setMessage={setMessage}
                            sendMessage={props.sendMessage} />
                    )});

    
}

const Box = (props) => {
    // chatroom
    // user
    // systemMessage
    // message
    // setMessage
    // sendMessage
    console.log("ChatroomBox box", props)
    return (
        <div className="card card-chatbox">
            <div className="card-header bg-white">
                <StatusBar userName={props.user.name} roomId={props.chatroom._id} roomName={props.chatroom.name} />
            </div>
            <div className="card-body bg-white">
                <Messagesbox 
                             messageList={props.chatroom.chatbox} 
                             userName={props.user.name} 
                             userId={props.user.id} 
                             chatRoom={props.chatroom} />
            </div>
            <div className="card-footer bg-white">
                <InputBar message={props.message} 
                          setMessage={props.setMessage} 
                          sendMessage={props.sendMessage}
                          roomId={props.chatroom._id}
                          userId={props.user.id} />
            </div>
        </div>
    );
}

export default ChatroomBox;