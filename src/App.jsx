import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
