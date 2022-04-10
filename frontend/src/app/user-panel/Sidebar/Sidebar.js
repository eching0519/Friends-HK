import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { io } from 'socket.io-client';
import Spinner from '../../shared/Spinner';
import SocketContext from '../../SocketContext';

/* const socket = io({ //no url: default to localhost:8080
    autoConnect: false
}); */

const Sidebar = (props) => {
    var spinner = <div class="inline-spinner-wrapper h3"><div class="spinner-border spinner-border text-muted"></div> Loading..</div>;
    const [chatroomlist, setChatroomlist] = useState(spinner);
    const [friendChatroomlist, setFriendChatroomlist] = useState(spinner);

    useEffect(() => {
        // socket.connect();   //estiblish socket io connection
        // return () => {
        //     socket.removeAllListeners();    //clean up listener
        //     socket.disconnect();    //disconnect socket io connection
        // }
    }, []);

    // useEffect(() => {
        // return () => {
        //     socket.removeAllListeners();
        // }
    // }, [socket]);   //trigger useEffect if room changed from sidebar

    // DEBUG
    useEffect(() => { console.log(props.groupChatList); }, [props.groupChatList]);

    useEffect(() => {
        if (props.chatroomList == null) return;

        let chatSidebarArr = [];
        let fdSidebarArr = [];
        let item;
        let chatroomList = Object.values(props.chatroomList);
        chatroomList.sort((a, b) => {
            var lastupdate_a = 0;
            var lastupdate_b = 0;
            if (a.chatbox.length > 0) lastupdate_a = a.chatbox.at(-1).timeElapse;
            if (b.chatbox.length > 0) lastupdate_b = b.chatbox.at(-1).timeElapse;
            return lastupdate_b - lastupdate_a;
        });
        console.log("sorted", chatroomList)
        chatroomList.forEach((chatroom, index) => {
            if (chatroom.type === 'group') {
                item = <SidebarItem index={chatSidebarArr.length} chatroom={chatroom} setSelectedRoomId={props.setSelectedRoomId} />
                chatSidebarArr.push(item);
            } else {
                item = <SidebarItem index={fdSidebarArr.length} chatroom={chatroom} setSelectedRoomId={props.setSelectedRoomId} />
                fdSidebarArr.push(item);
            }
        });

        setChatroomlist(chatSidebarArr);
        setFriendChatroomlist(fdSidebarArr);

    }, [props.chatroomList]);

    // const renderChatroomlist = () => {
    //     let divArr = [];
    //     if (props.groupChatList != null) {
    //         if (props.groupChatList.length == 0) {
    //             return (<div className='m-4'>You have not joint any chatroom yet.</div>);
    //         }

    //         props.groupChatList.forEach((element, index) => {
    //             console.log("Sidebar", element)
    //             let button = 
    //                 <a key={index} href="!#" className="dropdown-item justify-content-center" 
    //                     onClick={(e) => {
    //                     e.preventDefault();
    //                     props.setmessageList(element.chatbox);
    //                     props.setSelectedRoomId(element._id);
    //                     props.setCurrentPage('chat');
    //                 }}>
    //                     <div className='chatroom-list-content'>
    //                         <div className='font-weight-bold'>{element.name}</div>
    //                         <div className='msgOverview'>{element.chatbox.length === 0? '' : element.chatbox.at(-1).message}</div>
    //                     </div>
    //                     {/* <div>{element.chatbox[-1]}</div> */}
    //                 {/* </span> */}
    //             </a>;
    //             divArr.push(<SidebarItem index={index} chatroom={element} setSelectedRoomId={props.setSelectedRoomId} />);
    //         });
    //     } else {
    //         return <div class="inline-spinner-wrapper h3"><div class="spinner-border spinner-border text-muted"></div> Loading..</div>
    //     }
    //     return divArr;
    // };

    // const renderFriendChatroomlist = () => {
    //     let divArr = [];
    //     if (props.friendChatList != null) {
    //         if (props.friendChatList.length == 0) {
    //             return (<div className='m-4'>Your friend list is empty.</div>);
    //         }

    //         props.friendChatList.forEach((element, index) => {
    //             console.log("Sidebar", element)
    //             let button = 
    //                 <a key={index} href="!#" className="dropdown-item justify-content-center" 
    //                     onClick={(e) => {
    //                     e.preventDefault();
    //                     props.setmessageList(element.chatbox);
    //                     props.setSelectedRoomId(element._id);
    //                     props.setCurrentPage('chat');
    //                 }}>
    //                     <div className='chatroom-list-content'>
    //                         <div className='font-weight-bold'>{element.name}</div>
    //                         <div className='msgOverview'>{element.chatbox.length === 0? '' : element.chatbox.at(-1).message}</div>
    //                     </div>
    //                     {/* <div>{element.chatbox[-1]}</div> */}
    //                 {/* </span> */}
    //             </a>;
    //             divArr.push((<>
    //                 <div className='preview-list tab-bottonlist'>{button}</div>
    //                 <div class="dropdown-divider"></div>
    //             </>));
    //         });
    //     } else {
    //         return <div class="inline-spinner-wrapper h3"><div class="spinner-border spinner-border text-muted"></div> Loading..</div>
    //     }
    //     return divArr;
    // };

    return (
        <>
        <div className="col-md-3 grid-margin">
            <div className="card card-fit-screen">
                <div className='card-body pt-4'>
                    <div className="bottonlist preview-list pb-3">
                        <button className="btn btn-light w-100" onClick={() => { props.setCurrentPage('matchFriends') }}><i className="mdi mdi-account-multiple mr-2 text-primary h3"></i>Meet New Friends!</button>
                    </div>

                    <Tabs fill justify defaultActiveKey="chatroomlist" id="sidebar-func-tab" className="">
                        <Tab eventKey="chatroomlist" title="Chatroom" className="">
                            {chatroomlist}
                            {/* {renderChatroomlist()} */}
                        </Tab>
                        <Tab eventKey="frinedlist" title="Friends" className="">
                            {friendChatroomlist}
                            {/* {renderFriendChatroomlist()} */}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
        </>
    )
}

const SidebarItem = (props) => {
    // index
    // chatroom
    // setSelectedRoomId
    var lastMsg = ''
    if (props.chatroom.chatbox.length > 0) {
        for (let i = props.chatroom.chatbox.length-1; i > 0; i--) {
            if (props.chatroom.chatbox[i].senderId !== 'admin') {
                lastMsg = props.chatroom.chatbox[i].message;
                break;
            }
        }
    }
    
    return (
        <>
            <div className='preview-list tab-bottonlist'>
                <a 
                    key={props.index} 
                    href="!#" className="dropdown-item justify-content-center" 
                    onClick={(e) => {
                    e.preventDefault();
                    props.setSelectedRoomId(props.chatroom._id);
                }}>
                    <div className='chatroom-list-content'>
                        <div className='font-weight-bold'>{props.chatroom.name}</div>
                        <div className='msgOverview'>{lastMsg}</div>
                    </div>
                </a>
            </div>
            <div class="dropdown-divider"></div>
        </>
    )
}

export default Sidebar;