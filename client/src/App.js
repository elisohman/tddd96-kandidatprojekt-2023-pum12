// Importing modules
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import DetailedPage from "./pages/DetailedViewPage/DetailedPage";

function App() {
  return (
	<div className="App">
      <Routes>
        <Route path="/" element={	<HomePage />} />
        <Route path="/:country/detailed_page" element={<DetailedPage />} />
      </Routes>
  </div>
  );
}
export default App;

