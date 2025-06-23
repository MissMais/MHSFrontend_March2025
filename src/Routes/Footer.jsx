import React from 'react';
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Footer() {


  const hexColor = "#666f82";


  return (
    <footer style={{ backgroundColor: hexColor }} className="  text-white py-8 mt-16 rounded-tl-4xl rounded-tr-4xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Store Name */}
          <div>
            <h3 className="text-2xl font-extrabold" style={{ fontFamily:'Copperplate, Papyrus, fantasy' }}>
              Modest Gallery
            </h3>
          </div>

          {/* Contact Info */}
          <div style={{ fontFamily:'Copperplate, Papyrus, fantasy' }}>
            <div>
            <h4 className="text-xl font-semibold mb-2" >Contact Us</h4>

            </div>
            <div className="mb-3 flex items-center gap-2">
              <FaWhatsapp />
              <a href="https://chat.whatsapp.com/KRHfwgUq6iz33YU3XqUa7N" className=" text-white hover:underline">
                Modest Hijab Store
              </a>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:gallery@modest.co.in" className=" text-white hover:underline">
                gallery@modest.co.in
              </a>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <FaInstagram />
              <a href="https://www.instagram.com/_modest_hijab_store_?igsh=MTBkZWN3eHBnaXFjcA==" className=" text-white hover:underline" >
                modestgallery
              </a>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <BsFillTelephoneFill />
              <a href="tel:+916260499281" className=" text-white hover:underline">
                91-6260499281
              </a>
            </div>
          </div>

          {/* Office Address */}
          <div style={{ fontFamily:'Copperplate, Papyrus, fantasy' }}>
            <h4 className="text-xl font-semibold mb-2">Registered Office Address</h4>
            <p>Modest Gallery, Koh e fiza, Bhopal,</p>
            <p>Madhya Pradesh, India</p>
            <p>Pin code - 462001</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="text-center font-semibold" style={{ fontFamily:'Copperplate, Papyrus, fantasy' }}>
          <p>© 2024 Modest Gallery. All Rights Reserved.</p>
        
        </div>
      </div>
    </footer>
  );
}