import React, { useEffect, useState, useContext } from "react";
//import { io } from 'socket.io-client';

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';

function Chatbox(props, { socket }) {

    const [message, setMessage] = useState(''); //store message from the input box.
    const [messages, setMessages] = useState([]);   //store all message.


    useEffect(() => {   //get chat history when room changed.
        //let tempChatHistory = sessionStorage.getItem(`${props.room}`);
        if (!sessionStorage.getItem(`${props.room}`)) {
            setMessages(JSON.parse(sessionStorage.getItem(`${props.room}`)));
        } else {
            // TODO: add features: if session storage does not contain chat history, try to fetch from server.
            // if both server and session storage are empty, create new message.
            //setMessages([{ text: 'hello, welcome to the chat' }, { text: 'test1' }, { text: 'test2' }]);
        }

        

        if (props.name !== '' && props.room !== '') {
            const { name, room } = { name: props.name, room: props.room }
            console.log({ name, room });
            props.socket.emit("join", { name, room }, () => {

            });
        }

        return () => {
            //console.log()
            sessionStorage.setItem(`${props.room}`, JSON.stringify(messages));
        }
    }, [ props.room]);   //use effect if room changed from sidebar

    /*
    */
    useEffect(() => {
        const { name, room } = { name: props.name, room: props.room }
        if (props.name !== '' && props.room !== '') {
            props.socket.on("message", message => {
                setMessages([...messages, message]);    //To be update
            });
        }
    }, [messages]);


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            console.log(message)
            setMessages([...messages, { text: message }])
            props.socket.emit('sendMessage', { text: message }, () => setMessage(''));
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