
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const url = 'https://06b01936de0f.ngrok-free.app/'
// "https://3j7gm770-8000.inc1.devtunnels.ms/"
// "https://wkvkk9t8-8000.inc1.devtunnels.ms/"
//  'https://modestgallery.pythonanywhere.com/';

export default function Login() {


  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${url}login/`, data);

      console.log(response.data.access)
      console.log(response.data.refresh)
      localStorage.setItem('AccessToken', response.data.access);
      localStorage.setItem('RefreshToken', response.data.refresh);
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('user', JSON.stringify({ email: response.data.email }));
      console.log(response.data.first_name)
      alert(response.data.message);


      if (from && from !== '/signup') {
        navigate(from, { replace: true }); //  Go back to where you came from
      } else {
        navigate('/', { replace: true });   //  Go to Home
      }
    } catch (error) {

      console.error(error);
      alert('Login failed! ');
      console.log(data)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold mb-6" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="formName" className="block text-sm font-bold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
              Email
            </label>
            <input
              {...register("email", { required: "email is required" })}
              type="text"
              id="formName"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <small className="text-red-600">{errors.email.message}</small>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="formpass" className="block text-sm font-bold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
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
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-2 px-4 rounded-md transition-colors mt-2"
            style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
          <small >
            Don't have an account?{" "}
            <a  href="/signup" className="text-[#FB6D6C] hover:underline" >
              Sign Up
            </a>
          </small>
        </div>
        <div className="text-center mt-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
          <small>
           
            <a href="/forgot" className="text-[#FB6D6C] hover:underline">
               Forgot Password?
            </a>
          </small>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}




// useEffect(() => {
//     const token = localStorage.getItem("AccessToken");
//     // if (!token) {
//     //     navigate("/login");
//     //     return;
//     // }

//     // Timer for 5 minutes
//     const timer = setTimeout(handleLogout, 300000);

//     // Reset the timer if the user moves the mouse or types
//     const resetTimer = () => {
//         clearTimeout(timer);
//         setTimeout(handleLogout, 300000);
//     };

//     window.addEventListener("mousemove", resetTimer);
//     window.addEventListener("keydown", resetTimer);

//     // Cleanup on unmount
//     //     return () => {
//     //         clearTimeout(timer);
//     //         window.removeEventListener("mousemove", resetTimer);
//     //         window.removeEventListener("keydown", resetTimer);
//     //     };
//     // }, [navigate]);
// })