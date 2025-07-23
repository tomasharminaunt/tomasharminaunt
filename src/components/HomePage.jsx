// src/components/HomePage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 (기본값은 true로 테스트)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      <main className="mt-24">
        <section className="p-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Top Recipes</h2>
          <div className="grid grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* 카드 3개 */}
            <div className="w-64 mx-auto rounded overflow-hidden shadow bg-white">
              <img
                src="/images/recipe1.jpg"
                alt="Key Lime Pie"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Key Lime Pie</h3>
                <p className="text-sm text-gray-500">So Easy and So Yummy</p>
              </div>
            </div>

            <div className="w-64 mx-auto rounded overflow-hidden shadow bg-white">
              <img
                src="/images/recipe2.jpg"
                alt="Green Salad"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Green Salad</h3>
                <p className="text-sm text-gray-500">Fresh and Healthy</p>
              </div>
            </div>

            <div className="w-64 mx-auto rounded overflow-hidden shadow bg-white">
              <img
                src="/images/recipe3.jpg"
                alt="Tres Leches Cake"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Tres Leches Cake</h3>
                <p className="text-sm text-gray-500">Sweet and Creamy</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-6 border-t text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
          <p className="mt-1">
            Don't have an account?{" "}
            <Link to="/join" className="text-blue-500 hover:underline">
              Join
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
