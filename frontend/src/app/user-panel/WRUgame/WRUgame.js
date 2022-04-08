import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const WRUgame = (props) => {
    const [question, setQuestion] = useState('');
    const [answerA, setanswerA] = useState('');
    const [answerB, setanswerB] = useState('');

    useEffect(() => {
        socket.connect();   //estiblish socket io connection

        socket.emit("wouldURgame", props.userName, props.roomId);

        socket.on("wouldURgameSession", (question) => {
            setQuestion(question.question);
            setanswerA(question.a);
            setanswerB(question.b);
        });

        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

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

                }}>{answerA}</button>
                <button type="button" className="btn btn-rounded btn-gradient-primary col-auto" onClick={event => {

                }}>{answerB}</button>

            </div>


        </div>
    )
}

export default WRUgame;