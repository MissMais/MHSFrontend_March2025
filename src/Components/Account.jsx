import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {url} from "../App"


// const url = "https://5d0abf24c6ce.ngrok-free.app/"



export default function Account() {
  const [user, setuser] = useState({});
  const Navigate = useNavigate()

const accesstoken = localStorage.getItem('AccessToken')

  const headers = {
     Authorization: `Bearer ${accesstoken}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
  }

const fetchuser = async()=>{
  const userid = localStorage.getItem('user_id')
  const userdata = await axios.get(`${url}user/?id=${userid}`,{headers})
  
  console.log(userdata.data[0].first_name[0])
  setuser(userdata.data[0])


}

useEffect(()=>{
  fetchuser()
},[])



 const ToEdit =async()=>{
  Navigate('/accedit')

 }

const fullname = user.first_name
const firstletter =  fullname?.[0]
console.log(firstletter)
 

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-14 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/6 bg-white p-6 shadow-">
        <h2
          className="text-xl font-bold mb-6"
          style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
        >
          Account Settings
        </h2>
        <ul className="space-y-4 text-sm" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
          <li>
            <Link
              to="/acc"
              className="block text-[#FB6D6C] hover:text-[#e95a59] font-semibold transition-colors"
            >
              Profile settings
            </Link>
          </li>
          <li>
            <Link
              to="/reset"
              className="block text-gray-600 hover:text-[#FB6D6C] transition-colors"
            >
              Password
            </Link>
          </li>
          <li>
            <Link
              to="/Address"
              className="block text-gray-600 hover:text-[#FB6D6C] transition-colors"
            >
              Address
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:flex-1 p-8 bg-white shadow-md rounded-md">
        {/* {user.map((order,index) => ( */}
          <div>
            <h1
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              Profile
            </h1>

            {/* Profile Image */}
            <div className="flex items-center justify-center mb-8 gap-6 rounded-full shadow-md shadow-black bg-[#FB6D6C] w-40 h-40 object-cover">
             <div className="text-6xl font-semibold text-white">{firstletter}</div>
            </div>

            {/* Profile Info Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
                  First Name
                </label>
                <input
                  value={user.first_name || ''}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 " style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
                  Last Name
                </label>
                <input
                  value={user.last_name || ''}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
                  Email
                </label>
                <input
                  value={user.email || ''}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-semibold mb-1" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
                  Phone
                </label>
                <input
                  value={order.phone}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                />
              </div> */}
            </div>

            <div className="mt-8">
              <button onClick={()=>ToEdit()} className="bg-[#FB6D6C] hover:bg-[#e95a59] text-white px-6 py-2 rounded-md font-semibold transition-colors" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  );
}
