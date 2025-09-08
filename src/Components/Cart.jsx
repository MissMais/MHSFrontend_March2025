
// // ############## SH
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaTrashAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   const toorder = () => {
//     navigate('/OrderPage');
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const email = user?.email;
//     // if(cartItems.length === 0 ){
//     //   // <div><img src="/emptycart.jpg" alt="" /></div>
//     //   navigate("/emptycart");
//     // }
//     if (!email) {
//       alert("Please login to view your cart.");
//       navigate("/login");
//       return;
//     }
//     const cartKey = `cart_${email}`;
//     const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];
//     setCartItems(storedItems);
//   }, [navigate]);



//   const removeItem = async (id) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const email = user?.email;
//     const cartKey = `cart_${email}`;

//     const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

//     const updatedCart = currentCart.filter(item => item.product_variation.product_variation_id !== id);

//     localStorage.setItem(cartKey, JSON.stringify(updatedCart));
//     setCartItems(updatedCart);


//   //  const accesstoken = localStorage.getItem("AccessToken");
//   // if (accesstoken) {
//   //   try {
//   //     await axios.delete(
//   //       'https://wkvkk9t8-8000.inc1.devtunnels.ms/addtocart/',
//   //       { product_variation_id: id, Quantity: newQty },
//   //       { headers: { 

//   //         Authorization: `Bearer ${accesstoken}` 

//   //       } }
//   //     );
//   //     console.log("Backend quantity updated");
//   //   } catch (error) {
//   //     console.error("Error updating backend cart:", error);
//   //   }
//   // }

//   };


// const updateQuantity = async(id, newQty) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const email = user?.email;
//   const cartKey = `cart_${email}`;
// // console.log(id)
//   let currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

//   currentCart = currentCart.map(item => {
//     if (item.product_variation.product_variation_id === id) {
//       if (newQty < 1) newQty = 1;
//       if (item.product_variation.stock !== undefined && newQty > item.product_variation.stock) 
//         newQty = item.product_variation.stock;

//       return { ...item, quantity: newQty };
//     }
//     return item;
//   });

//   localStorage.setItem(cartKey, JSON.stringify(currentCart));
//   setCartItems(currentCart);

//   // Update backend
//   const accesstoken = localStorage.getItem("AccessToken");
//   if (accesstoken) {
//     try {
//       const response = await axios.post(
//         'https://3j7gm770-8000.inc1.devtunnels.ms/cartitem/',
//         { product_variation_id: id, quantity: newQty },
//         { headers: { 

//           Authorization: `Bearer ${accesstoken}` 

//         } }
//       );
//         // console.log(response.data.cart_item_id)
// // const id = response.data.cart_item_id;
//       console.log("Backend quantity updated");
//     } catch (error) {
//       console.error("Error updating backend cart:", error);
//     }
//   }
// };






//     let subtotal = 0;
//     cartItems.forEach(item => {
//       subtotal += item.price * (item.quantity || 1);
//     });

//     return (

//       <div className="min-h-screen bg-gray-50 p-6">
//         <h1 className="text-3xl font-light text-center text-gray-500 mb-8">My Basket</h1>

//         <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:flex gap-6">
//           {/* Cart Items */}
//           <div className="flex-1 border-r border-gray-200 pr-6">
//             <h2 className="text-3xl font-bold text-gray-600 mb-4" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Products</h2>

//             {cartItems.length === 0 ? (
//               <p className="text-gray-400" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Your cart is empty</p>
//             ) : (
//               cartItems.map((item, index) => (
//                 <div key={item.id || index} className="flex gap-4 items-center border-b py-4">
//                   <button
//                     onClick={() => removeItem(item.product_variation.product_variation_id)}
//                     className="text-gray-400 hover:text-red-500"

//                   >
//                     <FaTrashAlt />
//                   </button>
//                   <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{item.product_description}</h3>
//                     <p className="text-sm text-gray-500 mt-1 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Color: {item.variation_name}</p>


//                     {item.quantity >= item.product_variation_stock && (
//                       <p className="text-xs text-red-500 mt-1" >Max stock reached</p>
//                     )}
//                   </div>

//                   <div className="text-right">
//                     <p className=" font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>₹{item.price}</p>
//                     <div className="flex items-center mt-2 border rounded overflow-hidden">
//                       <button
//                         onClick={() => updateQuantity(item.product_variation.product_variation_id, (item.quantity || 1) - 1)}
//                         className="px-2 py-1 bg-gray-100 text-gray-600"
//                         disabled={(item.quantity || 1) <= 1}
//                       >
//                         −
//                       </button>
//                       <span className="px-4 py-1">{item.quantity || 1}</span>
//                       <button
//                         onClick={() => updateQuantity(item.product_variation.product_variation_id, (item.quantity || 1) + 1)}
//                         className="px-2 py-1 bg-gray-100 text-gray-600"
//                         disabled={item.product_variation_stock === 0 || (item.quantity || 1) >= item.product_variation_stock}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="w-24 text-right font-bold text-yellow-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                     ₹{((item.price) * (item.quantity || 1)).toFixed(2)}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Cart Totals */}
//           <div className="w-full md:w-1/3 mt-10 md:mt-0 bg-gray-50 p-6 rounded-xl shadow-inner">
//             <h2 className=" text-lg font-bold text-gray-600 mb-4 text-center" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Basket Total</h2>
//             <div className="flex justify-between py-2 border-b">
//               <span className=" font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Subtotal</span>
//               <span className="font-semibold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between py-2 border-b">
//               <span className="font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Transfer</span>
//               <span className="text-green-600 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Free Shipping</span>
//             </div>
//             <div className="flex justify-between py-4 text-lg font-bold text-yellow-600" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//               <span>Total</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <button
//               className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-3 rounded-lg text-lg font-semibold"
//               onClick={toorder} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
//             >
//               Place Order
//             </button>
//             <div className="flex justify-between mt-4 text-xs text-gray-400" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//               <div>
//                 <p className="p-2">🔒 Secure Payment</p>
//                 <p className="p-2">↩️ Easy Returns</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

























// // ############## SH
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaTrashAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [itemid, setid] = useState()
//   const navigate = useNavigate();
//   const accesstoken = localStorage.getItem("AccessToken");

//   const toorder = () => {
//     navigate('/OrderPage');
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const email = user?.email;
//     // if(cartItems.length === 0 ){
//     //   // <div><img src="/emptycart.jpg" alt="" /></div>
//     //   navigate("/emptycart");
//     // }
//     if (!email) {
//       alert("Please login to view your cart.");
//       navigate("/login");
//       return;
//     }
//     const cartKey = `cart_${email}`;
//     const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];
//     setCartItems(storedItems);
//   }, [navigate]);


//   useEffect(() => {

//     const fetchCart = async () => {
//       if (accesstoken) {
//         try {
//           const response = await axios.get(
//             "https://636865d8d5c8.ngrok-free.app/addtocart/",
//             {
//               headers: {
//                 Authorization: `Bearer ${accesstoken}`,
//                 'ngrok-skip-browser-warning':'69420',
//                 'Content-Type':'application/json'
//               },
//             }
//           );
//           console.log(response.data);
//           setid(response.data[0].cart_item_id);

//         } catch (error) {
//           console.error("Error fetching cart:", error);
//         }
//       }
//     };


//     fetchCart();
//   }, [accesstoken]);



//   const removeItem = async (id) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const email = user?.email;
//     const cartKey = `cart_${email}`;

//     const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

//     const updatedCart = currentCart.filter(item => item.product_variation.product_variation_id !== id);

//     localStorage.setItem(cartKey, JSON.stringify(updatedCart));
//     setCartItems(updatedCart);


//     //  const accesstoken = localStorage.getItem("AccessToken");
//     // if (accesstoken) {
//     //   try {
//     //     await axios.delete(
//     //       'https://wkvkk9t8-8000.inc1.devtunnels.ms/addtocart/',
//     //       { product_variation_id: id, Quantity: newQty },
//     //       { headers: { 

//     //         Authorization: `Bearer ${accesstoken}` 

//     //       } }
//     //     );
//     //     console.log("Backend quantity updated");
//     //   } catch (error) {
//     //     console.error("Error updating backend cart:", error);
//     //   }
//     // }

//   };

//   const updateQuantity = async (id, newQty) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const email = user?.email;
//     const cartKey = `cart_${email}`;
//     // console.log(id)
//     let currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

//     currentCart = currentCart.map((item,index) => {
//       if (index === id) {
//         if (newQty < 1) newQty = 1;
//         if (item.product_variation.stock !== undefined && newQty > item.product_variation.stock)
//           newQty = item.product_variation.stock;

//         return { ...item, quantity: newQty };
//       }
//       return item;
//     });

//     localStorage.setItem(cartKey, JSON.stringify(currentCart));
//     setCartItems(currentCart);
//     console.log(currentCart[0])
//     const data = currentCart
//     console.log(data)
//     // data.findIndex()

//     console.log(id)


//     try {
//       const response = await axios.get(
//         "https://636865d8d5c8.ngrok-free.app/addtocart/",
//         {
//           headers: {
//              Authorization: `Bearer ${accesstoken}`,
//                 'ngrok-skip-browser-warning':'69420',
//                 'Content-Type':'application/json'
//           },
//         }
//       );
//       console.log(response.data);
//       setid(response.data[id].cart_item_id);
//       console.log(response.data[id].cart_item_id);
//       console.log(response.data)


//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }




//     // Update backend
//     // const accesstoken = localStorage.getItem("AccessToken");
//     if (accesstoken) {
//       try {
//         const response = await axios.patch(
//           'https://636865d8d5c8.ngrok-free.app/addtocart/',
//           { cart_item_id: itemid, quantity: newQty },
//           {
//             headers: {

//                Authorization: `Bearer ${accesstoken}`,
//                 'ngrok-skip-browser-warning':'69420',
//                 'Content-Type':'application/json'

//             }
//           }
//         );
//         // console.log(response.data.cart_item_id)
//         // const id = response.data.cart_item_id;
//         console.log(response)
//         console.log("Backend quantity updated");
//       } catch (error) {
//         console.error("Error updating backend cart:", error);
//       }
//     }
//   };





//   let subtotal = 0;
//   cartItems.forEach(item => {
//     subtotal += item.price * (item.quantity || 1);
//   });

//   return (

//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-light text-center text-gray-500 mb-8">My Basket</h1>

//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:flex gap-6">
//         {/* Cart Items */}
//         <div className="flex-1 border-r border-gray-200 pr-6">
//           <h2 className="text-3xl font-bold text-gray-600 mb-4" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Products</h2>

//           {cartItems.length === 0 ? (
//             <p className="text-gray-400" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Your cart is empty</p>
//           ) : (
//             cartItems.map((item, index) => (
//               <div key={item.id || index} className="flex gap-4 items-center border-b py-4">
//                 <button
//                   onClick={() => removeItem(item.product_variation.product_variation_id)}
//                   className="text-gray-400 hover:text-red-500"

//                 >
//                   <FaTrashAlt />
//                 </button>
//                 <p>{index}</p>
//                 <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{item.product_description}</h3>
//                   <p className="text-sm text-gray-500 mt-1 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Color: {item.variation_name}</p>


//                   {item.quantity >= item.product_variation_stock && (
//                     <p className="text-xs text-red-500 mt-1" >Max stock reached</p>
//                   )}
//                 </div>

//                 <div className="text-right">
//                   <p className=" font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>₹{item.price}</p>
//                   <div className="flex items-center mt-2 border rounded overflow-hidden">
//                     <button
//                       onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
//                       className="px-2 py-1 bg-gray-100 text-gray-600"
//                       disabled={(item.quantity || 1) <= 1}
//                     >
//                       −
//                     </button>
//                     <span className="px-4 py-1">{item.quantity || 1}</span>
//                     <button
//                       onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
//                       className="px-2 py-1 bg-gray-100 text-gray-600"
//                       disabled={item.product_variation_stock === 0 || (item.quantity || 1) >= item.product_variation_stock}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <div className="w-24 text-right font-bold text-yellow-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                   ₹{((item.price) * (item.quantity || 1)).toFixed(2)}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Cart Totals */}
//         <div className="w-full md:w-1/3 mt-10 md:mt-0 bg-gray-50 p-6 rounded-xl shadow-inner">
//           <h2 className=" text-lg font-bold text-gray-600 mb-4 text-center" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Basket Total</h2>
//           <div className="flex justify-between py-2 border-b">
//             <span className=" font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Subtotal</span>
//             <span className="font-semibold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>₹{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between py-2 border-b">
//             <span className="font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Transfer</span>
//             <span className="text-green-600 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Free Shipping</span>
//           </div>
//           <div className="flex justify-between py-4 text-lg font-bold text-yellow-600" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//             <span>Total</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>
//           <button
//             className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-3 rounded-lg text-lg font-semibold"
//             onClick={toorder} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
//           >
//             Place Order
//           </button>
//           <div className="flex justify-between mt-4 text-xs text-gray-400" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//             <div>
//               <p className="p-2">🔒 Secure Payment</p>
//               <p className="p-2">↩️ Easy Returns</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// Cart.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem("AccessToken");


  const url = "https://36878661c9fc.ngrok-free.app/"


  const toOrder = () => {
    navigate('/OrderPage');
  };

  // Load cart from localStorage & backend
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
    console.log(cartItems)



    // Fetch backend cart to get cart_item_id
    const fetchCart = async () => {
      if (!accesstoken) return;
      try {
        const response = await axios.get(
          `${url}add/`,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
              'ngrok-skip-browser-warning': '69420',
              'Content-Type': 'application/json'
            },
          }
        );
        // console.log(response.data)



        const user_id = JSON.parse(localStorage.getItem("user_id"));
        const backendCart = response.data

        const filtererddata = backendCart.filter(item => item.Cart_id == user_id)
        const sliceindex = storedItems.length
        const sliceddata = filtererddata.slice(-sliceindex)
        console.log(sliceddata)


        //     response data--:
        //    [0{ cart_item_id: 121, Cart_id: 2, product_variation_id: 'PV0001', Quantity: 1, Sub_Total: 300 }
        //     1{ cart_item_id: 122, Cart_id: 2, product_variation_id: 'PV0001', Quantity: 1, Sub_Total: 300 }
        //     2{cart_item_id: 123, Cart_id: 2, product_variation_id: 'PV0001', Quantity: 1, Sub_Total: 300}]
        //     length:2
        //     [[Prototype]]: Array(0)

        console.log(storedItems)
        console.log(backendCart)
        console.log(cartItems)

        // console.log((storedItems) + (backendCart))
        // Merge backend cart_item_id with localStorage cart items
        const mergedCart = storedItems.map(localItem => {
          const backendItem = sliceddata.find(b => b.product_variation_id === localItem.product_variation.product_variation_id);
          return {
            ...localItem,
            quantity: backendItem ? backendItem.Quantity : (localItem.quantity || 1),
            cart_item_id: backendItem ? backendItem.cart_item_id : null
          };
        });

        setCartItems(mergedCart);
        console.log(mergedCart)
        console.log(mergedCart.length)
        localStorage.setItem(cartKey, JSON.stringify(mergedCart));

        if (mergedCart.length === 0) {
          navigate("/emptycart");

        }

      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };




    fetchCart();


  }, [navigate, accesstoken]);



  // useEffect(() => {
  //   if (cartItems.length === 0) {
  //     navigate("/emptycart");
  //   }
  // }, [cartItems, navigate]);



  // Update quantity
  const updateQuantity = async (cart_item_id, newQty) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const cartKey = `cart_${email}`;

    let updatedCart = cartItems.map(item => {
      if (item.cart_item_id === cart_item_id) {
        if (newQty < 1) newQty = 1;
        if (item.product_variation.stock !== undefined && newQty > item.product_variation.stock)
          newQty = item.product_variation.stock;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    console.log(cart_item_id)

    // console.log(mergedCart.length)
    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));



    // Update backend
    if (accesstoken) {
      try {
        await axios.patch(
          `${url}add/`,
          { cart_item_id, quantity: newQty },
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
              'ngrok-skip-browser-warning': '69420',
              'Content-Type': 'application/json'
            }
          }

        );
        console.log('Backend cart Updated')
      } catch (error) {
        console.error("Error updating backend cart:", error);
      }
    }
  };


  const removeItem = async (productVariationId, cart_item_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const cartKey = `cart_${email}`;


    const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const updatedCart = currentCart.filter(
      (item) => item.product_variation.product_variation_id !== productVariationId
    );
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);


    if (accesstoken && cart_item_id) {
      try {
        await axios.delete(`${url}add/`, {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
          data: { cart_item_id },
        });
        console.log("Item removed from backend");
      } catch (error) {
        console.error("Error removing item from backend:", error);
      }
    }
  };



  // const arr = [1,2] //-- count-1
  // arr = [] //-- count -1
  // arr =[1,2] //-- count

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (

    <div className="min-h-screen bg-gray-50 p-1">
      {/* <h1 className="text-3xl font-bold text-center mb-8"
      style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>My Basket</h1> */}

      <div className="max-w-6xl mx-auto bg-white rounded-2xl mt-20 shadow-lg p-6 md:flex gap-6">
        {/* Cart Items */}
        <div className="flex-1 border-gray-200 pr-6">
          <h2 className="text-3xl font-bold text-gray-600 mb-4" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Products</h2>

          {cartItems.length === 0 ? (

            <>
              {navigate("/emptycart")}

            </>
          ) : (
            cartItems.map((item, index) => (
              <div key={item.id || index} className="flex text-[10px] md:text-base gap-4 items-center border-b py-4">
                <button
                  onClick={() => removeItem(item.product_variation.product_variation_id, item.cart_item_id)}
                  className="text-gray-400 hover:text-red-500"

                >
                  <FaTrashAlt />
                </button>

                <img src={item.images[0]} alt={item.name} className="md:w-20 md:h-20 w-13 h-13 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-[10px] md:text-sm text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{item.product_description}</h3>
                  <p className="text-[7px] md:text-xs text-gray-500 mt-1 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>{item.variation_name}</p>


                  {item.quantity >= item.product_variation.stock && (
                    <p className="text-[7px] text-red-500 mt-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy'}} >Max stock reached</p>
                  )}
                </div>

                <div className="text-right">
                  <p className=" font-bold text-gray-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>₹{item.price}</p>
                  <div className="flex items-center mt-2 border rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.cart_item_id, (item.quantity || 1) - 1)}
                      className="px-2 py-1 bg-gray-100 text-gray-600"
                      disabled={(item.quantity || 1) <= 1}
                    >
                      −
                    </button>
                    <span className="px-4 py-1">{item.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.cart_item_id, (item.quantity || 1) + 1)}
                      className="px-2 py-1 bg-gray-100 text-gray-600"
                      disabled={item.product_variation.stock === 0 || (item.quantity || 1) >= item.product_variation.stock}
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
          <h2 className=" text-sm md:text-2xl  font-bold text-gray-600 mb-4 text-center" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Basket Total</h2>
          <div className="flex justify-between text-sm md:text-lg py-2 border-b">
            <span className=" font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Subtotal</span>
            <span className="font-semibold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm md:text-lg py-2 border-b">
            <span className="font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Transfer</span>
            <span className="text-green-600 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Free Shipping</span>
          </div>
          <div className="flex justify-between text-sm md:text-lg py-4  font-bold text-yellow-600" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-[#FB6D6C] hover:bg-[#e95a59] text-white py-3 rounded-lg text-sm md:text-lg font-semibold"
            onClick={toOrder} style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
          >
            Place Order
          </button>
          <div className="flex justify-between mt-4 text-[10px] md:text-sm text-gray-400" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
            <div>
              {/* <p className="p-2"> Secure Payment</p>
              <p className="p-2"> Easy Returns</p> */}
              <ul>
                <li className="list-disc space-y-2 p-2">Secure Payment</li>
                <li className=" list-disc space-y-2 p-2">Easy Returns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



