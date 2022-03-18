import React, { useEffect, useState } from "react";
import Chatbox from "./Chatbox/Chatbox";
import Sidebar from "./Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";

import './Home.css';

function Home(props) {
    let navigate = useNavigate();

    const [room, setRoom] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="btn btn-primary" to='/' onClick={
                        () => {
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
                    <Chatbox name={name} room={room} />
                </div>

            </div>
        </>
    )
}

export default Home;