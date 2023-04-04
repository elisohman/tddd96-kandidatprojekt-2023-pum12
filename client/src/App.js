// Importing modules
import "./App.css";
import React, { useState, useEffect, PureComponent } from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
	<div className="App">
      <Routes>
        <Route path="/" element={	<HomePage />} />
        <Route path="/login" element={<h1>To be implemented</h1>} />
      </Routes>
  </div>
  );
}
export default App;

