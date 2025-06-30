import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdHome } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const url = 'https://3j7gm770-8000.inc1.devtunnels.ms/address/'
// https://modestgallery.pythonanywhere.com/address/




export default function Address() {
  const [address, setaddress] = useState([])
  const Navigate = useNavigate()

  const fetchAddress = async () => {
    const response = await axios.get(url)
    setaddress(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchAddress();
  }, []);



  const ButtonDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`)
      setaddress(add.filter(add => add.Address_id !== id))
    } catch (error) {
      console.log(error)
    }
  }


  const ButtonEdit = async (id) => {
    console.log(id)
    Navigate('/editadd/' + id + '/')
  }


  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-14 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/6 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <ul className="space-y-4 text-sm">
          <li> <Link to='/acc' className="text-gray-600 hover:text-blue-600">Profile Settings</Link></li>
          <li> <Link to='/reset' className="text-gray-600 hover:text-blue-600">Password</Link></li>
          <li> <Link to='/Address' className="text-blue-600 hover:text-blue-600">Address</Link></li>

        </ul>
      </div>

      {/* Main Content */}
      <div className='p-6 md:w-5xl'>
        {address.map((add) => (
          <div key={add.Address_id} className='shadow-md p-7  mt-4 rounded-lg bg-white border-gray-200'>
            <div className='relative flex flex-col md:flex-row md:justify-between md:items-center'>



              <div className='font-medium'>
                <p className='text-2xl'>{add.Name}</p>
                <p>Address : {add.House_No}, {add.Area_Colony}</p>
                <p>City : {add.City} ({add.State}), {add.Country}</p>
                <p>Pincode : {add.Pincode}</p>
              </div>
              <div className='mt-3 md:mt-10'>
                <button className='cursor-pointer bg-[#666F80] text-white px-3 py-2 rounded-lg mb-2 md:mb-1 hover:bg-gray-700 transition-all' onClick={() => ButtonEdit(add.Address_id)}>Edit</button><br />
                <button className='cursor-pointer bg-red-500 text-white rounded-lg px-1 py-2 hover:bg-red-600 ' onClick={() => ButtonDelete(add.Address_id)}>Delete</button>
              </div>
              {add.Address_type.toLowerCase() === 'home' ? <MdHome className='absolute text-3xl top-0 right-0 ' /> : <HiOutlineOfficeBuilding className='absolute text-3xl top-0 right-0' />}

            </div>
          </div>



        ))}
      </div>
    </div>
  );
}
