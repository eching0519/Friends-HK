import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Card } from "react-bootstrap";
// import { io } from 'socket.io-client';
import SocketContext from "../../SocketContext";

/* const socket = io({ //no url: default to localhost:8080
    autoConnect: false
}); */

const WRUgame = (props) => {
    const socket = useContext(SocketContext);
    const [question, setQuestion] = useState('');
    const [answerA, setanswerA] = useState('');
    const [answerB, setanswerB] = useState('');
    const [answerAuserName, setAnswerAuserName] = useState([]); //store user who choose answer A
    const [answerBuserName, setAnswerBuserName] = useState([]); //store user who choose answer B
    const [gameStart, setGameStart] = useState(false)   //indicate whether the game shall start

    useEffect(() => {
        console.log(socket);    //DEBUG

        socket.emit("joinWouldURgame", props.userName, props.roomId, (message) => {
            console.log(message);
        });

        socket.on("assignWouldURgameQuestion", (question, start_flag) => {  //set question set
            setAnswerAuserName([]);
            setAnswerBuserName([]);
            setQuestion(question.question);
            setanswerA(question.a);
            setanswerB(question.b);
            if (start_flag) {
                console.log("Game Start!");
                setGameStart(true);
            }
        });

        socket.on("waitResponseUserName", (name, answer) => {   //listen to other users answer.
            if (answer === 'a') {
                console.log("answerAuserName before:", answerAuserName);
                setAnswerAuserName([...answerAuserName, name]);
                console.log("answerAuserName after:", answerAuserName);
            }

            if (answer === 'b') {

                setAnswerBuserName([...answerBuserName, name]);
                console.log("answerBuserName:", answerBuserName);
            }

        });
    }, []);

    const sendWRUanswer = (answer) => { //send user's answer
        socket.emit("sendWouldURanswer", props.userName, props.roomId, answer, (message) => {
            console.log(message);
        });
    };


    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Would U Rather:
                </Card.Title>
                {
                    gameStart ? //if the game can start render question and answer button
                        <>
                            <Card.Text> 
                                {question}
                                {answerAuserName.map((element, index) =>
                                    <div key={index} className="">{element}: choose A</div>
                                )}
                                {answerBuserName.map((element, index) =>
                                    <div key={index} className=""> {element}: choose B</div>
                                )}
                            </Card.Text>

                            <button type="button" className="close" onClick={() => {
                                props.setWouldURgame(false) //leave WUR game
                            }}>
                                <span>&times;</span>
                            </button>

                            <button type="button" className="btn btn-rounded btn-gradient-primary" onClick={event => {
                                sendWRUanswer('a');
                            }}>A: {answerA}</button>
                            <button type="button" className="btn btn-rounded btn-gradient-primary" onClick={event => {
                                sendWRUanswer('b');
                            }}>B: {answerB}</button>
                        </> :
                        //  if not (not enough user) render wait message
                        <Card.Text>Waiting other user...</Card.Text>
                }
            </Card.Body>
        </Card>
    )
}

export default WRUgame;