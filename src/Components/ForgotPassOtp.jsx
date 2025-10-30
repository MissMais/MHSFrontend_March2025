import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { url } from "../App";

export default function ForgotPassOtp() {
  const navigate = useNavigate();
  const [Otp, setOtp] = useState(["", "", "", ""]);
  const { handleSubmit } = useForm();


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...Otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);


    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      console.log(index)

      const newOtp = [...Otp];

      if (Otp[index]) {
        newOtp[index] = ""; // clear current
        setOtp(newOtp);

      } else if (index > 0) {
        // move focus to previous box
        e.target.previousSibling?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const onSubmit = async () => {
    const otp = Otp.join("");

    if (otp.length !== 4) {
      // alert("Please enter all 4 digits");
      return;
    }

    try {
      const response = await axios.post(`${url}verify/`, { otp });
      console.log(response.data)
      
      if (response.data === 'Invalid OTP') {
        // alert("Invalid OTP");
      } else {
        navigate("/changepass");
      }
    } catch (error) {
      console.error(error);
      // alert("Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{
            fontFamily: 'Papyrus' ,
            color: "#666F80",
          }}
        >
          Enter OTP
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3 mb-6 justify-center">
            {Otp.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FB6D6C]"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-2 px-4 rounded-md transition-colors mt-2"
            style={{ fontFamily: 'Papyrus'  }}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
