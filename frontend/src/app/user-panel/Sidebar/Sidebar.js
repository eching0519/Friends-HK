import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { io } from 'socket.io-client';

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const Sidebar = (props) => {
    const [chatroomlist, setChatroomlist] = useState(null);

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
        console.log(chatroomlist);  //DEBUG
    }, [chatroomlist]);

    useEffect(() => {
        if (props.userId !== '') {
            getChatroomlistSocketio(props.userId);
        }
    }, [props.userId])  //when user id changed, fetch chat room list from server.

    const getChatroomlistSocketio = (id) => {
        //console.log('user id:', id);
        let chatlist;
        socket.emit("getChatRoomList", id, (data) => {
            chatlist = data;
            setChatroomlist(chatlist);
            
        });
    };

    const renderChatroomlist = () => {
        let divArr = [];
        if (chatroomlist !== null) {
            chatroomlist.forEach((element, index) => {
                let button = <a key={index} href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e) => {
                    e.preventDefault();
                    props.setSelectedRoomUserId(element.users);
                    props.setSelectedRoomUserName(element.name);
                    props.setmessageList(element.chatbox);
                    props.setRoomName(element.name);
                    props.setRoomId(element._id);
                    props.setCurrentPage('chat');
                    //props.setMessagelist()
                    //props.setName('Peter');
                    console.log('selected room: ', element.name);
                }}>
                    <span className={'font-weight-bold'}><i className="mdi mdi-logout mr-2 text-primary h3"></i>{element.name}</span>
                </a>;
                divArr.push(button);
            });
        } else {
            return <h2>Loading...</h2>
        }
        return divArr;
    };

    return (
        <>
            <div className="bottonlist preview-list">
                <button className="btn btn-light" onClick={() => { props.setCurrentPage('matchFriends') }}><i className="mdi mdi-account-multiple mr-2 text-primary h3"></i>Find new friends</button>
                <button className="btn btn-light" onClick={() => { /* getChatroomlistSocketio() */ }}>DEBUG: get friends list</button>
            </div>

            <Tabs fill justify defaultActiveKey="chatroomlist" id="sidebar-func-tab" className="">
                <Tab eventKey="chatroomlist" title="Chat Room" className="">
                    {renderChatroomlist()}
                </Tab>
                <Tab eventKey="frinedlist" title="Friends" className="">
                    <div className="bottonlist preview-list">
                        <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e) => {
                            e.preventDefault();
                            props.setRoomName('Room1');
                            props.setRoomId('sdfsdfas3');
                            props.setCurrentPage('chat');
                            //props.setName('Peter');
                            console.log('selected room: PeterRoom1');
                        }}>
                            <span className={'font-weight-bold'}><i className="mdi mdi-logout mr-2 text-primary h3"></i>Peter</span>
                        </a>

                        <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e) => {
                            e.preventDefault();
                            props.setRoomName('Room2');
                            props.setRoomId('sdf9845ty8g3');
                            props.setCurrentPage('chat');
                            //props.setName('Mary');
                            console.log('selected room: MaryRoom1');

                        }}>
                            <i className="mdi mdi-logout mr-2 text-primary h3"></i><span className={'font-weight-bold'}>Mary</span>
                        </a>
                    </div>
                </Tab>
            </Tabs>
        </>
    )
}

export default Sidebar;