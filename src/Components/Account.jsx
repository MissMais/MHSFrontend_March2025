import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";

const AccountDetail = [
  {
    id: 'ORD123456',
    first_name: 'Aareb',
    last_name: 'Khan',
    email: 'aareb@gmail.com',
    phone: '9999988888',
  },
];

export default function Account() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(AccountDetail);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-14 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/6 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <ul className="space-y-4 text-sm">
          <li className="text-blue-600 font-medium">Profile Settings</li>
          <li className="text-gray-600 hover:text-black cursor-pointer">Password</li>
    
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:flex-1 p-8 bg-white shadow-md">
        {orders.map((order) => (
          <div key={order.id}>
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

            {/* Profile Image and Buttons */}
            <div className="flex items-center mb-8 gap-6">
              <img
                src="/logo.jpeg"
                alt="profile"
                className="rounded-full border-2 w-54 h-54 object-cover"
              />
             
            </div>

            {/* Two-column form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  value={order.first_name}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  value={order.last_name}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  value={order.email}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  value={order.phone}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  disabled
                />
              </div>
            </div>

            <div className="mt-6">
              <button className="bg-[#FB6D6C] text-white px-6 py-2 rounded">Edit Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
