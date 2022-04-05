import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const Chatbox = (props) => {
    const [roomId, setRoomId] = useState('');   //store current room id
    const [roomName, setRoomName] = useState('');   //store current room name

    const [message, setMessage] = useState(''); //store message from the input box.
    const [messageList, setmessageList] = useState([]);   //store all message.

    useEffect(() => {
        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

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
        setmessageList([{ text: 'welcome', name: 'admin' , time: Date.UTC(1994, 9, 25)}]);    //if there is no chat history, initialize the message list.
        //}

        const { userName, roomId } = { userName: props.userName, roomId: props.roomId }   //get names and room id from Sidebar component.
        console.log({ userName, roomId });
        setRoomId(roomId);

        socket.emit("joinRoom", { name: userName, roomId: roomId }, () => {
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
            socket.emit("leaveRoom", { name: userName, roomId: roomId }, () => {

            });
            socket.removeAllListeners();
            //sessionStorage.setItem(`${props.room}`, JSON.stringify(messageList));
            //setmessageList([]);
        }
    }, [socket, props.roomId]);   //trigger useEffect if room changed from sidebar


    useEffect(() => {
        const { userName, roomId } = { userName: props.userName, roomId: props.roomId };

        socket.on("message", (message) => {
            setmessageList([...messageList, message]);    //To be update
        });

    }, [messageList]);


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            //console.log(message)
            //setmessageList([...messageList, { text: message }])
            socket.emit('sendMessage', { roomId: roomId }, { text: message, name: props.userName, time: Date.now() }, (message) => {
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
                    <Messagesbox messageList={messageList} userName={props.userName} />
                </div>
                <div className="card-footer bg-white">
                    <InputBar message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </>
    )
}

export default Chatbox;