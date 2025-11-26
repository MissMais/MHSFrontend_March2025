import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../App"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Popup from "./Popup";


export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // const product = location.state?.product;
  const [cartItems, setCartItems] = useState([]);
  const [Address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [payment, setPayment] = useState([])
  const [showPopup, setShowPopup] = useState(false);

  const stripe = useStripe();
  const elements = useElements();


  // const url = "https://5d0abf24c6ce.ngrok-free.app/"

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
      // alert("Please login first.");
      navigate("/login");
      return;
    }
    const cartKey = `cart_${email}`;
    const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedItems);

    if (storedItems == 0) {
      // alert("Add products")
      navigate("/ProductPage")
      return;

    }
    // console.log(storedItems)
  }, [navigate]);



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    if (!email) {
      // alert("Please login first.");
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


  }, [navigate, reset]);




  const onSubmit = async (data) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const cartKey = `cart_${email}`;
    const accesstoken = localStorage.getItem("AccessToken");

    try {
      if (paymentMethod.toLowerCase() === "upi") {

        const res = await axios.post(`${url}test/`, {
          amount: subtotal * 100,
        });
        const { clientSecret } = res.data;

        // Confirm payment with Stripe
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
        // if(error)
        // console.log(result)

        if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
          // console.log("Payment successfull", result.paymentIntent)

          const pay = payment.filter(item => item.Payment_mode == paymentMethod)
          const paymentid = pay[0].Payment_id
          const payload = {
            Delivery_Address: Address.Address_id,
            // payment_id: result.paymentIntent.id,
            payment_id: paymentid,
            payment_confirmation: true,
            order_status: "Booked",
            cart_item_id: cartItems,
          };

          const orderRes = await axios.post(`${url}place/`, payload, {
            headers: { Authorization: `Bearer ${accesstoken}` },
          });

          // console.log("Order placed:", orderRes.data);
          setShowPopup(true);
          localStorage.removeItem(cartKey);
          setCartItems([]);
          // alert(orderRes.message)
          // navigate("/ProductPage");
        }
      } else {

        // const paymentid = 
        // console.log(payment)
        const pay = payment.filter(item => item.Payment_mode == paymentMethod)
        const paymentid = pay[0].Payment_id
        // Cash on Delivery
        const payload = {
          Delivery_Address: Address.Address_id,
          payment_id: paymentid,
          payment_confirmation: false,
          order_status: "Booked",
          cart_item_id: cartItems,
        };

        const orderRes = await axios.post(`${url}place/`, payload, {
          headers: { Authorization: `Bearer ${accesstoken}` },
        });

        localStorage.removeItem(cartKey);
        // console.log(orderRes.data.message)
        setShowPopup(true);
        setCartItems([]);
        // alert(orderRes.data.message)
        setTimeout(() => {
          navigate("/ProductPage");
        }, 3000);

      }
    } catch (error) {
      console.error(error);
    }
  };


  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += item.price * (item.quantity || 1);
  });



  const fetchpayment = async () => {
    const response = await axios.get(`${url}payment/`,

      {
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': '69420',
          'Content-Type': 'application/json'
        },
      }
    )
    const fetcheddata = response.data
    // console.log(fetcheddata)
    setPayment(fetcheddata)

    // console.log(payment[0])
    // const filtereddata = fetcheddata.filter(item => item.uzser_id == User_id)
    // setaddress(filtereddata)
    // console.log(filtereddata)
  }

  useEffect(() => {
    fetchpayment();

  }, []);



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12 px-4 md:px-16">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 shadow-2xl">
        {/* Left Column - Invoice Details */}
        <div>
          <div className="flex justify-between mb-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#666F80]" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>Payment Details</h2>
            <button onClick={() => navigate('/address')} style={{ fontFamily: 'Papyrus'  }} className="rounded-xl bg-[#FB6D6C] font-bold text-white py-3 px-2 text-[8px]  md:text-[10px]">Select Address</button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-sm text-[#666F80]">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                readOnly
                defaultValue={Address.Name || ""}
                {...register("name")}
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
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-[#C3C8D3]"
            />
            <input
              type="text"
              placeholder="House number and street name"
              readOnly
              defaultValue={Address.House_No || ""}
              {...register("address")}
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
              {...register("pinCode")}
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
                {...register("telephone")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 "
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
          <h2 className="text-2xl font-bold mb-6 text-[#666F80]" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>Your Order</h2>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-inner space-y-5">
            {cartItems.map((product, idx) => (
              <div key={idx} className="flex justify-between items-start border-b pb-4">

                <div className="flex gap-4">

                  <img
                    src={product?.images[0] || "./../../public/logo.jpeg"}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>
                    <p className="font-medium">{product?.product_description || "N/A"}</p>
                    {/* </div> */}
                    {/* <div  style={{ fontFamily: 'Papyrus' , color: "#666F80" }}> */}
                    <p className="font-medium" >Quantity: <span className="font-bold" style={{ fontFamily: 'Papyrus' , color: '#FB6D6C' }} >{product?.quantity || "N/A"}</span></p>
                  </div>
                </div>
                <p className="font-semibold text-right " style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>₹{product?.price * product.quantity}</p>
              </div>
            )
            )}
            <div className="text-sm font-bold space-y-1" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between " style={{ fontFamily: 'Papyrus' , color: '#FB6D6C' }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
              </div>
            </div>
            {payment.map((item, idx) => (
              <div key={item.Payment_id} className="mt-4 space-y-4 font-bold" style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === item.Payment_mode}
                    onChange={() => setPaymentMethod(item.Payment_mode)}
                    className="accent-[#666F80]"
                  />
                  {item.Payment_mode}
                </label>

              </div>

            ))}
            {paymentMethod.toLowerCase() === "upi" && (
              <div id="card-details" className="card-fields">
                <CardElement className="p-2 border mb-4" />

              </div>
            )}


            <div className="mt-6 space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" required className="accent-[#FB6D6C] mt-1" />
                <span >I have read, understood, and accept the agreements.</span>
              </label>
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-[#FB6D6C] text-white py-3 rounded-xl  hover:bg-[#e95a59] font-semibold transition"
                style={{ fontFamily: 'Papyrus'  }}
              >
                Complete Payment
              </button>
              <div className="text-xs text-center text-[#C3C8D3] mt-2" style={{ fontFamily: 'Papyrus'  }}>
                3D Secure Payment | Fast and Easy Returns
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Popup Component */}
      <Popup
        show={showPopup}
        title="Order Placed"
        message="Order has been placed succesfully "
      />
    </div>
  );
}
