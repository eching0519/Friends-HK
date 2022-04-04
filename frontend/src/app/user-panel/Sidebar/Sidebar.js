import React from "react";

function Sidebar(props) {
    return (
        <>
            <h1>Contacts:</h1>
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

        </>


    )
}

export default Sidebar;