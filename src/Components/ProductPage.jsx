import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch, FaRupeeSign, FaStar } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../Routes/Footer";
import { url } from "../App"
import Bot from "./Bot";
import Popup from "./Popup";






// const url = 'https://5d0abf24c6ce.ngrok-free.app/custom/'
// "https://3j7gm770-8000.inc1.devtunnels.ms/custom/";
// "https://wkvkk9t8-8000.inc1.devtunnels.ms/custom/";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get("category") || "Category" || "All";
  const defaultBrand = searchParams.get("brand") || "Brands" || "All";
  const [selectedbrand, setSelectedBrand] = useState(defaultBrand)
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [maxPrice, setMaxPrice] = useState(selectedCategory == "Stoles" ? 4000 : 10000);
  const [products, setProducts] = useState([]);
  const [selectedColour, setSelectedColour] = useState("Color" || "All");
  const [sideOpen, setSideOpen] = useState(false)
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [wish, setwish] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [variety, setSelectedvar] = useState([])
  const [showPopup, setShowPopup] = useState(false);



  const [openctg, setopenctg] = useState(false);
  const handleOptionClick1 = (value) => {
    setSelectedCategory(value);
    setopenctg(false);
  };

  const [openclr, setopenclr] = useState(false);
  const handleOptionClick = (value) => {
    setSelectedColour(value);
    setopenclr(false);
  };

  const [openbrand, setopenbrand] = useState(false);
  const handleOptionClick2 = (value) => {
    setSelectedBrand(value);
    setopenbrand(false);
  };



  const user_id = localStorage.getItem('user_id')



  const navigate = useNavigate();


  useEffect(() => {
    fetchProducts();

  }, []);


  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "Category" || "All";
    setSelectedCategory(categoryFromUrl);
    const brandFromUrl = searchParams.get("brand") || "Brands" || "All";
    setSelectedBrand(brandFromUrl);
    // console.log(brandFromUrl)

    const brandid = searchParams.get("brandid") || "All"
    const Brandid = parseInt(brandid)
    // console.log(brandid)
    // console.log(typeof(brandid))
    const varopid = searchParams.get("varopid") || "All"
    // console.log(varopid)

    const brandvar = { Brandid, varopid }
    // console.log(brandvar)
    setSelectedvar(brandvar)
  }, [searchParams, products]);






  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}custom/`,
        {
          headers: {
            //   Authorization: `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json'
          },
        }
      );
      setProducts(res.data);

    } catch (err) {
      console.error("Error fetching products", err);
    }
  };



  const Brandid = variety.Brandid
  // console.log(Brandid)

  const fetchBrandName = async () => {
    try {
      const branddata = await axios.get(`${url}brand/`,
        {
          headers: {
            //   Authorization: `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json'
          },
        }
      );



      const filterbrand = branddata.data.filter(item => item.Brand_id === Brandid)

      if (filterbrand.length > 0) {
        setSelectedBrand(filterbrand[0].Brand_name);
      } else {

        setSelectedBrand("Brands" || "All");
      }


    } catch (err) {
      console.error(err)
    }
  };
  // console.log(variety.Brandid)


  useEffect(() => {
    fetchBrandName()
  }, [products])


  const getUniqueCategories = () => {
    const unique = new Set(products.map(p => p.category_name));
    return Array.from(unique);
  };


  const getUniqueBrand = () => {
    const unique = new Set(products.map(p => p.brand.Brand_name));
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
    // console.log(product)
    // console.log(product.brand.Brand_id)
    // console.log(variety.varopid)
    // console.log(product.product_variation.variation_option_id)
    // if (!variety || variety.Brandid === "NaN" || variety.varopid === "All") {
    //   return true;
    // }

    return (
      (selectedCategory === "All" || selectedCategory === "Category" || product.category_name === selectedCategory) &&
      (selectedColour === "All" || selectedColour === "Color" || product.variation_name?.toLowerCase() === selectedColour.toLowerCase()) &&
      (selectedbrand === "All" || selectedbrand === "Brands" || product.brand.Brand_name === selectedbrand) &&
      (!variety || variety.Brandid === "NaN" || variety.varopid === "All"
        ? true
        : product.brand?.Brand_id === variety.Brandid &&
        product.product_variation?.variation_option_id === variety.varopid) &&
      // (selectedColour === "All" || product.variation_name?.toLowerCase()) &&
      (search === "" || product.sub_category_name.toLowerCase().includes(search.toLowerCase())) &&
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

  const handleProductClick = (id, productid) => {

    navigate(`/ProductDetail/?id=${id}&product=${productid}`);
    // navigate(`/quote/${id}`)
    // navigate(`/ProductDetail/${id}`);
  };






  const handleCategoryChange = (value) => {

    setSelectedCategory(value);
    const newParams = new URLSearchParams(searchParams);

    if (value === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", value);
    }
    navigate({ search: newParams.toString() });
  };

  const handleBrandChange = (value) => {

    setSelectedBrand(value);
    const newParams = new URLSearchParams(searchParams);

    if (value === "All") {
      newParams.delete("brand");
    } else {
      newParams.set("brand", value);
    }
    navigate({ search: newParams.toString() });
  };






  // get customer id from customer endpoint

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


    const filtereddata = data.filter(item => item.User_id == user_id)
    // console.log(filtereddata[0].id)
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

    const accesstoken = localStorage.getItem('AccessToken')

    if (!accesstoken) {
      // alert('Login to Add Wishlist')
      navigate('/login')
    }
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
        // console.log("Wishlist Deleted")
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
        // console.log("Wishlist Added")

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };




  const func = () => {
    if (sideOpen) {
      // console.log("first")
      setSideOpen(false)
    }
    else {
      setSideOpen(true)
    }

  }



  useEffect(() => {
    const handleResize = () => {
      // console.log(window.innerWidth)
      setIsMobile(window.innerWidth < 768);
      setSideOpen(false)
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);







  // console.log(selectedCategory)
  // console.log()

  return (
    <div >


      <div className="max-w-7xl mt-16 mx-auto p-0 flex flex-col md:flex-row  shadow-xl rounded-2xl">
        {isMobile && <div className="flex justify-end-safe mr-3 z-[9998]">
          <button className="bg-[#FB6D6C] text-[15px] rounded-2xl mt-2 w-15 h-10 flex items-center justify-center text-white gap-1" onClick={func}><FaFilter className="text-[13px]" />Filters </button>
        </div>
        }


        {/* // SideBar For Phone */}
        {sideOpen && <div className=" mt-15 fixed inset-0 z-[9997]">

          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setSideOpen(false)}
          ></div>

          <div className="absolute left-0 top-0 bottom-0 h-full w--/4 md:w-1/6 p-6 border-gray-200 bg-gray-100 mb-6 md:mb-0">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#666F80]">
              <FaFilter /> Filters
            </h2>


            {/* Category */}

            <div>
              <div className="flex justify-between items-center">
                <div onClick={() => {
                  setopenctg(!openctg);
                  setopenclr(false);
                  setopenbrand(false)
                }}
                  className="border w-full border-gray-300 p-2 rounded cursor-pointer flex justify-between "
                >
                  <div onClick={() => handleOptionClick1("All")}>
                    {selectedCategory || "Category"}
                  </div>
                  <div>
                    <IoMdArrowDropdown className="inline" />
                  </div>

                </div>

              </div>
              {openctg && (
                <div className="absolute z-10 w-34 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"

                    onClick={() => handleOptionClick1("All")}>
                    All
                  </div>
                  {getUniqueCategories().map((cat) => (
                    <div
                      key={cat}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick1(cat)}>
                      {cat}
                    </div>

                  ))}
                </div>
              )}

            </div>


            {/* Colour */}


            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div onClick={() => {
                  setopenclr(!openclr);
                  setopenbrand(false);
                  setopenctg(false)
                }}
                  className="border w-full border-gray-300 p-2 rounded cursor-pointer flex justify-between "
                >
                  <div onClick={() => handleOptionClick("All")}>
                    {selectedColour || "Color"}
                  </div>
                  <div>
                    <IoMdArrowDropdown className="inline" />
                  </div>

                </div>

              </div>
              {openclr && (
                <div className="absolute z-10 w-34 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("All")}>
                    All
                  </div>
                  {getUniqueColours().map((colour) => (
                    <div
                      key={colour}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick(colour)}>
                      {colour}
                    </div>

                  ))}
                </div>
              )}

            </div>



            {/*Brand*/}

            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div onClick={() => {
                  setopenbrand(!openbrand);
                  setopenclr(false);
                  setopenctg(false);
                }}
                  className="border w-full border-gray-300 p-2 rounded cursor-pointer flex justify-between "
                >
                  <div onClick={() => handleOptionClick2("All")}>
                    {selectedbrand || "Brands"}
                  </div>
                  <div>
                    <IoMdArrowDropdown className="inline" />
                  </div>

                </div>

              </div>
              {openbrand && (
                <div className="absolute z-10 w-34 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick2("All")}>
                    All
                  </div>
                  {getUniqueBrand().map((B) => (
                    <div
                      key={B}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick2(B)}>
                      {B}
                    </div>

                  ))}
                </div>
              )}

            </div>


            {/* Max Price */}
            <div className="mt-5">
              <label
                className="block font-semibold mb-2"
                style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
              >
                Max Price: ₹{maxPrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max={`${selectedCategory == "Stoles" ? "4000" : "10000"}`}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FB6D6C]"
              />
            </div>

          </div>
        </div>}

        {/* // SideBar For Desktop */}
        {(!isMobile) &&

          <div className="w-full relative md:w-1/6 p-6 border-gray-200 b mb-6 md:mb-0">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#666F80]">
              <FaFilter /> Filters
            </h2>

            {/* Category */}

            <div>
              <div className="flex justify-between items-center">
                <div onClick={() => {
                  setopenctg(!openctg);
                  setopenclr(false);
                  setopenbrand(false)
                }}
                  className="border w-full border-gray-300 p-2 rounded cursor-pointer flex justify-between "
                >
                  <div onClick={() => handleOptionClick1("All")}>
                    {selectedCategory || "Category"}
                  </div>
                  <div>
                    <IoMdArrowDropdown className="inline" />
                  </div>

                </div>

              </div>
              {openctg && (
                <div className="absolute z-10 w-42 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"

                    onClick={() => handleOptionClick1("All")}>
                    All
                  </div>
                  {getUniqueCategories().map((cat) => (
                    <div
                      key={cat}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick1(cat)}>
                      {cat}
                    </div>

                  ))}
                </div>
              )}

            </div>


            {/* Colour */}


            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div onClick={() => {
                  setopenclr(!openclr);
                  setopenbrand(false);
                  setopenctg(false)
                }}
                  className="border w-full border-gray-300 p-2 rounded cursor-pointer flex justify-between "
                >
                  <div onClick={() => handleOptionClick("All")}>
                    {selectedColour || "Color"}
                  </div>
                  <div>
                    <IoMdArrowDropdown className="inline" />
                  </div>

                </div>

              </div>
              {openclr && (
                <div className="absolute z-10 w-42 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("All")}>
                    All
                  </div>
                  {getUniqueColours().map((colour) => (
                    <div
                      key={colour}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick(colour)}>
                      {colour}
                    </div>

                  ))}
                </div>
              )}

            </div>



            {/*Brand*/}

            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div onClick={() => {
                  setopenbrand(!openbrand);
                  setopenclr(false);
                  setopenctg(false);
                }}
                  className="border w-full border-gray-300 p-2 rounded cursor-pointer flex justify-between "
                >
                  <div onClick={() => handleOptionClick2("All")}>
                    {selectedbrand || "Brands"}
                  </div>
                  <div>
                    <IoMdArrowDropdown className="inline" />
                  </div>

                </div>

              </div>
              {openbrand && (
                <div className="absolute z-10 w-42 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick2("All")}>
                    All
                  </div>
                  {getUniqueBrand().map((B) => (
                    <div
                      key={B}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick2(B)}>
                      {B}
                    </div>

                  ))}
                </div>
              )}

            </div>


            {/* Max Price */}
            <div className="mt-5">
              <label
                className="block font-semibold mb-2"
                style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
              >
                Max Price: ₹{maxPrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max={`${selectedCategory == "Stoles" ? "4000" : "10000"}`}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FB6D6C]"
              />
            </div>
          </div>

        }


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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-3 md:gap-y-8 px-4 mt-3">
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
                <div style={{ fontFamily: "Copperplate, Papyrus, fantasy" }} className="p-4 flex flex-col flex-grow text-xs md:text-sm">
                  <h3
                    className="md:text-lg font-bold mb-1 text-[#FB6D6C]"

                  >
                    {product.product_description}
                  </h3>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500">
                        {product.variation_name || "N/A"}
                      </p>
                      <p className="text-gray-500">
                        <FaRupeeSign className="inline text-gray-400" />
                        {parseFloat(product.price).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">
                        {product.product_variation.avg_rating !== null ? (
                          <>
                            {product.product_variation.avg_rating.toFixed(1)}
                            <FaStar className="inline text-yellow-400" />
                          </>
                        ) : (
                          <span className="invisible">0</span>

                        )}
                      </p>


                      {/* skaskajsjasja */}
                      <div
                        onClick={() => Wishlist(product)}
                        style={{ cursor: "pointer" }}
                        className="text-lg md:text-2xl">
                        {wish.some(item => item.product_variation_id == product.product_variation.product_variation_id) ? (
                          <IoHeart color="#FB6D6C" />
                        ) : (
                          <IoHeartOutline color="#FB6D6C" />
                        )}
                      </div>
                    </div>
                  </div>



                  {/* Wishlist + View */}
                  <div className="mt-auto flex justify-between font-bold items-center pt-3">


                    <button
                      className="border border-[#FB6D6C] text-[#FB6D6C] px-4 py-2 w-full rounded-full transition-all"
                      style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}
                      onClick={() => handleProductClick(product.product_variation.product_variation_id, product.Product_id)}
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

      {/* Popup Component */}
      <Popup
        show={showPopup}
        title="Item Added!"
        message="item Added to Wishlist"
      />

      {/* Chatbot */}
      <div className="relative bottom-0 right-4 top-60 w-[90%] max-w-[350px] z-50">
        <Bot />
      </div>
    </div>

  );
};

export default ProductPage;