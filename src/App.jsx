// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Join from "./components/Join";
import MyPage from "./components/MyPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<MyPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;