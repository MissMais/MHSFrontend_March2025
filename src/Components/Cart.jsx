import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const toorder = () => {
    navigate('/OrderPage');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    if (!email) {
      alert("Please login to view your cart.");
      navigate("/login");
      return;
    }
    const cartKey = `cart_${email}`;
    const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedItems);
  }, [navigate]);

  const removeItem = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const cartKey = `cart_${email}`;

    const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const updatedCart = currentCart.filter(item => item.product_variation_id !== id);

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const updateQuantity = (id, newQty) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const cartKey = `cart_${email}`;

    let currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    currentCart = currentCart.map(item => {
      if (item.product_variation_id === id) {
  
        if (newQty < 1) newQty = 1;
        if (item.stock !== undefined && newQty > item.stock) newQty = item.stock;

        return { ...item, quantity: newQty };
      }
      return item;
    });

    localStorage.setItem(cartKey, JSON.stringify(currentCart));
    setCartItems(currentCart);
  };

  
  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += item.price * (item.quantity || 1);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-light text-center text-gray-500 mb-8">MY BASKET</h1>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:flex gap-6">
        {/* Cart Items */}
        <div className="flex-1 border-r border-gray-200 pr-6">
          <h2 className="text-sm font-bold text-gray-600 mb-4" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>PRODUCTS</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={item.id || index} className="flex gap-4 items-center border-b py-4">
                <button
                  onClick={() => removeItem(item.product_variation_id)}
                  className="text-gray-400 hover:text-red-500"
                  
                >
                  <FaTrashAlt />
                </button>
                <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{item.product_description}</h3>
                  <p className="text-sm text-gray-500 mt-1 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Color: {item.variation_name}</p>
                  

                  {item.quantity >= item.stock && (
                    <p className="text-xs text-red-500 mt-1" >Max stock reached</p>
                  )}
                </div>

                <div className="text-right">
                  <p className=" font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>₹{item.price}</p>
                  <div className="flex items-center mt-2 border rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product_variation_id, (item.quantity || 1) - 1)}
                      className="px-2 py-1 bg-gray-100 text-gray-600"
                      disabled={(item.quantity || 1) <= 1}
                    >
                      −
                    </button>
                    <span className="px-4 py-1">{item.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.product_variation_id, (item.quantity || 1) + 1)}
                      className="px-2 py-1 bg-gray-100 text-gray-600"
                      disabled={item.stock === 0 || (item.quantity || 1) >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="w-24 text-right font-bold text-yellow-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
                  ₹{((item.price) * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Totals */}
        <div className="w-full md:w-1/3 mt-10 md:mt-0 bg-gray-50 p-6 rounded-xl shadow-inner">
          <h2 className=" text-sm font-bold text-gray-600 mb-4"style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>BASKET TOTALS</h2>
          <div className="flex justify-between py-2 border-b">
            <span className=" font-bold"style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Subtotal</span>
            <span className="font-semibold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Transfer</span>
            <span className="text-green-600 font-bold"style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Free Shipping</span>
          </div>
          <div className="flex justify-between py-4 text-lg font-bold text-yellow-600"style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-3 rounded-lg text-sm font-semibold"
            onClick={toorder}  style={{ fontFamily: "Copperplate, Papyrus, fantasy"}}
          >
            GO TO PAYMENT PAGE
          </button>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <div className="text-center">
              <p>🔒 3D Secure</p>
              <p>Secure Payment</p>
            </div>
            <div className="text-center">
              <p>↩️ Easy Returns</p>
              <p>Fast & Easy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
