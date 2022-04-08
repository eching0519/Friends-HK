import React, { useEffect } from 'react';

import './Message.css';

const Message = (props) => {
    let isSentByCurrentUser = false;
    let chatRoom = props.chatRoom;

    /**
    useEffect(() => {
        //console.log(props.message.text)
    }, [])
     */

    //const trimmedName = name.trim().toLowerCase();

    if (props.message.senderId === props.userId) {
        isSentByCurrentUser = true;
    }
    const getsenderName = () => {
        return chatRoom.usersInfo[props.message.senderId].name;
        // let senderName = '';
        // if (props.message.senderId = props.user1.id) {
        //     senderName = props.user1.name;

        // } else if (props.message.senderId = props.user2.id) {
        //     senderName = props.user2.name;

        // } else if (props.user3 !== null) {
        //     if (props.message.senderId = props.user3.id) {
        //         senderName = props.user3.name;
        //     }
        // }
        // // console.log(isSentByCurrentUser);
        // return senderName;
    }



    const parseTime = (time) => {
        let currentTime = new Date(Date.now());
        let timeObject = new Date(time);

        //get current date//month//year
        // let today = currentTime.getDate();
        // let thisMonth = currentTime.getMonth();
        // let thisYear = currentTime.getFullYear();

        let checkCondition = currentTime.getDate() === timeObject.getDate() && currentTime.getMonth() === timeObject.getMonth() && currentTime.getFullYear() === timeObject.getFullYear();

        let timestr = `${timeObject.getDate()}/${timeObject.getMonth()}/${timeObject.getFullYear()}`;
        if (checkCondition) {
            timestr = `${timeObject.getHours()}:${timeObject.getMinutes()}`;
            return timestr;
        } else {
            return timestr;
        }
    };


    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <div className="messageBox bg-gradient-primary">
                        <div className="messageText colorWhite m-1">{props.message.message}</div>
                        <div className="sentText colorWhite pr-1 float-right">{parseTime(props.message.timeElapse)}</div>
                    </div>

                </div>
            )
            : (
                <>
                    <div className="nameText">{getsenderName()}</div>
                    <div className="messageContainer justifyStart">

                        <div className="messageBox bg-light">
                            <div className="messageText colorDark m-1">{props.message.message}</div>
                            <div className="sentText pr-1 float-right">{parseTime(props.message.timeElapse)}</div>
                        </div>

                    </div>
                </>

            )
    );
}

export default Message;