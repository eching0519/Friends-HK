import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';
import SpecialThemeCard from "./SpecialThemeCard";

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const FriendMatch = (props) => {
    const [matchTheme, setMatchTheme] = useState('default');
    const [matchStatus, setmatchStatus] = useState('wait');
    const [disableInput, setDisableInput] = useState(false);

    // Special theme
    const themes = ['Dining', 'Outdoor Activities', 'Board Games', 'Computer Games', 'Online Games'];

    useEffect(() => {
        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    socket.on("waitMatch", (roomId) => {
        setmatchStatus('success');
        //props.setCurrentPage('chat');
        console.log(roomId);
        //props.setRoomId(roomId);
    });

    //let waitingMessage = '';
    const sendSpecialThemeMatchRequest = (matchTheme) => {
        socket.emit('matchBySpecialTheme', matchTheme, props.userId, (numberofpeople) => {
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
                    {/* <div className="row">
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
                    </div> */}
                    
                    <div className="col-md-5 grid-margin">
                    <div className="card card-img-holder text-white cursor-pointer btn-gradient-primary">
                        <div className="card-body" onClick={(e) => {
                                e.preventDefault()
                                var languages = props.user.preferences.lang
                                var lang;
                                for(let i = 0; i < languages.length; i++) {
                                    lang = languages[i];
                                    console.log('default-' + lang)
                                    // props.setMatchTheme(theme + '-' + lang);
                                    // props.setDisableInput(true);
                                    // props.setmatchStatus('pending');
                                    // props.sendSpecialThemeMatchRequest(theme + '-' + lang);
                                }
                            }}>
                            <img src={require("../../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                            <h4 class="font-weight-normal mb-3">Preferences Matching</h4>
                            <h2 class="mb-5">Let's get started!</h2>
                            <h6 class="card-text">Start meeting a group of new friends!</h6>
                        </div>
                    </div>
                </div>

                    <h3>You may want to match friends with these activities:</h3>
                    <div className="col-md-12 special-theme-container">
                        <div>
                            <SpecialThemeCard
                                        themes={themes}
                                        languages={props.user.preferences.lang}
                                        setMatchTheme={setMatchTheme} 
                                        setDisableInput={setDisableInput} 
                                        setmatchStatus={setmatchStatus} 
                                        sendSpecialThemeMatchRequest={sendSpecialThemeMatchRequest} />
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