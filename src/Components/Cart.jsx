// Cart.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { url } from "../App"
import cartImg from "/emptycart.jpg";


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setloading] = useState(true)
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem("AccessToken");


  // const url = "https://5d0abf24c6ce.ngrok-free.app/"


  const toOrder = () => {
    navigate('/OrderPage');
  };

  // Load cart from localStorage & backend
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    if (!email) {
      // alert("Please login to view your cart.");
      navigate("/login");
      return;
    }



    const cartKey = `cart_${email}`;
    const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedItems);
    // console.log(cartItems)



    // Fetch backend cart to get cart_item_id
    const fetchCart = async () => {
      if (!accesstoken) return;
      try {
        const response = await axios.get(
          `${url}add/`,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
              'ngrok-skip-browser-warning': '69420',
              'Content-Type': 'application/json'
            },
          }
        );
        // console.log(response.data)
        const res = await axios.get(
          `${url}customer/`,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
              'ngrok-skip-browser-warning': '69420',
              'Content-Type': 'application/json'
            },
          }
        );
        const res2 = await axios.get(
          `${url}cart/`,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
              'ngrok-skip-browser-warning': '69420',
              'Content-Type': 'application/json'
            },
          }
        );


        const customerid = localStorage.getItem("id")

        // For getting cart id 
        const cart = res2.data
        const filtercart = cart.filter(item => item.customer_id == customerid)
        // console.log(filtercart[0].Cart_id)
        const cartid = filtercart[0].Cart_id






        // For getting lower cart data
        const backendCart = response.data
        const filtererddata = backendCart.filter(item => item.Cart_id == cartid)
        const sliceindex = storedItems.length
        const sliceddata = filtererddata.slice(-sliceindex)
        // console.log(sliceddata)

        //     response data--:
        //    [0{ cart_item_id: 121, Cart_id: 2, product_variation_id: 'PV0001', Quantity: 1, Sub_Total: 300 }
        //     1{ cart_item_id: 122, Cart_id: 2, product_variation_id: 'PV0001', Quantity: 1, Sub_Total: 300 }
        //     2{cart_item_id: 123, Cart_id: 2, product_variation_id: 'PV0001', Quantity: 1, Sub_Total: 300}]
        //     length:2
        //     [[Prototype]]: Array(0)

        // console.log(storedItems)
        // console.log(backendCart)
        // console.log(cartItems)

        // console.log((storedItems) + (backendCart))
        // Merge backend cart_item_id with localStorage cart items
        const mergedCart = storedItems.map(localItem => {
          const backendItem = sliceddata.find(b => b.product_variation_id === localItem.product_variation.product_variation_id);
          return {
            ...localItem,
            quantity: backendItem ? backendItem.Quantity : (localItem.quantity || 1),
            cart_item_id: backendItem ? backendItem.cart_item_id : null
          };
        });

        setCartItems(mergedCart);
        // console.log(mergedCart)
        // console.log(mergedCart.length)
        localStorage.setItem(cartKey, JSON.stringify(mergedCart));

        if (mergedCart.length === 0) {
          setloading(true)
          // navigate("/emptycart");

        } else {
          setloading(false)
        }



      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();


  }, [navigate, accesstoken]);


  useEffect(() => {
    if (cartItems.length === 0) {
      setloading(true);   // show empty cart screen
    } else {
      setloading(false);  // show normal cart
    }
  }, [cartItems]);





  // Update quantity
  const updateQuantity = async (cart_item_id, newQty) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const cartKey = `cart_${email}`;

    let updatedCart = cartItems.map(item => {
      if (item.cart_item_id === cart_item_id) {
        if (newQty < 1) newQty = 1;
        if (item.product_variation.stock !== undefined && newQty > item.product_variation.stock)
          newQty = item.product_variation.stock;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    // console.log(cart_item_id)

    // console.log(mergedCart.length)
    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));



    // Update backend
    if (accesstoken) {
      try {
        await axios.patch(
          `${url}add/`,
          { cart_item_id, quantity: newQty },
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
              'ngrok-skip-browser-warning': '69420',
              'Content-Type': 'application/json'
            }
          }

        );
        // console.log('Backend cart Updated')
      } catch (error) {
        console.error("Error updating backend cart:", error);
      }
    }
  };


  const removeItem = async (productVariationId, cart_item_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const cartKey = `cart_${email}`;


    const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const updatedCart = currentCart.filter(
      (item) => item.product_variation.product_variation_id !== productVariationId
    );
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);


    if (accesstoken && cart_item_id) {
      try {
        await axios.delete(`${url}add/`, {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
          data: { cart_item_id },
        });
        // console.log("Item removed from backend");
      } catch (error) {
        console.error("Error removing item from backend:", error);
      }
    }
  };



  if (loading) {
    return <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Inline styles for animations */}
      {/* <style>
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
          </style> */}

      <div >
        <img src={cartImg} alt="Empty cart" className="w-50 md:w-100" />
        <h1 className="flex justify-center w-50 md:w-100 h-40 text-[#FB6D6C] font-semibold" style={{ fontFamily: 'Papyrus' }}>Your Cart is Empty</h1>
      </div>
    </div>
  }


  // const arr = [1,2] //-- count-1
  // arr = [] //-- count -1
  // arr =[1,2] //-- count

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shippingCharge = 40;
  const totalAmount = subtotal + shippingCharge;
  

  return (

    <div className="min-h-screen bg-gray-50 p-1">
      {/* <h1 className="text-3xl font-bold text-center mb-8"
      style={{ fontFamily: 'Papyrus' , color: '#666F80' }}>My Basket</h1> */}

      <div className="max-w-6xl mx-auto bg-white mt-20 shadow-lg p-6 md:flex gap-6">
        {/* Cart Items */}
        <div className="flex-1 border-gray-200 pr-6">
          <h2 className="text-3xl font-bold text-gray-600 mb-4" style={{ fontFamily: 'Papyrus', color: '#666F80' }}>Products</h2>

          {cartItems.length === 0 ? (

            <>
              {/* {navigate("/emptycart")} */}
              {/* { setloading(false)} */}

            </>
          ) : (
            cartItems.map((item, index) => (
              <div key={item.id || index} className="flex text-[10px] md:text-base gap-4 items-center border-b py-4">
                <button
                  onClick={() => removeItem(item.product_variation.product_variation_id, item.cart_item_id)}
                  className="text-gray-400 hover:text-red-500"

                >
                  <FaTrashAlt />
                </button>

                <img src={item.images[0]} alt={item.name} className="md:w-20 md:h-20 w-13 h-13 object-cover rounded-lg aspect-[5/6]" />
                <div className="flex-1">
                  <h3 className="font-semibold text-[10px] md:text-sm text-gray-700" style={{ fontFamily: 'Papyrus', color: '#FB6D6C' }}>{item.product_description}</h3>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-1 font-bold" style={{ fontFamily: 'Papyrus', color: '#666F80' }}>{item.variation_name}</p>


                  {item.quantity >= item.product_variation.stock && (
                    <p className="text-[10px] text-red-500 mt-1 font-bold" style={{ fontFamily: 'Papyrus' }} >Max stock reached</p>
                  )}
                </div>


                <div className=" text-right overflow-hidden">
                  <div className="text-right">
                    <p className=" font-bold text-gray-700" style={{ fontFamily: 'Papyrus', color: '#FB6D6C' }}>₹{item.price}</p>
                    <div className="flex items-center mt-2 border rounded overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cart_item_id, (item.quantity || 1) - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        −
                      </button>
                      <span className="px-4 py-1">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.cart_item_id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600"
                        disabled={item.product_variation.stock === 0 || (item.quantity || 1) >= item.product_variation.stock}
                      >
                        +
                      </button>
                    </div>
                    <div className="w-24 text-right font-bold text-yellow-700" style={{ fontFamily: 'Papyrus', color: '#FB6D6C' }}>
                      ₹{((item.price) * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>


                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Totals */}
        <div className="w-full md:w-1/3 mt-10 md:mt-0 bg-gray-50 p-6 rounded-xl shadow-inner">
          <h2 className=" text-sm md:text-2xl  font-bold text-gray-600 mb-4 text-center" style={{ fontFamily: 'Papyrus', color: '#666F80' }}>Basket Total</h2>
          <div className="flex justify-between text-sm md:text-lg py-2 border-b">
            <span className=" font-bold" style={{ fontFamily: 'Papyrus', color: '#666F80' }}>Subtotal</span>
            <span className="font-semibold" style={{ fontFamily: 'Papyrus', color: '#FB6D6C' }}>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm md:text-lg py-2 border-b">
            <span className="font-bold" style={{ fontFamily: 'Papyrus', color: '#666F80' }}>Transfer</span>
            {/* <span className="text-green-600 font-bold" style={{ fontFamily: 'Papyrus' }}>Free Shipping</span> */}
            <span className="font-bold" style={{ fontFamily: 'Papyrus', color: '#FB6D6C' }}>
            ₹{shippingCharge}
            </span>      
          </div>
          <div className="flex justify-between text-sm md:text-lg py-4  font-bold text-yellow-600" style={{ fontFamily: 'Papyrus', color: '#FB6D6C' }}>
            <span>Total</span>
            {/* <span>₹{subtotal.toFixed(2)}</span> */}
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-3 rounded-lg text-sm md:text-lg font-semibold"
            onClick={toOrder} style={{ fontFamily: 'Papyrus' }}
          >
            Place Order
          </button>
          <div className="flex justify-between mt-4 text-[10px] md:text-sm text-gray-400" style={{ fontFamily: 'Papyrus', color: '#666F80' }}>
            <div>
              {/* <p className="p-2"> Secure Payment</p>
              <p className="p-2"> Easy Returns</p> */}
              <ul>
                <li className="list-disc space-y-2 p-2">Secure & Safe Packaging</li>
                <li className=" list-disc space-y-2 p-2">No Returns</li>
                 {/* <li className=" list-disc space-y-2 p-2">Exchange within 7 days of delivery</li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



