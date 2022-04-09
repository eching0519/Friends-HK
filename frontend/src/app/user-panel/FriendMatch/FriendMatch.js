import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';
// import SpecialThemeCard from "./SpecialThemeCard";

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const FriendMatch = (props) => {
    const [matchTheme, setMatchTheme] = useState('default');
    const [matchStatus, setmatchStatus] = useState('wait');
    const [disableInput, setDisableInput] = useState(false);
    let preferencesIsSet = props.user.preferences !== undefined;

    // Special theme
    const [themes, setThemes] = useState(['Dining', 'Workouts', 'Outdoor Activities', 'Board Games', 'Computer Games', 'Online Games']);

    useEffect(() => {
        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    socket.on("waitMatch", (roomId) => {    //listen to server match result
        setmatchStatus('success');
        //props.setCurrentPage('chat');
        console.log(roomId);
        //props.setRoomId(roomId);
    });

    //let waitingMessage = '';
    const sendSpecialThemeMatchRequest = (matchTheme) => {  //emit special match event to socket io
        socket.emit('matchBySpecialTheme', matchTheme, props.userId, (numberofpeople) => {
            console.log(`Still need ${3 - numberofpeople} people.`)
            //waitingMessage = `Still need ${3 - numberofpeople} people.`;
        });
    };
    
    // // Issac Help Help
    const cancelSpecialThemeMatchRequest = (matchTheme) => {    //emit cancel special match event to socket io
        socket.emit("cancelMatchBySpecialTheme", matchTheme, props.userId, (message) => {
            console.log("canel status:", message);
        })
    }

    let matchstatusplaceholder = <h3>not send</h3>;

    if (matchStatus === 'pending') {
        matchstatusplaceholder = <h3>not yet find, { }</h3>;
    }

    if (matchStatus === 'success') {
        matchstatusplaceholder = <h3>group formed!</h3>;
    }

    return (
        <div>
            <div class="page-header">
                <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white mr-2"><i class="mdi mdi-account-search"></i></span> Friend Matching </h3>
            </div>

            <div className="row">
            <div className="col-md-3 grid-margin">
                <div className="card">
                    <div className="card-body">{matchstatusplaceholder}</div>
                </div>
            </div>

                <div className="col-md-9">
                    <div className="col-md-12">
                        <div class="page-header">
                            <h3 class="page-title"> Recommended </h3>
                        </div>
                        <div className="grid-margin">
                            <div className="card card-img-holder text-white cursor-pointer btn-gradient-primary">
                                <div className="card-body" onClick={(e) => {
                                        e.preventDefault()
                                        if (!preferencesIsSet) {
                                            var goNow = window.confirm("You need to set your preferences before friend matching! Would you want to go now?");
                                            if (goNow) {
                                                window.location.pathname = "/settings";
                                            }
                                            return;
                                        }

                                        var languages = props.user.preferences.lang
                                        var lang;
                                        for(let i = 0; i < languages.length; i++) {
                                            lang = languages[i];
                                            props.setMatchTheme('default-' + lang);
                                            props.setDisableInput(true);
                                            props.setmatchStatus('pending');
                                            props.sendSpecialThemeMatchRequest('default-' + lang);
                                        }
                                    }}>
                                    <img src={require("../../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                                    <h4 class="font-weight-normal mb-3">Preferences Matching</h4>
                                    <h2 class="mb-5">Let's get started!</h2>
                                    <h6 class="card-text">Start meeting a group of new friends!</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div class="page-header">
                            <h3 class="page-title"> You may also want to match friends by these activities: </h3>
                        </div>
                        <div className="special-theme-container">
                            <div>
                                <SpecialThemeCard
                                            user={props.user}
                                            themes={themes}
                                            languages={preferencesIsSet?props.user.preferences.lang:[]}
                                            setMatchTheme={setMatchTheme} 
                                            setDisableInput={setDisableInput} 
                                            setmatchStatus={setmatchStatus} 
                                            sendSpecialThemeMatchRequest={sendSpecialThemeMatchRequest} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendMatch;

const SpecialThemeCard = (props) => {
    let preferencesIsSet = props.user.preferences !== undefined;

    const btnColor = ['btn-gradient-danger', 'btn-gradient-info', 'btn-gradient-success', 'btn-gradient-primary', 'btn-gradient-warning']
    let themes = props.themes;
    let languages = props.languages;
    return (
        <>
            {props.themes.map((theme, i) => (
                <div className="stretch-card-custom grid-margin" key={i}>
                    <div className={"card card-img-holder text-white cursor-pointer " + btnColor[i % btnColor.length]}>
                        <div className="card-body" onClick={(e) => {
                                e.preventDefault()
                                if (!preferencesIsSet) {
                                    var goNow = window.confirm("You need to set your preferences before friend matching! Would you want to go now?");
                                    if (goNow) {
                                        window.location.pathname = "/settings";
                                    }
                                    return;
                                }

                                var lang;
                                for(let i = 0; i < languages.length; i++) {
                                    lang = languages[i];
                                    // console.log(theme + '-' + lang)
                                    props.setMatchTheme(theme + '-' + lang);
                                    props.setDisableInput(true);
                                    props.setmatchStatus('pending');
                                    props.sendSpecialThemeMatchRequest(theme + '-' + lang);
                                }
                            }}>
                            <img src={require("../../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                            <h4 class="font-weight-normal mb-3">Special Theme Matching</h4>
                            <h2 class="mb-5">{theme}</h2>
                            {/* <h6 class="card-text">Meet a small group of {theme}'s friend!</h6> */}
                        </div>
                    </div>
                </div>
            ))}
        </>

        
    )
}