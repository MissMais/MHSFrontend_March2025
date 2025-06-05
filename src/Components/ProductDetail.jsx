import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from user-specific localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username;
    if (!username) {
      alert("Please login to view your cart.");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${username}`;
    const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    // Add default quantity = 1 if not present
    const itemsWithQuantity = storedItems.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(itemsWithQuantity);
  }, []);

  // Update localStorage and state
  const updateCart = (updatedItems) => {
    const username = JSON.parse(localStorage.getItem("user"))?.username;
    const cartKey = `cart_${username}`;
    localStorage.setItem(cartKey, JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.product_variation_id !== id);
    updateCart(updated);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item =>
      item.product_variation_id === id ? { ...item, quantity: newQty } : item
    );
    updateCart(updated);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.Reduced_price * item.quantity, 0);

  const toorder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/OrderPage", { state: { cart: cartItems } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-light text-center text-gray-500 mb-8">MY BASKET</h1>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:flex gap-6">
        {/* Cart Items */}
        <div className="flex-1 border-r border-gray-200 pr-6">
          <h2 className="uppercase text-sm font-semibold text-gray-600 mb-4">Product</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.product_variation_id} className="flex gap-4 items-center border-b py-4">
                <button onClick={() => removeItem(item.product_variation_id)} className="text-gray-400 hover:text-red-500">
                  <FaTrashAlt />
                </button>
                <img src={item.images?.[0]} alt={item.product_description} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700">{item.product_description}</h3>
                  <p className="text-sm text-gray-500 mt-1">Stock: {item.stock}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-700">₹{item.Reduced_price}</p>
                  <div className="flex items-center mt-2 border rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product_variation_id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-100 text-gray-600"
                    >
                      −
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_variation_id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-100 text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-24 text-right font-bold text-yellow-700">
                  ₹{(item.Reduced_price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Totals */}
        <div className="w-full md:w-1/3 mt-10 md:mt-0 bg-gray-50 p-6 rounded-xl shadow-inner">
          <h2 className="uppercase text-sm font-semibold text-gray-600 mb-4">Basket Totals</h2>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between py-4 text-lg font-bold text-yellow-600">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg text-lg font-semibold" onClick={toorder}>
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
};

export default Cart;
