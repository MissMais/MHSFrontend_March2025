import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // const product = location.state?.product;
 const [cartItems, setCartItems] = useState([]);
  const [Address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("card");


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    if (!email) {
      alert("Please login first.");
      navigate("/login");
      return;
    }
    const cartKey = `cart_${email}`;
    const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedItems);
    // console.log(storedItems)
  }, [navigate]);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;
  if (!email) {
    alert("Please login first.");
    navigate("/login");
    return;
  }
  const addressKey = `selectedAddress_${email}`;
  const storedAdd = JSON.parse(localStorage.getItem(addressKey)) || {};
  setAddress(storedAdd);

  
  reset({
    name: storedAdd.Name || "",
    surname: "",
    companyName: "",
    address: storedAdd.House_No || "",
    apartment: storedAdd.Address_type || "",
    pinCode: storedAdd.Pincode || "",
    district: storedAdd.Landmark || "",
    city: storedAdd.City || "",
    telephone: storedAdd.Contact || "",
  });

  console.log(storedAdd);
}, [navigate, reset]);


  


  const onSubmit = async(data) => {
    const accesstoken = localStorage.getItem("AccessToken")
    try {
      const payload = {
        
        Delivery_Address: Address.Address_id,
        payment_id: paymentMethod,
        payment_confirmation:false,
        order_status:"Booked",
        cart_item_id:cartItems
      };

      await axios.post(
        'https://wkvkk9t8-8000.inc1.devtunnels.ms/placeorder/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

    
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Form Data:", data);
    console.log("Selected payment method:", paymentMethod);
    console.log("Product:", cartItems);

    alert(`Order placed using ${paymentMethod === "Cash" ? "Cash on Delivery" : "Card"}`);
    // reset();
  
  };


  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += item.price * (item.quantity || 1);
  });
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800"  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>Payment Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-sm text-gray-700">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                readOnly
                defaultValue={Address.Name || ""}
                {...register("name" )}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
              />
              <input
                type="text"
                placeholder="Surname (optional)"
                readOnly
                {...register("surname")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
              />
            </div>
            <input
              type="text"
              placeholder="Company Name (optional)"
              readOnly
              {...register("companyName")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
            />
            <input
              type="text"
              placeholder="India"
              readOnly
              
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-400"
            />
            <input
              type="text"
              placeholder="House number and street name"
              readOnly
              defaultValue={Address.House_No || ""}
              {...register("address" )}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
            />
            <input
              type="text"
              placeholder="Address Type"
              readOnly
              defaultValue={Address.Address_type || ""}
              {...register("apartment")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
            />
            <input
              type="text"
              placeholder="Pin code"
              readOnly
              defaultValue={Address.Pincode || ""}
              {...register("pinCode" )}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
            />
            <input
              type="text"
              placeholder="District / Neighborhood"
              readOnly
              defaultValue={Address.Landmark || ""}
              {...register("district")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
            />
            <input
              type="text"
              placeholder="City"
              readOnly
              defaultValue={Address.City || ""}
              {...register("city")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
            />
            <div className="flex gap-4">
              <input
                type="tel"
                placeholder="Telephone"
                readOnly
                defaultValue={Address.Contact || ""}
                {...register("telephone" )}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
              />
              {/* <input
                type="email"
                placeholder="Email address"
                value={Add}
                {...register("email", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
              /> */}
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800"  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>Your Order</h2>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-inner space-y-5">
            { cartItems.map((product, idx) => (
            <div key={idx} className="flex justify-between items-start border-b pb-4">
             
              <div className="flex gap-4">
                
                <img
                  src={product?.images[0] || "./../../public/logo.jpeg"}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
                  <p className="font-medium">{product?.product_description || "N/A"}</p>
                {/* </div> */}
                 {/* <div  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}> */}
                  <p className="font-medium" >Quantity: <span className="font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }} >{product?.quantity || "N/A"}</span></p>
                </div>
              </div>
              <p className="font-semibold text-right "  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>₹{product?.price * product.quantity}</p>
            </div>
                )
              )}
            <div className="text-sm font-bold space-y-1"  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between " style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                 <span>Total</span>
                <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-4 space-y-4 font-bold" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="accent-[#666F80]"
                />
                Credit or Debit Card
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={() => setPaymentMethod("Cash")}
                  className="accent-[#FB6D6C]"
                />
                Cash on Delivery
              </label>

              {paymentMethod === "card" && (
                <div id="card-details" className="card-fields">
                  <input
                    type="text"
                    placeholder="Name on Card"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
                  />
                  <input
                    type="text"
                    placeholder="•••• •••• •••• ••••"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" required className="accent-[#FB6D6C] mt-1" />
                <span >I have read, understood, and accept the agreements.</span>
              </label>
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-[#FB6D6C] text-white py-3 rounded-xl  hover:bg-[#e95a59] font-semibold transition"
                style={{ fontFamily: "Copperplate, Papyrus, fantasy"}}
              >
                Complete Payment
              </button>
              <div className="text-xs text-center text-gray-400 mt-2"   style={{ fontFamily: "Copperplate, Papyrus, fantasy"}}>
                3D Secure Payment | Fast and Easy Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
