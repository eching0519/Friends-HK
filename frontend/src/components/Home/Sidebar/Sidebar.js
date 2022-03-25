import React from "react";
import { useEffect, useState, useContext } from 'react';
import FriendMatch from "../../FriendMatch/FriendMatch";

function ChatName(props) {
    return <chatname>
        <div className="row">
            <h4>{props.chatroomname}</h4>
            <button className="btn btn-primary" onClick={event => {
                event.preventDefault();
                props.item.setRoom(props.chatroomname);
                console.log("selected room:" + props.chatroomname);
            }}
            >ClICK</button>
        </div>
    </chatname>
}

function Sidebar(props) {
    const chatroomlist = ["LoveTamjjai", "Fiveguyslover", "asdasd", "hello"];

    console.log(chatroomlist)
    let chatroomlistplaceholder = [];

    chatroomlistplaceholder = chatroomlist.map((element, index) => {
        console.log(element, index);
    });


    return (
        <>
            <h1>Chat list</h1>

            {/* 챗 상단바 누르면 바로 채팅으로 가지는데 그러지 말고 그냥 빈 채팅만 보이게 하기 */}
            {/* Using Loop to keep creating new chatroom */}

            {/*
            <ChatName item={props} chatroomname="LoveTamjjai"></ChatName>
            <ChatName item={props} chatroomname="Fiveguyslover"></ChatName>
            */}

            {chatroomlist.map((element, index) =>

                <div key={index}>
                    { }
                    <ChatName item={props} chatroomname={element}></ChatName>
                </div>

            )}
            {/* <div className="row">
                <h4>Mary</h4>
                <button className="btn btn-primary" onClick={() => {
                    props.setRoom('MaryRoom1');
                    //props.setName('Mary');
                    console.log('selected room: MaryRoom1');
                }}
                >click</button>
            </div> */}

        </>


    )
}

export default Sidebar;