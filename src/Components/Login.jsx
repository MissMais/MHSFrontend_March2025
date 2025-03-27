import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const onSubmit = async (data) => {
    try {
      // toast.success("Logged in Successfully");
      // Make your login API request
      const saveLogin = await axios.post(`${url}loginuser/`, data);
      localStorage.setItem('AccessToken', saveLogin.data.access);
      localStorage.setItem('RefreshToken', saveLogin.data.refresh);

      // navigate('/IMS') // Uncomment and use navigate if you need redirection
    } catch (error) {
      // toast.error("Login Failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="formName" className="form-label">Username</label>
            <input 
              {...register("username", { required: "Username is required" })} 
              type="text" 
              className="form-control" 
              id="formName" 
              placeholder="Enter your username" 
            />
            {errors.username && <small className="text-danger">{errors.username.message}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="formpass" className="form-label">Password</label>
            <input 
              {...register("password", { required: "Password is required" })} 
              type="password" 
              className="form-control" 
              id="formpass" 
              placeholder="Enter your password" 
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <small>Don't have an account? <a href="/register">Sign Up</a></small>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
