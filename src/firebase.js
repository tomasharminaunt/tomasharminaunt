// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 너의 Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCTuK9574X_nxkL-JFQ0fEExjzV5D_OKW8",
  authDomain: "mealpal-c6f2a.firebaseapp.com",
  projectId: "mealpal-c6f2a",
  storageBucket: "mealpal-c6f2a.firebasestorage.app",
  messagingSenderId: "368989109925",
  appId: "1:368989109925:web:9eaf38594cbda03d99d74c"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 객체 가져오기
const auth = getAuth(app);

export { auth };
