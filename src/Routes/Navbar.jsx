import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

import axios from "axios";
import { url } from "../App"
import Notification from "../Components/Notification";


export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("AccessToken"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [NotifsideBar, setNotifOpen] = useState(false);
  const [user, setuser] = useState({});
  const navigate = useNavigate();

  // const url =
  // "https://5d0abf24c6ce.ngrok-free.app/logout/"
  // "https://3j7gm770-8000.inc1.devtunnels.ms/logout/"

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("AccessToken"))
  })


  const handleLogout = async () => {
    const refresh = localStorage.getItem("RefreshToken")
    // localStorage.removeItem("AccessToken");
    // localStorage.removeItem("RefreshToken");
    // localStorage.removeItem("user");
    // localStorage.removeItem("user_id");
    //  localStorage.removeItem("cart_mohdadan@gmail.com")
  
    if (!refresh) {
      alert("No refresh token found. Logging out...");
      localStorage.clear();
      navigate("/login");
      return;
    }

    // try {
    const response = await axios.post(
      `${url}logout/`, { refresh: refresh },
    );

    if (response.status === 200) {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("user");
    
      alert(response.data)
      navigate("/login");
    } else {
      alert("Failed to log out");
    }
    // } catch (error) {
    //   if (error.response.status === 404) {
    //     localStorage.removeItem("AccessToken");
    //     localStorage.removeItem("RefreshToken");
    //     localStorage.removeItem("user");
    //     alert("Session expired. Logged out.");
    //     navigate("/login");
    //   } else {
    //     alert("Logout failed due to network or server error");
    //     console.error(error);
    //   }
    // }








    // ⏱️ Auto logout when access token expires
    // const decoded = jwtDecode(accessToken);
    // const expiryTime = decoded.exp * 1000; // exp is in seconds
    // const timeUntilExpiry = expiryTime - Date.now();


    //  setTimeout(() => {
    //   localStorage.removeItem("AccessToken");
    //   localStorage.removeItem("RefreshToken");
    //   localStorage.removeItem("user");
    //   alert("Session expired. Logged out.");
    //   navigate("/login");
    // }, timeUntilExpiry);

  };

const accesstoken = localStorage.getItem('AccessToken')

  const headers = {
    Authorization: `Bearer ${accesstoken}`,
    "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
  }


  const fetchuser = async () => {
    const userid = localStorage.getItem('user_id')
    const userdata = await axios.get(`${url}user/?id=${userid}`, { headers })

    // console.log(userdata.data[0].first_name[0])
    setuser(userdata.data[0])


  }

  useEffect(() => {
    fetchuser()
  }, [])

  const firstname = user?.first_name
  const firstletter = firstname?.[0]
  // console.log(firstletter)

  // const firstname = user?.first_name;
const lastname = user?.last_name;
const fullname =
  firstname && lastname
    ? `${firstname} ${lastname}`
    : firstname || lastname || undefined;

  // console.log(fullname)

  const linkClasses =
    "block py-1 px-2 text-[8px] sm:py-2 sm:px-4 sm:text-base text-[#666F80] hover:text-[#FB6D6C] font-bold cursor-pointer";

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
            <ul className="flex flex-row gap-1 sm:gap-6 items-center text-[#666F80] font-medium">
              <li>
                <Link to="/home">
                  <span className={linkClasses} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/events">
                  <span className={linkClasses} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                    Event
                  </span>
                </Link>
              </li >

              <li>
                <Link to="/ProductPage">
                  <span className={linkClasses} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                    Store
                  </span>
                </Link>
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
              {/* Notification Icon */}
              <li>
                <button onClick={() => setNotifOpen(true)} className="text-[#666F80] hover:text-[#FB6D6C]">
                  <IoNotificationsSharp className="text-xl" />
                </button>
              </li>
              {/* Profile Icon */}
              <li>
                <button onClick={() => setSidebarOpen(true)} className="text-[#666F80] hover:text-[#FB6D6C]">
                  <CgProfile className="text-xl" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {NotifsideBar && (
        <div className="fixed inset-0 z-[9999]">

          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setNotifOpen(false)}
          ></div>

          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-6 flex flex-col overflow-y-scroll">
            <button onClick={() => setNotifOpen(false)}>
              <IoClose className="text-2xl text-[#666F80] hover:text-[#FB6D6C]" />

            </button>
            <div className="flex justify-between items-center mb-4">
              <Notification />
            </div>
          </div>
        </div>
      )}

      {/* Profile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col overflow-y-scroll">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold"
                style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: '#666F80' }}>Profile</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <IoClose className="text-2xl text-[#666F80] hover:text-[#FB6D6C]" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {loggedIn ? (
                <>
                  <div  className="flex items-center gap-2 py-1">
                    <div className="flex items-center justify-center rounded-full shadow-md shadow-black bg-[#FB6D6C] w-10 h-10 object-cover">
                      <div className="text-xl font-semibold text-white">{firstletter}</div>
                      
                    </div>
                    <div className="flex font-bold text-[#666F80]"
                     style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                      {fullname ? fullname : "Unknown"}
                    </div>
                  </div>
                  <hr />
                  <Link
                    to="/acc"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><MdAccountCircle className="text-xl text-[#FB6D6C]" /> Account</span>
                  </Link>
                  <Link
                    to="/history"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><MdHistory className="text-xl text-[#FB6D6C]" /> Order History</span>
                  </Link>
                  <Link
                    to="/Cart"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><IoCartSharp className="text-xl text-[#FB6D6C]" /> My Cart</span>
                  </Link>
                  <Link
                    to="/Wish"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><IoHeartOutline className="text-xl text-[#FB6D6C]" /> Wish List</span>
                  </Link>

                  <hr />
                  <button
                    onClick={handleLogout}
                    className={linkClasses + " text-left w-full"}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><IoLogOutOutline className="text-xl text-[#FB6D6C]" />Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/Signup"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
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
