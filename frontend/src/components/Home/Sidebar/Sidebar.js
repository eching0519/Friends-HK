import React from "react";

function Sidebar(props) {
    return (
        <>
            <h1>Sidebar!</h1>
            <button className="btn btn-primary" onClick={() => {
                props.clickHandle('50');
                console.log('clicked!');
            }}>click</button>
        </>


    )
}

export default Sidebar;