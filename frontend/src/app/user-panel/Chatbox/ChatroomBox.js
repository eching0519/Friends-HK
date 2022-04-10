import React, { useEffect, useState, useContext } from "react";

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';
import $ from 'jquery';
import WRUgame from "../WRUgame/WRUgame";
import { UserProfileSidebar, UserInfoModal } from "../userProfile";

// const socket = io({ //no url: default to localhost:8080
//     autoConnect: false
// });

const ChatroomBox = (props) => {
    console.log("ChatroomBox", props.chatroomList)
    // chatroomList
    // user
    // sendMessage
    const [message, setMessage] = useState('');
    const [target, setTarget] = useState(props.user.id)
    const [userProfileModal, setUserProfileModal] = useState(null)

    useEffect(() => {
        console.log("TargetId", target)
        setUserProfileModal(<UserInfoModal content={<UserProfileSidebar 
                                                        user={props.user} 
                                                        target={target} 
                                                        detailed={true} 
                                                        action={true} 
                                                        setInfoContent={()=>{}} 
                                                        setPreferenceContent={()=>{}} 
                                                        setTargetName={()=>{}} />} />)
    }, [target])

    return (
        <>
        {
            Object.entries(props.chatroomList).map(([roomId, chatroom]) => {
            return (
                <Box 
                    // key={index} 
                    chatroom={chatroom} 
                    user={props.user}
                    // systemMessage={chatroom.systemMessage}
                    message={message}
                    setMessage={setMessage}
                    sendMessage={props.sendMessage}
                    selectedRoomId={props.selectedRoomId}
                    setTarget={setTarget} />
            )})
        }
        
        {userProfileModal}
        </>
    )

    
}

const Box = (props) => {
    // chatroom
    // user
    // systemMessage
    // message
    // setMessage
    // sendMessage
    console.log("ChatroomBox box", props)

    const hidden = "card card-chatbox d-none"
    const show = "card card-chatbox"
    const [wouldURgame, setWouldURgame] = useState(false);
    const [myClassName, setClassName] = useState(hidden)
    useEffect(() => {
        setClassName(hidden)
        if (props.chatroom._id === props.selectedRoomId) {
            setClassName(show)
        }
    }, [props.selectedRoomId]);

    // Scroll to bottom
    useEffect(() => {
        $(`#${props.chatroom._id}`).scrollTop($(`#${props.chatroom._id}`)[0].scrollHeight);
    }, [myClassName, props.chatroom])

    return (
        <>
        <div className={myClassName}>
            {wouldURgame? <WRUgame userName={props.user.name} roomId={props.chatroom._id} setWouldURgame={setWouldURgame}/>: <></>}
            <div className="card-header bg-white">
                <StatusBar userName={props.user.name} roomId={props.chatroom._id} roomName={props.chatroom.name} />
            </div>
            <div className="card-body bg-white" id={props.chatroom._id}>
                <Messagesbox 
                            user={props.user}
                            messageList={props.chatroom.chatbox} 
                            userName={props.user.name} 
                            userId={props.user.id} 
                            chatRoom={props.chatroom}
                            setTarget={props.setTarget} />
            </div>
            <div className="card-footer bg-white">
                <InputBar message={props.message} 
                          setMessage={props.setMessage} 
                          sendMessage={props.sendMessage}
                          roomId={props.chatroom._id}
                          userId={props.user.id}
                          setWouldURgame={setWouldURgame} />
            </div>
        </div>
        </>
    );
}

export default ChatroomBox;