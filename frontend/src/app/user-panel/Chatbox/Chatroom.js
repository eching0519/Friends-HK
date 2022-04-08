import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';
import Chatbox from "./Chatbox";
import Sidebar from '../Sidebar/Sidebar'

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const Chatrooms = (props) => {
    // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('UserProfile')))
    const [user, setUser] = useState(props.user);
    const [selectedRoomUserName, setSelectedRoomUserName] = useState(null);
    const [selectedRoomUserId, setSelectedRoomUserId] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState('');   //store current room id
    const [roomName, setRoomName] = useState('');
    const [messageList, setmessageList] = useState([]);   //store all message.
    const [systemMessage, setSystemMessage] = useState('');

    // Function from Sidebar
    const [groupChatList, setGroupChatList] = useState(null);
    const [friendChatList, setFriendChatList] = useState(null);
    let chatList = [];

    // let chatroomList = {};
    const [chatroomList, setChatroomList] = useState({});
    const getChatroomlistSocketio = (id) => {
        //console.log('user id:', id);
        socket.emit("getChatRoomList", id, (data) => {
            console.log(data)
            setGroupChatList(data.chatroom);
            setFriendChatList(data.friendChatroom);
        });
    };

    useEffect(() => {
        console.log('home component just mount');
        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    useEffect(() => {
        console.log("socket useEffect")
        setmessageList([]);
        // props.getChatRoomsocketio(roomId);

        let userName = props.user.name;

        // for (let i = 0; i < chatList.length; i++) {
        //     socket.emit("joinRoom", { userId: user.id, name: user.name, roomId: chatList[i]._id });
        // }

        socket.on("message", (message) => {
            console.log('client recieve:', message)
            setmessageList([...messageList, message]);    //add message to message list
        });

        socket.on("systemMessage", (message) => {
            console.log("from system:", message)
            setSystemMessage(message);
        });

        return () => {
            for (let i = 0; i < chatList.length; i++) {
                socket.emit("leaveRoom", { name: userName, roomId: chatList[i]._id });
                socket.removeAllListeners();
            }
        }
    }, [socket]);   //trigger useEffect if room changed from sidebar

    useEffect(() => {
        socket.on("message", (message) => {
            setmessageList([...messageList, message]);
        });
    });

    useEffect(() => {
        if (user.id !== '') {
            getChatroomlistSocketio(user.id);
        }
    }, [user])  //when user id changed, fetch chat room list from server.


    // handle chat list
    useEffect(() => {
        if (groupChatList === null || friendChatList === null) return
        groupChatList.forEach(chatroom => {
            setChatroomList(prevList => ({...prevList, [chatroom._id]: (<Chatbox 
                                                                            chatRoom={chatroom} 
                                                                            user={props.user} 
                                                                            systemMessage={systemMessage} 
                                                                            setSystemMessage={setSystemMessage}
                                                                            sendMessageBySocket={sendMessageBySocket} />)}))
        });
        if (groupChatList === null || friendChatList === null) return

        // chatList = [...Object.values(groupChatList), ...Object.values(friendChatList)];
        friendChatList.forEach(chatroom => {
            setChatroomList(prevList => ({...prevList, [chatroom._id]: (<Chatbox 
                                                                            chatRoom={chatroom} 
                                                                            user={props.user} 
                                                                            systemMessage={systemMessage} 
                                                                            setSystemMessage={setSystemMessage}
                                                                            sendMessageBySocket={sendMessageBySocket} />)}))
        });
        if (groupChatList === null || friendChatList === null) return
        chatList = [...Object.values(groupChatList), ...Object.values(friendChatList)];
        startSocketFunction();

    }, [groupChatList, friendChatList, user.id]);

    const startSocketFunction = () => {
        for (let i = 0; i < chatList.length; i++) {
            socket.emit("joinRoom", { userId: user.id, name: user.name, roomId: chatList[i]._id });
        }
    }

    const sendMessageBySocket = (roomId, message, senderId, timeElapse, callback) => {
        socket.emit('sendMessage', roomId, { message: message, senderId, timeElapse }, callback);
    }
    // useEffect(() => {
    //     if (friendChatList === null) return
    //     friendChatList.forEach(chatroom => {
    //         setChatroomList(prevList => ({...prevList, [chatroom._id]: (<Chatbox chatRoom={chatroom} user={props.user} systemMessage={systemMessage} setSystemMessage={setSystemMessage} />)}))
    //     });
    //     if (groupChatList === null || friendChatList === null) return
    //     chatList = [...Object.values(groupChatList), ...Object.values(friendChatList)];
    // }, [friendChatList])


    // Select chatroom
    const [chatbox, setChatbox] = useState(null);

    useEffect(() => {
        // // if (Object.values(chatroomList).length === 0) return
        // if (!(selectedRoomId in chatroomList)) return
        // // setChatbox(chatroomList[selectedRoomId]);
        // let chatList = Object.assign({}, groupChatList, friendChatList)
        // console.log(chatList)
        // setChatbox(<Chatbox chatRoom={chatList[selectedRoomId]} user={props.user} />)
        // console.log(chatroomList)
        // console.log(chatroomList[selectedRoomId]);
        // console.log("selectedRoomId", selectedRoomId)
        // console.log("chatbox", chatbox)

        console.log({...chatroomList[selectedRoomId]})
        // setChatbox(chatroomList[selectedRoomId]);
        // setChatbox(prev => {return chatroomList[selectedRoomId]})
        setChatbox(chatroomList[selectedRoomId])
        
        console.log("ChatroomList", chatroomList[selectedRoomId]);
    }, [selectedRoomId])

    useEffect(() => {
        console.log("chatbox", chatbox);
    }, [chatbox]);

    // // Chatbox
    // if (selectedRoomId !== '') {
    //     chatbox = chatroomList[selectedRoomId];
    // } else {
    // }

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
                    {/* chatbox */}
                    {selectedRoomId != ''?  
                        Object.entries(chatroomList).map(([roomId, value]) => {
                            if (selectedRoomId == roomId) return <>{value}</>
                        })
                     : (<>
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
                    </>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Chatrooms;