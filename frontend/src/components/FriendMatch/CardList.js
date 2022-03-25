import React, { useEffect, useState, useContext } from "react";

function Cardlist(props) {
    return (
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
    )
}

export default Cardlist;