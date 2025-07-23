import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const Join = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [idCheckResult, setIdCheckResult] = useState("");

  // ID duplication check
  const checkIdDuplicate = async () => {
    if (!userId) {
      setIdCheckResult("⚠️ Please enter a user ID.");
      return;
    }

    try {
      const q = query(collection(db, "users"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIdCheckResult("❌ This ID is already taken.");
      } else {
        setIdCheckResult("✅ This ID is available!");
      }
    } catch (error) {
      setIdCheckResult("⚠️ Error while checking ID.");
    }
  };

  // Validation
  const validateFields = () => {
    if (!userId || !password || !name || !phone || !email) {
      alert("All fields are required.");
      return false;
    }
    return true;
  };

  // Registration
  const handleJoin = async () => {
    if (!validateFields()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        userId,
        password,
        name,
        phone,
        email: user.email,
        createdAt: new Date(),
      });

      alert("🎉 Registration successful!");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* ID + 중복체크 */}
        <input
          type="text"
          placeholder="User ID"
          className="border p-2 w-full mb-2 rounded"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          onClick={checkIdDuplicate}
          className="bg-yellow-400 text-black px-4 py-1 w-full rounded mb-2 hover:bg-yellow-500"
        >
          Check ID Availability
        </button>
        <p className="text-sm mb-2 text-center">{idCheckResult}</p>

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Phone Number */}
        <input
          type="tel"
          placeholder="Phone Number"
          className="border p-2 w-full mb-4 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleJoin}
          className="bg-green-500 text-white px-4 py-2 w-full rounded hover:bg-green-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Join;
