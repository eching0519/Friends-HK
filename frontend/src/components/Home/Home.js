import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { io } from 'socket.io-client';

import Chatbox from "./Chatbox/Chatbox";
import Sidebar from "./Sidebar/Sidebar";
import FriendMatch from "../FriendMatch/FriendMatch";

import './Home.css';

const UserContext = React.createContext('some name');

//let socket;
function Home(props) {
    let navigate = useNavigate();
    //const socket = io('/');
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('Peter');
    const [logout, setLogout] = useState(false);
    const [currentPage, setCurrentPage] = useState('chat')

    useEffect(() => {
        //setSocket(io()); //estiblish socket io connection

        console.log('home component just mount');
        if (!localStorage.token || !sessionStorage.token) {
            //navigate("/");  // back to login page if there is no valid session token
        }
    }, []);

    const logoutRequest = async () => {
        //let res = await fetch('/user/logout');
    }

    let pageplaceholder;
    if (currentPage === 'chat') {
        pageplaceholder =
            <>
                <div className="col-md-3 mx-auto sidebar-fragment">
                    <Sidebar setRoom={setRoom} />
                </div>
                <div className="vh-100 col-md-9 mx-auto chatbox-fragment">
                    {userName !== '' && room !== '' ?
                        <div>
                            <Chatbox userName={userName} room={room} />
                        </div>
                        : <h1>Select a group to get start.</h1>}

                </div>
            </>
    }

    if (currentPage === 'matchFriends') {
        pageplaceholder =
            <>
                <div className="">
                    <FriendMatch userName={userName}/>

                </div>
            </>
    }

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">username:{useContext(UserContext)}</a>
                    <Link className="btn btn-primary" to='/' onClick={
                        () => {
                            //socket.disconnect();
                            //logoutRequest();
                            console.log('logout...');
                        }
                    }>Logout</Link>

                    <button className="btn btn-secondary" onClick={() => {
                        setCurrentPage('chat')
                    }}>Chat</button>
                    <button className="btn btn-secondary" onClick={() => {
                        setCurrentPage('matchFriends')
                    }}>Match Friends</button>

                    <button className="btn btn-primary" onClick={() => {
                        setUserName('Peter')
                    }}>set name as Peter</button>
                    <button className="btn btn-primary" onClick={() => {
                        setUserName('Mary')
                    }}>set name as Mary</button>
                    <button className="btn btn-primary" onClick={() => {
                        setUserName('Isaac')
                    }}>set name as Isaac</button>
                </div>

            </nav>

            <div className="row w-100 mx-0">
                    {pageplaceholder}


            </div>


        </>
    )
}

export default Home;