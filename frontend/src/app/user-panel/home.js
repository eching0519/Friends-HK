import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier'
import Chatbox from './Chatbox/Chatbox';
import Sidebar from './Sidebar/Sidebar';
import FriendMatch from './FriendMatch/FriendMatch';

const Home = (props) => {
    LoginVerifier(props)

    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('Peter');
    const [logout, setLogout] = useState(false);
    const [currentPage, setCurrentPage] = useState('matchFriends');

    useEffect(() => {
        //setSocket(io()); //estiblish socket io connection

        console.log('home component just mount');
        //if (!localStorage.token || !sessionStorage.token) {
            //navigate("/");  // back to login page if there is no valid session token
        //}
    }, []);

    let pageplaceholder;

    if (currentPage === 'chat') {
        pageplaceholder = <Chatbox userName={userName} room={room} />;
    }

    if (currentPage === 'matchFriends') {
        pageplaceholder = <FriendMatch userName={userName} />;
    }


    return (
        <div className="row">
            <div className="col-md-3 grid-margin">
                <div className="card">
                    <div className="bottonlist preview-list">
                        <button className="btn btn-light" onClick={() => {setCurrentPage('matchFriends')}}>Find new friends</button>
                        <Sidebar setRoom={setRoom} setCurrentPage={setCurrentPage}/>
                    </div>
                </div>
            </div>

            <div className="col-md-9 grid-margin stretch-card">
                <div className='w-100'>
                    <div className="card">
                        <div className="card-body">
                            {pageplaceholder}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home