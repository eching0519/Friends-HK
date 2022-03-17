import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home } from './containers'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
