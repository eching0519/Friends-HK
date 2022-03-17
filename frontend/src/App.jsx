import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Link, Route, Routes } from "react-router-dom";
import { Button } from './components';
import { Login, Home } from './containers'
import { useNavigate } from "react-router-dom";

function App() {
  /*
  const [login_status, set_login_status] = useState(false);
  let token = localStorage.getItem('token');
  let navigate = useNavigate();

  useEffect(() => {
    if (token != null) {
      console.log(token);
      set_login_status(true);
      navigate('/home');
    } else {
      console.log("token not exits...\n");
      //navigate('/login')
    }
  })
  */

  //let page = login_status ? navigate('/home') : navigate('/login');
  return (
    <div className="App">
      
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      

    </div>
  );


}

export default App;
