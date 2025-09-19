// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { FaFilter, FaTag, FaPalette, FaCubes, FaRupeeSign } from "react-icons/fa";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const url = 
// // "https://3j7gm770-8000.inc1.devtunnels.ms/custome/";
// "https://wkvkk9t8-8000.inc1.devtunnels.ms/custom/";

// const ProductPage = () => {
//     const [searchParams] = useSearchParams();
//     const defaultCategory = searchParams.get("category") || "All";

//     const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
//     const [maxPrice, setMaxPrice] = useState(10000);
//     const [products, setProducts] = useState([]);
//     const [selectedColour, setSelectedColour] = useState("All");
//     const [selectedMaterial, setSelectedMaterial] = useState("All");

//     const navigate = useNavigate();


//     useEffect(() => {
//         fetchProducts();
//     }, []);


//     useEffect(() => {
//         const categoryFromUrl = searchParams.get("category") || "All";
//         setSelectedCategory(categoryFromUrl);
//     }, [searchParams, products]);


// const accessToken = localStorage.getItem("AccessToken")
//     const fetchProducts = async () => {
//         try {
//             const res = await axios.get(url,
//                 {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//             );
//             setProducts(res.data);
//             // console.log(res.data)
//             // console.log(res.data[0].images[0].replace("http://localhost:8000/", "http://192.168.29.87:8000/"))
//         } catch (err) {
//             console.error("Error fetching products", err);
//         }
//     };


//     const getUniqueCategories = () => {
//         const unique = new Set(products.map(p => p.category_name));
//         return Array.from(unique);
//     };

//     const getUniqueMaterial = () => {
//         const unique = new Set(
//             products
//                 .filter(p => p.category_name === selectedCategory && p.variation_type === "Fabric")
//                 .map(p => p.variation_name)
//         );
//         return Array.from(unique);
//     };



//     const getUniqueColours = () => {
//         const unique = new Set(
//             products
//                 .filter(p => p.category_name === selectedCategory && p.variation_type === "Color")
//                 .map(p => p.variation_name)
//         );
//         return Array.from(unique);
//     };

//     // const getProductImage = (product) => {
//     //     return product.images && product.images.length > 0
//     //         ? product.images[0]
//     //         : "No Image Found";
//     // };


//     const filteredProducts = products.map((product) => {
//             // console.log("**********",product.images[0])
//         //    return product
//         (selectedCategory === "All" || product.category_name === selectedCategory) &&
//         (selectedColour === "All" || product.variation_name?.toLowerCase() === selectedColour.toLowerCase()) &&
//         // (selectedMaterial === "All" || product.Material?.toLowerCase() === selectedMaterial.toLowerCase()) &&
//         parseFloat(product.price) <= maxPrice
//         console.log(product)
//         return product
         
//     }
//     )
    
//     console.log("&&&&&&&&&&&&&&&&&&&&&&&",filteredProducts)


//     const filteredProductsWithImages = filteredProducts.filter(
//         product => {
//             console.log("**************************",product)
//             product.images && product.images.length > 0 && product.images[0]
//             return product
//         } 
//     );


//     const handleProductClick = (id) => {
//         console.log(id)
//         navigate(`/ProductDetail/${id}`);
//     };


//     const handleCategoryChange = (value) => {
//         setSelectedCategory(value);
//         const newParams = new URLSearchParams(searchParams);
//         if (value === "All") {
//             newParams.delete("category");
//         } else {
//             newParams.set("category", value);
//         }
//         navigate({ search: newParams.toString() });
//     };




//     return (
//         <div className="max-w-7xl mt-16 mx-auto p-0 flex flex-col md:flex-row bg-white shadow-xl rounded-2xl">
//             {/* Sidebar */}
//             <div className="w-full md:w-1/3 p-6 mr-5 border-gray-200 bg-gray-100  mb-6 md:mb-0">
//                 <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#666F80]">
//                     <FaFilter /> Filters
//                 </h2>

//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Category</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     value={selectedCategory}
//                     onChange={(e) => handleCategoryChange(e.target.value)}
//                 >
//                     <option value="All" className="text-[#666F80]">All</option>
//                     {getUniqueCategories().map((cat) => (
//                         <option key={cat} value={cat} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>{cat}</option>
//                     ))}
//                 </select>


