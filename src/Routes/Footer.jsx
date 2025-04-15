// import React from 'react'
// import { FaInstagram, FaWhatsapp } from "react-icons/fa";
// import { FaEnvelope } from "react-icons/fa";
// import { BsFillTelephoneFill } from "react-icons/bs";

// export default function Footer() {
//   return (
//     <footer className="bg-blue-600 text-white py-6">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
//           <div>
//             <h3 className="text-xl font-bold" style={{ fontFamily: 'Tahoma, Geneva, sans-serif' }}>
//               Modest Hijab Store
//             </h3>
//           </div>

//           <div>
//             <div className="mb-3 flex items-center space-x-2">
//               <FaWhatsapp />
//               <a
//                 href="https://chat.whatsapp.com/KRHfwgUq6iz33YU3XqUa7N"
//                 className="text-white hover:underline"
//               >
//                 WhatsApp: +91-6260499281
//               </a>
//             </div>

//             <div className="mb-3 flex items-center space-x-2">
//               <FaEnvelope />
//               <a href="#" className="text-white hover:underline">
//                 Email: gallery@modest.co.in
//               </a>
//             </div>

//             <div className="mb-3 flex items-center space-x-2">
//               <FaInstagram />
//               <a href="#" className="text-white hover:underline">
//                 modestgallery
//               </a>
//             </div>

//             <div className="mb-3 flex items-center space-x-2">
//               <BsFillTelephoneFill />
//               <a href="#" className="text-white hover:underline">
//                 Phone: +91-6260499281
//               </a>
//             </div>
//           </div>

//           <div>
//             <h5 className="text-lg font-semibold">Registered Office Address</h5>
//             <p>Modest Gallery, Shahjahanabad, Bhopal,</p>
//             <p>Madhya Pradesh, India</p>
//             <p>Pin code - 462001</p>
//           </div>
//         </div>

//         <hr className="border-t border-white/40 my-4" />

//         <div className="text-center">
//           <p>© 2024 Modest Gallery. All Rights Reserved.</p>
//           <p>
//             <a href="#" className="text-white hover:underline">
//               Contact Us
//             </a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }

import React from 'react';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container px-4">
        <div className="row mb-4">
          
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h3 className="h5 fw-bold" style={{ fontFamily: 'Tahoma, Geneva, sans-serif' }}>
              Modest Hijab Store
            </h3>
          </div>

          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <div className="mb-2 d-flex align-items-center gap-2">
              <FaWhatsapp />
              <a
                href="https://chat.whatsapp.com/KRHfwgUq6iz33YU3XqUa7N"
                className="text-white text-decoration-none"
              >
                WhatsApp: +91-6260499281
              </a>
            </div>

            <div className="mb-2 d-flex align-items-center gap-2">
              <FaEnvelope />
              <a href="#" className="text-white text-decoration-none">
                Email: gallery@modest.co.in
              </a>
            </div>

            <div className="mb-2 d-flex align-items-center gap-2">
              <FaInstagram />
              <a href="#" className="text-white text-decoration-none">
                modestgallery
              </a>
            </div>

            <div className="mb-2 d-flex align-items-center gap-2">
              <BsFillTelephoneFill />
              <a href="#" className="text-white text-decoration-none">
                Phone: +91-6260499281
              </a>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <h5 className="fw-semibold">Registered Office Address</h5>
            <p className="mb-0">Modest Gallery, Shahjahanabad, Bhopal,</p>
            <p className="mb-0">Madhya Pradesh, India</p>
            <p className="mb-0">Pin code - 462001</p>
          </div>
        </div>

        <hr className="border-white opacity-50 my-3" />

        <div className="text-center">
          <p className="mb-1">© 2024 Modest Gallery. All Rights Reserved.</p>
          <p className="mb-0">
            <a href="#" className="text-white text-decoration-none">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

