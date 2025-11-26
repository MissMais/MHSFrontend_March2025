import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App"
import { Country, State, City } from "country-state-city";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");

  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(FaRegEyeSlash);

  const navigate = useNavigate()


  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");


  const countries = Country.getAllCountries();
  const selectedCountry = Country.getCountryByCode(country);
  // console.log(selectedCountry?.name)

  const states = country ? State.getStatesOfCountry(country) : [];
  const selectedState = State.getStateByCodeAndCountry(state, country);
  // console.log(selectedState?.name)

  const cities = state ? City.getCitiesOfState(country, state) : [];
  const selectedCity = cities.find((c) => c.name === city);
  // console.log(selectedCity?.name)





  const onSubmit = async (data) => {
    // console.log(data)
    const formData = new FormData();


    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("contact", data.contact);
    formData.append("address_type", data.address_type);
    formData.append("house_no", data.house_no);
    formData.append("area_colony", data.area_colony);
    formData.append("landmark", data.landmark);
    formData.append("city", selectedCity?.name);
    formData.append("state", selectedState?.name);
    formData.append("country", selectedCountry?.name);
    formData.append("pincode", data.pincode);


    if (image) {
      formData.append("Profile_picture", image);
    } else {
      formData.append("Profile_picture", "");
    }

    try {
      const res = await axios.post(`${url}register/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log(res.data.error)

      if (res.status === 201 && res.data.message) {
        // alert(res.data.message);
        setErrorMessage("");
        setErrorMessage1("")
        navigate('/login');
        // reset();
      }

      toast.success("Signup Successfull");

      
    } catch (error) {
      // console.log(error.response)


      if (error.response?.data?.error == "Invalid contact number") {
        setErrorMessage1("")
        setErrorMessage(error.response?.data?.error);

      }
      else if (error.response?.data?.error == "UNIQUE constraint failed: MHSapp_customuser.email") {
        setErrorMessage("")
        setErrorMessage1(error.response?.data?.error)

      }
      


    }
  }

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(FaRegEye);
      setType('text')
    } else {
      setIcon(FaRegEyeSlash)
      setType('password')
    }
  }

  // console.log(errorMessage)
  // console.log(errorMessage1)

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    
    <div className="flex justify-center  min-h-screen bg-white mt-16">
      <div className="w-full max-w-2xl bg-white shadow-lg p-6 m-6">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Two-column row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-semibold tracking-wide"
                style={{ fontFamily: 'Papyrus' , color: '#666F80' }}
              >
                Select Profile Picture
              </label>

              <input
                {...register("Profile_picture", { required: false })}
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
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>First Name</label>
              <input
                {...register("first_name", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>Last Name</label>
              <input
                {...register("last_name", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>Email</label>
              <input font-bold
                {...register("email", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="email"
                required
              />
              {errorMessage1 && (
                <span className="text-red-600">Email already exists</span>
              )}
            </div>


            {/* Password */}
            <div>
              <label htmlFor="formpass" className="block text-sm font-bold mb-1" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>
                Password
              </label>
              <div className=" flex mb-4">

                <input
                  {...register("password", { required: "Password is required" })}
                  type={type}
                  id="formpass"

                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span class="flex justify-around items-center" onClick={handleToggle}>
                  <div className="absolute mr-10 text-lg">{icon}</div>
                </span>

              </div>
            </div>

            {/* Address & Contact */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> */}
            <div className="block">
              <label className="block text-gray-700">Contact</label>
              
              <input
                {...register("contact", {
                  required: true,
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                maxLength="10"
                inputMode="numeric"
                onInput={(e) => {
                  // only allow numbers
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                required
              />

              {errorMessage && (
                <span className="text-red-600">Invalid Contact Number</span>
              )}
              {/* <p>hello</p> */}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-5 text-center mt-10" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>Add Address</h2>

          {/* Two-column row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>Address Type</label>
              <input
                {...register("address_type", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>House No</label>
              <input
                {...register("house_no", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>Area/Colony</label>
              <input
                {...register("area_colony", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>Landmark</label>
              <input
                {...register("landmark", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>Country</label>
              <select
                {...register("country", { required: true })}
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState("");
                  setCity("");
                }}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>



            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>State</label>
              <select
                {...register("state", { required: true })}
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity("");
                }}
                disabled={!country}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700" style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>City</label>
              <select
                {...register("city", { required: true })}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!state}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
              >
                <option value="">Select City</option>
                {cities.map((ci) => (
                  <option key={ci.name} value={ci.name}>
                    {ci.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block font-bold text-gray-700"
                style={{ fontFamily: 'Papyrus' , color: '#666F80' }}
              >
                Pincode
              </label>

              <input
                {...register("pincode", {
                  required: true,
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                type="text"
                maxLength="6"
                inputMode="numeric"
                placeholder="Enter 6-digit pincode"
                onInput={(e) => {
                  // only allow numbers
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                required
              />
            </div>




            {/* </div> */}
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#FB6D6C] text-white py-2 mt-6 rounded-lg hover:bg-[#e95a59]"
            style={{ fontFamily: 'Papyrus'  }}
          >
            Signup
          </button>


          <p className="mt-3 text-center text-gray-600"
            style={{ fontFamily: 'Papyrus'  }}>
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
       <Toaster  position="bottom-center" reverseOrder={false} />
    </div>
  );
}
