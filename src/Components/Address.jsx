// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { MdHome } from "react-icons/md";
// import { HiOutlineOfficeBuilding } from "react-icons/hi";
// import { Link, useNavigate } from "react-router-dom";

// const url = 'https://3j7gm770-8000.inc1.devtunnels.ms/address/'
// // https://modestgallery.pythonanywhere.com/address/
// const url2 = 'https://3j7gm770-8000.inc1.devtunnels.ms/filter/'



// export default function Address() {
//   const [address, setaddress] = useState([])
//   const Navigate = useNavigate()

//   const accessToken = localStorage.getItem("AccessToken")
//   const fetchAddress = async () => {
//     const response = await axios.get(url,

//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     )
//     setaddress(response.data)
//     console.log(response.data)
//   }

//   useEffect(() => {
//     fetchAddress();

//   }, []);

//   const Buttonadd = async () => {
//     Navigate("/addaddress")
//   }

//   const ButtonDelete = async (id) => {
//     try {
//       await axios.delete(`${url2}${id}/`)
//       setaddress(address.filter(add => add.Address_id !== id))
//     } catch (error) {
//       console.log(error)
//     }
//   }


//   const ButtonEdit = async (id) => {
//     console.log(id)
//     Navigate('/editadd/' + id + '/')
//   }


//   return (
//     <div className="flex flex-col md:flex-row min-h-screen mt-14 bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-full md:w-1/6 bg-white p-6 shadow-md">
//         <h2
//           className="text-xl font-bold mb-6"
//           style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
//         >
//           Account Settings
//         </h2>
//         <ul className="space-y-4 text-sm" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
//           <li>
//             <Link
//               to="/acc"
//               className="block text-[#FB6D6C] hover:text-[#e95a59] font-semibold transition-colors"
//             >
//               Profile Settings
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/reset"
//               className="block text-gray-600 hover:text-[#FB6D6C] transition-colors"
//             >
//               Password
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/Address"
//               className="block text-gray-600 hover:text-[#FB6D6C] transition-colors"
//             >
//               Address
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       {/* <div><button className='cursor-pointer bg-red-500 text-white rounded-lg px-1 py-2 hover:bg-red-600 ' onClick={() => Buttonadd()}>add another address</button></div> */}
//       <div className='p-6 md:w-5xl'>
//         {address.map((add) => (
//           <div key={add.Address_id} className='shadow-md p-7  mt-4 rounded-lg bg-white border-gray-200'>
//             <div className='relative flex flex-col md:flex-row md:justify-between md:items-center'>



//               <div className='font-medium'>
//                 <p className='text-2xl'>{add.Name}</p>
//                 <p>Address : {add.House_No}, {add.Area_Colony}</p>
//                 <p>City : {add.City} ({add.State}), {add.Country}</p>
//                 <p>Pincode : {add.Pincode}</p>
//               </div>
//               <div className='mt-3 md:mt-10'>
//                 <button className='cursor-pointer bg-[#666F80] text-white px-3 py-2 rounded-lg mb-2 md:mb-1 hover:bg-gray-700 transition-all' onClick={() => ButtonEdit(add.Address_id)}>Edit</button><br />
//                 <button className='cursor-pointer bg-red-500 text-white rounded-lg px-1 py-2 hover:bg-red-600 ' onClick={() => ButtonDelete(add.Address_id)}>Delete</button>
//               </div>
//               {add.Address_type.toLowerCase() === 'home' ? <MdHome className='absolute text-3xl top-0 right-0 ' /> : <HiOutlineOfficeBuilding className='absolute text-3xl top-0 right-0' />}

//             </div>
//           </div>



//         ))}
//       </div>
//     </div>
//   );
// }















import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdHome } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const url =
  // "https://3j7gm770-8000.inc1.devtunnels.ms/address/"
  'https://c84927198c55.ngrok-free.app/address/'
// https://modestgallery.pythonanywhere.com/address/
const url2 =
  // "https://3j7gm770-8000.inc1.devtunnels.ms/address"
  'https://c84927198c55.ngrok-free.app/address/'



export default function Address() {
  const [address, setaddress] = useState([])
  const [selected, setSelected] = useState(null);
  const Navigate = useNavigate()




  const handleSelect = (add) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    if (!email) {
      alert("Please login first.");
      Navigate("/login");
      return;
    }

    const addressKey = `selectedAddress_${email}`;
    localStorage.setItem(addressKey, JSON.stringify(add));
    setSelected(add);
    console.log("Selected Address Saved Locally:", add);
  };



  const accessToken = localStorage.getItem("AccessToken")

  const fetchAddress = async () => {
    const response = await axios.get(url,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json'
        },
      }
    )
    setaddress(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchAddress();

  }, []);

  const Buttonadd = async () => {
    Navigate("/addaddress")
  }

  const ButtonDelete = async (id) => {
    try {
      await axios.delete(`${url2}${id}/`)
      setaddress(address.filter(add => add.Address_id !== id))
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
        <h2
          className="text-xl font-bold mb-6"
          style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
        >
          Account Settings
        </h2>
        <ul className="space-y-4 text-sm" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
          <li>
            <Link
              to="/acc"
              className="block text-gray-600 hover:text-[#e95a59] font-semibold transition-colors"
            >
              Profile Settings
            </Link>
          </li>
          <li>
            <Link
              to="/reset"
              className="block text-gray-600 hover:text-[#FB6D6C] transition-colors"
            >
              Password
            </Link>
          </li>
          <li>
            <Link
              to="/Address"
              className="block text-[#FB6D6C] hover:text-[#FB6D6C] transition-colors"
            >
              Address
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      {/* <div><button className='cursor-pointer bg-red-500 text-white rounded-lg px-1 py-2 hover:bg-red-600 ' onClick={() => Buttonadd()}>add another address</button></div> */}
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
                <button
                  className="cursor-pointer bg-green-500 text-white px-3 py-2 rounded-lg mb-2 hover:bg-green-600 transition-all"
                  onClick={() => handleSelect(add)}
                >
                  {selected?.Address_id === add.Address_id ? "Selected" : "Select"}
                </button>
                <br />
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
