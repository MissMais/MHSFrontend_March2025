// import React from 'react'

// export default function Emptycart() {
//   return (
//     <div className='flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-12 mt-12'>
//       <div className="max-w-lg w-full flex justify-center mb-12 lg:mb-0">
//         <img
//           src="/emptycart.jpg"
//           alt=""
//           className="w-full max-w-xs sm:max-w-sm md:max-w-md"
//         />
//       </div>
//     </div>

//   )
// }
import React from "react";
// import cartImg from "/EmptyCart1.jpg"; 
import cartImg from "/emptycart.jpg";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Inline styles for animations */}
      <style>
        {`
          @keyframes roll-in {
            0% {
              transform: translateX(-200px);
              opacity: 0;
            }
            80% {
              transform: translateX(20px);
              opacity: 1;
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .roll-in {
            animation: roll-in 1s ease-out forwards;
          }

          .fade-in {
            animation: fade-in 1s ease-in forwards;
            animation-delay: 0.8s;
            animation-fill-mode: forwards;
          }
        `}
      </style>

<div className="roll-in">
<img src={cartImg} alt="Empty cart" className="w-100" />
<h1 className="flex justify-center w-100 h-40 text-[#FB6D6C] font-semibold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Your Cart is Empty</h1>
</div>
      



    </div>
  );
}
