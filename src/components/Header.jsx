// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/mealpal-logo.png";

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-[100] px-6 py-4 relative">
      {/* Top bar layout */}
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 hover:opacity-80 transition mr-4">
          <img
            src={logoImg}
            alt="MealPal Logo"
            className="w-[140px] object-contain"
          />
        </Link>

        {/* Search bar */}
        <div className="flex items-center flex-grow max-w-[900px] mx-6 border-2 border-orange-400 rounded-xl overflow-hidden h-[60px]">
          <input
            type="text"
            placeholder="Find a recipe or ingredient"
            className="flex-grow px-5 text-base h-full focus:outline-none"
          />
          <button className="bg-orange-500 px-6 text-white text-lg hover:bg-orange-600 h-full">
            🔍
          </button>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3 text-sm font-medium whitespace-nowrap ml-6">
          <Link to="/mypage" className="hover:text-orange-500">My Page&nbsp;</Link>
          <span className="text-gray-400">|</span>
          {isLoggedIn ? (
            <button
  onClick={handleLogout}
  className="hover:text-orange-500 bg-transparent border-none p-0 m-0"
>
  &nbsp;Log Out
</button>
          ) : (
            <Link to="/login" className="hover:text-orange-500">&nbsp;Log In</Link>
          )}
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex justify-center items-center text-xl font-bold text-black uppercase tracking-wide py-3">
        <span className="hover:text-orange-500 cursor-pointer mx-4">Dinners</span>
        <span className="text-gray-400 mx-4">&nbsp;|&nbsp;</span>
        <span className="hover:text-orange-500 cursor-pointer mx-4">Meals</span>
        <span className="text-gray-400 mx-4">&nbsp;|&nbsp;</span>
        <span className="hover:text-orange-500 cursor-pointer mx-4">Ingredients</span>
        <span className="text-gray-400 mx-4">&nbsp;|&nbsp;</span>

        {/* Dropdown container */}
        <div className="relative group mx-4">
          <span className="hover:text-orange-500 cursor-pointer">Cuisines</span>
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2
              text-white text-sm border shadow-md rounded-md w-40
              hidden group-hover:block z-[9999]"
            style={{ backgroundColor: 'white' }}
          >
            <div className="px-4 py-2 hover:bg-orange-500 cursor-pointer">Mexican</div>
            <div className="px-4 py-2 hover:bg-orange-500 cursor-pointer">Italian</div>
            <div className="px-4 py-2 hover:bg-orange-500 cursor-pointer">Korean</div>
          </div>
        </div>

        <span className="text-gray-400 mx-4">&nbsp;|&nbsp;</span>
        <span className="hover:text-orange-500 cursor-pointer mx-4">Kitchen Tips</span>
        <span className="text-gray-400 mx-4">&nbsp;|&nbsp;</span>
        <span className="hover:text-orange-500 cursor-pointer mx-4">News</span>
        <span className="text-gray-400 mx-4">&nbsp;|&nbsp;</span>
        <span className="hover:text-orange-500 cursor-pointer mx-4">Features</span>
        <span className="text-gray-400 mx-4">&nbsp;|&nbsp;</span>
        <span className="hover:text-orange-500 cursor-pointer mx-4">About Us</span>
      </nav>
    </header>
  );
}

export default Header;
