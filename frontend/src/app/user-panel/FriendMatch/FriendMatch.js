import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';
import { UserProfileSidebar } from "../userProfile";
import SpecialThemeCard from "./SpecialThemeCard";

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const FriendMatch = (props) => {
    const [matchTheme, setMatchTheme] = useState('default');
    const [matchStatus, setmatchStatus] = useState('wait');
    const [disableInput, setDisableInput] = useState(false);

    // Special theme
    const [themes, setThemes] = useState(['Dining', 'Workouts', 'Outdoor Activities', 'Board Games', 'Computer Games', 'Online Games']);

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
    
    // // Issac Help Help
    // const cancelSpecialThemeMatchRequest = () => {

    // }

    let matchstatusplaceholder = <UserProfileSidebar 
                                    user={props.user} 
                                    targetId={props.user.id} 
                                    minimal={true}
                                    detailed={false} 
                                    action={false} 
                                    setInfoContent={()=>{}} setPreferenceContent={()=>{}} setTargetName={()=>{}}
                                    furtherInfo={{
                                        "Preference Setting": props.preferences===undefined || props.preferences===null ? "Incomplete" : "Complete",
                                        "Matching Status": "Not Chosen"
                                    }} />;

    if (matchStatus === 'pending') {
        matchstatusplaceholder = <UserProfileSidebar 
                                    user={props.user} 
                                    targetId={props.user.id} 
                                    minimal={true}
                                    detailed={false} 
                                    action={false} 
                                    setInfoContent={()=>{}} setPreferenceContent={()=>{}} setTargetName={()=>{}}
                                    furtherInfo={{
                                        "Preference Setting": props.preferences===undefined || props.preferences===null ? "Incomplete" : "Complete",
                                        "Matching Status": <><span class="spinner-border spinner-border text-muted"></span> Matching..</>
                                    }} />
    }

    if (matchStatus === 'success') {
        matchstatusplaceholder = <UserProfileSidebar 
                                    user={props.user} 
                                    targetId={props.user.id} 
                                    minimal={true}
                                    detailed={false} 
                                    action={false} 
                                    setInfoContent={()=>{}} setPreferenceContent={()=>{}} setTargetName={()=>{}}
                                    furtherInfo={{
                                        "Preference Setting": props.preferences===undefined || props.preferences===null ? "Incomplete" : "Complete",
                                        "Matching Status": "Group found!"
                                    }} />;
    }

    var pageToRender = (
        <div>
            <div class="page-header">
                <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white mr-2"><i class="mdi mdi-account-search"></i></span> Friend Matching </h3>
            </div>

            <div className="row">
            <div className="col-md-3 grid-margin">
                {matchstatusplaceholder}
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
                                            themes={themes}
                                            languages={props.user==null?[]:props.user.preferences==null?[]:props.user.preferences.lang}
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
    );

    if (props.user.preferences == null) {
        pageToRender = <></>;
    }

    return pageToRender;
}

export default FriendMatch;