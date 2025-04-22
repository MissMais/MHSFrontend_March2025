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

      // Save the tokens and user info to localStorage
      localStorage.setItem('AccessToken', response.data.access);
      localStorage.setItem('RefreshToken', response.data.refresh);
      localStorage.setItem('user', JSON.stringify({ username: data.username }));


      alert('Logged In Successfully');
      navigate('/home');
    } catch (error) {

      console.error(error);
      alert('Login failed! Please check your username and password.');

    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="formName" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              id="formName"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <small className="text-red-600">{errors.username.message}</small>
            )}
          </div>
  
          <div className="mb-4">
            <label htmlFor="formpass" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="formpass"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <small className="text-red-600">{errors.password.message}</small>
            )}
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors mt-2"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <small>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </small>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
