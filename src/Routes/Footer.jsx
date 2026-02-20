import React from 'react';
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from 'react-router-dom';




export default function Footer() {

   const handleBotClick = () => {
    // Send event that Bot.jsx listens for
    window.dispatchEvent(new Event("openBot"));
  };


  return (
    <footer className=" text-white bg-gray-400 py-8 mt-16 rounded-tl-4xl rounded-tr-4xl">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="grid grid-cols-1 text-start md:text-center md:grid-cols-3 gap-8 ">

          {/* Store Name */}
          <div className='text-center md:mr-40 cursor-pointer'>
            <h3 className="text-xl md:text-2xl font-extrabold" style={{ fontFamily: 'Papyrus' }}>
              Modest Hijab Store
            </h3>
            <span>Crafted with care</span>
            <br />
            <span onClick={handleBotClick} 
            className='"block py-1 px-2 text-[11px] sm:py-2 sm:px-4 sm:text-base text-[#FFFFFF] hover:text-[#FB6D6C] font-bold cursor-pointer"'>FAQs</span>
            <Link to="/about">
              <span className="block py-1 px-2 text-[11px] sm:py-2 sm:px-4 sm:text-base text-[#FFFFFF] hover:text-[#FB6D6C] font-bold cursor-pointer" style={{ fontFamily: 'Papyrus' }}>
                About Us
              </span>
            </Link>
          </div>


          {/* Contact Info */}
          <div className='flex flex-col items-center text-center' style={{ fontFamily: 'Papyrus' }}>

            <h4 className="text-[14px] text-center font-semibold mb-2" >Keep in touch</h4>


            <div className="mb-2 flex md:justify-center  gap-2   ">
              <FaWhatsapp />
              <a href="https://chat.whatsapp.com/KRHfwgUq6iz33YU3XqUa7N" target="_blank" className=" text-white text-[10px] md:text-[15px] hover:underline">
                Modest Hijab Store
              </a>

            </div>

            <div className="mb-2 flex md:justify-center gap-2">
              <FaEnvelope />
              <a href="mailto:gallery@modest.co.in" className="text-white text-[10px] md:text-[15px] hover:underline">
                gallery@modest.co.in
              </a>
            </div>

            <div className="mb-2 flex md:justify-center gap-2">
              <FaInstagram />
              <a href="https://www.instagram.com/_modest_hijab_store_?igsh=MTBkZWN3eHBnaXFjcA==" target="_blank" className=" text-white text-[10px] md:text-[15px] hover:underline" >
                _modest_hijab_store_
              </a>
            </div>

            <div className="mb-2 flex md:justify-center gap-2">
              <BsFillTelephoneFill />
              <a href="tel:+916260499281" className=" text-white text-[10px] md:text-[15px] hover:underline">
                91-6260499281
              </a>
            </div>
          </div>

          {/* Office Address */}
          <div className='flex flex-col items-center text-center' style={{ fontFamily: 'Papyrus' }}>
            <h4 className="text-[14px] font-semibold mb-2">Registered Office Address</h4>
            <div className='text-[10px] md:text-[15px]'>
              <p >Modest Gallery, Koh e fiza, Bhopal,</p>
              <p>Madhya Pradesh, India</p>
              <p>Pin code - 462001</p>
            </div  >
          </div>

        </div>

        <hr className="my-6 border-gray-300" />

        <div className="text-center text-[10px] md:text-[12px] font-semibold" style={{ fontFamily: 'Papyrus' }}>
          <p>© 2024 Modest Gallery. All Rights Reserved.</p>

        </div>
      </div>
    </footer>
  );
}
