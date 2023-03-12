// Importing modules
import "./App.css";
import React, { useState, useEffect, PureComponent } from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";


function App() {
  return (
	<div className="App">
    <Sidebar />
    <div className='PageContent'>
      <Routes>
        <Route path="/" element={	<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/alarm" element={<h1>To be implemented</h1>} />
        <Route path="/help" element={<h1>To be implemented</h1>} />
        {/* <Route path="/alarm" element={<FrontPage />} /> */}
      </Routes>
    </div>
     

  </div>

  );
}
export default App;

