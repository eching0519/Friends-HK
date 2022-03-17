import React, { useEffect, useState } from "react";
import Chatbox from "./Chatbox/Chatbox";
import Sidebar from "./Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";

import './Home.css';

function Home(props) {
    let navigate = useNavigate();

    const [testState, setTestState] = useState('30');

    useEffect(() => {
        if (!localStorage.token || !sessionStorage.token) {
            navigate("/");  // back to login page if there is no valid session token
        }
    });
    
    return (
        <>
            <h1>This is home page!</h1>
            <div className="row w-100 mx-0">
                <div className="col-md-3 mx-auto sidebar-fragment">
                    <Sidebar clickHandle={setTestState}/>
                    <Link className="btn btn-primary" to ='/' onClick={
                        () => {
                           console.log('logout...');
                        }
                    }>Logout</Link>
                </div>
                <div className="col-md-9 mx-auto chatbox-fragment">
                    <Chatbox name={testState} number={30}/>
                </div>

            </div>
        </>
    )
}

export default Home;