import React from "react";

export default function Popup({ show, title, message }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl w-80 p-6 text-center">
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "#FB6D6C", fontFamily: 'Papyrus'  }}
        >
          {title}
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: "#666F80", fontFamily: 'Papyrus'  }}
        >
          {message}
        </p>
       
      </div>
    </div>
  );
}

