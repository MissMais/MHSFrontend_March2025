import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { url } from "../App";

export default function AccountEdit() {
  const navigate = useNavigate();
  const { id } = useParams();  
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [emailMessage, setEmailMessage] = useState(""); 

  useEffect(() => {
    getUser();
  }, [id]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${url}user/?id=${id}`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json'
        }
      });

      if (data && data.length > 0) {
        reset({
          first_name: data[0].first_name,
          last_name: data[0].last_name,
          email: data[0].email
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      await axios.patch(`${url}user/`, { id, ...formData }, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json'
        }
      });
      alert("Profile updated successfully!");
      navigate('/acc');
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold mb-6" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
          Edit Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
              First Name
            </label>
            <input
              {...register("first_name", { required: "First Name is required" })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
            />
            {errors.first_name && <small className="text-red-600">{errors.first_name.message}</small>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
              Last Name
            </label>
            <input
              {...register("last_name", { required: "Last Name is required" })}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
            />
            {errors.last_name && <small className="text-red-600">{errors.last_name.message}</small>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              readOnly
              onClick={() => setEmailMessage("Email cannot be changed")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80] cursor-not-allowed"
            />
            {/* Red paragraph for email message */}
            {emailMessage && (
              <p className="text-red-600 mt-1" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                {emailMessage}
              </p>
            )}
            {errors.email && <small className="text-red-600">{errors.email.message}</small>}
          </div>

          <button type="submit" className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-2 px-4 rounded-md transition-colors mt-2" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