//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Colour</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     onChange={(e) => setSelectedColour(e.target.value)}
//                 >
//                     <option value="All" className="text-[#666F80]">All</option>
//                     {getUniqueColours().map((colour) => (
//                         <option key={colour} value={colour} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                             {colour}
//                         </option>
//                     ))}
//                 </select>



//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Material</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     onChange={(e) => setSelectedMaterial(e.target.value)}
//                 >
//                     <option value="All" style={{ color: '#666F80' }} className="text-[#666F80]">All</option>
//                     {getUniqueMaterial().map((mat) => (
//                         <option key={mat} value={mat} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                             {mat}
//                         </option>
//                     ))}
//                 </select>


//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                     Max Price: ₹{maxPrice.toLocaleString()}
//                 </label>
//                 <input
//                     type="range"
//                     min="0"
//                     max="10000"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(Number(e.target.value))}
//                     className="w-50% accent-[#FB6D6C]"

//                 />
//             </div>

//             {/* Products */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-2/1 px-4 mt-10">
//                 {filteredProductsWithImages
//                     // .sort(() => Math.random() - 0.5)
//                     .map((product, idx) => (
//                         <div
//                             key={idx}
//                             className="flex flex-col bg-white shadow-md hover:shadow-xl transition-all overflow-hidden"
//                         >

//                             <div className="h-64 w-full shadow-[0_6px_16px_rgba(0,0,0,0.45)]  overflow-hidden">
//                                 <img
//                                     src={
//                                         product.images[0]?.replace("http://localhost:8000/", "http://192.168.18.136:8000/")
                
//                                     }
//                                     alt="Product"
//                                     className="object-cover w-full h-full"
//                                 />
//                             </div>


//                             <div className="p-4 flex flex-col flex-grow" >
//                                 <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{product.product_description}</h3>
//                                 <div className="" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                                     <p className="text-sm text-gray-500 mb-1">

//                                         {product.category_name}
//                                     </p>
//                                     <p className="text-sm text-gray-500 mb-1">

//                                         {product.sub_category_name}
//                                     </p>
//                                     <p className="text-sm text-gray-500">

//                                         {product.variation_name || "N/A"}
//                                     </p>
//                                     <p className="text-sm mt-2 text-green-700">Stock: {product.stock}</p>
//                                 </div>

//                                 <div className="mt-auto flex justify-between font-bold items-center pt-3" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                                     <span className="text-xl font-semibold">
//                                         <FaRupeeSign className="inline mr-1" />
//                                         {parseFloat(product.price).toLocaleString()}
//                                     </span>
//                                     <button
//                                         className="bg-[#FB6D6C] text-white px-4 py-2 rounded-lg hover:bg-[#e95a59] transition-all"
//                                         onClick={() => handleProductClick(product.Product_id)}
//                                     >
//                                         View
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default ProductPage;

































import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaFilter,FaSearch , FaRupeeSign } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../Routes/Footer";
import {url} from "../App"
import { CloudDownload } from "lucide-react";



// const url = 'https://5d0abf24c6ce.ngrok-free.app/custom/'
// "https://3j7gm770-8000.inc1.devtunnels.ms/custom/";
// "https://wkvkk9t8-8000.inc1.devtunnels.ms/custom/";

