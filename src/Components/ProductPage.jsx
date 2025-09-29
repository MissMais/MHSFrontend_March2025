import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch, FaRupeeSign } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../Routes/Footer";
import { url } from "../App"
import { CloudDownload } from "lucide-react";



// const url = 'https://5d0abf24c6ce.ngrok-free.app/custom/'
// "https://3j7gm770-8000.inc1.devtunnels.ms/custom/";
// "https://wkvkk9t8-8000.inc1.devtunnels.ms/custom/";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get("category") || "All";
  const defaultBrand = searchParams.get("brand") || "All";
  const [selectedbrand, setSelectedBrand] = useState(defaultBrand)
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [products, setProducts] = useState([]);
  const [selectedColour, setSelectedColour] = useState("All");
  const [sideOpen, setSideOpen] = useState(false)
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [wish, setwish] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [variety, setSelectedvar] = useState([])


  const user_id = localStorage.getItem('user_id')



  const navigate = useNavigate();


  useEffect(() => {
    fetchProducts();

  }, []);


  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "All";
    setSelectedCategory(categoryFromUrl);
    const brandFromUrl = searchParams.get("brand") || "All";
    setSelectedBrand(brandFromUrl);
    console.log(brandFromUrl)

    const brandid = searchParams.get("brandid") || "All"
    const Brandid = parseInt(brandid)
    console.log(brandid)
    // console.log(typeof(brandid))
    const varopid = searchParams.get("varopid") || "All"
    console.log(varopid)

    const brandvar = { Brandid, varopid }
    console.log(brandvar)
    setSelectedvar(brandvar)
  }, [searchParams, products]);




  const accessToken = localStorage.getItem("AccessToken")

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
      console.log(res.data)
      // console.log(res.data)
      // console.log(res.data[0].images[0].replace("http://localhost:8000/", "http://192.168.29.87:8000/"))
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

      console.log(branddata.data)
      // console.log(branddata.data)

    
        const filterbrand = branddata.data.filter(item => item.Brand_id === Brandid)
        // console.log(filterbrand[0].Brand_name)
        const BrandName = filterbrand[0].Brand_name
        setSelectedBrand(BrandName)


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
      (selectedCategory === "All" || product.category_name === selectedCategory) &&
      (selectedColour === "All" || product.variation_name?.toLowerCase() === selectedColour.toLowerCase()) &&
      (selectedbrand === "All" || product.brand.Brand_name === selectedbrand) &&
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

  const handleBrandChange = (value) => {
    console.log(value)
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

  // console.log(customerId)

  // const fetchingwish = async()=>{
  //       const res = await axios.get(`${url}wishlist/`, {
  //         headers: {
  //         //   Authorization: `Bearer ${accessToken}`,
  //            'ngrok-skip-browser-warning':'69420',
  //                 'Content-Type':'application/json'
  //         },
  //       })
  //       const data = res.data
  //       // console.log(res)

  //       const filter = data.filter(item => item.customer_id == customerId)
  //       console.log(filter)
  //       setwish(filter)
  //     }


  //     useEffect(()=>{
  //       fetchingwish()
  //     },[])
  // console.log(wish)

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

        const wishlistRes = await axios.get(`${url}wishlist/`, { headers: { 'ngrok-skip-browser-warning': '69420', 'Content-Type': 'application/json' } });
        const customerWishlist = wishlistRes.data.filter(item => item.customer_id == customerId);
        setwish(customerWishlist);
        console.log("Wishlist Added")

      }
    } catch (error) {
      console.error(error);
    }
  };


  const func = () => {
    if (sideOpen) {
      console.log("first")
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









  return (
    <div >


      <div className="max-w-7xl mt-16 mx-auto p-0 flex flex-col md:flex-row bg-white shadow-xl rounded-2xl">
        {isMobile && <div className="flex justify-end-safe z-[9998]">
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

            {/*Brand*/}
            <label
              className="block font-semibold mb-2"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
            >
              Brands
            </label>
            <select
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
              onChange={(e) => handleBrandChange(e.target.value)}
              value={selectedbrand}
            >
              <option value="All" className="text-[#666F80]">
                All
              </option>
              {getUniqueBrand().map((brand) => (
                <option
                  key={brand}
                  value={brand}
                  style={{
                    fontFamily: "Copperplate, Papyrus, fantasy",
                    color: "#666F80",
                  }}
                >
                  {brand}
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
        </div>}

        {/* // SideBar For Desktop */}
        {(!isMobile) &&

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
              value={selectedColour}
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



            {/*Brand*/}
            <label
              className="block font-semibold mb-2"
              style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB6D6C" }}
            >
              Brands
            </label>
            <select
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
              onChange={(e) => handleBrandChange(e.target.value)}
              value={selectedbrand}
            >
              <option value="All" className="text-[#666F80]">
                All
              </option>
              {getUniqueBrand().map((brand) => (
                <option
                  key={brand}
                  value={brand}
                  style={{
                    fontFamily: "Copperplate, Papyrus, fantasy",
                    color: "#666F80",
                  }}
                >
                  {brand}
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
          </div>}


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
                <div style={{ fontFamily: "Copperplate, Papyrus, fantasy" }} className="p-4 flex flex-col flex-grow text-xs md:text-sm">
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
                      onClick={() => Wishlist(product)}
                      style={{ cursor: "pointer" }}
                      className="text-lg md:text-2xl">
                      {wish.some(item => item.product_variation_id == product.product_variation.product_variation_id) ? (
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