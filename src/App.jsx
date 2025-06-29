// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Join from "./components/Join";
import MyPage from "./components/MyPage";
import Header from "./components/Header"; // ✅ Header 불러오기

function App() {
  // ✅ 로그인 상태를 App에서 중앙 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* ✅ 모든 페이지에 공통으로 Header 표시 */}
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route
          path="/"
          element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/join" element={<Join />} />
        <Route
          path="/mypage"
          element={<MyPage isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
