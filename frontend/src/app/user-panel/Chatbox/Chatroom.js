import React, { useEffect, useState, useContext } from "react";
import { io, Socket } from 'socket.io-client';
import Chatbox from "./Chatbox";
import Sidebar from '../Sidebar/Sidebar';
import $ from 'jquery';
import { createContext } from "react";
import ChatroomBox from "./ChatroomBox";

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});
export const ChatSocketContext = createContext<Socket>(socket);

const Chatrooms = (props) => {
    // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('UserProfile')))
    const [user, setUser] = useState(props.user);
    const [selectedRoomUserName, setSelectedRoomUserName] = useState(null);
    const [selectedRoomUserId, setSelectedRoomUserId] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState('');   //store current room id
    const [roomName, setRoomName] = useState('');
    const [messageList, setmessageList] = useState([]);   //store all message.
    const [systemMessage, setSystemMessage] = useState({});
    // const [systemMessages, setSystemMessages] = useState(null);
    let systemMessages = {};

    // Function from Sidebar
    const [groupChatList, setGroupChatList] = useState(null);
    const [friendChatList, setFriendChatList] = useState(null);
    let chatList = [];
    const [allChatList, setAllChatList] = useState(null);
    useEffect(()=>{if(allChatList) console.log("allChatList", allChatList);}, [allChatList]);

    const [chatroomList, setChatroomList] = useState({});
    const [systemMsgList, setSystemMsgList] = useState({});


    const getChatroomlistSocketio = (id) => {
        //console.log('user id:', id);
        socket.emit("getChatRoomList", id, (data) => {
            console.log(data)
            setGroupChatList(data.chatroom);
            setFriendChatList(data.friendChatroom);
            var jointData = [...data.chatroom, ...data.friendChatroom];
            setAllChatList(Object.assign({}, ...jointData.map((x) => 
                ({[x._id]: x})
            )));
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

        // Get system messages
        socket.on("systemMessage", (message) => {
            console.log("from system:", message)
            let roomId = message.roomId;
            let msg = message.msg;
                

            setSystemMessage(message);
            systemMessages = {...systemMessages, [message.roomId]: {...message.msg}};
            console.log("System message", systemMessages);

            setSystemMsgList(prevList => ({...prevList, [message.roomId]: {...message.msg}}));
            console.log("Get system message (1)")

            // setAllChatList()
        });

        return () => {
            for (let i = 0; i < chatList.length; i++) {
                socket.emit("leaveRoom", { name: userName, roomId: chatList[i]._id });
                socket.removeAllListeners();
            }
        }
    }, [socket]);   //trigger useEffect if room changed from sidebar

    useEffect(() => {
        console.log("System message", systemMsgList);

        if (!allChatList) return
        Object.entries(systemMsgList).map((value, key) => {
            var roomId = value[0];
            var msg = value[1];
            if (allChatList && roomId in allChatList) {
                var targetChatroom = allChatList[roomId];
                setAllChatList({...allChatList, [roomId]: {...targetChatroom, 'chatbox': [...targetChatroom.chatbox, msg]}});
            }
        });
    }, [systemMsgList]);

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
            // console.log(chatroom)
            setChatroomList(prevList => ({...prevList, [chatroom._id]: <Chatbox 
                                                                            chatRoom={chatroom} 
                                                                            socket={socket}
                                                                            user={props.user} 
                                                                            systemMessage={systemMessage} 
                                                                            // setSystemMessage={setSystemMessage}
                                                                            sendMessageBySocket={sendMessageBySocket}
                                                                            // systemMsgList={systemMsgList} 
                                                                            />}))
        });
        if (groupChatList === null || friendChatList === null) return

        // chatList = [...Object.values(groupChatList), ...Object.values(friendChatList)];
        friendChatList.forEach(chatroom => {
            setChatroomList(prevList => ({...prevList, [chatroom._id]: <Chatbox 
                                                                            chatRoom={chatroom} 
                                                                            user={props.user} 
                                                                            systemMessage={systemMessage} 
                                                                            // setSystemMessage={setSystemMessage}
                                                                            sendMessageBySocket={sendMessageBySocket}
                                                                            // systemMsgList={systemMsgList} 
                                                                            />}))
        });
        if (groupChatList === null || friendChatList === null) return
        chatList = [...Object.values(groupChatList), ...Object.values(friendChatList)];
        startSocketFunction();

        console.log("Handle chat list (2)");
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
        if (selectedRoomId === '') return
        setChatbox(chatroomList[selectedRoomId])
        setSystemMessage(systemMessages[selectedRoomId])
        
        console.log("selectedRoomId", chatbox);
        console.log("selectedRoomId", systemMessages[selectedRoomId]);
        console.log("selectedRoomId", systemMessage);
    }, [selectedRoomId])

    useEffect(() => {
        console.log("chatbox", chatbox);
        console.log("systemMessage", systemMessage)
    }, [chatbox]);


    const sendMessage = (message, roomId) => {
        if (message) {
            socket.emit('sendMessage', roomId, { message: message, senderId: props.user.id, timeElapse: Date.now() }, (message) => {
                console.log('message delivered:', message);
            });
        }
    }

    return (
        <div className="row">
            <Sidebar setSelectedRoomUserName={setSelectedRoomUserName} 
                     setSelectedRoomUserId={setSelectedRoomUserId} 
                     setSelectedRoomId={setSelectedRoomId} 
                     userId={user.id} 
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
                        // Object.entries(chatroomList).map(([roomId, value]) => {
                            // if (selectedRoomId == roomId) 
                                // return <>{value}</>
                        // })
                        <ChatroomBox chatroomList={allChatList}
                                                user={props.user}
                                                sendMessage={sendMessage} />
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