import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App"
import { Country, State, City } from "country-state-city";
import toast, { Toaster } from "react-hot-toast";
export default function AddAddress() {
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState("");
    const Navigate = useNavigate()


    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");


    const countries = Country.getAllCountries();
    const selectedCountry = Country.getCountryByCode(country);
    // console.log(selectedCountry?.name)

    const states = country ? State.getStatesOfCountry(country) : [];
    const selectedState = State.getStateByCodeAndCountry(state, country);
    const cities = state ? City.getCitiesOfState(country, state) : [];
    const selectedCity = cities.find((c) => c.name === city);
    
    // console.log(selectedCity?.name)
    // const user_id = JSON.parse(localStorage.getItem("user_id"))
    // const onSubmit = async (data) => {
    //     try {
    //         // console.log(data)
    //         await axios.post(`${url}address/`, {
    //             User_id: user_id,
    //             City: selectedCity?.name,
    //             State: selectedState?.name,
    //             Country: selectedCountry?.name,
    //             ...data
    //         });
    //         toast.success("New Address Added")
    //         setTimeout(() => {
    //             Navigate("/Address")
    //         }, 2000);
    //         //   reset();
    //     } catch (error) {
    //         console.error(error);
    //         setMessage("Failed to add address.");
    //     }
    // };

      const user_id = JSON.parse(localStorage.getItem("user_id"))
      console.log("User ID:", user_id);

      const getCustomerId = async () => {
      try {
        const res = await axios.get(`${url}customer/`);
        const customerRecord = res.data.find(
              (item) => item.User_id === user_id
        );
        if (!customerRecord) {
            console.error("No customer found for this user");
            return null;
        }
        return customerRecord.Customer_id;

      } catch (error) {
        console.error("Error fetching customer data:", error);
        return null;
      }
      };
    
    const onSubmit = async (data) => {
    try {  
        const customer_id = await getCustomerId()
        await axios.post(`${url}address/`, {
            Customer_id: customer_id,
            Address_type: data.Address_type,
            Name: data.Name,
            House_No: data.House_No,
            Area_Colony: data.Area_Colony,
            Landmark: data.Landmark,
            Pincode: data.Pincode,
            City: selectedCity?.name,
            State: selectedState?.name,
            Country: selectedCountry?.name,
            Contact: data.Contact
        });

            toast.success("New Address Added");
            setTimeout(() => {
                Navigate("/Address");
            }, 2000);

            } catch (error) {
                console.error(error);
                setMessage("Failed to add address.");
            }
        };

    return (
        <div className="flex justify-center bg-white mt-16 min-h-[400px] ">
            <div className="w-full max-w-xl bg-white shadow-lg p-4 m-4">
                <h2
                    className="text-2xl font-bold mb-6 text-center"
                    style={{ fontFamily: ' Papyrus', color: '#666F80' }}
                >
                    Add Address
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>Address Type</label>
                            <input
                                {...register("Address_type", { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                                placeholder="Home/Office"
                                type="text"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>Name</label>
                            <input
                                {...register("Name", { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"

                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>House No</label>
                            <input
                                {...register("House_No", { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>Area/Colony</label>
                            <input
                                {...register("Area_Colony", { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>Landmark</label>
                            <input
                                {...register("Landmark", { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>Pincode</label>
                            <input
                                {...register("Pincode", { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>Country</label>
                            <select
                                {...register("Country", { required: true })}
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
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>State</label>
                            <select
                                {...register("State", { required: true })}
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
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>City</label>
                            <select
                                {...register("City", { required: true })}
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
                            <label className="block font-bold text-gray-700" style={{ fontFamily: ' Papyrus', color: '#666F80' }}>Contact</label>
                            <input
                                {...register("Contact", { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#666F80]"

                                type="text"
                            />
                        </div>


                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FB6D6C] text-white py-2 mt-6 hover:bg-[#e95a59]"
                        style={{ fontFamily: ' Papyrus' }}
                    >
                        Add Address
                    </button>

                    {message && (
                        <p className="mt-4 text-center text-red-500">{message}</p>
                    )}
                </form>
            </div>
            <Toaster position="bottom-center" reverseOrder={false} />
        </div>
    );
}
