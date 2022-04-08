import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';
import $ from 'jquery';

// const socket = io({ //no url: default to localhost:8080
//     autoConnect: false
// });

const Chatbox = (props) => {
    const [user, setUser] = useState(props.user)
    const [chatRoom, setChatRoom] = useState(props.chatRoom);
    const [messageList, setmessageList] = useState(chatRoom.chatbox);   //store all message.
    // const [user1Name, setUser1Name] = useState('');
    // const [user2Name, setUser2Name] = useState('');
    const [roomId, setRoomId] = useState(chatRoom._id);         //store current room id
    const [roomName, setRoomName] = useState(chatRoom.name);    //store current room name
    const [message, setMessage] = useState('');                 //store message from the input box.
    // const [systemMessage, setSystemMessage] = useState('');

    // useEffect(() => {
    //     socket.connect();   //estiblish socket io connection
    //     return () => {
    //         socket.removeAllListeners();    //clean up listener
    //         socket.disconnect();    //disconnect socket io connection
    //     }
    // }, []);

    // useEffect(() => {
    //     if (chatRoom !== null) {
    //         console.log(chatRoom.chatbox);
    //         setmessageList(chatRoom.chatbox);
    //     }
    // }, [chatRoom]);

    // useEffect(() => {
    //     // setmessageList([]);
    //     // props.getChatRoomsocketio(roomId);

    //     let userName = props.user.name;

    //     socket.emit("joinRoom", { userId: props.userId, name: props.userName, roomId: chatRoom._id });

    //     socket.on("message", (message) => {
    //         console.log('client recieve:', message)
    //         props.setmessageList([...messageList, message]);    //add message to message list
    //     });

    //     socket.on("systemMessage", (message) => {
    //         console.log("from system:", message)
    //         props.setSystemMessage(message);
    //     });

    //     return () => {
    //         socket.emit("leaveRoom", { name: userName, roomId: roomId });
    //         socket.removeAllListeners();
    //     }
    // }, [socket]);   //trigger useEffect if room changed from sidebar

    // useEffect(() => {
    //     if (props.roomId !== '') {
    //         getChatRoomsocketio(props.roomId);
    //     }
    //     if (chatRoom !== null) {
    //         setmessageList(chatRoom.chatbox);
    //     }

    // }, [props.roomId]);

    // const getChatRoomsocketio = async (id) => {
    //     let chatroom;
    //     socket.emit("getChatRoom", id, (data) => {
    //         chatroom = data;
    //         setChatRoom(chatroom)
    //         console.log(chatroom);
    //         // console.log(chatRoom);
    //     });
    // };

    useEffect(() => {
        // socket.on("message", (message) => {
        //     setmessageList([...messageList, message]);
        // });

        // Scroll to bottom
        $(".card-chatbox .card-body").scrollTop($(".card-chatbox .card-body")[0].scrollHeight);

    }, [chatRoom.chatbox]);


    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            props.sendMessageBySocket(roomId, message, props.user.id, Date.now(), (message) => {
                console.log('message delivered:', message);
                setMessage('')  //clear message input box
            });
            // socket.emit('sendMessage', roomId, { message: message, senderId: props.userId, timeElapse: Date.now() }, (message) => {
            //     console.log('message delivered:', message);
            //     setMessage('')  //clear message input box
            // });
        }
    }

    return (
        <>
            <div className="card card-chatbox">
                <div className="card-header bg-white">
                    <StatusBar userName={props.user.name} roomId={roomId} roomName={chatRoom.name} />
                </div>
                <div className="card-body bg-white">
                    <Messagesbox systemMessage={props.systemMessage} messageList={messageList} userName={props.user.name} userId={props.user.id} chatRoom={chatRoom} />
                </div>
                <div className="card-footer bg-white">
                    <InputBar message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </>
    )
}

export default Chatbox;