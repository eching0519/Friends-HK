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
    const [currentPage, setCurrentPage] = useState('matchFriends');
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

    let pageplaceholder;    //placeholder for chatbox or friend match

    if (currentPage === 'chat') {
        pageplaceholder = <Chatbox userName={userName} userId={userId} roomId={roomId} roomName={roomName} selectedRoomUserId={selectedRoomUserId} selectedRoomUserName={selectedRoomUserName} />;
    }

    if (currentPage === 'matchFriends') {
        pageplaceholder = <FriendMatch userId={userId} userName={userName} setCurrentPage={setCurrentPage} setRoomId={setRoomId} />;
    }


    return (
        <div className="row">
            <Sidebar setSelectedRoomUserName={setSelectedRoomUserName} setSelectedRoomUserId={setSelectedRoomUserId} userId={userId} setRoomId={setRoomId} setRoomName={setRoomName} setCurrentPage={setCurrentPage} setmessageList={setmessageList} />

            <div className="col-md-9 grid-margin stretch-card">
                <div className='w-100'>
                    {pageplaceholder}
                </div>
            </div>
        </div>
    );
}

export default Home;