const ProductPage = () => {
    const [searchParams] = useSearchParams();
    const defaultCategory = searchParams.get("category") || "All";

    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [products, setProducts] = useState([]);
    const [selectedColour, setSelectedColour] = useState("All");
    // const [selectedMaterial, setSelectedMaterial] = useState("All");
  
    const [wishlist, setWishlist] = useState([]);
     const [search, setSearch] = useState("");
     const [customerId, setCustomerId] = useState(null);


     const user_id = localStorage.getItem('user_id')
    





    const navigate = useNavigate();


    useEffect(() => {
        fetchProducts();
    }, []);


    useEffect(() => {
        const categoryFromUrl = searchParams.get("category") || "All";
        setSelectedCategory(categoryFromUrl);
    }, [searchParams, products]);


const accessToken = localStorage.getItem("AccessToken")
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${url}custom/`,
                {
        headers: {
        //   Authorization: `Bearer ${accessToken}`,
           'ngrok-skip-browser-warning':'69420',
                'Content-Type':'application/json'
        },
      }
            );
            setProducts(res.data);
            console.log(res.data)
            // console.log(res.data)
            // console.log(res.data[0].images[0].replace("http://localhost:8000/", "http://192.168.29.87:8000/"))
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };


    const getUniqueCategories = () => {
        const unique = new Set(products.map(p => p.category_name));
        return Array.from(unique);
    };

    // const getUniqueMaterial = () => {
    //     const unique = new Set(
    //         products
    //             .filter(p => p.category_name === selectedCategory && p.variation_type === "Fabric")
    //             .map(p => p.variation_name)
    //     );
    //     return Array.from(unique);
    // };



    const getUniqueColours = () => {
        const unique = new Set(
            products
                .filter(p => p.category_name === selectedCategory || p.variation_type === "Color") 
                .map(p => p.variation_name)
        );
        return Array.from(unique);
    };
    


    const filteredProducts = products.filter((product) => {
            // console.log("**********",product.images[0])
        //    return product
       return(
        (selectedCategory === "All" || product.category_name === selectedCategory) &&
        (selectedColour === "All" || product.variation_name?.toLowerCase() === selectedColour.toLowerCase()) &&
        // (selectedColour === "All" || product.variation_name?.toLowerCase()) &&
        (search === "" || product.sub_category_name.toLowerCase().includes(search.toLowerCase()))&&
        parseFloat(product.price) <= maxPrice)   
    }
    )
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&",filteredProducts)


    const filteredProductsWithImages = filteredProducts.filter(
        product => {
            // console.log("**************************",product)
            return product.images && product.images.length > 0 && product.images[0]
            
        } 
    );
    // console.log(filteredProductsWithImages)

    const handleProductClick = (id) => {
        console.log(id)
        navigate(`/quote/${id}`)
        // navigate(`/ProductDetail/${id}`);
    };








    const handleCategoryChange = (value) => {
        console.log(value)
        setSelectedCategory(value);
        const newParams = new URLSearchParams(searchParams);
    
        if (value === "All") {
            newParams.delete("category");
        } else {
            newParams.set("category", value);
        }
        navigate({ search: newParams.toString() });
    };


useEffect(()=>{
  getcustomerid()
},[])

    
    // get customer id from customer endpoint

const getcustomerid = async () =>{
 const res = await axios.get(`${url}customer`,{ 
           headers: {
        //   Authorization: `Bearer ${accessToken}`,
           'ngrok-skip-browser-warning':'69420',
                'Content-Type':'application/json'
        },})
//  console.log(res.data)
 const data = res.data
 const filtereddata = data.filter(item=>item.User_id == user_id)
 setCustomerId(filtereddata[0].id)
 
// console.log(filtereddata[0].id)

}



    const toggleWishlist = async (product) => {
      
      // const user_id = localStorage.getItem('user_id')

      console.log(product)
      const variationId = product.product_variation.product_variation_id;

  if (wishlist.includes(variationId)) {
  
    try {
      await axios.delete(`${url}wishlist/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        data: {
          customer_id: user_id,
          product_variation_id: variationId,
        },
      });

      setWishlist((prev) => prev.filter((id) => id !== variationId));
    } catch (error) {
      console.error(error);
    }
  } else {
  
    try {
      await axios.post(
        `${url}wishlist/`,
        {
          customer_id: customerId,
          product_variation_id: variationId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        }
      );

      setWishlist((prev) => [...prev, variationId]);
    } catch (error) {
      console.error(error);
    }
  }
};











    return (
      <div>

      
        <div className="max-w-7xl mt-16 mx-auto p-0 flex flex-col md:flex-row bg-white shadow-xl rounded-2xl">
  {/* Sidebar */}
  <div className="w-full md:w-1/6 p-6 border-gray-200 bg-gray-100 mb-6 md:mb-0">
    <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#666F80]">
      <FaFilter /> Filters
    </h2>

    {/* Category */}
    <label
      className="block font-semibold mb-2"
      style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
    >
      Category
    </label>
    <select
      className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
      value={selectedCategory}
      onChange={(e) => handleCategoryChange(e.target.value)}
    >
      <option value="All" className="text-[#666F80]">
        All
      </option>
      {getUniqueCategories().map((cat) => (
        <option
          key={cat}
          value={cat}
          style={{
            fontFamily: "Copperplate, Papyrus, fantasy",
            color: "#666F80",
          }}
        >
          {cat}
        </option>
      ))}
    </select>

    {/* Colour */}
    <label
      className="block font-semibold mb-2"
      style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
    >
      Colour
    </label>
    <select
      className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
      onChange={(e) => setSelectedColour(e.target.value)}
    >
      <option value="All" className="text-[#666F80]">
        All
      </option>
      {getUniqueColours().map((colour) => (
        <option
          key={colour}
          value={colour}
          style={{
            fontFamily: "Copperplate, Papyrus, fantasy",
            color: "#666F80",
          }}
        >
          {colour}
        </option>
      ))}
    </select>

    {/* Max Price */}
    <label
      className="block font-semibold mb-2"
      style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
    >
      Max Price: ₹{maxPrice.toLocaleString()}
    </label>
    <input
      type="range"
      min="0"
      max="10000"
      value={maxPrice}
      onChange={(e) => setMaxPrice(Number(e.target.value))}
      className="w-full accent-[#FB6D6C]"
    />
  </div>

  {/* Products Section */}
  <div className="flex-1 ">
    {/* Search bar */}
    <div className="flex justify-start mt-3 mb-4 px-4">
      <div className="relative w-full max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FB6D6C]" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-[#FB6D6C] focus:border-[#FB6D6C]
          transition-all duration-300 placeholder:text-[12px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>

    {/* Product grid */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-3  px-4 mt-10">
      {filteredProductsWithImages.map((product, idx) => (
        <div
          key={idx}
          className="flex flex-col bg-white shadow-md hover:shadow-xl transition-all overflow-hidden"
        >
          {/* Image */}
          <div className="h-[200px] md:h-[300px] w-full shadow-[0_6px_16px_rgba(0,0,0,0.45)] overflow-hidden">
            <img
              src={product.images[0]}
              alt="Product"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Details */}
          <div  style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}  className="p-4 flex flex-col flex-grow text-xs md:text-sm">
            <h3
              className="md:text-lg font-bold mb-1 text-[#FB6D6C]"
             
            >
              {product.product_description}
            </h3>
            <p className="text-gray-500">
              {product.variation_name || "N/A"}
            </p>
            <p className="text-gray-500">
            <FaRupeeSign className="inline text-gray-400" />
              {parseFloat(product.price).toLocaleString()}
            </p>

            {/* Wishlist + View */}
            <div className="mt-auto flex justify-between font-bold items-center pt-3">
             <div
                onClick={() => toggleWishlist(product)}
                style={{ cursor: "pointer" }}
                className="text-lg md:text-2xl">
                {wishlist.includes(product.product_variation.product_variation_id) ? (
                <IoHeart color="#FB6D6C" />
                ) : (
                <IoHeartOutline color="#FB6D6C" />
                )}
            </div>

              <button
                className="border border-[#FB6D6C] text-[#FB6D6C] px-4 py-2 rounded-lg transition-all"
                style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                onClick={() => handleProductClick(product.product_variation.product_variation_id)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  </div>
  <section id='contact'  >
                  <Footer />
              </section>
</div>

    );
};

export default ProductPage;









{/* <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Material</label>
                <select
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                >
                    <option value="All" style={{ color: '#666F80' }} className="text-[#666F80]">All</option>
                    {getUniqueMaterial().map((mat) => (
                        <option key={mat} value={mat} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
                            {mat}
                        </option>
                    ))}
                </select> */}



























// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { FaFilter, FaTag, FaPalette, FaCubes, FaRupeeSign } from "react-icons/fa";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const url = 
// "https://3j7gm770-8000.inc1.devtunnels.ms/custome/";
// // "https://wkvkk9t8-8000.inc1.devtunnels.ms/custom/";

// const ProductPage = () => {
//     const [searchParams] = useSearchParams();
//     const defaultCategory = searchParams.get("category") || "All";

//     const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
//     const [maxPrice, setMaxPrice] = useState(10000);
//     const [products, setProducts] = useState([]);
//     const [selectedColour, setSelectedColour] = useState("All");
//     const [selectedMaterial, setSelectedMaterial] = useState("All");

//     const navigate = useNavigate();


//     useEffect(() => {
//         fetchProducts();
//     }, []);


//     useEffect(() => {
//         const categoryFromUrl = searchParams.get("category") || "All";
//         setSelectedCategory(categoryFromUrl);
//     }, [searchParams, products]);


// const accessToken = localStorage.getItem("AccessToken")
//     const fetchProducts = async () => {
//         try {
//             const res = await axios.get(url,
//                 {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//             );
//             setProducts(res.data);
//             // console.log(res.data)
//             // console.log(res.data[0].images[0].replace("http://localhost:8000/", "http://192.168.29.87:8000/"))
//         } catch (err) {
//             console.error("Error fetching products", err);
//         }
//     };


//     const getUniqueCategories = () => {
//         const unique = new Set(products.map(p => p.category_name));
//         return Array.from(unique);
//     };

//     const getUniqueMaterial = () => {
//         const unique = new Set(
//             products
//                 .filter(p => p.category_name === selectedCategory && p.variation_type === "Fabric")
//                 .map(p => p.variation_name)
//         );
//         return Array.from(unique);
//     };



//     const getUniqueColours = () => {
//         const unique = new Set(
//             products
//                 .filter(p => p.category_name === selectedCategory && p.variation_type === "Color")
//                 .map(p => p.variation_name)
//         );
//         return Array.from(unique);
//     };

//     // const getProductImage = (product) => {
//     //     return product.images && product.images.length > 0
//     //         ? product.images[0]
//     //         : "No Image Found";
//     // };


//     const filteredProducts = products.map((product) => {
//             // console.log("**********",product.images[0])
//         //    return product
//         (selectedCategory === "All" || product.category_name === selectedCategory) &&
//         (selectedColour === "All" || product.variation_name?.toLowerCase() === selectedColour.toLowerCase()) &&
//         // (selectedMaterial === "All" || product.Material?.toLowerCase() === selectedMaterial.toLowerCase()) &&
//         parseFloat(product.price) <= maxPrice
//         console.log(product)
//         return product
         
//     }
//     )
    
//     console.log("&&&&&&&&&&&&&&&&&&&&&&&",filteredProducts)


//     const filteredProductsWithImages = filteredProducts.filter(
//         product => {
//             console.log("**************************",product)
//             product.images && product.images.length > 0 && product.images[0]
//             return product
//         } 
//     );


//     const handleProductClick = (id) => {
//         console.log(id)
//         navigate(`/ProductDetail/${id}`);
//     };


//     const handleCategoryChange = (value) => {
//         setSelectedCategory(value);
//         const newParams = new URLSearchParams(searchParams);
//         if (value === "All") {
//             newParams.delete("category");
//         } else {
//             newParams.set("category", value);
//         }
//         navigate({ search: newParams.toString() });
//     };




//     return (
//         <div className="max-w-7xl mt-16 mx-auto p-0 flex flex-col md:flex-row bg-white shadow-xl rounded-2xl">
//             {/* Sidebar */}
//             <div className="w-full md:w-1/3 p-6 mr-5 border-gray-200 bg-gray-100  mb-6 md:mb-0">
//                 <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#666F80]">
//                     <FaFilter /> Filters
//                 </h2>

//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Category</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     value={selectedCategory}
//                     onChange={(e) => handleCategoryChange(e.target.value)}
//                 >
//                     <option value="All" className="text-[#666F80]">All</option>
//                     {getUniqueCategories().map((cat) => (
//                         <option key={cat} value={cat} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>{cat}</option>
//                     ))}
//                 </select>


//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Colour</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     onChange={(e) => setSelectedColour(e.target.value)}
//                 >
//                     <option value="All" className="text-[#666F80]">All</option>
//                     {getUniqueColours().map((colour) => (
//                         <option key={colour} value={colour} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                             {colour}
//                         </option>
//                     ))}
//                 </select>



//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Material</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     onChange={(e) => setSelectedMaterial(e.target.value)}
//                 >
//                     <option value="All" style={{ color: '#666F80' }} className="text-[#666F80]">All</option>
//                     {getUniqueMaterial().map((mat) => (
//                         <option key={mat} value={mat} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                             {mat}
//                         </option>
//                     ))}
//                 </select>


//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                     Max Price: ₹{maxPrice.toLocaleString()}
//                 </label>
//                 <input
//                     type="range"
//                     min="0"
//                     max="10000"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(Number(e.target.value))}
//                     className="w-50% accent-[#FB6D6C]"

//                 />
//             </div>

//             {/* Products */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-2/1 px-4 mt-10">
//                 {filteredProductsWithImages
//                     // .sort(() => Math.random() - 0.5)
//                     .map((product, idx) => (
//                         <div
//                             key={idx}
//                             className="flex flex-col bg-white shadow-md hover:shadow-xl transition-all overflow-hidden"
//                         >

//                             <div className="h-64 w-full shadow-[0_6px_16px_rgba(0,0,0,0.45)]  overflow-hidden">
//                                 <img
//                                     src={
//                                         product.images[0]?.replace("http://localhost:8000/", "http://192.168.18.136:8000/")
                
//                                     }
//                                     alt="Product"
//                                     className="object-cover w-full h-full"
//                                 />
//                             </div>


//                             <div className="p-4 flex flex-col flex-grow" >
//                                 <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{product.product_description}</h3>
//                                 <div className="" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                                     <p className="text-sm text-gray-500 mb-1">

//                                         {product.category_name}
//                                     </p>
//                                     <p className="text-sm text-gray-500 mb-1">

//                                         {product.sub_category_name}
//                                     </p>
//                                     <p className="text-sm text-gray-500">

//                                         {product.variation_name || "N/A"}
//                                     </p>
//                                     <p className="text-sm mt-2 text-green-700">Stock: {product.product_variation.stock}</p>
//                                 </div>

//                                 <div className="mt-auto flex justify-between font-bold items-center pt-3" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                                     <span className="text-xl font-semibold">
//                                         <FaRupeeSign className="inline mr-1" />
//                                         {parseFloat(product.price).toLocaleString()}
//                                     </span>
//                                     <button
//                                         className="bg-[#FB6D6C] text-white px-4 py-2 rounded-lg hover:bg-[#e95a59] transition-all"
//                                         onClick={() => handleProductClick(product.product_id)}
//                                     >
//                                         View
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default ProductPage;

















































































// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { FaFilter, FaTag, FaPalette, FaCubes, FaRupeeSign } from "react-icons/fa";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const url = "https://3j7gm770-8000.inc1.devtunnels.ms/custome/";

// const ProductPage = () => {
//     const [searchParams] = useSearchParams();
//     const defaultCategory = searchParams.get("category") || "All";

//     const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
//     const [maxPrice, setMaxPrice] = useState(10000);
//     const [products, setProducts] = useState([]);
//     const [selectedColour, setSelectedColour] = useState("All");
//     const [selectedMaterial, setSelectedMaterial] = useState("All");

//     const navigate = useNavigate();


//     useEffect(() => {
//         fetchProducts();
//     }, []);


//     useEffect(() => {
//         const categoryFromUrl = searchParams.get("category") || "All";
//         setSelectedCategory(categoryFromUrl);
//     }, [searchParams, products]);



//     const fetchProducts = async () => {
//         try {
//             const res = await axios.get(url);
//             setProducts(res.data);
//         } catch (err) {
//             console.error("Error fetching products", err);
//         }
//     };


//     const getUniqueCategories = () => {
//         const unique = new Set(products.map(p => p.category_name));
//         return Array.from(unique);
//     };

//     const getUniqueMaterial = () => {
//         const unique = new Set(
//             products
//                 .filter(p => p.category_name === selectedCategory && p.variation_type === "Fabric")
//                 .map(p => p.variation_name)
//         );
//         return Array.from(unique);
//     };



//     const getUniqueColours = () => {
//         const unique = new Set(
//             products
//                 .filter(p => p.category_name === selectedCategory && p.variation_type === "Color")
//                 .map(p => p.variation_name)
//         );
//         return Array.from(unique);
//     };




//     const getProductImage = (product) => {
//         return product.images && product.images.length > 0
//             ? product.images[0].replace("http://localhost:8000/", "http://192.168.29.87:8000/")
//             : "no image found";
//     };


//     const filteredProducts = products.filter(
//         (product) =>
//             (selectedCategory === "All" || product.category_name === selectedCategory) &&
//             (selectedColour === "All" || product.variation_name?.toLowerCase() === selectedColour.toLowerCase()) &&
//             // (selectedMaterial === "All" || product.Material?.toLowerCase() === selectedMaterial.toLowerCase()) &&
//             parseFloat(product.price) <= maxPrice
//     );


//     const filteredProductsWithImages = filteredProducts.filter(
//         product => product.images && product.images.length > 0 && product.images[0]
//     );

//     const handleProductClick = (id) => {
//         console.log(id)
//         navigate(`/ProductDetail/${id}`);
//     };


//     const handleCategoryChange = (value) => {
//         setSelectedCategory(value);
//         const newParams = new URLSearchParams(searchParams);
//         if (value === "All") {
//             newParams.delete("category");
//         } else {
//             newParams.set("category", value);
//         }
//         navigate({ search: newParams.toString() });
//     };




//     return (
//         <div className="max-w-7xl mt-16 mx-auto p-0 flex flex-col md:flex-row bg-white shadow-xl rounded-2xl">
//             {/* Sidebar */}
//             <div className="w-full md:w-1/3 p-6 mr-5 border-gray-200 bg-gray-100  mb-6 md:mb-0">
//                 <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#666F80]">
//                     <FaFilter /> Filters
//                 </h2>

//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Category</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     value={selectedCategory}
//                     onChange={(e) => handleCategoryChange(e.target.value)}
//                 >
//                     <option value="All" className="text-[#666F80]">All</option>
//                     {getUniqueCategories().map((cat) => (
//                         <option key={cat} value={cat} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>{cat}</option>
//                     ))}
//                 </select>


//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Colour</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     onChange={(e) => setSelectedColour(e.target.value)}
//                 >
//                     <option value="All" className="text-[#666F80]">All</option>
//                     {getUniqueColours().map((colour) => (
//                         <option key={colour} value={colour} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                             {colour}
//                         </option>
//                     ))}
//                 </select>



//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>Material</label>
//                 <select
//                     className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
//                     onChange={(e) => setSelectedMaterial(e.target.value)}
//                 >
//                     <option value="All" style={{ color: '#666F80' }} className="text-[#666F80]">All</option>
//                     {getUniqueMaterial().map((mat) => (
//                         <option key={mat} value={mat} style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                             {mat}
//                         </option>
//                     ))}
//                 </select>


//                 <label className="block font-semibold mb-2" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                     Max Price: ₹{maxPrice.toLocaleString()}
//                 </label>
//                 <input
//                     type="range"
//                     min="0"
//                     max="10000"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(Number(e.target.value))}
//                     className="w-50% accent-[#FB6D6C]"

//                 />
//             </div>

//             {/* Products */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-2/1 px-4 mt-10">
//                 {[...filteredProductsWithImages]
//                     // .sort(() => Math.random() - 0.5)
//                     .map((product) => (

//                         <div
//                             key={product.id}
//                             className="flex flex-col bg-white shadow-md hover:shadow-xl transition-all overflow-hidden"
//                         >

//                             <div className="h-64 w-full shadow-[0_6px_16px_rgba(0,0,0,0.45)]  overflow-hidden">
//                                 <img
//                                     src={getProductImage(product)}
//                                     alt="Product"
//                                     className="object-cover w-full h-full"
//                                 />
//                             </div>


//                             <div className="p-4 flex flex-col flex-grow" >
//                                 <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>{product.product_description}</h3>
//                                 <div className="" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#666F80' }}>
//                                     <p className="text-sm text-gray-500 mb-1">

//                                         {product.category_name}
//                                     </p>
//                                     <p className="text-sm text-gray-500 mb-1">

//                                         {product.sub_category_name}
//                                     </p>
//                                     <p className="text-sm text-gray-500">

//                                         {product.variation_name ?? "N/A"}
//                                     </p>
//                                     <p className="text-sm mt-2 text-green-700">Stock: {product.stock}</p>
//                                 </div>

//                                 <div className="mt-auto flex justify-between font-bold items-center pt-3" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
//                                     <span className="text-xl font-semibold">
//                                         <FaRupeeSign className="inline mr-1" />
//                                         {parseFloat(product.Reduced_price).toLocaleString()}
//                                     </span>
//                                     <button
//                                         className="bg-[#FB6D6C] text-white px-4 py-2 rounded-lg hover:bg-[#e95a59] transition-all"
//                                         onClick={() => handleProductClick(product.product_id)}
//                                     >
//                                         View
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default ProductPage;