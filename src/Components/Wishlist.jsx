import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../App"
import { IoCartSharp } from 'react-icons/io5';
import { FaTrashAlt } from "react-icons/fa";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  
  const accesstoken = localStorage.getItem("AccessToken");
  const navigate = useNavigate();



useEffect(() => {
  getcustomerid();
}, []);

useEffect(() => {
  if (customerId) {
    fetchData();
  }
}, [customerId]);


    
    // get customer id from customer endpoint
const user_id = localStorage.getItem('user_id')

const getcustomerid = async () =>{
 const res = await axios.get(`${url}customer/`,{ 
           headers: {
        
           'ngrok-skip-browser-warning':'69420',
                'Content-Type':'application/json'
        },})
//  console.log(res.data)
 const data = res.data
 const filtereddata = data.filter(item=>item.User_id == user_id)
 setCustomerId(filtereddata[0].id)
console.log(filtereddata)
 
// console.log(filtereddata[0].id)

}



  const fetchData = async () => {
    try {

      const wlRes = await axios.get(
        `${url}wishlist/`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        }
      );

      const data = wlRes.data
      
      const wishlistItems = data.filter(item => item.customer_id == customerId);

      const prodRes = await axios.get(
        `${url}custom/`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        }
      );
      const allProducts = prodRes.data;


      const merged = wishlistItems.map((wishItem) => {
        const matched = allProducts.find(
          (prod) =>
            prod.product_variation.product_variation_id ===
            wishItem.product_variation_id
        );
        return {
          ...wishItem,
          product: matched || null,
        };
      });

      setWishlist(merged);
    
      // console.log(merged)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };

  const removeFromWishlist = async (wishlistId) => {
    console.log(wishlistId)
    const Payload = {
      wishlist_id: wishlistId
    }
    try {
      await axios.delete(
        `${url}wishlist/`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
          data: Payload
        }
      );
      setWishlist(wishlist.filter((item) => item.wishlist_id !== wishlistId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

 




  const addToCart = async (product) => {
    const accesstoken = localStorage.getItem("AccessToken");

    if (!accesstoken) {
      alert('Please login to add items to your cart.');
      navigate('/login');
      return;
    }

    if (product.product_variation.stock > 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;
      const cartKey = `cart_${email}`;
      let cart = JSON.parse(localStorage.getItem(cartKey)) || [];


      const existingItem = cart.find(
        item => item.product_variation.product_variation_id === product.product_variation.product_variation_id
      );

      let quantity;
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        quantity = existingItem.quantity;
      } else {
        cart.push({ ...product, quantity: 1 });
        quantity = 1;
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));

      try {
        const payload = {
          quantity: quantity,
          product_variation_id: product.product_variation.product_variation_id,
        };

        await axios.post(
          `${url}add/`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("Added to server-side cart");
      } catch (error) {
        console.error("Error adding to backend cart:", error);
      }

      navigate("/Cart");
    } else {
      alert("Out Of Stock");
    }
  };


return (
  <div className="max-w-5xl mx-auto px-4 py-10 mt-20">
    <h1
      className="text-3xl font-bold mb-6"
      style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
    >
      Wishlist
    </h1>

    {wishlist.length === 0 ? (
      <p className="text-center text-gray-500">Your wishlist is empty.</p>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {wishlist.map((item, idx) => {
          const prod = item.product;

          return (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col items-center "
            >
              <div>
                <img
                  src={prod.images[0]}
                  alt="wishlist product"
                  className="w-25 h-30 md:h-40 md:w-40 object-cover rounded aspect-[5/6] "
                />
              </div>

              <div className="flex flex-col items-center text-center">
                <p
                  className="text-xs  md:text-xl font-semibold"
                  style={{
                    fontFamily: "Copperplate, Papyrus, fantasy",
                    color: "#FB6D6C",
                  }}
                >
                  {prod.product_description}
                </p>
                <p
                  className="text-sm font-bold"
                  style={{
                    fontFamily: "Copperplate, Papyrus, fantasy",
                    color: "#666F80",
                  }}
                >
                  ₹{prod.price}
                </p>

                <div className="flex gap-2 text-[7px] mt-2">
                  <button
                    className="border md:text-[10px] border-[#FB6D6C] bg-white text-[#FB6D6C] px-6 py-2 rounded-full hover:bg-[#e95a59] hover:text-white transition w-full flex items-center justify-center"
                    onClick={() => addToCart(prod)}
                  >
                    <IoCartSharp className="text-xl" />
                    <span style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Move to Cart</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.wishlist_id)}
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                    className="px-4 py-2 text-[15px] text-gray-400 hover:text-[#FB6D6C] rounded-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

}
