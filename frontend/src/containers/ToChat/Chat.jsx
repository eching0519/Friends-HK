import React from "react";
import {useRef, useState} from "react";
function Chat() {
  const parentRef = useRef();
  const [elements, setelemnts] = useState([]);
  const createNewDiv = () => {
    const newElement = React.createElement('div', 'Hello',);
    setelemnts(elements =>[...elements,newElement]);
  };

  return (
    
    <div onClick={createNewDiv} ref={parentRef}>
      <h1>This is the result</h1>
    </div>
  )
}
export default Chat;