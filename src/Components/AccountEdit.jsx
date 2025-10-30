import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { url } from "../App";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function AccountEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [emailMessage, setEmailMessage] = useState("");
  const [custdata, setData] = useState({});
  const [Image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [card, setcard] = useState(false)   // for Mobile View
  const [card1, setcard1] = useState(false)  // for Desktop View
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    getUser();
  }, [id]);


  const getUser = async () => {
    try {
      const res = await axios.get(`${url}user/?id=${id}`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json',
        },
      });

      const userData = res.data[0];
      setData(userData);

      const imageRes = await axios.get(`${url}customer`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json',
        },
      });

      const filterimg = imageRes.data.find(item => item.User_id == id);
      if (filterimg) {
        setPreview(filterimg.Profile_picture);
      }

      reset({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // for instant preview
    }
    setcard(false)
    setcard1(false)
  };

  const onSubmit = async (formData) => {
    try {

      await axios.patch(`${url}user/`, { id, ...formData }, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json',
        },
      });


      if (Image) {
        const formDataImg = new FormData();
        formDataImg.append("id", id);
        formDataImg.append("Profile_picture", Image);

        await axios.put(`${url}customer/`, formDataImg, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // alert("Profile updated successfully!");
      toast.success("Profile updated successfully!")
      setTimeout(() => {
        navigate('/acc');
      }, 3000);

    } catch (error) {
      console.error(error);
      // alert("Failed to update profile");
    }
  };

  const firstLetter = custdata?.first_name?.[0] || "";

  const function1 = async () => {
    setcard(true)
    setcard1(true)
  }
  // console.log(Image)



  const deleteprofile = async () => {
    // console.log(id)
    try {
      const accesstoken = localStorage.getItem('AccessToken')
      // console.log(id)
      await axios.delete(`${url}customer/`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        data: id
      })
      setcard(false)
      setcard1(false)
      //  setImage(Image.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   deleteprofile()
  // }, [])

  useEffect(() => {
    const handleResize = () => {
      // console.log(window.innerWidth)
      setIsMobile(window.innerWidth < 768);
      setcard(false)
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className=" relative flex justify-center items-center min-h-screen px-4 mt-9">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
        >
          Edit Account
        </h2>



        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Picture */}
          <div className="flex flex-col justify-center items-center mb-4">
            <div className="flex items-center justify-center mb-2 rounded-full shadow-md shadow-[#FB6D6C] bg-[#FB6D6C] w-20 h-20 overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-3xl font-semibold text-white flex items-center justify-center">
                  {firstLetter}
                </div>
              )}
            </div>
            <div className='cursor-pointer font-semibold text-[#666F80]' onClick={function1}>
              Edit
            </div>

            {isMobile && <div>
              {card && (
                <div className="fixed inset-0 z-[9999] flex justify-center items-end bg-black/40">
                  {/* Background overlay */}
                  <div
                    className="absolute inset-0"
                    onClick={() => setcard(false)}
                  ></div>

                  {/* Bottom sheet */}
                  <div
                    className="relative w-full max-w-sm bg-white rounded-t-2xl shadow-lg p-6 animate-slideUp"
                  >
                    <div className="flex justify-between">
                      <button onClick={() => setcard(false)}>
                        <IoClose className="text-2xl text-[#666F80] hover:text-[#FB6D6C]" />
                      </button>
                      <button className="text-gray-400 hover:text-[#FB6D6C]" onClick={deleteprofile}>
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </div>

                    <div className="flex p-5 mt-5">
                      <label
                        htmlFor="Profile_picture"
                        className="text-xs mt-1 font-semibold text-[#666F80] cursor-pointer hover:text-[#FB6D6C] transition"
                        style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <CgProfile className="text-xl" /> Change Profile Picture
                        </div>
                      </label>
                      <input
                        id="Profile_picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
            }


            {!isMobile && <div>
              {card1 && (
                <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/40">
                  {/* Background overlay */}
                  <div
                    className="absolute inset-0"
                    onClick={() => setcard1(false)}
                  ></div>

                  {/* Bottom sheet */}
                  <div
                    className="relative w-full top-0 max-w-sm bg-white shadow-lg p-6 "
                  >
                    <div className="flex justify-between">
                      <button onClick={() => setcard1(false)}>
                        <IoClose className="text-2xl text-[#666F80] hover:text-[#FB6D6C]" />
                      </button>
                      <button className="text-gray-400 hover:text-[#FB6D6C]" onClick={deleteprofile}>
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </div>

                    <div className="flex p-5 mt-5">
                      <label
                        htmlFor="Profile_picture"
                        className="text-xs mt-1 font-semibold text-[#666F80] cursor-pointer hover:text-[#FB6D6C] transition"
                        style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <CgProfile className="text-xl" /> Change Profile Picture
                        </div>
                      </label>
                      <input
                        id="Profile_picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>}







          </div>



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
            {emailMessage && (
              <p className="text-red-600 mt-1" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
                {emailMessage}
              </p>
            )}
            {errors.email && <small className="text-red-600">{errors.email.message}</small>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-2 px-4 rounded-md transition-colors mt-2"
            style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
          >
            Save Changes
          </button>
        </form>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}