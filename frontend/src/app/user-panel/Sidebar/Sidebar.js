import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { io } from 'socket.io-client';
import Spinner from '../../shared/Spinner';

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const Sidebar = (props) => {

    useEffect(() => {
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
        console.log(props.groupChatList);  //DEBUG
    }, [props.groupChatList]);

    const renderChatroomlist = () => {
        let divArr = [];
        if (props.groupChatList !== null) {
            if (props.groupChatList.length == 0) {
                return (<div className='m-4'>You have not joint any chatroom yet.</div>);
            }

            props.groupChatList.forEach((element, index) => {
                console.log("Sidebar", element)
                let button = 
                    <a key={index} href="!#" className="dropdown-item justify-content-center" 
                        onClick={(e) => {
                        e.preventDefault();
                        props.setmessageList(element.chatbox);
                        props.setSelectedRoomId(element._id);
                        props.setCurrentPage('chat');
                    }}>
                        <div className='chatroom-list-content'>
                            <div className='font-weight-bold'>{element.name}</div>
                            <div className='msgOverview'>{element.chatbox.length === 0? '' : element.chatbox.at(-1).message}</div>
                        </div>
                        {/* <div>{element.chatbox[-1]}</div> */}
                    {/* </span> */}
                </a>;
                divArr.push((<>
                                <div className='preview-list tab-bottonlist'>{button}</div>
                                <div class="dropdown-divider"></div>
                            </>));
            });
        } else {
            return <div class="inline-spinner-wrapper h3"><div class="spinner-border spinner-border text-muted"></div> Loading..</div>
        }
        return divArr;
    };

    const renderFriendChatroomlist = () => {
        let divArr = [];
        if (props.friendChatList !== null) {
            if (props.friendChatList.length == 0) {
                return (<div className='m-4'>Your friend list is empty.</div>);
            }

            props.friendChatList.forEach((element, index) => {
                console.log("Sidebar", element)
                let button = 
                    <a key={index} href="!#" className="dropdown-item justify-content-center" 
                        onClick={(e) => {
                        e.preventDefault();
                        props.setmessageList(element.chatbox);
                        props.setSelectedRoomId(element._id);
                        props.setCurrentPage('chat');
                    }}>
                        <div className='chatroom-list-content'>
                            <div className='font-weight-bold'>{element.name}</div>
                            <div className='msgOverview'>{element.chatbox.length === 0? '' : element.chatbox.at(-1).message}</div>
                        </div>
                        {/* <div>{element.chatbox[-1]}</div> */}
                    {/* </span> */}
                </a>;
                divArr.push((<>
                    <div className='preview-list tab-bottonlist'>{button}</div>
                    <div class="dropdown-divider"></div>
                </>));
            });
        } else {
            return <div class="inline-spinner-wrapper h3"><div class="spinner-border spinner-border text-muted"></div> Loading..</div>
        }
        return divArr;
    };

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
                            {renderChatroomlist()}
                        </Tab>
                        <Tab eventKey="frinedlist" title="Friends" className="">
                            {renderFriendChatroomlist()}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar;