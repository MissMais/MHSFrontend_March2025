import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import {url} from "../App"

export default function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
const navigate = useNavigate()
  // const url = "https://f7c671b11927.ngrok-free.app/"
  // "https://3j7gm770-8000.inc1.devtunnels.ms/register/"

  const onSubmit = async (data) => {
    try {
      

      console.log(data);
       await axios.post(`${url}signup/`, data);

      
      alert("Signup successful!");
      navigate('/login')
      
      // reset();
    } catch (error) {
      console.error(error);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center  min-h-screen bg-white mt-16">
      <div className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-lg m-6">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Two-column row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>First Name</label>
              <input
                {...register("first_name", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Last Name</label>
              <input
                {...register("last_name", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Username</label>
              <input
                {...register("Name", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Email</label>
              <input font-bold
                {...register("email", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                required
              />
            </div>


            {/* Password */}
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Password</label>
              <input
                {...register("password", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                required
              />
            </div>

            {/* Address & Contact */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> */}
            <div>
              <label className="block text-gray-700">Contact</label>
              <input
                {...register("contact", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            {/* <div>
              <label className="block text-gray-700">House No</label>
              <input
                {...register("house_no", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div> */}
            {/* <div>
              <label className="block text-gray-700">Area/Colony</label>
              <input
                {...register("area_colony", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div> */}
            {/* <div>
              <label className="block text-gray-700">Landmark</label>
              <input
                {...register("landmark", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input
                {...register("city", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <input
                {...register("state", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                {...register("ountry", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Pincode</label>
              <input
                {...register("Pincode", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Address Type</label>
              <input
                {...register("address_type", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div> */}
            {/* </div> */}
          </div>
          {/* Button */}
          {/* <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-6 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>

          <p className="mt-3 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p> */}


          {/* {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )} */}


          <h2 className="text-2xl font-bold mb-5 text-center mt-10" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Add Address</h2>

          {/* Two-column row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Address Type</label>
              <input
                {...register("Address_type", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>House No</label>
              <input
                {...register("House_No", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Area/Colony</label>
              <input
                {...register("Area_Colony", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Landmark</label>
              <input
                {...register("Landmark", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>City</label>
              <input
                {...register("City", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>State</label>
              <input font-bold
                {...register("State", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Country</label>
              <input
                {...register("Country", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Pincode</label>
              <input
                {...register("Pincode", { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                required
              />
            </div>

            {/* </div> */}
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#FB6D6C] text-white py-2 mt-6 rounded-lg hover:bg-[#e95a59]"
            style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
          >
            Signup
          </button>

          <p className="mt-3 text-center text-gray-600"
          style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
            Already have an account?{" "}
            <a href="/login" className="text-[#FB6D6C] hover:underline">
              Login
            </a>
          </p>




        </form>
        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
