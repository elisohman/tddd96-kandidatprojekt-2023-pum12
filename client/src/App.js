// Importing modules
import React, { useState, useEffect, PureComponent } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage";

function App() {
  return (
	
  <Routes>
	<Route path="/" element={<FrontPage />} />
  </Routes>
  );
}
export default App;

