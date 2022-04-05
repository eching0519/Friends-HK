import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier';
import Chatbox from './Chatbox/Chatbox';
import Sidebar from './Sidebar/Sidebar';
import FriendMatch from './FriendMatch/FriendMatch';

const Home = (props) => {
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [logout, setLogout] = useState(false);
    const [currentPage, setCurrentPage] = useState('matchFriends');

    useEffect(() => {
        LoginVerifier(props);   //verify user session when Home component rendered
    }, [props.name]);

    useEffect(() => {
        console.log('home component just mount');
        setUserName(JSON.parse(sessionStorage.getItem('UserProfile')).name);    //get user profile name.
    }, []);

    let pageplaceholder;    //placeholder for chatbox or friend match

    if (currentPage === 'chat') {
        pageplaceholder = <Chatbox userName={userName} roomId={roomId} roomName={roomName} />;
    }

    if (currentPage === 'matchFriends') {
        pageplaceholder = <FriendMatch userName={userName} setCurrentPage={setCurrentPage} />;
    }


    return (
        <div className="row">
            <div className="col-md-3 grid-margin">
                <div className="card">
                    <Sidebar setRoomId={setRoomId} setRoomName={setRoomName} setCurrentPage={setCurrentPage} />
                </div>
            </div>

            <div className="col-md-9 grid-margin stretch-card">
                <div className='w-100'>
                    {pageplaceholder}
                </div>
            </div>
        </div>
    );
}

export default Home;