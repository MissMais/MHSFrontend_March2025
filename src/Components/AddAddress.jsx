import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {url} from "../App"

export default function AddAddress() {
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState("");
    const Navigate = useNavigate()
    

    // const url = "https://5d0abf24c6ce.ngrok-free.app/address/";

    const user_id = JSON.parse(localStorage.getItem("user_id"))

    const onSubmit = async (data) => {
        try {
            console.log(data)

            await axios.post(`${url}address/`, {
                User_id:user_id,
                ...data
            });


            alert("Address added successfully!");
            // Navigate("/Address")
            //   reset();
        } catch (error) {
            console.error(error);
            setMessage("Failed to add address.");
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-white mt-16">
            <div className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-lg m-6">
                <h2
                    className="text-2xl font-bold mb-6 text-center"
                    style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}
                >
                    Add Address
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold text-gray-700">Address Type</label>
                            <input
                                {...register("Address_type", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Home/Office"
                                type="text"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700">Name</label>
                            <input
                                {...register("Name", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Home/Office"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">House No</label>
                            <input
                                {...register("House_No", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Area/Colony</label>
                            <input
                                {...register("Area_Colony", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Landmark</label>
                            <input
                                {...register("Landmark", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Pincode</label>
                            <input
                                {...register("Pincode", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">City</label>
                            <input
                                {...register("City", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                type="text"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700">State</label>
                            <input
                                {...register("State", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Country</label>
                            <input
                                {...register("Country", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700">Contact</label>
                            <input
                                {...register("Contact", { required: true })}
                                className="w-full px-3 py-2 border rounded-lg"

                                type="text"
                            />
                        </div>


                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FB6D6C] text-white py-2 mt-6 rounded-lg hover:bg-[#e95a59]"
                        style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                    >
                        Add Address
                    </button>

                    {message && (
                        <p className="mt-4 text-center text-red-500">{message}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
