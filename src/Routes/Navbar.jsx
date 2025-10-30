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
import { IoLogInOutline } from "react-icons/io5";
import { MdPersonAddAlt1 } from "react-icons/md";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { url } from "../App"
import Notification from "../Components/Notification";


export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("AccessToken"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [NotifsideBar, setNotifOpen] = useState(false);
  const [user, setuser] = useState({});
  const [Image, setImage] = useState([])
  const navigate = useNavigate();



  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("AccessToken"))
  })


  const handleLogout = async () => {
    const refresh = localStorage.getItem("RefreshToken")
    


    if (!refresh) {
      // alert("No refresh token found. Logging out...");
      localStorage.clear();
      navigate("/login");
      return;
    }


    const response = await axios.post(
      `${url}logout/`, { refresh: refresh },
    );

    if (response.status === 200) {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user");

      // alert(response.data)
      toast.success("Successfully Logged Out");
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } else {
      // alert("Failed to log out");
      toast.error("Failed to log out");
    }
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

    const image = await axios.get(`${url}customer`, { headers })
    const filterimage = image.data
    const filterimg = filterimage.filter(item => item.User_id == userid)
    setImage(filterimg[0])


  }

  useEffect(() => {
    if (localStorage.getItem("AccessToken")) {
      fetchuser();
    }
  }, [localStorage.getItem("AccessToken"), navigate]);


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
  const firstLetter = user.first_name?.[0] || "";


  const function2 = async () => {
    setNotifOpen(true)
    setSidebarOpen(false)

  }

  const function1 = async () => {
    setNotifOpen(false)
    setSidebarOpen(true)
  }


  const linkClasses =
    "block py-1 px-2 text-[13px] sm:py-2 sm:px-4 sm:text-base text-[#FFFFFF] hover:text-[#FB6D6C] font-bold cursor-pointer";


  const linkClasses1 =
    "block py-1 px-2 text-[13px] sm:py-2 sm:px-4 sm:text-base text-[#666F80] hover:text-[#FB6D6C] font-bold cursor-pointer";


  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-400 fixed top-0 left-0 right-0 shadow z-[9999]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 md:h-14 md:w-14 h-12 w-12">
              <Link to="/" className="no-underline">
                <img src="/logo.jpeg" alt="Logo" className="object-cover rounded-full h-full w-full" />
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

              {/* Profile Icon */}
              <li>
                {loggedIn ? (
                  <div>
                    <button onClick={() => setSidebarOpen(true)} className="text-[#666F80] hover:text-[#FB6D6C] cursor-pointer">
                      <div className="flex items-center justify-center mt-2 mb-2 ml-2 rounded-full bg-[#FB6D6C] w-7 h-7 overflow-hidden">
                        {Image?.Profile_picture ? (
                          <img
                            src={Image.Profile_picture}

                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-xs font-semibold text-white flex items-center justify-center">
                            {firstLetter}
                          </div>
                        )}
                      </div>
                    </button>
                  </div>) : (
                  <div className="cursor-pointer">
                    <CgProfile className="text-xl" onClick={() => setSidebarOpen(true)} />
                  </div>
                )}

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
            <button onClick={function1}>
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
                style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: '#666F80' }}>Account</h2>
                
              <button onClick={() => setSidebarOpen(false)}>
                <IoClose className="text-2xl text-[#666F80] hover:text-[#FB6D6C]" />
              </button>
            </div>
            <hr />

            <div className="flex flex-col gap-3 mt-1">
              {loggedIn ? (
                <>
                  {/* Profile Image */}


                  <div className="flex items-center gap-2 py-1">
                    <div className="flex items-center justify-center mb-2 rounded-full shadow-md shadow-[#FB6D6C] bg-[#FB6D6C] w-16 h-16 overflow-hidden">
                      {Image?.Profile_picture ? (
                        <img
                          src={Image.Profile_picture}

                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-xl font-semibold text-white flex items-center justify-center">
                          {firstLetter}
                        </div>
                      )}
                    </div>

                    <div
                      className="flex font-bold text-[#666F80]"
                      style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                    >
                      {fullname || "Unknown"}
                    </div>
                  </div>

                  <hr />
                  <Link
                    to="/acc"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses1}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><MdAccountCircle className="text-xl text-[#FB6D6C]" /> My Space</span>
                  </Link>
                  <Link
                    to="/history"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses1}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><MdHistory className="text-xl text-[#FB6D6C]" /> Order History</span>
                  </Link>
                  <Link
                    to="/Cart"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses1}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><IoCartSharp className="text-xl text-[#FB6D6C]" /> My Cart</span>
                  </Link>
                  <Link
                    to="/Wish"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses1}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2 "><IoHeartOutline className="text-xl text-[#FB6D6C]" /> Wish List</span>
                  </Link>

                  {/* Notification Icon */}
                  <p className={linkClasses1}>
                    <button onClick={function2} className="text-[#666F80] hover:text-[#FB6D6C] cursor-pointer">
                      <span className="flex items-center gap-2 "><IoNotificationsSharp className="text-xl text-[#FB6D6C]" /> Notification</span>
                    </button>
                  </p>

                  <hr />
                  <button
                    onClick={handleLogout}
                    className={linkClasses1 + " text-left w-full"}
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
                    className={linkClasses1} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2"><IoLogInOutline className="text-2xl text-[#FB6D6C]" />Login</span>
                  </Link>
                  <Link
                    to="/Signup"
                    onClick={() => setSidebarOpen(false)}
                    className={linkClasses1} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                  >
                    <span className="flex items-center gap-2"><MdPersonAddAlt1 className="text-2xl text-[#FB6D6C]" />SignUp</span>
                  </Link>
                </>
              )}
            </div>

          </div>
          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
      )}
    </>
  );
}