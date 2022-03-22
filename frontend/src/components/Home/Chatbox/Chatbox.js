import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';

const socket = io({
    autoConnect: false
});

function Chatbox(props) {
    const [room, setRoom] = useState('');   //store current room
    
    const [message, setMessage] = useState(''); //store message from the input box.
    const [messageList, setmessageList] = useState([]);   //store all message.

    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        //setSocket(io()) ; //estiblish socket io connection

        //get chat history when room changed.
        //if (sessionStorage.getItem(`${props.room}`) !== null) {
            //console.log('fetch data from session storage');
            //setmessageList(JSON.parse(sessionStorage.getItem(`${props.room}`)));
        //} else {

        // ADD features: if session storage does not contain chat history, try to fetch from server.

        // if both server and session storage are empty, create new message.
        //console.log('cannot fetch data from session storage');
        setmessageList([{ text: 'welocome', name: 'admin'}]);    //if there is no chat history, initialize to empty array.
        //}

        const { userName, room } = { userName: props.userName, room: props.room }   //get names and room from Sidebar component.
        console.log({ userName, room });
        setRoom(room);

        socket.emit("joinRoom", { name: userName, room: room }, () => {
            //console.log('sent message');
        });

        //socket.emit("pingRoom", { name: userName, room: room }, () => {
            //console.log('sent message');
        //});

        socket.on("message", (message) => {
            console.log('client recieve:', message)
            setmessageList([...messageList, message]);    //add message to message list
        });

        return () => {
            socket.emit("leaveRoom", { name: userName, room: room }, () => {

            });
            socket.removeAllListeners();
            sessionStorage.setItem(`${props.room}`, JSON.stringify(messageList));
            setmessageList([]);
        }
    }, [socket, props.room]);   //trigger useEffect if room changed from sidebar


    useEffect(() => {
        const { userName, room } = { userName: props.userName, room: props.room }

        socket.on("message", (message) => {
            setmessageList([...messageList, message]);    //To be update
        });

    }, [messageList]);


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            //console.log(message)
            //setmessageList([...messageList, { text: message }])
            socket.emit('sendMessage', { room: room }, { text: message, name: props.userName }, (message) => {
                console.log('message delivered:', message);
                setMessage('')  //clear message input box
            });
        }
    }

    return (
        <div>
            <StatusBar userName={props.userName} room={props.room} />
            <Messagesbox messageList={messageList} userName={props.userName} />
            <InputBar message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    )
}

export default Chatbox;