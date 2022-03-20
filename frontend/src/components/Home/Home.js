import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import Chatbox from "./Chatbox/Chatbox";
import Sidebar from "./Sidebar/Sidebar";

import './Home.css';

const UserContext = React.createContext('some name');

//let socket;
function Home(props) {
    let navigate = useNavigate();
    //const socket = io('/');
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [logout, setLogout] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io()) //estiblish socket io connection

        console.log('home component just mount');
        if (!localStorage.token || !sessionStorage.token) {
            //navigate("/");  // back to login page if there is no valid session token
        }
    }, []);

    const logoutRequest = async () => {
        //let res = await fetch('/user/logout');
    }

    return (
        <>
            <UserContext.Provider value={'username_test'}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand">username:{useContext(UserContext)}</a>
                        <Link className="btn btn-primary" to='/' onClick={
                            () => {
                                socket.disconnect();
                                logoutRequest();
                                console.log('logout...');
                            }
                        }>Logout</Link>
                    </div>

                </nav>

                <div className="row w-100 mx-0">
                    <div className="col-md-3 mx-auto sidebar-fragment">
                        <Sidebar setRoom={setRoom} setName={setName} />
                    </div>
                    <div className="vh-100 col-md-9 mx-auto chatbox-fragment">
                        {name !== '' && room !== '' ?
                            <div>
                                <Chatbox name={name} room={room} socket={socket} />
                            </div>
                            : <h1>Select a group to get start.</h1>}

                    </div>
                </div>
            </UserContext.Provider>

        </>
    )
}

export default Home;