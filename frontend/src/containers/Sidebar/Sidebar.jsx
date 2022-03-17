import React from "react";
import './Sidebar.css'
import ReactDOM from 'react-dom';
import { Link, Route, Routes } from "react-router-dom";
import Chat from "../ToChat/Chat";
/*
need to contain the recent chat memory
store the chat when user click the friend name
like instagram
scroll down to see the friend list
route to /chat
*/
function Sidebar(props) {
    return (
        <div className="RecentChats">
            <h1>Recent chat</h1>
            <div className="col Search-fragment">
                <input type="text" placeholder="search_by_id" />
            </div>
            <div className="col Friendlist-fragment">
                <div className="row mx-auto Afriend-fragment">
                    <div className='col'>
                        <Link to='/chat/username'>
                            <div className="row Name-fragment">Name</div> 
                        </Link>
                        <div className="row History-fragment">Hello How are you?....</div>
                    </div>
                </div>
                <div className="row mx-auto Afriend-fragment">
                    <button onClick={Chat()}>
                    <div className='row'>
                        {/* <Link to='/chat/username'> */}
                        <div className="row Name-fragment">Name</div> 
                        {/* </Link> */}
                        <div className="row History-fragment">Hello How are you?....</div>
                    </div>
                    </button>
                    <div className='row'>
                        <Link to='/chat/username'>
                            <div className="row Name-fragment">Name</div> 
                        </Link>
                        <div className="row History-fragment">Hello How are you?....</div>
                    </div>
                    <div className='row'>
                        <Link to='/chat/username'>
                            <div className="row Name-fragment">Name</div> 
                        </Link>
                        <div className="row History-fragment">Hello How are you?....</div>
                    </div>
                    <div className='row'>
                        <Link to='/chat/username'>
                            <div className="row Name-fragment">Name</div> 
                        </Link>
                        <div className="row History-fragment">Hello How are you?....</div>
                    </div>
                    <div className='row'>
                        <Link to='/chat/username'>
                            <div className="row Name-fragment">Name</div> 
                        </Link>
                        <div className="row History-fragment">Hello How are you?....</div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar;