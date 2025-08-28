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
    const response = await axios.get(`https://de20af8d3746.ngrok-free.app/orderhistory/${id}`,

      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
           "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",

        }
      }
    )
    console.log(response.data)
    setOrders(response.data)
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
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
                  Date: {order.date}
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
                >
                  Status: {order.status}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <p
                  className="text-lg font-bold text-right"
                  style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
                >
                  ₹{order.total}
                </p>
              </div>
            </div>

            {/* <div className="mt-4">
              <p
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
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        ))
      }
    </div>
  );
}
