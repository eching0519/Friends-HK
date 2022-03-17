import React from "react";
import Chatbox from "../Chatbox/Chatbox";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";

import './Home.css';

function Home(props) {
    let navigate = useNavigate();
    if (props.token == null) {
        //navigate('/');
    }
    return (
        <>
            <h1>Chat</h1>
            <Link className="btn btn-primary" to ='/' onClick={
                        () => {
                           console.log('logout!');
                        }
                    }>Logout</Link>
            <div className="row w-100 mx-0">
                {/* <div className="col-md-3 mx-0"> */}
                <div className="col-md-3 mx-0 sidebar-fragment">
                    <Sidebar />
                    
                </div>
                <div className="col-md-9 mx-0 chatbox-fragment">
                    <Chatbox />
                </div>

            </div>

        </>
    )
}

export default Home;