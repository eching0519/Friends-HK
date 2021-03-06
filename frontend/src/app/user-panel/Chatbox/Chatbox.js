import React, { useEffect, useState, useContext } from "react";
// import { io } from 'socket.io-client';

import StatusBar from './StatusBar/StatusBar';
import Messagesbox from './MessagesBox/MessagesBox';
import InputBar from './InputBar/InputBar';
import WRUgame from "../WRUgame/WRUgame";
import SocketContext from "../../SocketContext";

import $ from 'jquery';

import ChatSocketContext from './Chatroom'
// const socket = io({ //no url: default to localhost:8080
//     autoConnect: false
// });

const Chatbox = (props) => {
    const socket = useContext(SocketContext);
    
    const [wouldURgame, setWouldURgame] = useState(false);

    const [chatRoom, setChatRoom] = useState(null);
    // const [user1Name, setUser1Name] = useState('');
    // const [user2Name, setUser2Name] = useState('');
    const [roomId, setRoomId] = useState('');   //store current room id

    const [roomName, setRoomName] = useState('');   //store current room name

    const [message, setMessage] = useState(''); //store message from the input box.
    const [messageList, setmessageList] = useState([]);   //store all message.
    const [systemMessage, setSystemMessage] = useState('');

   

    useEffect(() => {
        console.log(socket);
        //socket.connect();   //estiblish socket io connection
        // return () => {
        //     socket.removeAllListeners();    //clean up listener
        //     socket.disconnect();    //disconnect socket io connection
        // }
    }, []);

    useEffect(() => {
        if (chatRoom != null) {
            console.log(chatRoom.chatbox);
            setmessageList(chatRoom.chatbox);
        }
    }, [chatRoom]);

    useEffect(() => {
        setmessageList([]);
        getChatRoomsocketio(props.roomId);

        const { userName, roomId } = { userName: props.userName, roomId: props.roomId }   //get names and room id from Sidebar component.
        console.log({ userName, roomId });
        setRoomId(roomId);

        socket.emit("joinRoom", { userId: props.userId, name: props.userName, roomId: props.roomId });  //join room by given room id

        socket.on("message", (message) => { //listen to room message
            console.log('client recieve:', message)
            setmessageList([...messageList, message]);    //add message to message list
        });

        socket.on("systemMessage", (message) => {   //listen to system message
            console.log("from system:", message)
            // setSystemMessage(message);  
            setmessageList([...messageList, message]);
        });

        // return () => {
        //     socket.emit("leaveRoom", { name: userName, roomId: roomId });
        //     socket.removeAllListeners();
        // }
    }, [props.roomId]);   //trigger useEffect if room changed from sidebar

    useEffect(() => {
        if (props.roomId !== '') {
            getChatRoomsocketio(props.roomId);
        }
        if (chatRoom != null) {
            setmessageList(chatRoom.chatbox);
        }

    }, [props.roomId]);

    const getChatRoomsocketio = async (id) => {
        let chatroom;
        socket.emit("getChatRoom", id, (data) => {
            chatroom = data;
            setChatRoom(chatroom)
            console.log(chatroom);
            // console.log(chatRoom);
        });
    };

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
            props.sendMessageBySocket(roomId, message, props.user._id, Date.now(), (message) => {
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
            <div>
                {wouldURgame? <WRUgame userName={props.userName} roomId={props.roomId} setWouldURgame={setWouldURgame} setmessageList={setmessageList}/>: <></>}
            </div>
            <div className="card card-chatbox">
                <div className="card-header bg-white">
                    <StatusBar userName={props.userName} roomId={props.roomId} roomName={props.roomName} />
                    
                </div>
                <div className="card-body bg-white">
                    <Messagesbox systemMessage={systemMessage} messageList={messageList} userName={props.user.name} userId={props.user._id} chatRoom={chatRoom} />
                </div>
                <div className="card-footer bg-white">
                    <InputBar message={message} setMessage={setMessage} sendMessage={sendMessage} setWouldURgame={setWouldURgame}/>
                </div>
                
            </div>
            
            
        </>
    )
}

export default Chatbox;