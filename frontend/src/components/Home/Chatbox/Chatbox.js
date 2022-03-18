import React, { useEffect, useState, useContext } from "react";
import io from 'socket.io-client';

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';

let socket;
function Chatbox(props, {socket}) {

    //const [name, setName] = useState('');
    //const [room, setRoom] = useState('');
    //const [users, setUsers] = useState('');
    const [message, setMessage] = useState(''); //store message in the input bar.
    const [messages, setMessages] = useState([]);   //store chat history.
 
    useEffect(() => {
        console.log('trigger rerender');
        socket = io({autoConnect : false});
        console.log('trigger useEffect1');
        const { name, room } = { name: props.name, room: props.room }

        socket.emit("join", { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        })

        return () => {
            //socket.emit("disconnect");
            //socket.off();
        }

    }, [socket, props.name, props.room]);

    useEffect(() => {
        console.log('trigger useEffect2');
        /**
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });
         
         */
        
        /**
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
         */
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            //socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <>
            <StatusBar name={props.name} room={props.room} />
            <Messagesbox messages={messages} name={props.name} />
            <InputBar message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </>
    )
}

export default Chatbox;