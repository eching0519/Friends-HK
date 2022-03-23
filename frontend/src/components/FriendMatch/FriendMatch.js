import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});

const FriendMatch = (props) => {
    const [matchTheme, setMatchTheme] = useState('default');
    const [matchStatus, setmatchStatus] = useState('wait');

    useEffect(() => {
        socket.connect();   //estiblish socket io connection
        return () => {
            socket.removeAllListeners();    //clean up listener
            socket.disconnect();    //disconnect socket io connection
        }
    }, []);

    socket.on("waitMatch", () => {
        setmatchStatus('success');
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
        matchstatusplaceholder = <h3>not yet find, {}</h3>;
    }

    if (matchStatus === 'success') {
        matchstatusplaceholder = <h3>group formed!</h3>;
    }

    return (
        <div>
            <h1>match friends</h1>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Dinning</h5>
                    <p className="card-text">You pefer friends for dinning.</p>
                    <button className="btn btn-light" onClick={() => {
                        //setMatchTheme('dinning');
                        setmatchStatus('pending');
                        sendSpecialThemeMatchRequest('dinning');
                    }}>Go</button>
                </div>
            </div>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Hiking</h5>
                    <p className="card-text">you seek for fds for hiking.</p>
                    <button className="btn btn-light" onClick={() => {
                        setmatchStatus('pending');
                        sendSpecialThemeMatchRequest('hiking');
                    }}>Go</button>
                </div>
            </div>

            <div>
                {matchstatusplaceholder}
                {}
            </div>

        </div>
    )
}

export default FriendMatch;