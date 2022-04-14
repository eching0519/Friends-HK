import React, { useEffect, useState, useContext } from "react";
import { io, Socket } from 'socket.io-client';
// import Chatbox from "./Chatbox";
import Sidebar from '../Sidebar/Sidebar';
import { createContext } from "react";
import ChatroomBox from "./ChatroomBox";
import SocketContext from "../../SocketContext";
// const socket = io({ //no url: default to localhost:8080
//     autoConnect: false
// });

// export const ChatSocketContext = createContext<Socket>(socket);

const Chatrooms = (props) => {
    const socket = useContext(SocketContext);
    const [selectedRoomId, setSelectedRoomId] = useState('');   //store current room id
    const [messageList, setmessageList] = useState([]);   //store all message.

    // Function from Sidebar
    const [loading, setLoading] = useState(true)
    const [groupChatList, setGroupChatList] = useState(null);
    const [friendChatList, setFriendChatList] = useState(null);
    let chatList = [];
    const [allChatList, setAllChatList] = useState(null);
    const [chatroomList, setChatroomList] = useState({});
    const [systemMsgList, setSystemMsgList] = useState({});
    const [incomingMsgList, setIncomingMsgList] = useState({});

    const getChatroomlistSocketio = (id) => {
        socket.emit("getChatRoomList", id, (data) => {
            console.log("getChatRoomList", data)
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
        console.log("getChatRoomList Call")
        getChatroomlistSocketio(props.user._id);

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
        //     socket.emit("joinRoom", { userId: user._id, name: user.name, roomId: chatList[i]._id });
        // }

        socket.on("message", (response) => {
            console.log('client recieve:', response)
            var roomId = response.roomId;
            var message = response.message;
            console.log('client recieve:', roomId, message)
            // // setmessageList([...messageList, message]);    //add message to message list
            // var targetChatroom = allChatList[roomId];
            // setAllChatList({...allChatList, [roomId]: {...targetChatroom, 'chatbox': [...targetChatroom.chatbox, response.message]}});

            // var roomId = response.roomId;
            // var message = response.msg
            var prevChatbox = (roomId in incomingMsgList)? incomingMsgList[roomId] : [];
            setIncomingMsgList(prevList => ({...prevList, [roomId]: [...prevChatbox, message]}));
        });

        // Get system messages
        socket.on("systemMessage", (response) => {
            console.log("from system:", response)

            var roomId = response.roomId;
            var message = response.message
            setSystemMsgList(prevList => ({...prevList, [roomId]: {...message}}));
            console.log("Get system message (1)")

            // setAllChatList()
        });

        return () => {
            for (let i = 0; i < chatList.length; i++) {
                socket.emit("leaveRoom", { name: userName, roomId: chatList[i]._id });
                // socket.removeAllListeners();
            }
        }
    }, [socket]);   //trigger useEffect if room changed from sidebar

    // --- After get all chatroom's data ---
    useEffect(()=>{
        console.log(allChatList)
        if (!allChatList) return
        // Check if the page is loaded before. If yes, no need to set selected room again
        console.log(loading)
        if (!loading) return
        setLoading(false)
        console.log("allChatList", allChatList);
        console.log("allChatList", Object.entries({}));
        console.log("allChatList", );
        if (props.selectedRoomId) {
            setSelectedRoomId(props.selectedRoomId);
        } else {
            if (Object.entries(allChatList).length==0) return
            // Change to the first chatroom
            setSelectedRoomId(Object.entries(allChatList)[0][0]);
        }
    }, [allChatList]);

    // Add the system message to chat list
    useEffect(() => {
        console.log("System message", systemMsgList);

        if (!allChatList) return
        Object.entries(systemMsgList).map((value, key) => {
            var roomId = value[0];
            var msg = value[1];
            if (allChatList && roomId in allChatList) {
                var targetChatroom = allChatList[roomId];
                console.log("System message chatbox", targetChatroom.chatbox)
                setAllChatList({...allChatList, [roomId]: {...targetChatroom, 'chatbox': [...targetChatroom.chatbox, msg]}});
            }
        });
    }, [systemMsgList]);

    useEffect(() => {
        console.log("WUR: All chatroom", allChatList)
    }, [allChatList])

    useEffect(() => {
        if (!allChatList) return
        Object.entries(incomingMsgList).map((value, key) => {
            // console.log("allChatList incoming", value);
            var roomId = value[0];
            var msg = value[1];
            if (allChatList && roomId in allChatList) {
                var targetChatroom = allChatList[roomId];
                setAllChatList({...allChatList, [roomId]: {...targetChatroom, 'chatbox': [...targetChatroom.chatbox, ...msg]}});
            }
        });
    }, [incomingMsgList]);

    // useEffect(() => {
    //     socket.on("message", (message) => {
    //         setmessageList([...messageList, message]);
    //     });
    // });

    // handle chat list
    useEffect(() => {
        if (groupChatList === null || friendChatList === null) return
        chatList = [...Object.values(groupChatList), ...Object.values(friendChatList)];
        startSocketFunction();

    }, [groupChatList, friendChatList, props.user._id]);

    const startSocketFunction = () => {
        for (let i = 0; i < chatList.length; i++) {
            socket.emit("joinRoom", { userId: props.user._id, name: props.user.name, roomId: chatList[i]._id });
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

    // Select Chatroom
    useEffect(() => {
        if (selectedRoomId === '') return
        // setChatbox(chatroomList[selectedRoomId])
    }, [selectedRoomId])

    // useEffect(() => { console.log("chatbox", chatbox); }, [chatbox]);
    useEffect(()=>{if(incomingMsgList) console.log("incomingMsgList", incomingMsgList);}, [incomingMsgList]);


    // Checked
    const sendMessage = (message, roomId) => {
        console.log("sendMessage", message)
        if (message) {
            socket.emit('sendMessage', roomId, { message: message, senderId: props.user._id, timeElapse: Date.now() }, (message) => {
                console.log('message delivered:', message);
            });
        }
    }

    return (
        <div className="row">
            <Sidebar 
                    chatroomList={allChatList}
                    selectedRoomId={selectedRoomId}
                    setSelectedRoomId={setSelectedRoomId} 
                    userId={props.user._id} 
                    setCurrentPage={props.setCurrentPage} 
                    setmessageList={setmessageList} 
                    groupChatList={groupChatList}
                    friendChatList={friendChatList}
                    loading={loading} />

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
                                                setUser={props.setUser}
                                                sendMessage={sendMessage}
                                                selectedRoomId={selectedRoomId}
                                                setSystemMsgList={setSystemMsgList}
                                                setAllChatList={setAllChatList} />
                     : (<>
                        <div className="card card-fit-screen">
                            <div className='card-body'>
                                <div className='chatroom-homepage'>
                                    <div>
                                        <div className="brand-logo">
                                            <img src={require("../../../assets/images/logo.svg")} alt="logo" />
                                        </div>
                                        <span className='display-5'>Select an existing chatroom or <a href='/home'>Meet New Friends Here</a>!</span>
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