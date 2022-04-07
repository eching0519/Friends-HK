import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const Chatbox = (props) => {
    const [user1, setUser1] = useState(null);   // user is a {id, name} object
    const [user2, setUser2] = useState(null);
    const [user3, setUser3] = useState(null);
    const [chatRoom, setChatRoom] = useState(null);
    // const [user1Name, setUser1Name] = useState('');
    // const [user2Name, setUser2Name] = useState('');
    const [roomId, setRoomId] = useState('');   //store current room id

    const [roomName, setRoomName] = useState('');   //store current room name

    const [message, setMessage] = useState(''); //store message from the input box.
    const [messageList, setmessageList] = useState([]);   //store all message.
    const [systemMessage, setSystemMessage] = useState('');

    useEffect(() => {
        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    useEffect(() => {
        if (chatRoom !== null) {
            console.log(chatRoom.chatbox);
            setmessageList(chatRoom.chatbox);
        }
    }, [chatRoom]);

    useEffect(() => {
        let nameStr = props.selectedRoomUserName.split(",");
        
        setUser1({
            id: props.selectedRoomUserId[0],
            name: nameStr[0]
        });

        setUser2({
            id: props.selectedRoomUserId[1],
            name: nameStr[1]
        });

        setUser3({
            id: props.selectedRoomUserId[2],
            name: nameStr[2]
        });

        setmessageList([]);
        getChatRoomsocketio(props.roomId);

        const { userName, roomId } = { userName: props.userName, roomId: props.roomId }   //get names and room id from Sidebar component.
        console.log({ userName, roomId });
        setRoomId(roomId);

        socket.emit("joinRoom", { userId: props.userId, name: props.userName, roomId: props.roomId });

        socket.on("message", (message) => {
            console.log('client recieve:', message)
            setmessageList([...messageList, message]);    //add message to message list
        });

        socket.on("systemMessage", (message) => {
            console.log("from system:", message)
            setSystemMessage(message);
        });

        return () => {
            socket.emit("leaveRoom", { name: userName, roomId: roomId });
            socket.removeAllListeners();
        }
    }, [socket, props.roomId]);   //trigger useEffect if room changed from sidebar

    useEffect(() => {
        if (props.roomId !== '') {
            getChatRoomsocketio(props.roomId);
        }
        if (chatRoom !== null) {
            setmessageList(chatRoom.chatbox);
        }

    }, [props.roomId]);

    const getChatRoomsocketio = async (id) => {
        let chatroom;
        socket.emit("getChatRoom", id, (data) => {
            chatroom = data;
            setChatRoom(chatroom)
            console.log(chatroom);
        });
    };

    useEffect(() => {
        socket.on("message", (message) => {
            setmessageList([...messageList, message]);
        });

    }, [messageList]);


    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', roomId, { message: message, senderId: props.userId, timeElapse: Date.now() }, (message) => {
                console.log('message delivered:', message);
                setMessage('')  //clear message input box
            });
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-header bg-white">
                    <StatusBar userName={props.userName} roomId={props.roomId} roomName={props.roomName} />
                </div>
                <div className="card-body bg-white">
                    <Messagesbox systemMessage={systemMessage} messageList={messageList} userName={props.userName} userId={props.userId} user1={user1} user2={user2} user3={user3} />
                </div>
                <div className="card-footer bg-white">
                    <InputBar message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </>
    )
}

export default Chatbox;