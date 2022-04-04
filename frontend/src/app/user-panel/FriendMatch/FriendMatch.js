import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const FriendMatch = (props) => {
    const [matchTheme, setMatchTheme] = useState('default');
    const [matchStatus, setmatchStatus] = useState('wait');
    const [disableInput, setDisableInput] = useState(false);

    useEffect(() => {
        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    socket.on("waitMatch", () => {
        setmatchStatus('success');
        props.setCurrentPage('chat');
    });

    //let waitingMessage = '';
    const sendSpecialThemeMatchRequest = (matchTheme) => {
        socket.emit('matchBySpecialTheme', matchTheme, props.userName, (numberofpeople) => {
            console.log(`Still need ${3 - numberofpeople} people.`)
            //waitingMessage = `Still need ${3 - numberofpeople} people.`;
        });
    };

    let matchstatusplaceholder = <h3>not send</h3>;

    if (matchStatus === 'pending') {
        matchstatusplaceholder = <h3>not yet find, { }</h3>;
    }

    if (matchStatus === 'success') {
        matchstatusplaceholder = <h3>group formed!</h3>;
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                <h2>Welcome back</h2>
                    <div className="row">
                        <div className="col-md-5 stretch-card grid-margin">
                            <div className="card bg-light card-img-holder text-black">
                                <div className="card-body">
                                    <h4 className="font-weight-normal mb-3">Start match friends</h4>
                                    <h2 className="mb-5">Match</h2>
                                    <h6 className="card-text">Lets meet new fds.</h6>
                                    <button className="btn btn-light float-right" onClick={() => {
                                        //setMatchTheme('dinning');
                                        setDisableInput(true);
                                        setmatchStatus('pending');
                                        sendSpecialThemeMatchRequest('default');
                                    }} disabled={disableInput}>Go</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3>Quicker way to match friends:</h3>
                    <div className="row">

                        <div className="col-md-3 stretch-card grid-margin">
                            <div className="card bg-gradient-danger card-img-holder text-white">
                                <div className="card-body">
                                    <h4 className="font-weight-normal mb-3">Special Theme</h4>
                                    <h2 className="mb-5">Dinning</h2>
                                    <h6 className="card-text">Lets eat tgt.</h6>
                                    <button className="btn btn-light float-right" onClick={() => {
                                        //setMatchTheme('dinning');
                                        setDisableInput(true);
                                        setmatchStatus('pending');
                                        sendSpecialThemeMatchRequest('dinning');
                                    }} disabled={disableInput}>Go</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 stretch-card grid-margin">
                            <div className="card bg-gradient-primary card-img-holder text-white">
                                <div className="card-body">
                                    <h4 className="font-weight-normal mb-3">Special Theme</h4>
                                    <h2 className="mb-5">Hiking</h2>
                                    <h6 className="card-text">Lets hiking tgt.</h6>
                                    <button className="btn btn-light float-right" onClick={() => {
                                        //setMatchTheme('dinning');
                                        setDisableInput(true);
                                        setmatchStatus('pending');
                                        sendSpecialThemeMatchRequest('hiking');
                                    }} disabled={disableInput}>Go</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 stretch-card grid-margin">
                            <div className="card bg-gradient-success card-img-holder text-white">
                                <div className="card-body">
                                    <h4 className="font-weight-normal mb-3">Special Theme</h4>
                                    <h2 className="mb-5">Something</h2>
                                    <h6 className="card-text">Lets do sth tgt.</h6>
                                    <button className="btn btn-light float-right" onClick={() => {
                                        //setMatchTheme('dinning');
                                        setDisableInput(true);
                                        setmatchStatus('pending');
                                        sendSpecialThemeMatchRequest('something');
                                    }} disabled={disableInput}>Go</button>
                                </div>
                            </div>
                        </div>

                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Dinning</h5>
                                <p className="card-text">You pefer friends for dinning.</p>
                                <button className="btn btn-light" onClick={() => {
                                    //setMatchTheme('dinning');
                                    setDisableInput(true);
                                    setmatchStatus('pending');
                                    sendSpecialThemeMatchRequest('dinning');
                                }} disabled={disableInput}>Go</button>
                            </div>
                        </div>
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Hiking</h5>
                                <p className="card-text">you seek for fds for hiking.</p>
                                <button className="btn btn-light" onClick={() => {
                                    setDisableInput(true);
                                    setmatchStatus('pending');
                                    sendSpecialThemeMatchRequest('hiking');
                                }} disabled={disableInput}>Go</button>
                            </div>
                        </div>
                    </div>


                    <div>
                        {matchstatusplaceholder}
                        { }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendMatch;