import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Setting } from './components'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
    </div>
  );
}

export default App;
