import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {url} from "../App"
import toast, { Toaster } from "react-hot-toast";

// const url = "https://5d0abf24c6ce.ngrok-free.app/";

export default function ForgotPassChange() {
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();


  const onSubmit = async (data) => {

    try {
    
      const response = await axios.post(`${url}forget/`, data,);
      console.log(response.data)      
      toast.success('Password Change Successfully')
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to Reset")
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 w-full max-w-sm">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{ fontFamily: 'Papyrus' , color: "#666F80" }}
        >
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="New Password"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: 'Papyrus' , color: "#666F80" }}
            >
              New Password
            </label>
            <input
              {...register("new_password", { required: "New Password is required" })}
              type="password"
              id="new_password"
              placeholder="Enter your New Password"
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
              style={{ fontFamily: 'Papyrus' , color: "#666F80" }}
            >
              Confirm New Password
            </label>
            <input
              {...register("confirm_password", { required: "New Password is required" })}
              type="password"
              id="confirm_password"
              placeholder="Enter your New Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm_password && (
              <small className="text-red-600">{errors.confirm_password.message}</small>
            )}
          </div>



          <button
            type="submit"
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-2 px-4 rounded-md transition-colors mt-2"
            style={{ fontFamily: 'Papyrus'  }}
          >
            Change
          </button>
        </form>

      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
