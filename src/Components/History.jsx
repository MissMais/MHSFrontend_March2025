import axios from "axios";
import React, { useEffect, useState } from "react";

// const Orders = [
//   {
//     id: "ORD123456",
//     date: "2025-06-01",
//     status: "Delivered",
//     total: 1799,
//     items: [
//       { name: "Black Abaya", qty: 1, price: 1199 },
//       { name: "Cotton Hijab", qty: 2, price: 300 },
//     ],
//   },
//   {
//     id: "ORD789101",
//     date: "2025-05-21",
//     status: "Processing",
//     total: 999,
//     items: [
//       { name: "Printed Stole", qty: 1, price: 499 },
//       { name: "Underscarf", qty: 1, price: 500 },
//     ],
//   },
// ];

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);


  const accesstoken = localStorage.getItem('AccessToken')
  const id = localStorage.getItem("user_id")

  const Orders = async () => {
    const response = await axios.get(`https://36878661c9fc.ngrok-free.app/history/${id}`,

      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",

        }
      }
    )
    console.log(response.data)
    const array = response.data.reverse()
    setOrders(array)
  }

  useEffect(() => {
    Orders();
  }, []);


  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-20">
      <h1
        className="text-3xl font-bold mb-6"
        style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
      >
        Orders
      </h1>

      {
        orders.map((order, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
          >
            <div className="flex flex-col flex-row justify-between md:items-center">
              <div>
                <p
                  className="text-lg font-semibold"
                  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
                >
                  Order #{order.order_id}
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
                >
                  Date: {order.Order_date.split(' ')[0]}
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
                >
                  Status: {order.Order_status}
                </p>
              </div>

              <div>
                <img src={order.cart_item.product_variation.images[0]} alt="no image" className="w-20 md:w-30" />

              </div>
            </div>
            <p
              className="font-semibold mb-2 text-start"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
            >
              Items:
            </p>
          
              <div className=" flex text-xs justify-between" style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}>
                {order.cart_item.product_variation.product_description} x {order.cart_item.Quantity}
                <p
                  className=" text-sm font-bold text-end"
                  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
                >
                  ₹{order.cart_item.Quantity * order.cart_item.product_variation.price}
                </p>
            </div>
            {/* <p
                className="font-semibold mb-2"
                style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
              >
                Items:
              </p>
              <ul className="space-y-1">
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-sm"
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
                  >
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span>₹{item.price}</span>
                  </li> */}
            {/* ))} */}
            {/* </ul> */}

          </div>
        ))
      }
    </div>
  );
}
