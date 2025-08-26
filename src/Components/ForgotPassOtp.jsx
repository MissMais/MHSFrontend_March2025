import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ForgotPassOtp() {
  const navigate = useNavigate();
  const { handleSubmit, register, getValues } = useForm();

  const url = "https://3j7gm770-8000.inc1.devtunnels.ms/";

  const onSubmit = async () => {
    const { d1, d2, d3, d4 } = getValues();
    const otp = `${d1}${d2}${d3}${d4}`;

    if (otp.length !== 4) {
      alert("Please enter all 4 digits");
      return;
    }

    try {
      const response = await axios.post(`${url}verify/`, { otp });
    //   console.log(response.data);
      navigate("/changepass");
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };





  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{
            fontFamily: "Copperplate, Papyrus, fantasy",
            color: "#666F80",
          }}
        >
          Enter OTP
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 justify-center mb-6">
            <input
              {...register("d1", { required: true, maxLength: 1 })}
              type="text" id="input1"
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FB6D6C]"
            />
            <input
              {...register("d2", { required: true, maxLength: 1 })}
              type="text" id="input2"
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FB6D6C]"
            />
            <input
              {...register("d3", { required: true, maxLength: 1 })}
              type="text" id="input3"
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FB6D6C]"
            />
            <input
              {...register("d4", { required: true, maxLength: 1 })}
              type="text" id="input4"
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FB6D6C]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-2 px-4 rounded-md transition-colors mt-2"
            style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
