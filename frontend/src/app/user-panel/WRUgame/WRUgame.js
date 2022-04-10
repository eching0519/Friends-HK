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
    const [result, setResult] = useState({});

    useEffect(() => {
        console.log(socket);    //DEBUG

        socket.emit("joinWouldURgame", props.userName, props.roomId, (message) => {
            console.log(message);
        });

        socket.on("assignWouldURgameQuestion", (question, start_flag) => {  //set question set
            setResult({});
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

        socket.on("waitResponseUserName", (name, answer, sysResult) => {   //listen to other users answer.
            setResult(sysResult)
            console.log(name, answer)
            if (answer === 'A') {
                console.log("answerAuserName before:", answerAuserName);
                setAnswerAuserName([...answerAuserName, name]);
                // console.log("answerAuserName after:", answerAuserName);
            }

            if (answer === 'B') {
                console.log("answerBuserName before:", answerBuserName);
                setAnswerBuserName([...answerBuserName, name]);
                // console.log("answerBuserName:", answerBuserName);
            }

        });
    }, []);

    useEffect(()=>{
        console.log("answerAuserName:", answerAuserName);
        console.log("answerBuserName:", answerBuserName);
        console.log("result", result)
    }, [answerAuserName, answerBuserName, result])

    const sendWRUanswer = (answer) => { //send user's answer
        socket.emit("sendWouldURanswer", props.userName, props.roomId, answer, result, (message) => {
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
                                {
                                    Object.entries(result).map((element, index) => 
                                        <div key={index} className="">{element[0]}: choose {element[1]}</div>
                                    )
                                }
                                {/* {answerAuserName.map((element, index) =>
                                    <div key={index} className="">{element}: choose A</div>
                                )}
                                {answerBuserName.map((element, index) =>
                                    <div key={index} className=""> {element}: choose B</div>
                                )} */}
                            </Card.Text>

                            <button type="button" className="close" onClick={() => {
                                props.setWouldURgame(false) //leave WUR game
                            }}>
                                <span>&times;</span>
                            </button>

                            <button type="button" className="btn btn-rounded btn-gradient-primary" onClick={event => {
                                sendWRUanswer('A');
                            }}>A: {answerA}</button>
                            <button type="button" className="btn btn-rounded btn-gradient-primary" onClick={event => {
                                sendWRUanswer('B');
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