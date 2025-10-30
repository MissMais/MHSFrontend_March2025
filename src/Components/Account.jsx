import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { TbLockPassword, TbAddressBook } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../App";

export default function Account() {
  const [user, setUser] = useState({});
  const [Image, setImage] = useState([])
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem('AccessToken');
  const userid = localStorage.getItem("user_id");

  const headers = {
    Authorization: `Bearer ${accesstoken}`,
    "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${url}user/?id=${userid}`, { headers });
      setUser(data[0]);

      const image = await axios.get(`${url}customer`, { headers })
      const filterimage = image.data
      const filterimg = filterimage.filter(item => item.User_id == userid)
      setImage(filterimg[0])
    } catch (error) {
      console.error(error);
    }
  };

  const firstLetter = user.first_name?.[0] || "";

  const ToEdit = () => {
    navigate(`/accedit/${userid}`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-14 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/6 bg-white p-6 shadow-">
        <h2 className="text-xl md:text-base text-center font-bold mb-6" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>
          Account Settings
        </h2>
        <ul className="space-y-4 text-sm" style={{ fontFamily: 'Papyrus'  }}>
          <li>
            <Link to="/acc" className="block text-[#FB6D6C] hover:text-[#e95a59] font-semibold transition-colors">
              <span className="flex items-center gap-2">
                <MdAccountCircle className="text-xl text-[#FB6D6C]" /> Profile settings
              </span>
            </Link>
          </li>
          <li>
            <Link to="/reset" className="block text-[#666F80] hover:text-[#FB6D6C] transition-colors">
              <span className="flex items-center gap-2">
                <TbLockPassword className="text-xl text-[#FB6D6C]" /> Password
              </span>
            </Link>
          </li>
          <li>
            <Link to="/Address" className="block text-[#666F80] hover:text-[#FB6D6C] transition-colors">
              <span className="flex items-center gap-2">
                <TbAddressBook className="text-xl text-[#FB6D6C]" /> Address
              </span>
            </Link>
          </li>
        </ul>
        <br />
        <hr />
      </div>

      {/* Main Content */}
      <div className="w-full md:flex-1 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl text-center font-bold mb-6" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center text-center mb-8 rounded-full shadow-md shadow-[#FB6D6C] bg-[#FB6D6C] w-40 h-40 overflow-hidden">
            {Image?.Profile_picture ? (
              <img
                src={Image.Profile_picture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-6xl font-semibold text-white flex items-center justify-center">
                {firstLetter}
              </div>
            )}
          </div>
        </div>



        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>First Name</label>
            <input value={user.first_name || ""} disabled className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>Last Name</label>
            <input value={user.last_name || ""} disabled className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>Email</label>
            <input value={user.email || ""} disabled className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed" />
          </div>
        </div>

        <div className="mt-8">
          <button onClick={ToEdit} className="bg-[#FB6D6C] hover:bg-[#e95a59] text-white px-6 py-2 rounded-md font-semibold transition-colors"
            style={{ fontFamily: 'Papyrus'  }}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
