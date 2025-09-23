import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App"


export default function OrderHistory() {
  const [orders, setOrders] = useState([]);



  const accesstoken = localStorage.getItem('AccessToken')
  const id = localStorage.getItem("user_id")

  const Orders = async () => {

     const res1 = await axios.get(`${url}customer/`, {
      headers: {

        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json'
      },
    })
    //  console.log(res.data)
    const data = res1.data
    const filtereddata = data.filter(item => item.User_id == id)
    // console.log(filtereddata)
    const customerid = filtereddata[0].id


    const response = await axios.get(`${url}history/?id=${customerid}`,

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
            <div className="flex flex-row justify-between md:items-center">
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
