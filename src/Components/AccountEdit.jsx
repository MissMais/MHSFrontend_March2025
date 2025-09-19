import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {url} from "../App"


// const url = "https://5d0abf24c6ce.ngrok-free.app/"

export default function AccountEdit() {
  const navigate = useNavigate();
  let params = useParams()
  const { handleSubmit, register, reset, formState: { errors } } = useForm();


  useEffect(() => {
    getuser()
  }, [])



  const userid = JSON.parse(localStorage.getItem('user_id'))
  const onSubmit = async (data) => {


    const Payload = {
      id: userid,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    }


    try {
      await axios.patch(`${url}/user/`,
        Payload,
        {
          headers: {
            // Authorization: `Bearer ${accesstoken}`,
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json'
          }
        }
      )
      console.log(data)
      reset(data)
      navigate('/acc')

    } catch (error) {
      console.error(error);
      alert("Failed to Reset");
    }
  };



  const getuser = async () => {

    try {
      const Data = await axios.get("https://954b3107d62b.ngrok-free.app/user/?id=" + userid,
        {
          headers: {
            // Authorization: `Bearer ${accesstoken}`,
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json'
          }
        }
      )
      // setdata(Data.data)
      console.log(Data.data[0].first_name)

      reset({
        first_name: Data.data[0].first_name,
        last_name: Data.data[0].last_name,
        email: Data.data[0].email
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
        >
          Edit Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="First Name"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              First Name
            </label>
            <input
              {...register("first_name", { required: "First Name is required" })}
              type="text"
              id="first_name"
              placeholder="Enter your First Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.first_name && (
              <small className="text-red-600">{errors.first_name.message}</small>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="Last Name"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              Last Name
            </label>
            <input
              {...register("last_name", { required: "Last Name is required" })}
              type="text"
              id="last_name"
              placeholder="Enter your Last Name"

              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.last_name && (
              <small className="text-red-600">{errors.last_name.message}</small>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-sm font-bold mb-1"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder="Enter Your Email"
              disabled
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              cursor-not-allowed"
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
            Change
          </button>
        </form>

      </div>
    </div>
  );
}
