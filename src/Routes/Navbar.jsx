import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
// import image from './../../assets/logo'
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('user');
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Timer for 5 minutes
    const timer = setTimeout(handleLogout, 300000);

    // Reset the timer if the user moves the mouse or types
    const resetTimer = () => {
      clearTimeout(timer);
      setTimeout(handleLogout, 300000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Cleanup on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [navigate]);

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 shadow z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 h-16 w-16">
            <Link to="/"><img src="./../../assets/logo.jpeg" alt="Logo" />
            </Link>
          </div>

          {/* Toggle Button for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className={`md:flex items-center space-x-6 ${isMenuOpen ? 'block mt-4 md:mt-0' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-700 font-medium">
              <li>
                <ScrollLink to="home" className="cursor-pointer hover:text-blue-600  " smooth={true} duration={200}>
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="shaam-e-roshan" className="cursor-pointer hover:text-blue-600" smooth={true} duration={200}>
                  Event
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="store" className="cursor-pointer hover:text-blue-600" smooth={true} duration={200}>
                  Store
                </ScrollLink>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <ScrollLink to="contact" className="cursor-pointer hover:text-blue-600" smooth={true} duration={200}>
                  Contact
                </ScrollLink>
              </li>

              {/* Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <CgProfile className="text-2xl ml-1" />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    <li>
                      <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/Signup" className="block px-4 py-2 hover:bg-gray-100">
                        SignUp
                      </Link>
                    </li>
                    <li>
                      <hr className="border-t my-1" />
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
