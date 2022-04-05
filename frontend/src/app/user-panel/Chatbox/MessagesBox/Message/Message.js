import React, { useEffect } from 'react';

import './Message.css';

const Message = (props) => {
    let isSentByCurrentUser = false;

    /**
    useEffect(() => {
        //console.log(props.message.text)
    }, [])
     */

    //const trimmedName = name.trim().toLowerCase();


    if (props.message.name === props.userName) {
        isSentByCurrentUser = true;
    }

    const parseTime = (time) => {
        let currentTime = new Date(Date.now());
        let timeObject = new Date(time);

        //get current date//month//year
        let today = currentTime.getDate();
        let thisMonth = currentTime.getMonth();
        let thisYear = currentTime.getFullYear();

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
                <div className="messageContainer justifyEnd mt-1">

                    <div className="messageBox bg-gradient-primary">
                        <p className="messageText colorWhite m-1">{props.message.text}</p>
                        <p className="sentText colorWhite pr-1 float-right">{parseTime(props.message.time)}</p>
                    </div>

                </div>
            )
            : (
                <>
                    <p className="nameText pl-10 mt-3 mb-1">{props.message.name}</p>
                    <div className="messageContainer justifyStart ml-5">

                        <div className="messageBox bg-light">
                            <p className="messageText colorDark m-1">{props.message.text}</p>
                            <p className="sentText pr-1 float-right">{parseTime(props.message.time)}</p>
                        </div>

                    </div>
                </>

            )
    );
}

export default Message;