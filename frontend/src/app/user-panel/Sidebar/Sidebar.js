import React from "react";

function Sidebar(props) {
    return (
        <>
            <div className="bottonlist preview-list">
                <button className="btn btn-light" onClick={() => { props.setCurrentPage('matchFriends') }}><i className="mdi mdi-account-multiple mr-2 text-primary h3"></i>Find new friends</button>
                <h2 className="m-2 p-2">Friends</h2>
                <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e) => {
                    e.preventDefault();
                    props.setRoomName('Room1');
                    props.setRoomId('sdfsdfas3');
                    props.setCurrentPage('chat');
                    //props.setName('Peter');
                    console.log('selected room: PeterRoom1');
                }}>
                    <span className={'font-weight-bold'}><i className="mdi mdi-logout mr-2 text-primary h3"></i>Peter</span>
                </a>
                
                <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e) => {
                    e.preventDefault();
                    props.setRoomName('Room2');
                    props.setRoomId('sdf9845ty8g3');
                    props.setCurrentPage('chat');
                    //props.setName('Mary');
                    console.log('selected room: MaryRoom1');

                }}>
                    <i className="mdi mdi-logout mr-2 text-primary h3"></i><span className={'font-weight-bold'}>Mary</span>
                </a>
                <h2 className="m-2 p-2">Chat Room</h2>
                

                {/*
                <div className="row">
                    <h4>Peter</h4>
                    <button className="btn btn-primary" onClick={() => {
                        props.setRoomName('Room1');
                        props.setRoomId('sdfsdfas3');
                        props.setCurrentPage('chat');
                        //props.setName('Peter');
                        console.log('selected room: PeterRoom1');
                    }}
                    >click</button>
                </div>
                <div className="row">
                    <h4>Mary</h4>
                    <button className="btn btn-primary" onClick={() => {
                        props.setRoomName('Room2');
                        props.setRoomId('sdf9845ty8g3');
                        props.setCurrentPage('chat');
                        //props.setName('Mary');
                        console.log('selected room: MaryRoom1');
                    }}
                    >click</button>
                </div>
                
                */}

            </div>

        </>
    )
}

export default Sidebar;