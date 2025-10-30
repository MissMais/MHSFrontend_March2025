import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../App"
import toast, { Toaster } from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TbLockPassword, TbAddressBook } from "react-icons/tb";


// const url = "https://5d0abf24c6ce.ngrok-free.app/";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(FaRegEyeSlash);

  const { handleSubmit, register, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    const accesstoken = localStorage.getItem("AccessToken")
    try {

      const response = await axios.post(`${url}changepassword/`, data,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      // alert('Password Changed Successfully');
      toast.success('Password Changed Successfully')
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      console.error(error);
      toast.error("Failed to Reset")
      // alert();
    }
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(FaRegEye);
      setType('text')
    } else {
      setIcon(FaRegEyeSlash)
      setType('password')
    }
  }

  return (
   <div className="flex flex-col md:flex-row min-h-screen mt-14 bg-gray-100">

      {/* Sidebar */}
      <div className="w-full md:w-1/6 bg-white p-6 shadow-md">
        <h2 className="text-xl md:text-base text-center font-bold mb-6" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
          Account Settings
        </h2>
        <ul className="space-y-4 text-sm" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
          <li>
            <Link to="/acc" className="block text-[#666F80]  hover:text-[#e95a59]  transition-colors">
              <span className="flex items-center gap-2">
                <MdAccountCircle className="text-xl text-[#FB6D6C]" /> Profile settings
              </span>
            </Link>
          </li>
          <li>
            <Link to="/reset" className="block  text-[#FB6D6C] hover:text-[#FB6D6C] font-semibold transition-colors">
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


   <div className='p-6 md:w-5xl mt-12'>
    <div className="flex justify-center items-center px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <div className="flex justify-between mb-6">
          <h2
            className="text-center text-2xl font-bold"
            style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
          >
            Reset Password
          </h2>
          <span class="flex justify-around items-center" onClick={handleToggle}>
            <div className="absolute mr-10 text-xl">{icon}</div>
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="Current Password"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              Current Password
            </label>
            <input
              {...register("old_password", { required: "Old Password is required" })}
              type={type}
              id="old_password"

              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.old_password && (
              <small className="text-red-600">{errors.old_password.message}</small>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="New Password"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              New Password
            </label>
            <input
              {...register("new_password", { required: "New Password is required" })}
              type={type}
              id="new_password"

              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.new_password && (
              <small className="text-red-600">{errors.new_password.message}</small>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="Confirm New Password"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              Confirm New Password
            </label>
            <input
              {...register("confirm_password", { required: "Confirm New Password is required" })}
              type={type}
              id="confirm_password"

              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm_password && (
              <small className="text-red-600">{errors.confirm_password.message}</small>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-2 px-4 rounded-md transition-colors mt-2"
            style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
          >
            Change
          </button>
        </form>

      </div>
      
    </div>
     </div>
    <Toaster position="bottom-center" reverseOrder={false} />
     </div>
  );
}