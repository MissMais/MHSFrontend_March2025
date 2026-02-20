import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {url} from "../App"


export default function ForgotPassword() {
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();

  // const url = 'https://5d0abf24c6ce.ngrok-free.app/'
  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${url}mail/`, data,);
      console.log("******^^^^^^^^^^^^^^^^^^******",response.data);
      const old_otp = response.data['old_otp']
      console.log("OLD OTP", old_otp)
      navigate('/otp', { state: { old_otp } })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 w-full max-w-sm">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{ fontFamily: 'Papyrus' , color: "#666F80" }}
        >
          Forgot Password?
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="Current Password"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: 'Papyrus' , color: "#666F80" }}
            >
              Email
            </label>
            <input
              {...register("to", { required: "email is required" })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <small className="text-red-600">{errors.email.message}</small>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-2 px-4 rounded-md transition-colors mt-2"
            style={{ fontFamily: 'Papyrus'  }}
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
