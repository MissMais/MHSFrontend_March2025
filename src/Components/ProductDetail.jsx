// // // ########## SA 
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { IoCartSharp } from 'react-icons/io5';
// import { FaRupeeSign } from "react-icons/fa";

// export default function ProductDetail() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [allVariations, setAllVariations] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [relatedproduct, setrelatedproduct] = useState([])

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     if (allVariations.length > 0) {
//       setSelectedProduct(allVariations[0]);
//     }
//   }, [allVariations]);

//   // const cmt_url = 'https://modestgallery.pythonanywhere.com/custom/'
// const url = 
// "https://3j7gm770-8000.inc1.devtunnels.ms/custom/"


//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(url);
//       const response2 = await axios.get(url);
//       const filtered = response.data.filter(item => item.product_id === id);
//       console.log(response.data.category_name)
//       setAllVariations(filtered);
//       setrelatedproduct(response2.data)
//     } catch (error) {
//       console.error('Failed to fetch product variations:', error);
//     }
//   };

//   const swapWithMain = (index) => {
//     if (!selectedProduct || index === 0) return;

//     const images = [...selectedProduct.images];
//     const temp = images[0];
//     images[0] = images[index];
//     images[index] = temp;

//     selectedProduct.images = images;
//     setSelectedProduct({ ...selectedProduct });
//   };

// const addToCart = async (product) => {
//   const accesstoken = localStorage.getItem("AccessToken");

//   if (!accesstoken) {
//     alert('Please login to add items to your cart.');
//     navigate('/login');
//     return;
//   }

//   if (product.product_variation.stock > 0) {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const email = user?.email;
//     const cartKey = `cart_${email}`;
//     let cart = JSON.parse(localStorage.getItem(cartKey)) || [];


//     const existingItem = cart.find(
//       item => item.product_variation.product_variation_id === product.product_variation.product_variation_id
//     );

//     let quantity;
//     if (existingItem) {
//       existingItem.quantity = (existingItem.quantity || 0) + 1;
//       quantity = existingItem.quantity;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//       quantity = 1;
//     }

//     localStorage.setItem(cartKey, JSON.stringify(cart));

//     try {
//       const payload = {
//         quantity: quantity, 
//         product_variation_id: product.product_variation.product_variation_id,
//       };

//       const response = await axios.post(
//         "https://3j7gm770-8000.inc1.devtunnels.ms/cartitem/",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${accesstoken}`,
//           },
//         }
//       );
//       console.log(response.data.cart_item_id)
// const id = response.data.cart_item_id
//       console.log("Added to server-side cart");
//     } catch (error) {
//       console.error("Error adding to backend cart:", error);
//     }

//     navigate("/Cart");
//   } else {
//     alert("Out Of Stock");
//   }
// };


//   const goToOrderPage = () => {
//     const token = localStorage.getItem('AccessToken');
//     if (!token) {
//       alert('Please login to continue with your order.');
//       navigate('/login');
//       return;
//     }
//     navigate('/OrderPage', { state: { product: selectedProduct } });
//   };

//   const getProductImage = (product) => {
//     return product.images?.[0].replace("http://localhost:8000/", "http://192.168.29.87:8000/") 
//   };

//   // const filteredProductsWithImages = allVariations.filter(
//   //   product =>
//   //     product.images &&
//   //     product.images.length > 0 &&
//   //     product.product_id === id
//   // );

//   const handleProductClick = (productId) => {
//     navigate(`/ProductDetail/${productId}`);
//   };

//   return (
//     <div className="bg-gray-100 px-0 mt-15">
//       <div className="max-w-7xl bg-white shadow-lg rounded-xl overflow-hidden">
//         <div className="grid md:grid-cols-2 gap-8 p-8">
//           {/* Image Section */}
//           <div className="flex flex-col items-center">
//             <img
//               // src={selectedProduct?.images?.[0].replace("http://localhost:8000/", "http://192.168.29.87:8000/")}
//               className="rounded-lg shadow-md w-full h-auto"
//               onClick={() => swapWithMain(0)}
//               alt="Product"
//             />
//             <div className="flex gap-2 mt-4">
//               {selectedProduct?.images?.slice(0, 3).map((img, index) => (
//                 <img
//                   key={index}
//                   // src={img.replace("http://localhost:8000/", "http://192.168.29.87:8000/")}
//                   className="w-20 h-14 object-cover rounded cursor-pointer"
//                   onClick={() => swapWithMain(index)}
//                   alt={`Thumbnail ${index}`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Info Section */}
//           <div>
//             <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//               {selectedProduct?.product_description || 'Product Name'}
//             </h1>
//             <p className="text-2xl font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//               ₹ {selectedProduct?.price || 'N/A'}
//             </p>
//             <p style={{ color: '#666F80' }}>
//               <span className="font-medium">Stock:</span> {selectedProduct?.product_variation.stock ?? 'N/A'}
//             </p>
//             <div className="mb-4 text-sm font-medium" style={{ color: '#C3C8D3' }}>
//               Free Shipping | 24hr Dispatch
//             </div>

//             {/* Color Selector */}
//             {allVariations.some(v => v.variation_type === 'Color') && (
//               <div className="mt-7">
//                 <h2 className="font-semibold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Choose Color:</h2>
//                 <div className="flex gap-2 flex-wrap">
//                   {allVariations
//                     .filter(v => v.variation_type === 'Color' && v.ColorCode)
//                     .map((variation, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedProduct(variation)}
//                         className={`w-6 h-6 rounded-full border-2 ${selectedProduct?.product_variation_id === variation.product_variation_id ? 'border-black' : 'border-gray-300'}`}
//                         style={{ backgroundColor: variation.ColorCode }}
//                       />
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Size Selector */}
//             {allVariations.some(v => v.variation_type === 'Size') && (

//               <div className="mt-7">
//                 <h2 className="font-semibold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>{allVariations[0]?.category_name === 'Abayas' ? 'Choose Size:' : 'Size:'}</h2>
//                 <div className="flex gap-2 flex-wrap">
//                   {allVariations
//                     .filter(v => v.variation_type === 'Size')
//                     .map((variation, index) => {
//                       const isSelected = selectedProduct?.product_variation.product_variation_id === variation.product_variation.product_variation_id;
//                       const isAvailable = variation.stock;
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => isAvailable && setSelectedProduct(variation)}
//                           disabled={!isAvailable}
//                           className={`px-4 py-1 border rounded ${isSelected ? 'bg-black text-white' : ''} ${!isAvailable ? 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300'}`}
//                         >
//                           {variation.variation_name}
//                         </button>
//                       );
//                     })}
//                 </div>
//               </div>
//             )}

//             {/* Buttons */}
//             <div className="mt-10 flex gap-4">
//               <button
//                 className="border border-[#FB6D6C] bg-white text-[#FB6D6C] px-6 py-2 rounded-full hover:bg-[#e95a59] hover:text-white transition w-full flex items-center justify-center gap-2"
//                 onClick={() => addToCart(selectedProduct)}
//               >
//                 <IoCartSharp className="text-xl" />
//                 <span>Add to Cart</span>
//               </button>
//             </div>

//             <div className='mt-2'>
//               <button
//                 className="bg-[#FB6D6C] text-white px-6 py-2 rounded-full hover:bg-[#e95a59] transition w-full"
//                 onClick={goToOrderPage}
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Similar Products Section */}
//       {selectedProduct && (
//         <div className="px-4 mt-12">
//           <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Related Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {relatedproduct
//               .filter(p =>
//                 p.category_name === selectedProduct.category_name &&
//                 p.product_id !== selectedProduct.product_id &&
//                 p.images && p.images.length > 0
//               )
//               .sort(() => Math.random() - 0.5)
//               .slice(0, 6)
//               .map(product => (
//                 <div key={product.product_variation_id} className="flex flex-col bg-white shadow-md hover:shadow-xl transition-all overflow-hidden">
//                   <div className="h-64 w-full shadow-[0_6px_16px_rgba(0,0,0,0.45)] overflow-hidden">
//                     <img
//                       src={getProductImage(product)}
//                       alt="Product"
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                   <div className="p-4 flex flex-col flex-grow">
//                     <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{product.product_description}</h3>
//                     <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>{product.category_name}</p>
//                     <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>{product.sub_category_name}</p>
//                     <p className="text-sm text-gray-500" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>{product.variation_name ?? "N/A"}</p>
//                     <p className="text-sm mt-2 text-green-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Stock: {product.stock}</p>
//                     <div className="mt-auto flex justify-between items-center pt-3 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                       <span className="text-xl font-semibold">
//                         <FaRupeeSign className="inline mr-1" />
//                         {parseFloat(product.Reduced_price).toLocaleString()}
//                       </span>
//                       <button
//                         className="bg-[#FB6D6C] text-white px-4 py-2 rounded-lg hover:bg-[#e95a59] transition-all" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
//                         onClick={() => handleProductClick(product.product_id)}
//                       >
//                         View
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }










































// // ########## SH
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoCartSharp } from 'react-icons/io5';
import { FaRupeeSign, FaStar } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { url } from "../App"

export default function ProductDetail() {
  const navigate = useNavigate();
  // const location = useLocation()
  const { id } = useParams();
  const [allVariations, setAllVariations] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedproduct, setrelatedproduct] = useState([])
  const [isloading, setloading] = useState(true)
  const [quotes, setQuotes] = useState([])
  const [wish, setwish] = useState([])
  const [customerId, setCustomerId] = useState(null);




  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    fetchquote()
  }, [])



  useEffect(() => {
    if (allVariations.length > 0) {
      setSelectedProduct(allVariations[0]);
    }
  }, [allVariations]);

  // const cmt_url = 'https://modestgallery.pythonanywhere.com/custom/'
  // const url =
  // 'https://5d0abf24c6ce.ngrok-free.app/'


  const headers = {
    //   Authorization: `Bearer ${accessToken}`,
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'application/json'
  }

  const fetchProduct = async () => {
    try {
      const response = await axios.get(url + 'custom/', { headers });
      const response2 = await axios.get(url + 'custom/', { headers });
      console.log(response)
      const filtered = response.data.filter(item => item.product_variation.product_variation_id === id);
      // console.log(response.data.category_name)
      setAllVariations(filtered);
      setrelatedproduct(response2.data)

      setTimeout(() => {
        setloading(false)
      }, 3000)

    } catch (error) {
      console.error('Failed to fetch product variations:', error);
    }
  };



  const swapWithMain = (index) => {
    if (!selectedProduct || index === 0) return;

    const images = [...selectedProduct.images];

    const temp = images[0];
    images[0] = images[index];
    images[index] = temp;

    selectedProduct.images = images;
    setSelectedProduct({ ...selectedProduct });
  };

  const addToCart = async (product) => {
    const accesstoken = localStorage.getItem("AccessToken");

    if (!accesstoken) {
      alert('Please login to add items to your cart.');
      navigate('/login');
      return;
    }

    if (product.product_variation.stock > 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;
      const cartKey = `cart_${email}`;
      let cart = JSON.parse(localStorage.getItem(cartKey)) || [];


      const existingItem = cart.find(
        item => item.product_variation.product_variation_id === product.product_variation.product_variation_id
      );

      let quantity;
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        quantity = existingItem.quantity;
      } else {
        cart.push({ ...product, quantity: 1 });
        quantity = 1;
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));

      try {
        const payload = {
          quantity: quantity,
          product_variation_id: product.product_variation.product_variation_id,
        };

        await axios.post(
          `${url}add/`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("Added to server-side cart");
      } catch (error) {
        console.error("Error adding to backend cart:", error);
      }

      navigate("/Cart");
      alert("Added To Cart !")
    } else {
      alert("Out Of Stock");
    }
  };


  const goToOrderPage = () => {
    const token = localStorage.getItem('AccessToken');
    if (!token) {
      alert('Please login to continue with your order.');
      navigate('/login');
      return;
    }
    navigate('/OrderPage', { state: { product: selectedProduct } });
  };

  const getProductImage = (product) => {
    return product.images?.[0]
    // .replace("http://localhost:8000/", "http://192.168.29.87:8000/") 
  };

  // const filteredProductsWithImages = allVariations.filter(
  //   product =>
  //     product.images &&
  //     product.images.length > 0 &&
  //     product.product_id === id
  // );

  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };

  const fetchquote = async () => {
    const response = await axios.get(`${url}quote/`, { headers })
    const data = response.data
    const randomquoteindex = Math.floor(Math.random() * data.length)
    setQuotes(data[randomquoteindex])
    console.log(response.data)
  }



  
  const getcustomerid = async () => {
    const res = await axios.get(`${url}customer`, {
      headers: {
        //   Authorization: `Bearer ${accessToken}`,
        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json'
      },
    })
    //  console.log(res.data)
    const data = res.data
    console.log(data)

    const filtereddata = data.filter(item => item.User_id == user_id)
    console.log(filtereddata[0].id)
    setCustomerId(filtereddata[0].id)

    // console.log(filtereddata[0].id)

  }

  useEffect(() => {
    getcustomerid()
  }, [])


  useEffect(() => {
    if (!customerId) return;

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${url}wishlist/`, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json',
          },
        });
        const customerWishlist = res.data.filter(item => item.customer_id == customerId);
        setwish(customerWishlist);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, [customerId]);



  const Wishlist = async (product) => {
    const variationId = product.product_variation.product_variation_id;

    try {

      const existing = wish.find(item => item.product_variation_id == variationId);

      if (existing) {

        await axios.delete(`${url}wishlist/`, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json',
          },
          data: {
            wishlist_id: existing.wishlist_id
          },
        });


        setwish(prev => prev.filter(item => item.product_variation_id != variationId));
        console.log("Wishlist Deleted")
      } else {

        await axios.post(`${url}wishlist/`, {
          customer_id: customerId,
          product_variation_id: variationId,
        }, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json',
          },
        });

        const wishlistRes = await axios.get(`${url}wishlist/`,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              'Content-Type': 'application/json'
            }
          });
        const customerWishlist = wishlistRes.data.filter(item => item.customer_id == customerId);
        setwish(customerWishlist);
        console.log("Wishlist Added")

      }
    } catch (error) {
      console.error(error);
    }
  };





  // console.log(selectedProduct)
  if (isloading) {
    return <div className="flex justify-center items-center min-h-screen px-4">
      <div className=" p-6 rounded-lg w-full">
        {quotes && (
          <h2
            className="text-center text-2xl font-bold mb-6 animate-pulse"
            style={{
              fontFamily: 'Copperplate, Papyrus, fantasy',
              color: '#666F80',
            }}
          >
            {quotes.quote}
          </h2>
        )}
      </div>
    </div>

  }

  return (
    <div className="bg-gray-100 px-0 mt-15">
      <div className="max-w-7xl bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="flex flex-col items-center ">
            <img
              src={selectedProduct?.images?.[0]}
              // .replace("http://localhost:8000/", "http://192.168.29.87:8000/")}
              className="rounded-lg shadow-md w-full h-auto md:w-full md:h-125 object-cover aspect-[5/6]"
              onClick={() => swapWithMain(0)}
              alt="Product"
            />
            <div className="flex gap-2 mt-4">
              {selectedProduct?.images?.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  // .replace("http://localhost:8000/", "http://192.168.29.87:8000/")}
                  className="w-20 h-14 object-cover rounded cursor-pointer"
                  onClick={() => swapWithMain(index)}
                  alt={`Thumbnail ${index}`}
                />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
            <h1 className="text-xl md:text-3xl font-bold mb-2 text-black">
              {selectedProduct?.sub_category_name || 'Product Name'}
            </h1>
            <h1 className="text-sm md:text-xl font-bold mb-2">
              {selectedProduct?.product_description || 'Product Name'}
            </h1>
            <p className="text-gray-500 text-xs md:text-sm font-bold border rounded-lg w-12 px-2 flex items-center border-[#666F80]">
              {selectedProduct?.product_variation?.avg_rating !== null ? (
                <>
                  {selectedProduct?.product_variation?.avg_rating?.toFixed(1)}
                  <FaStar className="inline text-yellow-400" />
                </>
              ) : (
                <span className="invisible">0</span>

              )}
            </p>

            <p className="text-xl md:text-3xl pt-7  font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
              ₹ {selectedProduct?.price || 'N/A'}
            </p>

            {/* <p style={{ color: '#666F80' }}>
              <span className="font-medium">Stock:</span> {selectedProduct?.product_variation.stock ?? 'N/A'}
            </p> */}
            <div className=" text-xs md:font-medium" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#C3C8D3' }}>
              Free Shipping
            </div>

            {/* Color Selector
            {allVariations.some(v => v.variation_type === 'Color') && (
              <div className="mt-7">
                <h2 className="text-xs font-semibold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>Choose Color:</h2>
                <div className="flex gap-2 flex-wrap">
                  {allVariations
                    .filter(v => v.variation_type === 'Color' && v.ColorCode)
                    .map((variation, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedProduct(variation)}
                        className={`w-6 h-6 rounded-full border-2 ${selectedProduct?.product_variation_id === variation.product_variation_id ? 'border-black' : 'border-gray-300'}`}
                        style={{ backgroundColor: variation.ColorCode }}
                      />
                    ))}
                </div>
              </div>
            )} */}

            {/* Size Selector */}
            {allVariations.some(v => v.variation_type === 'Size') && (

              <div className="mt-7">
                <h2 className="font-semibold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>{allVariations[0]?.category_name === 'Abayas' ? 'Choose Size:' : 'Size:'}</h2>
                <div className="flex gap-2 flex-wrap">
                  {allVariations
                    .filter(v => v.variation_type === 'Size')
                    .map((variation, index) => {
                      const isSelected = selectedProduct?.product_variation.product_variation_id === variation.product_variation.product_variation_id;
                      const isAvailable = variation.stock;
                      return (
                        <button
                          key={index}
                          onClick={() => isAvailable && setSelectedProduct(variation)}
                          disabled={!isAvailable}
                          className={`px-4 py-1 border rounded ${isSelected ? 'bg-black text-white' : ''} ${!isAvailable ? 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300'}`}
                        >
                          {variation.variation_name}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-10 flex gap-4">
              <div >
                <button
                  className="border border-[#FB6D6C] bg-white text-[#FB6D6C] px-6 py-2 rounded-full hover:bg-[#e95a59] hover:text-white transition w-full flex items-center justify-center gap-2"
                  onClick={() => addToCart(selectedProduct)}
                >
                  <IoCartSharp className="text-xl" />
                  <span style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Add to Cart</span>
                </button>
              </div>
              <div>
                <button
                  onClick={() => Wishlist(selectedProduct)}
                  style={{ cursor: "pointer" }}
                  className=" border border-[#FB6D6C] rounded-full px-5 py-2 w-full flex items-center justify-center gap-2"
                >
                  {wish.some(item => item.product_variation_id == selectedProduct.product_variation.product_variation_id) ? (
                  <IoHeart className='text-xl text-[#FB6D6C]' /> 
                  
                  ) : (
                  <IoHeartOutline className='text-xl text-[#FB6D6C]' />
                  )}
                  <span>Wishlist</span>
                </button>

              </div>


            </div>



            <div className='md:text-xs mt-7 text-gray-400 space-y-2'>
              <p>100% Original Products</p>
              <p>High Quality</p>
              <p>No Returns & Exchange</p>
              <p>Cash on Delivery Available</p>
              <p>Secure & Safe Packaging</p>
              <p>Affordable Prices</p>
              <p>Wide Range of Collections</p>
              <p>Fast & Reliable Delivery</p>
              <p>Trusted by Hundreds of Customers</p>
              <p>Exclusive & Unique Designs</p>
              <p>Comfortable & Trendy Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {selectedProduct && (
        <div className="px-4 mt-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedproduct
              .filter(p =>
                p.category_name === selectedProduct.category_name &&
                p.product_id !== selectedProduct.product_id &&
                p.images && p.images.length > 0
              )
              .sort(() => Math.random() - 0.5)
              .slice(0, 6)
              .map(product => (
                <div key={product.product_variation_id} className="flex flex-col bg-white shadow-md hover:shadow-xl transition-all overflow-hidden">
                  <div className="h-64 w-full shadow-[0_6px_16px_rgba(0,0,0,0.45)] overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt="Product"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{product.product_description}</h3>
                    <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>{product.category_name}</p>
                    <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>{product.sub_category_name}</p>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>{product.variation_name ?? "N/A"}</p>
                    <p className="text-sm mt-2 text-green-700" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Stock: {product.stock}</p>
                    <div className="mt-auto flex justify-between items-center pt-3 font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
                      <span className="text-xl font-semibold">
                        <FaRupeeSign className="inline mr-1" />
                        {parseFloat(product.Reduced_price).toLocaleString()}
                      </span>
                      <button
                        className="bg-[#FB6D6C] text-white px-4 py-2 rounded-lg hover:bg-[#e95a59] transition-all" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                        onClick={() => handleProductClick(product.Product_id)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
}
