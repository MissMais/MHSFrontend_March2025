import React, { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('user');
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("AccessToken");

  useEffect(() => {
    let timer = setTimeout(handleLogout, 600000);
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleLogout, 600000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [navigate, isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuClasses = isMenuOpen
    ? "flex flex-col absolute top-16 left-0 w-full bg-white shadow p-4 z-50 md:static md:flex md:flex-row md:items-center md:space-x-6 md:p-0"
    : "hidden md:flex md:flex-row md:items-center md:space-x-6 md:static md:w-auto md:bg-transparent md:shadow-none md:p-0";



  const linkClasses = "block py-2 px-2 text-gray-700 hover:text-[#FB6D6C]";


  return (
    <nav className="bg-white fixed top-0 left-0 right-0 shadow z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 h-16 w-16">
            <Link to="/" className="no-underline">
              <img src="./../../public/logo.jpeg" alt="Logo" />
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none p-2 rounded hover:bg-gray-200"
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
          <div className={menuClasses}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-700 font-medium w-full md:w-auto">
              <li>
                <ScrollLink to="home" smooth={true} duration={200}>
                  <span className={linkClasses}>Home</span>
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="shaam-e-roshan" smooth={true} duration={200} >
                  <span className={linkClasses}>Event</span>
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="store" smooth={true} duration={200} >
                  <span className={linkClasses}>Store</span>
                </ScrollLink>
              </li>
              <li>
                <Link to="/about" >
                  <span className={linkClasses}>About</span></Link>
              </li>
              <li>
                <ScrollLink to="contact" smooth={true} duration={200} >
                  <span className={linkClasses}>Contact</span>
                </ScrollLink>
              </li>

              {/* Dropdown */}
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <CgProfile className="text-2xl ml-1" />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    {isLoggedIn ? (
                      <li>
                        <button
                          onClick={handleLogout}

                        >
                          <span className={linkClasses}>Logout</span>

                        </button>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to="/login" className={linkClasses}>
                            <span className={linkClasses}>Login</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/Signup" className={linkClasses}>
                            <span className={linkClasses}>SignUp</span>
                          </Link>
                        </li>
                      </>
                    )}
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

