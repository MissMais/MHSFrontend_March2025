import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [paymentMethod, setPaymentMethod] = useState("card");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Selected payment method:", paymentMethod);
    console.log("Product:", product);

    alert(`Order placed using ${paymentMethod === "cod" ? "Cash on Delivery" : "Card"}`);
    reset();
    // navigate("/thank-you");
  };

  // if (!product) {
  //   return (
  //     <div className="h-screen flex items-center justify-center text-xl text-gray-600">
  //       No product selected. Please go back and select a product.
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12 px-4 md:px-16">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-3xl shadow-2xl">
        {/* Left Column - Invoice Details */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-sm text-gray-700">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Surname"
                {...register("surname", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <input
              type="text"
              placeholder="Company Name (optional)"
              {...register("companyName")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="India"
              
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-400"
            />
            <input
              type="text"
              placeholder="House number and street name"
              {...register("address", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Apartment, flat, room etc. (optional)"
              {...register("apartment")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Pin code"
              {...register("pinCode", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="District / Neighborhood"
              {...register("district", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-4">
              <input
                type="tel"
                placeholder="Telephone"
                {...register("telephone", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Email address"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="hidden"
            >
              Hidden submit button for enter key
            </button>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Order</h2>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-inner space-y-5">
            <div className="flex justify-between items-start border-b pb-4">
              <div className="flex gap-4">
                <img
                  src={product?.image || "./../../public/logo.jpeg"}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{product?.Product_Description || "N/A"}</p>
                </div>
              </div>
              <p className="font-semibold text-right text-gray-800">₹{product?.Price}</p>
            </div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <p className="font-semibold text-right text-gray-800">₹{product?.Price}</p>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <p className="font-semibold text-right text-gray-800">₹{product?.Price}</p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="accent-green-600"
                />
                Credit or Debit Card
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-green-600"
                />
                Cash on Delivery
              </label>

              {paymentMethod === "card" && (
                <div id="card-details" className="card-fields">
                  <input
                    type="text"
                    placeholder="Name on Card"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="•••• •••• •••• ••••"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" required className="accent-green-600 mt-1" />
                <span>I have read, understood, and accept the agreements.</span>
              </label>
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Complete Payment
              </button>
              <div className="text-xs text-center text-gray-400 mt-2">
                3D Secure Payment | Fast and Easy Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
