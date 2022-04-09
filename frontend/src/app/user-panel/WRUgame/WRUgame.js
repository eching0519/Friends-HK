import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { io } from 'socket.io-client';
import SocketContext from "../../SocketContext";

/* const socket = io({ //no url: default to localhost:8080
    autoConnect: false
}); */

const WRUgame = (props) => {
    const socket = useContext(SocketContext);
    const [question, setQuestion] = useState('');
    const [answerA, setanswerA] = useState('');
    const [answerB, setanswerB] = useState('');
    const [answerAuserName, setAnswerAuserName] = useState([]);
    const [answerBuserName, setAnswerBuserName] = useState([]);

    useEffect(() => {
        console.log(socket);
        //socket.connect();   //estiblish socket io connection

        socket.emit("joinWouldURgame", props.userName, props.roomId, (message) => {
            console.log(message);
        });

        socket.on("assignWouldURgameQuestion", (question) => {
            setQuestion(question.question);
            setanswerA(question.a);
            setanswerB(question.b);
        });

        socket.on("waitResponseUserName", (name, answer) => {
            if (answer === 'a') {
                setAnswerAuserName([...answerAuserName, name]);
            }

            if (answer === 'b') {
                setAnswerBuserName([...answerBuserName, name]);
            }

        });

        // return () => {
        //     socket.removeAllListeners();    //clean up listener
        //     socket.disconnect();    //disconnect socket io connection
        // }
    }, []);

    const sendWRUanswer = (answer) => {
        socket.emit("sendWouldURanswer", props.userName, props.roomId, answer, (message) => {
            console.log(message);
        });
    };

    // const renderUserAnswerList = (list) => {
    //     return list.map((element, index) => {
    //         <div key={index}>
    //             {element}
    //         </div>
    //     })
    // };

    return (
        <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Would U Rather</h4>
            <div className="alert-body">
                <button type="button" className="close" onClick={() => {
                    props.setWouldURgame(false)
                }}>
                    <span>&times;</span>
                </button>
                <h4>Question: {question}</h4>

                <button type="button" className="btn btn-rounded btn-gradient-primary col-auto" onClick={event => {
                    sendWRUanswer('a');
                }}>{answerA}</button>
                {/* {renderUserAnswerList} */}
                <button type="button" className="btn btn-rounded btn-gradient-primary col-auto" onClick={event => {
                    sendWRUanswer('b');
                }}>{answerB}</button>

            </div>


        </div>
    )
}

export default WRUgame;