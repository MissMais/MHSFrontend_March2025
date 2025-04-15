import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";

const url = 'https://modestgallery.pythonanywhere.com/';

export default function Login() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${url}login/`, data);

      const expiry_time = Date.now() + 1 * 60 * 1000;

      localStorage.setItem('AccessToken', response.data.access);
      localStorage.setItem('RefreshToken', response.data.refresh);
      localStorage.setItem('user', JSON.stringify({ username: data.username }));
      localStorage.setItem('tokenExpiry', expiry_time);

      alert('Logged In Successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed! Please check your username and password.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="formName" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              id="formName"
              placeholder="Enter your username"
            />
            {errors.username && <small className="text-red-500 text-sm">{errors.username.message}</small>}
          </div>

          <div className="mb-4">
            <label htmlFor="formpass" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              id="formpass"
              placeholder="Enter your password"
            />
            {errors.password && <small className="text-red-500 text-sm">{errors.password.message}</small>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          Don't have an account? <a href="/Signup" className="text-blue-600 hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
}
