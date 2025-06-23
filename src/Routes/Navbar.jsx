import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("AccessToken"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("AccessToken"))
  })


  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setSidebarOpen(false);
    alert("Logged Out Successfully");
    navigate("/login");
  };

  const linkClasses =
    "block py-1 px-2 text-xs sm:py-2 sm:px-4 sm:text-base text-gray-700 hover:text-[#FB6D6C] font-bold";

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white fixed top-0 left-0 right-0 shadow z-[9999]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16">
              <Link to="/" className="no-underline">
                <img src="/logo.jpeg" alt="Logo" className="object-cover h-full w-full" />
              </Link>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-row gap-1 sm:gap-6 items-center text-gray-700 font-medium">
              <li>
                <Link to="/home">
                  <span className={linkClasses} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                    Home
                  </span>
                </Link>
              </li>
              <li style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                {location.pathname === "/home" ? (
                  <ScrollLink to="shaam-e-roshan" smooth={true} duration={200}>
                    <span className={linkClasses}>Event</span>
                  </ScrollLink>
                ) : (
                  <Link to="/home#shaam-e-roshan" >
                    <span className={linkClasses} >Event</span>
                  </Link>
                )}
              </li>

              <li style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                {location.pathname === "/home" ? (
                  <ScrollLink to="store" smooth={true} duration={200}>
                    <span className={linkClasses}>Store</span>
                  </ScrollLink>
                ) : (
                  <Link to="/home#store" >
                    <span className={linkClasses} >Store</span>
                  </Link>
                )}
              </li>
              <li>
                <Link to="/about">
                  <span className={linkClasses} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                    About
                  </span>
                </Link>
              </li>
              <li>
                <ScrollLink to="contact" smooth={true} duration={200}>
                  <span className={linkClasses} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                    Contact
                  </span>
                </ScrollLink>
              </li>

              {/* Profile Icon */}
              <li>
                <button onClick={() => setSidebarOpen(true)} className="text-gray-700 hover:text-[#FB6D6C]">
                  <CgProfile className="text-2xl" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Profile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[9998]">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Profile</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <IoClose className="text-2xl text-gray-700 hover:text-red-500" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {loggedIn ? (
                <>
                  <Link
                    to="/acc"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    Account
                  </Link>
                  <Link
                    to="/history"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    Order History
                  </Link>
                  <Link
                    to="/Cart"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    My Cart
                  </Link>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className={linkClasses + " text-left w-full"}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    Login
                  </Link>
                  <Link
                    to="/Signup"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
