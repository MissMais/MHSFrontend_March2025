import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "https://3j7gm770-8000.inc1.devtunnels.ms/";

export default function ResetPassword() {
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${url}reset-password/`, data);
      console.log(response.data);
      alert('Password reset link sent to your email');
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Failed to send reset link. Check the email.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
        >
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
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
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-4">
          <small style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
            Remember your password?{" "}
            <a href="/login" className="text-[#FB6D6C] hover:underline">
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
