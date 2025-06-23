
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    Email: "",
    password: "",
    is_customer: true,
    is_employee: false,
    Contact: 0,
    // House_No: "",
    // Area_Colony: "",
    // Landmark: "",
    // City: "",
    // State: "",
    // Country: "",
    // Pincode: "",
  });

  

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://modestgallery.pythonanywhere.com/customer/", formData);
      setFormData(formData)

     

      const token = response.data.token;
      localStorage.setItem("jwt", token);
      setMessage("Signup successful!");
    } catch (error) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>

          {/* Two-column row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
            <Input label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
            <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
            <Input label="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} />
          </div>

          {/* Full width */}
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />


      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Contact" name="Contact" value={formData.Contact} onChange={handleChange} />
            {/* <Input label="House No" name="House_No" value={formData.House_No} onChange={handleChange} />
            <Input label="Area/Colony" name="Area_Colony" value={formData.Area_Colony} onChange={handleChange} />
            <Input label="Landmark" name="Landmark" value={formData.Landmark} onChange={handleChange} />
            <Input label="City" name="City" value={formData.City} onChange={handleChange} />
            <Input label="State" name="State" value={formData.State} onChange={handleChange} />
            <Input label="Country" name="Country" value={formData.Country} onChange={handleChange} />
            <Input label="Pincode" name="Pincode" value={formData.Pincode} onChange={handleChange} /> */}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>
          <p className="mt-3 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
      
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
      
    </div>
  );
}