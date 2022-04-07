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
    // const [user1Name, setUser1Name] = useState('');
    // const [user2Name, setUser2Name] = useState('');
    const [roomId, setRoomId] = useState('');   //store current room id

    const [roomName, setRoomName] = useState('');   //store current room name

    const [message, setMessage] = useState(''); //store message from the input box.
    const [messageList, setmessageList] = useState([]);   //store all message.

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

        // setUser1Id(props.selectedRoomUserId[0]);
        // setUser2Id(props.selectedRoomUserId[1]);

        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    useEffect(() => {
        if (props.chatHistory !== []) { //set chat history to messagelist
            setmessageList(props.chatHistory);
        } else {
            setmessageList([{ text: 'welcome', name: 'admin', time: Date.UTC(1994, 9, 25) }]);    //if there is no chat history, initialize the message list.
        }

        const { userName, roomId } = { userName: props.userName, roomId: props.roomId }   //get names and room id from Sidebar component.
        console.log({ userName, roomId });
        setRoomId(roomId);

        socket.emit("joinRoom", { userId: props.userId, name: props.userName, roomId: props.roomId });

        socket.on("message", (message) => {
            console.log('client recieve:', message)
            setmessageList([...messageList, message]);    //add message to message list
        });

        return () => {
            socket.emit("leaveRoom", { name: userName, roomId: roomId });
            socket.removeAllListeners();
        }
    }, [socket, props.roomId]);   //trigger useEffect if room changed from sidebar


    useEffect(() => {
        socket.on("message", (message) => {
            setmessageList([...messageList, message]);
        });

    }, [messageList]);


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            //console.log(message)
            //setmessageList([...messageList, { text: message }])
            socket.emit('sendMessage', { roomId: roomId }, { message: message, senderId: props.userId, timeElapse: Date.now() }, (message) => {
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
                    <Messagesbox messageList={messageList} userName={props.userName} userId={props.userId} user1={user1} user2={user2} user3={user3} />
                </div>
                <div className="card-footer bg-white">
                    <InputBar message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </>
    )
}

export default Chatbox;