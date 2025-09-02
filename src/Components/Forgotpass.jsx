import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();

  const url = 'https://3j7gm770-8000.inc1.devtunnels.ms/'

  const onSubmit = async (data) => {

    try {
      console.log(data)
      const response = await axios.post(`${url}send/`, data,);
      // console.log(response.data);
      navigate('/otp')

    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
        >
          Forgot Password?
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="Current Password"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
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
            style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
