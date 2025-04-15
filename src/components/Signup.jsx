// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: ""
//     });
    
    
//     const csrfToken = Cookies.get("csrftoken");
//     const navigate = useNavigate();
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");

//         if (formData.password !== formData.confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         try {
//             const response = await axios.post("https://modestgallery.pythonanywhere.com/admin/MHSApp/user/", {
//                 username: formData.username,
//                 email: formData.email,
//                 password: formData.password,
//                 password2: formData.confirmPassword
//             }, {
//                 headers: {
//                     "Content-Type": "application/json", // Ensures JSON request
//                      "Authorization": `Bearer ${token}`,
//                      "X-CSRFToken": csrfToken
//                 },
//                 withCredentials: true
//             });
            
            
//             if (response.data.token) {
//                 localStorage.setItem("token", response.data.token);
//                 console.log("Response:", response.data);

//                 setSuccess("Signup successful! Redirecting...");
//                 setTimeout(() => {
//                     navigate("/"); 
//                 }, 2000);
//             }
//         } catch (err) {
            
//                 console.error("Signup error:", err.response); // Log full error response
//                 setError(err.response?.data?.message || "Signup failed. Try again.");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                 <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>
//                 {error && <p className="text-red-500 text-center">{error}</p>}
//                 {success && <p className="text-green-500 text-center">{success}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="signupName" className="block text-gray-700 font-medium">Username</label>
//                         <input type="text" id="signupName" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your username" required />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="signupEmail" className="block text-gray-700 font-medium">Email address</label>
//                         <input type="email" id="signupEmail" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your email" required />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="signupPassword" className="block text-gray-700 font-medium">Password</label>
//                         <input type="password" id="signupPassword" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Create a password" required />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="signupConfirmPassword" className="block text-gray-700 font-medium">Confirm Password</label>
//                         <input type="password" id="signupConfirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="Confirm your password" required />
//                     </div>
//                     <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Sign Up</button>
//                     <p className="mt-3 text-center text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Signup;












// import { useState } from "react";
// import axios from "axios";
// import { data } from "react-router-dom";

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://qr723wq6-8000.inc1.devtunnels.ms/cust/", formData);
//       const token = response.data.token;
//       console.log(response.data)
//       localStorage.setItem("jwt", token);
//       console.log(response.data.token)
//       setMessage("Signup successful!");
//     } catch (error) {
//       setMessage("Signup failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">FirstName</label>
//             <input
//               type="text"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">LastName</label>
//             <input
//               type="text"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">UserName</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>


//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//           >
//             Signup
//           </button>
//           <p className="mt-3 text-center text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
//         </form>
//         {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// }



















import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    is_customer: true,
    is_employee: false,
    contact: "",
    house_no: "",
    area_colony: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
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
      const response = await axios.post("https://qr723wq6-8000.inc1.devtunnels.ms/user/", formData);
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
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>

          {/* Full width */}
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />


          {/* Contact + House No */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Contact" name="contact" value={formData.contact} onChange={handleChange} />
            <Input label="House No" name="house_no" value={formData.house_no} onChange={handleChange} />
            <Input label="Area/Colony" name="area_colony" value={formData.area_colony} onChange={handleChange} />
            <Input label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
            <Input label="City" name="city" value={formData.city} onChange={handleChange} />
            <Input label="State" name="state" value={formData.state} onChange={handleChange} />
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} />
            <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
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



