import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import $ from 'jquery'

/* const socket = io({ //no url: default to localhost:8080
    autoConnect: false
}); */

const Sidebar = (props) => {
    const spinner = <div class="inline-spinner-wrapper h3"><div class="spinner-border spinner-border text-muted"></div> Loading..</div>;
    const [chatroomlist, setChatroomlist] = useState([]);
    const [friendChatroomlist, setFriendChatroomlist] = useState([]);

    useEffect(() => {
        // socket.connect();   //estiblish socket io connection
        // return () => {
        //     socket.removeAllListeners();    //clean up listener
        //     socket.disconnect();    //disconnect socket io connection
        // }
    }, []);

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

    // Change tab if selectedRoomId is changed
    useEffect(() => {
        if (!props.selectedRoomId) return;
        if (chatroomlist !== [] && chatroomlist.includes(props.selectedRoomId)) {
            $("sidebar-func-tab-tab-chatroomlist").attr("aria-selected", "true")
        }
        if (friendChatroomlist !== [] && friendChatroomlist.includes(props.selectedRoomId)) {
            $("sidebar-func-tab-tab-frinedlist").attr("aria-selected", "true")
        }
    }, [props.selectedRoomId])

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
                            {props.loading && spinner}
                            {!props.loading && chatroomlist.length == 0? <div className='m-4'>You have not joint any chatroom yet.</div> : chatroomlist}
                            {/* {renderChatroomlist()} */}
                        </Tab>
                        <Tab eventKey="frinedlist" title="Friends" className="">
                            {props.loading && spinner}
                            {!props.loading && friendChatroomlist.length == 0? <div className='m-4'>Your friend list is empty.</div>: friendChatroomlist}
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