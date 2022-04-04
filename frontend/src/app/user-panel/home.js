import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier';
import Chatbox from './Chatbox/Chatbox';
import Sidebar from './Sidebar/Sidebar';
import FriendMatch from './FriendMatch/FriendMatch';

const Home = (props) => {
    LoginVerifier(props);

    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [logout, setLogout] = useState(false);
    const [currentPage, setCurrentPage] = useState('matchFriends');

    useEffect(() => {
        console.log('home component just mount');
        setUserName(JSON.parse(sessionStorage.getItem('UserProfile')).name);
    }, []);

    let pageplaceholder;

    if (currentPage === 'chat') {
        pageplaceholder = <Chatbox userName={userName} roomId={roomId} roomName={roomName} />;
    }

    if (currentPage === 'matchFriends') {
        pageplaceholder = <FriendMatch userName={userName} setCurrentPage={setCurrentPage}/>;
    }


    return (
        <div className="row">
            <div className="col-md-3 grid-margin">
                <div className="card">
                    <div className="bottonlist preview-list">
                        <button className="btn btn-light" onClick={() => {setCurrentPage('matchFriends')}}>Find new friends</button>
                        <Sidebar setRoomId={setRoomId} setRoomName={setRoomName} setCurrentPage={setCurrentPage}/>
                    </div>
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