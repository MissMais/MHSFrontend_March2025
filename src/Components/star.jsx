import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function RateStar() {

  const rating = 4.5; // rating from backend

  
  const renderStars = (rating) => {
    const stars = [];
    

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="p-5 mt-20">
      <h1 className="text-2xl font-bold mb-2">Product Rating</h1>
      <div className="flex  space-x-1">
        {renderStars(rating)}  
      </div>
    </div>
  );
}
