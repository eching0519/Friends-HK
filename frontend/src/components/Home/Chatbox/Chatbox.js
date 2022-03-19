import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';

function Chatbox(props, { socket }) {

    const [message, setMessage] = useState(''); //store message in the input bar.
    const [messages, setMessages] = useState(['hello', 'test1','test2']);   //store chat history.

    useEffect(() => {
        //socket.connect();
        if (props.name !== '' && props.room !== '') {
            const { name, room } = { name: props.name, room: props.room }
            console.log({ name, room });
            props.socket.emit("join", { name, room }, () => {

            });
        }
    }, [props.name, props.room]);

    useEffect(() => {
        if (props.name !== '' && props.room !== '') {
            props.socket.on("message", message => {
                setMessages([...messages, message]);
            });
        }
    }, [messages]);


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            setMessages([...messages, message])
            props.socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <>
            {props.name !== '' && props.room !== '' ?
                <div>
                    <StatusBar name={props.name} room={props.room} />
                    <Messagesbox messages={messages} name={props.name} />
                    <InputBar message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
                : <h1>Select a group to get start.</h1>}

        </>
    )
}

export default Chatbox;