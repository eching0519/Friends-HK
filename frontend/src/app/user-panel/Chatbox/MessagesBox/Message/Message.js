import React, { useEffect } from 'react';
import { EmptyIcon } from '../../../../shared/Variable'
import './Message.css';

const Message = (props) => {
    let isSentByCurrentUser = false;
    let chatRoom = props.chatRoom;
    let userList = chatRoom.usersInfo;

    // console.log("Message", props)

    /**
    useEffect(() => {
        //console.log(props.message.text)
    }, [])
     */

    //const trimmedName = name.trim().toLowerCase();

    if (props.message.senderId === props.userId) {
        isSentByCurrentUser = true;
    }
    const getSenderName = () => {
        let senderId = props.message.senderId;
        if (senderId === 'admin') return ''

        try {
            //console.log("getSenderName", userList[senderId])
            return chatRoom.usersInfo[senderId].name;
        } catch(e) {
            return senderId;
        }
    }
    const getUserPicture = () => {
        let senderId = props.message.senderId;
        if (senderId === 'admin') return ''

        if (chatRoom.usersInfo[senderId].picture !== undefined) {
            return chatRoom.usersInfo[senderId].picture;
        }
        return EmptyIcon;
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

    const pic = getUserPicture();

    return (
        (props.message.senderId === "admin") ? (
            <div className="text-center">
                <div className="system-message">
                    <div> {props.message.message} </div>
                </div>
            </div>
        ) : ( 
            isSentByCurrentUser? (
                <div className="messageContainer justifyEnd">
                    <div className="messageBox bg-gradient-primary">
                        <div className="messageText colorWhite m-1">{props.message.message}</div>
                        <div className="sentText colorWhite pr-1 float-right">{parseTime(props.message.timeElapse)}</div>
                    </div>
                </div>
            )
            : (
                <>
                    <div className="row">
                        {(props.lastMsgSender === props.message.senderId)? '' : <img className="rounded-circle chatbox-icon" src={getUserPicture()} />}
                        <div className={(props.lastMsgSender === props.message.senderId)? 'next-chatbox' : 'first-chatbox'}>
                            {(props.lastMsgSender === props.message.senderId)? '' : <div className="nameText">{getSenderName()}</div>}
                            <div className="messageContainer justifyStart">

                                <div className="messageBox bg-light">
                                    <div className="messageText colorDark m-1">{props.message.message}</div>
                                    <div className="sentText pr-1 float-right">{parseTime(props.message.timeElapse)}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>

            )
        )
    );
}

export default Message;