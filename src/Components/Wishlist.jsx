import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../App"
import { IoCartSharp } from 'react-icons/io5';
import { FaTrashAlt } from "react-icons/fa";
import Footer from "../Routes/Footer";
import toast, { Toaster } from "react-hot-toast";
import Popup from "./Popup";


export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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



  // get customer id
  const custId = localStorage.getItem("id")

  const getcustomerid = async () => {
   
    setCustomerId(custId)
   

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
      toast.success("Item Removed");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };






  const addToCart = async (product) => {
    const accesstoken = localStorage.getItem("AccessToken");

    if (!accesstoken) {
      toast.success('Please login to continue with your order');
      setTimeout(() => {
        navigate('/login');
      }, 3000);

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
        removeFromWishlist(product.wishlist_id);

        // console.log("Added to server-side cart");
      } catch (error) {
        console.error(error);
      }


      setShowPopup(true);
      setTimeout(() => {
        navigate("/Cart");
      }, 3000);



    } else {
      toast.error("Out Of Stock");

    }
  };


  return (
    <div>


      <div className="max-w-5xl mx-auto px-4 py-10 mt-20">


        {wishlist.length === 0 ? (
          // <p className="text-center text-[#666F80]">Your wishlist is empty.</p>

          // {/* Inline styles for animations */}

          <div className="flex justify-center">
            <img src='/emptywish.jpg' alt="Empty cart" className="w-50 md:w-80" />

          </div>



        ) : (<div>

          <h1
            className="text-4xl font-bold text-center mb-6 underline"
            style={{ fontFamily: 'Papyrus' , color: "#666F80" }}
          >
            My Picks
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {wishlist.map((item, idx) => {
              const prod = item.product;

              return (
                <div
                  key={idx}
                  className="bg-white shadow-md p-6 border border-gray-200 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="flex justify-center">
                    <img
                      src={prod.images[0]}
                      alt="wishlist product"
                      className="w-28 h-32 md:h-40 md:w-40 object-cover aspect-[5/6]"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow justify-between text-center mt-3">
                    <div>
                      <p
                        className="text-xs md:text-lg font-semibold"
                        style={{
                          fontFamily: 'Papyrus' ,
                          color: "#FB6D6C",
                        }}
                      >
                        {prod.product_description}
                      </p>
                      <p
                        className="text-sm font-bold"
                        style={{
                          fontFamily: 'Papyrus' ,
                          color: "#666F80",
                        }}
                      >
                        ₹{prod.price}
                      </p>
                    </div>

                    {/* Buttons at bottom */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <button
                        className="flex items-center gap-2 border border-[#FB6D6C] bg-white text-[#FB6D6C]
                     px-2 md:px-5 py-2 rounded-md hover:bg-[#e95a59] hover:text-white transition text-[10px] 
                     md:text-sm"
                        onClick={() => addToCart(prod)}
                      >
                        <IoCartSharp className="text-sm md:text-lg" />
                        <span
                          style={{ fontFamily: 'Papyrus'  }}
                          className="whitespace-nowrap font-semibold"
                        >
                          Move to Cart
                        </span>
                      </button>

                      <button
                        onClick={() => removeFromWishlist(item.wishlist_id)}
                        style={{ fontFamily: 'Papyrus'  }}
                        className="p-2 text-[#666F80] hover:text-[#FB6D6C] transition"
                      >
                        <FaTrashAlt className="text-sm md:text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

      </div>
      <section id='contact'  >
        <Footer />
      </section>

      {/* Popup Component */}
      <Popup
        show={showPopup}
        title="Item Added!"
        message="item Added to Cart"
      />

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );


}
