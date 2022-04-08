import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier';
import Chatbox from './Chatbox/Chatbox';
import Sidebar from './Sidebar/Sidebar';
import FriendMatch from './FriendMatch/FriendMatch';

const Home = (props) => {
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    console.log(props)
    console.log(props.page)
    // const [currentPage, setCurrentPage] = useState(props.page == null ? 'matchFriends' : props.page);
    const [messageList, setmessageList] = useState([]);   //store all message.
    const [selectedRoomUserId, setSelectedRoomUserId] = useState(null);
    const [selectedRoomUserName, setSelectedRoomUserName] = useState(null);

    useEffect(() => {
        LoginVerifier(props);   //verify user session when Home component rendered
    }, [props.name]);

    useEffect(() => {
        console.log('home component just mount');
        setUserName(JSON.parse(sessionStorage.getItem('UserProfile')).name);    //get user profile name.
        setUserId(JSON.parse(sessionStorage.getItem('UserProfile')).id);
    }, []);

    let chatbox;
    if (roomId !== '') {
        chatbox = <Chatbox userName={userName} userId={userId} roomId={roomId} roomName={roomName} selectedRoomUserId={selectedRoomUserId} selectedRoomUserName={selectedRoomUserName} />;
    } else {
        chatbox = (<>
            <div className="card card-fit-screen">
                <div className='card-body'>
                    <div className='chatroom-homepage'>
                        <div>
                            <div className="brand-logo">
                                <img src={require("../../assets/images/logo.svg")} alt="logo" />
                            </div>
                            <span className='display-5'>Select an existing chatroom or <a href='#' onClick={(e) => { e.preventDefault(); props.setCurrentPage('matchFriends'); }}>Meet New Friends Here</a>!</span>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }

    let pageplaceholder;    //placeholder for chatbox or friend match

    if (props.currentPage === 'chat') {
        pageplaceholder = 
            <div className="row">
                <Sidebar setSelectedRoomUserName={setSelectedRoomUserName} setSelectedRoomUserId={setSelectedRoomUserId} userId={userId} setRoomId={setRoomId} setRoomName={setRoomName} setCurrentPage={props.setCurrentPage} setmessageList={setmessageList} />

                <div className="col-md-9 grid-margin stretch-card">
                    <div className='w-100'>
                        {chatbox}
                    </div>
                </div>
            </div>
    }

    if (props.currentPage === 'matchFriends') {
        pageplaceholder = <FriendMatch userId={userId} userName={userName} setCurrentPage={props.setCurrentPage} setRoomId={setRoomId} />;
    }

    return pageplaceholder;
}

export default Home;