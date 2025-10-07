
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdHome } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../App"

import { MdAccountCircle } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { TbAddressBook } from "react-icons/tb";
// const url =
// "https://3j7gm770-8000.inc1.devtunnels.ms/address/"
// 'https://5d0abf24c6ce.ngrok-free.app/address/'
// https://modestgallery.pythonanywhere.com/address/
// const url2 =
// "https://3j7gm770-8000.inc1.devtunnels.ms/address"
// 'https://5d0abf24c6ce.ngrok-free.app/address/'



export default function Address() {
  const [address, setaddress] = useState([])
  const [selected, setSelected] = useState(null);
  const Navigate = useNavigate()


  useEffect(() => {
    fetchAddress();

    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    if (email) {
      const addressKey = `selectedAddress_${email}`;
      const savedAddress = localStorage.getItem(addressKey);
      if (savedAddress) {
        setSelected(JSON.parse(savedAddress));
      }
    }
  }, []);



  const User_id = localStorage.getItem("user_id")

  // useEffect(() => {
  //   ButtonDelete()
  // }, [])

  const handleSelect = (add) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    if (!email) {
      alert("Please login first.");
      Navigate("/login");
      return;
    }

    const addressKey = `selectedAddress_${email}`;
    localStorage.setItem(addressKey, JSON.stringify(add));
    setSelected(add);
    // console.log("Selected Address Saved Locally:", add);
  };



  const accessToken = localStorage.getItem("AccessToken")

  const fetchAddress = async () => {
    const response = await axios.get(`${url}address/`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json'
        },
      }
    )
    const fetcheddata = response.data
    const filtereddata = fetcheddata.filter(item => item.User_id == User_id)
    setaddress(filtereddata)
    // console.log(filtereddata)
  }

  useEffect(() => {
    fetchAddress();

  }, []);

  const Buttonadd = async () => {
    Navigate("/addaddress")
  }

  const ButtonDelete = async (id) => {
    const Payload = {
      Address_id: id
    }

    try {
      // console.log(id)
      await axios.delete(`${url}address/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        data: Payload
      })
    } catch (error) {
      console.log(error)
    }
  }


  const ButtonEdit = async (id) => {
    // console.log(id)
    Navigate('/editadd/' + id + '/')
  }


  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-14 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/6 bg-white p-6 shadow-md">
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
              className="block text-[#666F80] hover:text-[#FB6D6C] font-semibold transition-colors"
            >
              <span className="flex items-center gap-2 "><MdAccountCircle className="text-xl text-[#FB6D6C]" /> Profile settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/reset"
              className="block text-[#666F80] hover:text-[#FB6D6C] transition-colors"
            >
              <span className="flex items-center gap-2 "><TbLockPassword className="text-xl text-[#FB6D6C]" />Password</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Address"
              className="block text-[#FB6D6C] hover:text-[#FB6D6C] transition-colors"
            >
              <span className="flex items-center gap-2 "><TbAddressBook className="text-xl text-[#FB6D6C]" />Address</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      {/* <div><button className='cursor-pointer bg-red-500 text-white rounded-lg px-1 py-2 hover:bg-red-600 ' onClick={() => Buttonadd()}>add another address</button></div> */}
      <div className='p-6 md:w-5xl'>
        <div className="mb-6">
          <button
            onClick={() => Buttonadd()}
            className="w-full border border-[#FB6D6C] text-[#FB6D6C] bg-white font-semibold py-3 rounded-lg hover:bg-[#FB6D6C] hover:text-white transition"
            style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
          >
            + Add Address
          </button>
        </div>

        {address.map((add) => (
          <div key={add.Address_id} className='shadow-md p-7  mt-4 rounded-lg bg-white border-gray-200'>
            <div className='relative flex flex-col md:flex-row md:justify-between md:items-center'>



              <div className='font-semibold' style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: "#666F80" }} >
                <p className='text-2xl'>{add.Name}</p>
                <p>Address : <span className='text-gray-400'>{add.House_No}, {add.Area_Colony} </span></p>
                <p>City : <span className='text-gray-400'>{add.City} ({add.State}), {add.Country}</span></p>
                <p>Pincode : <span className='text-gray-400'>{add.Pincode}</span> </p>



                <div className="flex flex-wrap gap-3 mt-3 text-xs ">
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold text-white transition 
              ${selected?.Address_id === add.Address_id
                        ? "bg-[#da5e5d]"
                        : "bg-[#FB6D6C]"
                      }`}
                    onClick={() => handleSelect(add)}
                  >
                    {selected?.Address_id === add.Address_id ? "Selected" : "Select"}
                  </button>

                  <button
                    className="px-4 py-2 rounded-lg font-semibold bg-white text-[#FB6D6C] border border-[#FB6D6C] transition"
                    onClick={() => ButtonEdit(add.Address_id)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-4 py-2 rounded-lg font-semibold bg-[#666F80] text-white  transition"
                    onClick={() => ButtonDelete(add.Address_id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
              {add.Address_type.toLowerCase() === 'home' ? <MdHome className='absolute text-3xl top-0 right-0 ' /> : <HiOutlineOfficeBuilding className='absolute text-3xl top-0 right-0' />}

            </div>
          </div>



        ))}
      </div>
    </div>
  );
}
