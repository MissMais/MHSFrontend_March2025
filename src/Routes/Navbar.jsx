import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('user');
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("AccessToken");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    let timer = setTimeout(handleLogout, 600000);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleLogout, 600000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [navigate, isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
                <ScrollLink to="home" className="cursor-pointer hover:text-blue-600 text-decoration-none" smooth={true} duration={200}>
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="shaam-e-roshan" className="cursor-pointer hover:text-blue-600 text-decoration-none" smooth={true} duration={200}>
                  Event
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="store" className="cursor-pointer hover:text-blue-600 text-decoration-none" smooth={true} duration={200}>
                  Store
                </ScrollLink>
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
  );
}



















// return (
//   <nav className="bg-white fixed top-0 left-0 right-0 shadow-md z-[9999]">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="flex items-center justify-between h-16">
//         {/* Logo */}
//         <div className="flex-shrink-0">
//           <Link to="/">
//             <img
//               src="/logo.jpeg"
//               alt="logo"
//               className="h-10 w-auto object-contain"
//             />
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-gray-800 focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           <NavItems isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} handleLogout={handleLogout} />
//         </div>
//       </div>
//     </div>

//     {/* Mobile Menu Items */}
//     {isMenuOpen && (
//       <div className="md:hidden px-4 pb-4 bg-white shadow-md">
//         <NavItems isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} handleLogout={handleLogout} isMobile />
//       </div>
//     )}
//   </nav>
// );


// function NavItems({ isDropdownOpen, setIsDropdownOpen, handleLogout, isMobile }) {
// const linkClasses = "block py-2 px-2 text-gray-700 hover:text-blue-600";

// return (
//   <ul className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2 md:gap-6 font-medium`}>
//     <li>
//       <ScrollLink to="home" className={linkClasses} smooth={true} duration={200}>
//         Home
//       </ScrollLink>
//     </li>
//     <li>
//       <ScrollLink to="shaam-e-roshan" className={linkClasses} smooth={true} duration={200}>
//         Event
//       </ScrollLink>
//     </li>
//     <li>
//       <ScrollLink to="store" className={linkClasses} smooth={true} duration={200}>
//         Store
//       </ScrollLink>
//     </li>
//     <li>
//       <Link to="/about" className={linkClasses}>
//         About
//       </Link>
//     </li>
//     <li>
//       <ScrollLink to="contact" className={linkClasses} smooth={true} duration={200}>
//         Contact
//       </ScrollLink>
//     </li>

//     {/* Profile Dropdown */}
//     <li className="relative">
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         className="flex items-center text-gray-700 hover:text-blue-600 px-2"
//       >
//         <CgProfile className="text-2xl" />
//       </button>
//       {isDropdownOpen && (
//         <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
//           <li>
//             <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
//               Login
//             </Link>
//           </li>
//           <li>
//             <Link to="/Signup" className="block px-4 py-2 hover:bg-gray-100">
//               SignUp
//             </Link>
//           </li>
//           <li>
//             <hr className="border-t my-1" />
//           </li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </li>
//         </ul>
//       )}
//     </li>
//   </ul>
// );
// }
// }

// import React, { useState } from "react";
// import { Link as ScrollLink } from "react-scroll";
// import { Link } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";

// export default function Navbar({ handleLogout }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <nav className="bg-white fixed top-0 left-0 right-0 shadow-md z-[9999]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/">
//               <img
//                 src="/logo.jpeg"
//                 alt="logo"
//                 className="h-10 w-auto object-contain"
//               />
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-800 focus:outline-none"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 {isMenuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6">
//             <NavItems isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} handleLogout={handleLogout} />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Items */}
//       {isMenuOpen && (
//         <div className="md:hidden px-4 pb-4 bg-white shadow-md">
//           <NavItems isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} handleLogout={handleLogout} isMobile />
//         </div>
//       )}
//     </nav>
//   );
// }

// function NavItems({ isDropdownOpen, setIsDropdownOpen, handleLogout, isMobile }) {
//   const linkClasses = "block py-2 px-2 text-gray-700 hover:text-blue-600";

//   return (
//     <ul className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2 md:gap-6 font-medium`}>
//       <li>
//         <ScrollLink to="home" className={linkClasses} smooth={true} duration={200}>
//           Home
//         </ScrollLink>
//       </li>
//       <li>
//         <ScrollLink to="shaam-e-roshan" className={linkClasses} smooth={true} duration={200}>
//           Event
//         </ScrollLink>
//       </li>
//       <li>
//         <ScrollLink to="store" className={linkClasses} smooth={true} duration={200}>
//           Store
//         </ScrollLink>
//       </li>
//       <li>
//         <Link to="/about" className={linkClasses}>
//           About
//         </Link>
//       </li>
//       <li>
//         <ScrollLink to="contact" className={linkClasses} smooth={true} duration={200}>
//           Contact
//         </ScrollLink>
//       </li>

//       {/* Profile Dropdown */}
//       <li className="relative">
//         <button
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           className="flex items-center text-gray-700 hover:text-blue-600 px-2"
//         >
//           <CgProfile className="text-2xl" />
//         </button>
//         {isDropdownOpen && (
//           <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
//             <li>
//               <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link to="/Signup" className="block px-4 py-2 hover:bg-gray-100">
//                 SignUp
//               </Link>
//             </li>
//             <li>
//               <hr className="border-t my-1" />
//             </li>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         )}
//       </li>
//     </ul>
//   );
// }