import React from 'react';
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Store Name */}
          <div>
            <h3 className="text-xl font-bold" style={{ fontFamily: 'Tahoma, Geneva, sans-serif' }}>
              Modest Hijab Store
            </h3>
          </div>

          {/* Contact Info */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FaWhatsapp />
              <a href="https://chat.whatsapp.com/KRHfwgUq6iz33YU3XqUa7N" className="text-decoration-none text-white hover:underline">
                WhatsApp: +91-6260499281
              </a>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:gallery@modest.co.in" className="text-decoration-none text-white hover:underline">
                Email: gallery@modest.co.in
              </a>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <FaInstagram />
              <a href="#" className="text-decoration-none text-white hover:underline">
                modestgallery
              </a>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <BsFillTelephoneFill />
              <a href="tel:+916260499281" className="text-decoration-none text-white hover:underline">
                Phone: +91-6260499281
              </a>
            </div>
          </div>

          {/* Office Address */}
          <div>
            <h5 className="text-lg font-semibold mb-2">Registered Office Address</h5>
            <p>Modest Gallery, Shahjahanabad, Bhopal,</p>
            <p>Madhya Pradesh, India</p>
            <p>Pin code - 462001</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="text-center">
          <p>© 2024 Modest Gallery. All Rights Reserved.</p>
          <p>
            <a href="#" className="">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}