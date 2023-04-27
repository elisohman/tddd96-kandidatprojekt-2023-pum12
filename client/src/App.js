// Importing modules
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
	<div className="App">
      <Routes>
        <Route path="/" element={	<HomePage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
  </div>
  );
}
export default App;

