import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { io } from 'socket.io-client';
import Spinner from '../../shared/Spinner';

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
            console.log(data)
            setChatroomlist(chatlist);
            
        });
    };

    const renderChatroomlist = () => {
        let divArr = [];
        if (chatroomlist !== null) {
            if (chatroomlist.length == 0) {
                return (<div className='m-4'>You have not joint any chatroom yet.</div>);
            }

            chatroomlist.forEach((element, index) => {
                let button = <a key={index} href="!#" 
                                     className="dropdown-item d-flex justify-content-center" 
                                     onClick={(e) => {
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
                    {/* <span className={'font-weight-bold'}> */}
                        <span className='font-weight-bold'>{element.name}</span>
                    {/* </span> */}
                </a>;
                divArr.push((<div className='preview-list tab-bottonlist'>{button}</div>));
            });
        } else {
            return <div class="inline-spinner-wrapper"><div class="spinner-border"></div></div>
        }
        return divArr;
    };

    return (
        <>
        <div className="col-md-3 grid-margin">
            <div className="card">
                <div className='card-body'>
                    <div className="bottonlist preview-list">
                        <button className="btn btn-light w-100" onClick={() => { props.setCurrentPage('matchFriends') }}><i className="mdi mdi-account-multiple mr-2 text-primary h3"></i>Find new friends</button>
                    </div>

                    <Tabs fill justify defaultActiveKey="chatroomlist" id="sidebar-func-tab" className="">
                        <Tab eventKey="chatroomlist" title="Chatroom" className="">
                            {renderChatroomlist()}
                        </Tab>
                        <Tab eventKey="frinedlist" title="Friends" className="">
                            <div className="preview-list tab-bottonlist">
                                <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e) => {
                                    e.preventDefault();
                                    props.setRoomName('Room1');
                                    props.setRoomId('sdfsdfas3');
                                    props.setCurrentPage('chat');
                                    //props.setName('Peter');
                                    console.log('selected room: PeterRoom1');
                                }}>
                                    <span className={'font-weight-bold'}>Peter</span>
                                </a>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar;