import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

//import Cardlist from "./CardList";

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


    const sendSpecialThemeMatchRequest = (matchTheme) => {
        socket.emit('matchBySpecialTheme', matchTheme, props.userName);
    };

    let matchstatusplaceholder = <h3>not send</h3>;

    if (matchStatus === 'pending') {
        matchstatusplaceholder = <h3>not yet find</h3>;
    }

    if (matchStatus === 'success') {
        matchstatusplaceholder = <h3>group formed!</h3>;
    }



    function Cardlist(props) {
        return <cardlist>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{props.cardtitle}</h5>
                    <p className="card-text">{props.cardtext}</p>
                    <button className="btn btn-light" onClick={() => {
                        //setMatchTheme('dinning');
                        props.item.setmatchStatus('pending');
                        props.item.sendSpecialThemeMatchRequest(props.cardtitle);
                    }}>Go</button>
                </div>
            </div>
        </cardlist>
    }

    function Matchlist(props) {
        return <matchlist>
            <h5>title</h5>
            description
        </matchlist>
    }

    function Create(props) {
        return <matchlist>
            <h2>Create</h2>
            <form onSubmit={event => {
                event.preventDefault();
                const title = event.target.title.value;
                const body = event.target.body.value;
                props.onCreate(title, body);
            }}>
                <p><input type="text" name="title" placeholder="Title of the chatroom" /></p>
                <p><textarea name="body" placeholder="Description of chatroom"></textarea></p>
                <p><input type="submit" value="Create"></input></p>
            </form>
        </matchlist>
    }

    const [mode, setMode] = useState('okay');
    function Mainfriend() {
        let content = null;

        if (mode === "CREATE") {
            content = <Create onCreate={(title, body) => {

            }}></Create>
        }

    }

    return (
        <div>
            <h1>match friends</h1>

            <Cardlist item={props} cardtitle="Dining" cardtext="Love eating bro and sis" />



            {/* <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Hiking</h5>
                    <p className="card-text">you seek for fds for hiking.</p>
                    <button className="btn btn-light" onClick={() => {

                    }}>Go</button>
                </div>
            </div> */}

            <div>
                {matchstatusplaceholder}
                { }
            </div>

        </div>
    )
}

export default FriendMatch;