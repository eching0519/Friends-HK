import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

const SpecialThemeCard = (props) => {
    // let bg = props.bg == null? 'btn-gradient-danger'  : props.bg;
    const bgColor = ['btn-gradient-danger', 'btn-gradient-info', 'btn-gradient-success', 'btn-gradient-primary', 'btn-gradient-warning']
    let themes = props.themes;
    let languages = props.languages;
    return (

        // {(props.messageList.length > 0) ?
        //     props.messageList.map((message, i) =>
        //         <div key={i}>
        //             <Message message={message} userName={props.userName} userId={props.userId} chatRoom={props.chatRoom} />
        //         </div>
        //     ) : <></>
        // }
        <>
            {props.themes.map((theme, i) => (
                <div className="stretch-card-custom grid-margin" key={i}>
                    <div className={"card card-img-holder text-white cursor-pointer " + bgColor[i % bgColor.length]}>
                        <div className="card-body" onClick={(e) => {
                                e.preventDefault()

                                var lang;
                                for(let i = 0; i < languages.length; i++) {
                                    lang = languages[i];
                                    console.log(theme + '-' + lang)
                                    // props.setMatchTheme(theme + '-' + lang);
                                    // props.setDisableInput(true);
                                    // props.setmatchStatus('pending');
                                    // props.sendSpecialThemeMatchRequest(theme + '-' + lang);
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

export default SpecialThemeCard;