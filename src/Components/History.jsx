import React, { useEffect, useState } from 'react';

const Orders = [
  {
    id: 'ORD123456',
    date: '2025-06-01',
    status: 'Delivered',
    total: 1799,
    items: [
      { name: 'Black Abaya', qty: 1, price: 1199 },
      { name: 'Cotton Hijab', qty: 2, price: 300 },
    ],
  },
  {
    id: 'ORD789101',
    date: '2025-05-21',
    status: 'Processing',
    total: 999,
    items: [
      { name: 'Printed Stole', qty: 1, price: 499 },
      { name: 'Underscarf', qty: 1, price: 500 },
    ],
  },
];

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    setOrders(Orders);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-20">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-6 mb-6 border-gray-200"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <p className="text-lg font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-600">Date: {order.date}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-lg font-bold text-right">₹{order.total}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-2">Items:</p>
              <ul className="space-y-1">
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span>₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
