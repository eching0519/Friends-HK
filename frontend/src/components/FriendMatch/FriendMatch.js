import React, { useEffect, useState, useContext } from "react";
import { io } from 'socket.io-client';

//import Cardlist from "./CardList";

const socket = io({ //no url: default to localhost:8080
    autoConnect: false
});



function Cardlist(props) {
    return <cardlist>
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{props.cardtitle}</h5>
                <p className="card-text">{props.cardtext}</p>
                <button className="btn btn-light" onClick={event => {
                    //setMatchTheme('dinning');
                    event.preventDefault();
                    props.item.setmatchStatus('pending');
                    props.item.sendSpecialThemeMatchRequest(props.cardtitle);
                }}>Go</button>
            </div>
        </div>
    </cardlist>
}

function Matchlist(props) {
    return <matchlist>
        <h5>{props.title}</h5>
        {props.description}
    </matchlist>
}

function Create(props) {
    return <matchlist>
        <h2>Create</h2>
        <form onSubmit={event => {
            event.preventDefault();
            const title = event.target.title.value;
            const description = event.target.description.value;
            props.onCreate(title, description);
        }}>
            <p><input type="text" name="title" placeholder="Title of the chatroom" /></p>
            <p><textarea name="description" placeholder="Description of chatroom"></textarea></p>
            <p><input type="submit" value="Create"></input></p>
        </form>
    </matchlist>
}

// const [mode, setMode] = useState('okay');
// function Mainfriend() {
//     let content = null;

//     if (mode === "CREATE") {
//         content = <Create onCreate={(title, body) => {

//         }}></Create>
//     }

// }



const FriendMatch = (props) => {
    const [matchTheme, setMatchTheme] = useState('default');
    const [matchStatus, setmatchStatus] = useState('wait');
    const [mode, setMode] = useState();
    const [topics, setTopics] = useState();
    const [context, setContext] = useState(null);
    // const [nextId, setNextId] = useState(1);
    let content = null;
    // if (mode==='WELCOME'){
    //     content =  <Matchlist title="Chikcen and Corn" description="Love the song in the youtube" />
    // } else if (mode === "READ"){
    //     content =  <Matchlist title="Rabit Bunny" description="Kkangchong Kkangchong" />
    if(mode ==='CREATE'){
        content = <Create onCreate={(_title, _description)=>{
// 목록이 추가되도록 해야한다
            const newTopic = {title:_title, description:_description}
            const newTopics = [...topics]
            newTopic.push(newTopic)
            setTopics(newTopics);
        }}></Create>
    }
    const cardlist = ['Boong Boong Boong', 'Yoga fire', 'Hello']
    console.log(cardlist)
    let cardlistplaceholder = []
    cardlistplaceholder= cardlist.map((title, description, index)=>{
        console.log(title, description, index);
    });

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


    return (
        <div>
            <h1>match friends</h1>
            {cardlist.map((title, description, index)=>
            <div key={index}>
                { }
                <Cardlist item={props} cardtitle={title} cardtext={description}></Cardlist>
            </div>
            )}
            {/* <Cardlist item={props} cardtitle="Dining" cardtext="Love eating bro and sis" /> */}
            {content}
            <a href='/create' onClick={event=>{
                event.preventDefault();
                setMode('CREATE');
            }}>Create</a>

            <div>
                {matchstatusplaceholder}
                { }
            </div>

        </div>
    )
}

export default FriendMatch;