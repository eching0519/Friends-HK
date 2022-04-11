import React, { useEffect, useState, useContext } from 'react';
// import Chatbox from './Chatbox/Chatbox';
// import Sidebar from './Sidebar/Sidebar';
import FriendMatch from './FriendMatch/FriendMatch';
// import Chatroom from './Chatroom';
import Chatrooms from './Chatbox/Chatroom';
import SocketContext from '../SocketContext'

import { io } from 'socket.io-client';

// const socket = io({ //no url: default to localhost:8080
//     autoConnect: false
// });

const Home = (props) => {
    const socket = useContext(SocketContext);
    const [preSelectedRoomId, setPreSelectedRoomId] = useState(''); //friends match component store new room ID in this state and pass it to chatroom component
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        console.log('Home component mounted, load required infomation');
        setUserName(JSON.parse(sessionStorage.getItem('UserProfile')).name);    //get user profile name.
        setUserId(JSON.parse(sessionStorage.getItem('UserProfile')).id);
        socket.connect(); //estiblish socket io connection

        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    let pageplaceholder;    //placeholder for chatbox or friend match

    if (props.currentPage === 'chat') {
        // console.log("Chat")
        pageplaceholder = <Chatrooms setCurrentPage={props.setCurrentPage} user={props.user} />
    }

    if (props.currentPage === 'matchFriends') {
        // console.log("MatchFriends")
        pageplaceholder = <FriendMatch userId={userId} userName={userName} setCurrentPage={props.setCurrentPage} setRoomId={setRoomId} user={props.user} />;
    }

    return (
        <>
            {/* <SocketContext.Provider value={socket}> */}
                {pageplaceholder}
            {/* </SocketContext.Provider> */}
        </>
    );
}

export default Home;