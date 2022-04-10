import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Card } from "react-bootstrap";
// import { io } from 'socket.io-client';
import SocketContext from "../../SocketContext";
import $ from 'jquery';

/* const socket = io({ //no url: default to localhost:8080
    autoConnect: false
}); */

const WRUgame = (props) => {
    const socket = useContext(SocketContext);
    const [question, setQuestion] = useState('');
    const [answerA, setanswerA] = useState('');
    const [answerB, setanswerB] = useState('');
    const [gameStart, setGameStart] = useState(false)   //indicate whether the game shall start
    const [result, setResult] = useState({});

    useEffect(() => {
        console.log(socket);    //DEBUG

        socket.emit("joinWouldURgame", props.userName, props.roomId, (message) => {
            console.log(message);
        });

        socket.on("assignWouldURgameQuestion", (question, start_flag) => {  //set question set
            $(".wur-button").removeAttr("disabled");
            setResult({});
            setQuestion(question.question);
            setanswerA(question.a);
            setanswerB(question.b);
            if (start_flag) {
                console.log("Game Start!");
                setGameStart(true);
            }

            // let message = { message: question.question, senderId: 'wur', timeElapse: Date.now() }
            // props.setSystemMsgList(prevList => ({...prevList, [props.roomId]: {...message}}));
        });

        socket.on("waitResponseUserName", (name, answer, sysResult) => {   //listen to other users answer.
            setResult(sysResult)
            console.log(name, answer)
        });
    }, []);

    useEffect(()=>{
        console.log("result", result)

        let message;

        if ( props.userCount == Object.values(result).length ) {
            let message = question
            Object.entries(result).map((element, index) => 
                message += `<br />${element[0]} would rather ${(element[1] == 'A')? answerA:answerB}`
            )
            let messageObj = { message: message, senderId: 'wur', timeElapse: Date.now() }
            props.setSystemMsgList(prevList => ({...prevList, [props.roomId]: {...messageObj}}));
        }
    }, [result])

    const sendWRUanswer = (answer) => { //send user's answer
        socket.emit("sendWouldURanswer", props.userName, props.roomId, answer, result, (message) => {
            console.log(message);
        });
    };


    return (
        <div className="row">
            <div className="col-12 grid-margin">
            <Card>
                <Card.Body>
                    <Card.Title>
                        Would You Rather...
                        { gameStart &&
                            <button type="button" className="close" onClick={() => {
                                props.setWouldURgame(false) //leave WUR game
                            }}>
                                <span>&times;</span>
                            </button>
                        }
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
                                </Card.Text>

                                <button type="button" className="btn btn-rounded btn-gradient-primary w-100 mb-2 wur-button" onClick={event => {
                                    sendWRUanswer('A');
                                    $(".wur-button").attr("disabled", true);
                                }}>A: {answerA}</button>
                                <button type="button" className="btn btn-rounded btn-gradient-primary w-100 wur-button" onClick={event => {
                                    sendWRUanswer('B');
                                    $(".wur-button").attr("disabled", true);
                                }}>B: {answerB}</button>
                            </> :
                            //  if not (not enough user) render wait message
                            <Card.Text>Waiting other user...</Card.Text>
                    }
                        
                </Card.Body>
            </Card>
            </div>
        </div>
    )
}

export default WRUgame;