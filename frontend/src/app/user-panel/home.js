import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier';
import Chatbox from './Chatbox/Chatbox';
import Sidebar from './Sidebar/Sidebar';
import FriendMatch from './FriendMatch/FriendMatch';
// import Chatroom from './Chatroom';
import Chatrooms from './Chatbox/Chatroom';

const Home = (props) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        LoginVerifier(props);   //verify user session when Home component rendered
    }, [props.name]);

    useEffect(() => {
        console.log('home component just mount');
        setUserName(JSON.parse(sessionStorage.getItem('UserProfile')).name);    //get user profile name.
        setUserId(JSON.parse(sessionStorage.getItem('UserProfile')).id);
    }, []);

    let pageplaceholder;    //placeholder for chatbox or friend match

    if (props.currentPage === 'chat') {
        pageplaceholder = <Chatrooms setCurrentPage={props.setCurrentPage} />
    }

    if (props.currentPage === 'matchFriends') {
        pageplaceholder = <FriendMatch userId={userId} userName={userName} setCurrentPage={props.setCurrentPage} setRoomId={setRoomId} user={props.user} />;
    }

    return pageplaceholder;
}

export default Home;