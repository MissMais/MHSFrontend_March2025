import React, { useState } from 'react';
import Navbar from '../Routes/Navbar';
import Footer from '../Routes/Footer';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from "react-scroll";
import { CgProfile } from "react-icons/cg";

export default function About() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div>
      {/* <Navbar /> */}
      <nav className="bg-white fixed top-0 left-0 right-0 shadow z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 h-16 w-16">
            <Link to="/" className="no-underline">
              <img src="./../../assets/logo.jpeg" alt="Logo" />
            </Link>
          </div>

          {/* Toggle Button for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-6`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-700 font-medium">
              <li>
                <Link to="/home" className="cursor-pointer hover:text-blue-600 text-decoration-none" smooth={true} duration={200}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/home#shaam-e-roshan" className="cursor-pointer hover:text-blue-600 text-decoration-none" smooth={true} duration={200}>
                  Event
                </Link>
              </li>
              <li>
                <Link to="/home#store" className="cursor-pointer hover:text-blue-600 text-decoration-none" smooth={true} duration={200}>
                  Store
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <ScrollLink to="contact" className="cursor-pointer hover:text-blue-600 text-decoration-none" smooth={true} duration={200}>
                  Contact
                </ScrollLink>
              </li>

              {/* Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600 text-decoration-none"
                >
                  <CgProfile className="text-2xl ml-1" />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    {isLoggedIn ? (
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-decoration-none"
                        >
                          Logout
                        </button>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 text-decoration-none">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to="/Signup" className="block px-4 py-2 hover:bg-gray-100 text-decoration-none">
                            SignUp
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
      <div className='mt-20'></div>

      <section className="py-12">
        <div className='container mx-auto'>
          <h1 className='text-center text-4xl font-bold mb-10'>Our Story</h1>

          <div className='flex flex-col md:flex-row items-center gap-10'>
            <div className='md:w-1/2 bg-[#FB6D6C] p-8 rounded-2xl shadow-lg'>
              <p className='text-lg leading-relaxed text-white'>
                Modest Gallery was born out of a desire to provide high-quality, stylish, and modest fashion options for women who value both fashion and tradition.
                Our founder recognized a gap in the market for modest clothing that was not only respectful of religious and cultural values but also fashionable and versatile.
                With this vision in mind, Modest Gallery was established as a one-stop shop for women seeking modest yet chic clothing and accessories.
              </p>
            </div>

            <div className='md:w-1/2 flex justify-center'>
              <img
                src="./../../assets/Imghome.jpg"
                alt="Our Story"
                className='rounded-2xl shadow-lg w-[50%] object-cover md:ml-20'
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-12">
        <div className='container mx-auto'>
          <h1 className='text-center text-4xl font-bold mb-10'>Modest Hijab Store </h1>

          <div className='flex flex-col md:flex-row items-center gap-10'>
            <div className='md:w-1/2 flex justify-center'>
              <img
                src="./../../assets/Imghome.jpg"
                alt="Our Story"
                className='rounded-2xl shadow-lg w-[90%] object-cover md:ml-20'
              />
            </div>
            <div className='md:w-2/3 bg-[#FB6D6C] p-8 ml-32 rounded-2xl shadow-lg '>
              <p className='text-lg leading-relaxed text-white'>
                At the heart of Modest Gallery is our Modest Hijab Store, where we offer an exquisite range of hijabs,
                abayas, and accessories that cater to the needs of modern, modest women. Our hijab collection is thoughtfully
                curated to include a variety of styles, fabrics, and colors, ensuring that every woman can find something that
                suits her taste and lifestyle. Whether you're looking for a simple, everyday hijab or a luxurious, statement piece,
                our collection has something for everyone.

                Our abayas are designed with a focus on quality, comfort, and elegance. We believe that modest clothing should not
                compromise on style, which is why our abayas feature modern cuts, intricate details, and premium fabrics. From casual,
                everyday wear to more formal, occasion-specific abayas, our collection is diverse and versatile, allowing you to express your personal
                style while adhering to your values.

                In addition to hijabs and abayas, we offer a wide range of accessories that complement your modest wardrobe. From chic underscarves to
                elegant hijab pins, our accessories are designed to enhance your overall look while adding a touch of sophistication. At Modest Hijab Store,
                we are committed to providing you with products that make you feel confident, comfortable, and beautiful.
              </p>
            </div>


          </div>
        </div>
      </section>


      <section className="py-12">
        <div className='container mx-auto'>
          <h1 className='text-center text-4xl font-bold mb-10'>Shaam e Roshan </h1>

          <div className='flex flex-col md:flex-row items-center gap-10'>
            
            <div className='md:w-1/2 bg-[#FB6D6C] p-8 rounded-2xl shadow-lg '>
              <p className='text-lg leading-relaxed text-white'>
                Modest Gallery is not just about fashion; it's about creating experiences that celebrate culture, 
                creativity, and community. This is where Shaam e Roshan comes in. Shaam e Roshan is our signature series of lifestyle, 
                food, and craft exhibitions that bring people together in a vibrant, festive atmosphere. These events are a celebration of 
                the rich cultural heritage that inspires our brand, offering a platform for artisans, chefs, and entrepreneurs to showcase their 
                talents and connect with a wider audience.

                At Shaam e Roshan, you'll find an array of beautifully crafted items, from traditional handicrafts to contemporary art, 
                all reflecting the creativity and craftsmanship of the artisans. Our food stalls offer a diverse selection of culinary delights,
                 giving visitors the opportunity to taste and savor flavors from different cultures. The lifestyle section of the exhibition features 
                 unique products that add a touch of elegance and style to everyday living.

                Each Shaam e Roshan event is carefully curated to provide a memorable experience for our visitors, whether you're shopping for unique gifts, 
                enjoying delicious food, or simply soaking in the vibrant atmosphere. It's more than just an exhibition; it's a celebration of the values and traditions 
                that we hold dear at Modest Gallery.
              </p>
            </div>
            <div className='md:w-1/2 flex justify-center'>
              <img
                src="./../../assets/Imghome.jpg"
                alt="Our Story"
                className='rounded-2xl shadow-lg w-[90%] object-cover md:ml-20'
              />
            </div>

          </div>
        </div>
      </section>


      <div className='text-center m-7'>
        <h4>Thank you for choosing Modest Gallery as your trusted source for modest fashion and cultural experiences. We look forward 
          to serving you and being a part of your journey.</h4>
      </div>
      
        <section id='contact' >
           <Footer />
          </section>
    </div> 
  );
}
