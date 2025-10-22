import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App"

export default function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()
  // const url = "https://f7c671b11927.ngrok-free.app/"
  // "https://3j7gm770-8000.inc1.devtunnels.ms/register/"

  const onSubmit = async (data) => {

    const formData = new FormData();


    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("contact", data.contact);
    formData.append("address_type", data.address_type);
    formData.append("house_no", data.house_no);
    formData.append("area_colony", data.area_colony);
    formData.append("landmark", data.landmark);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("pincode", data.pincode);


    if (image) {
      formData.append("Profile_picture", image);
    } else {
      formData.append("Profile_picture", null);
      alert("Please select a profile picture.");
      return;
    }

    try {
      const res = await axios.post(`${url}register/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      if (res.status === 201 && res.data.message) {
        alert(res.data.message);
        setErrorMessage("");
        navigate('/login');
        reset();
      }

      else if (res.data.error) {
        setErrorMessage(res.data.error);
      }

    } catch (error) {
      // console.log(error.response)
      if (error.response?.data?.error) {

        setErrorMessage(error.response.data.error);
      } else {

        setErrorMessage("Signup failed. Please try again.");
      }

    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex justify-center  min-h-screen bg-white mt-16">
      <div className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-lg m-6">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Two-column row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-semibold tracking-wide"
                style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}
              >
                Select Profile Picture
              </label>

              <input
                {...register("Profile_picture")}
                type="file"
                onChange={handleImageChange}
                className="block w-full text-sm text-[#666F80] bg-[#F8FAFC]
                file:py-2 file:px-4 
               file:rounded-lg file:border-0 
               file:text-sm file:font-semibold 
               file:bg-[#E6EEF8] file:text-[#666F80] 
               hover:file:bg-[#D8E3F3] 
               cursor-pointer border border-[#D1D5DB] 
               rounded-xl shadow-sm
               focus:outline-none focus:ring-2 focus:ring-[#666F80] focus:border-blue-300
               transition duration-200"
              />
            </div>


            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>First Name</label>
              <input
                {...register("first_name", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Last Name</label>
              <input
                {...register("last_name", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Username</label>
              <input
                {...register("name", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Email</label>
              <input font-bold
                {...register("email", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="email"
                required
              />
            </div>


            {/* Password */}
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Password</label>
              <input
                {...register("password", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-600">{errorMessage}</p>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-5 text-center mt-10" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Add Address</h2>

          {/* Two-column row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Address Type</label>
              <input
                {...register("address_type", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>House No</label>
              <input
                {...register("house_no", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Area/Colony</label>
              <input
                {...register("area_colony", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Landmark</label>
              <input
                {...register("landmark", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>City</label>
              <input
                {...register("city", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>State</label>
              <input font-bold
                {...register("state", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Country</label>
              <input
                {...register("country", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Pincode</label>
              <input
                {...register("pincode", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
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
          {errorMessage && (
            <p className="text-red-600 text-center">{errorMessage}</p>
          )}

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
