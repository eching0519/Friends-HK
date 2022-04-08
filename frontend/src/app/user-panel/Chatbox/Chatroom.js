import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';
import Chatbox from "./Chatbox";
import Sidebar from '../Sidebar/Sidebar'

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const Chatrooms = (props) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('UserProfile')))
    const [selectedRoomUserName, setSelectedRoomUserName] = useState(null);
    const [selectedRoomUserId, setSelectedRoomUserId] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState('');   //store current room id
    const [roomName, setRoomName] = useState('');
    const [messageList, setmessageList] = useState([]);   //store all message.

    useEffect(() => {
        console.log('home component just mount');
        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    useEffect(() => {
        return () => {
            socket.removeAllListeners();
        }
    }, [socket]);   //trigger useEffect if room changed from sidebar

    useEffect(() => {
        if (user.id !== '') {
            getChatroomlistSocketio(user.id);
        }
    }, [user])  //when user id changed, fetch chat room list from server.

    // Function from Sidebar
    const [groupChatList, setGroupChatList] = useState(null);
    const [friendChatList, setFriendChatList] = useState(null);

    const getChatroomlistSocketio = (id) => {
        //console.log('user id:', id);
        socket.emit("getChatRoomList", id, (data) => {
            console.log(data)
            setGroupChatList(data.chatroom);
            setFriendChatList(data.friendChatroom);
        });
    };

    // Chatbox
    let chatbox;
    if (selectedRoomId !== '') {
        chatbox = <Chatbox userName={user.name} 
                           userId={user.id} 
                           roomId={selectedRoomId} 
                           roomName={roomName} 
                           selectedRoomUserId={selectedRoomUserId} 
                           selectedRoomUserName={selectedRoomUserName} />;
    } else {
        chatbox = (<>
            <div className="card card-fit-screen">
                <div className='card-body'>
                    <div className='chatroom-homepage'>
                        <div>
                            <div className="brand-logo">
                                <img src={require("../../../assets/images/logo.svg")} alt="logo" />
                            </div>
                            <span className='display-5'>Select an existing chatroom or <a href='#' onClick={(e) => { e.preventDefault(); props.setCurrentPage('matchFriends'); }}>Meet New Friends Here</a>!</span>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }

    return (
        <div className="row">
            <Sidebar setSelectedRoomUserName={setSelectedRoomUserName} 
                     setSelectedRoomUserId={setSelectedRoomUserId} 
                     userId={user.id} 
                     setSelectedRoomId={setSelectedRoomId} 
                     setRoomName={setRoomName} 
                     setCurrentPage={props.setCurrentPage} 
                     setmessageList={setmessageList} 
                     getChatroomlistSocketio={getChatroomlistSocketio}
                     groupChatList={groupChatList}
                     friendChatList={friendChatList} />

            <div className="col-md-9 grid-margin stretch-card">
                <div className='w-100'>
                    {chatbox}
                </div>
            </div>
        </div>
    );
}

export default Chatrooms;