import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsDatabaseAdd } from "react-icons/bs";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "High-quality product with amazing features.",
    price: 49.99,
    image: "https://via.placeholder.com/400",
    category: "Abayas",
    colour: "Brown",
    material: "Leather",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Durable and comfortable product for everyday use.",
    price: 59.99,
    image: "https://via.placeholder.com/400",
    category: "Abayas",
    colour: "Black",
    material: "Cotton",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Stylish and functional product for all occasions.",
    price: 39.99,
    image: "https://via.placeholder.com/400",
    category: "Accessories",
    colour: "White",
    material: "Metal",
  },
  {
    id: 4,
    name: "Product 4",
    description: "Innovative gadget for tech lovers and for gamers.",
    price: 79.99,
    image: "https://via.placeholder.com/400",
    category: "Stoles",
    colour: "Brown",
    material: "Plastic",
  },
  {
    id: 5,
    name: "Product 5",
    description: "Comfortable and stylish wear for any occasion.",
    price: 69.99,
    image: "https://via.placeholder.com/400",
    category: "Hijab",
    colour: "White",
    material: "Wool",
  },
  {
    id: 6,
    name: "Product 6",
    description: "Premium quality accessory to complete your look.",
    price: 29.99,
    image: "https://via.placeholder.com/400", 
    category: "Accessories",
    colour: "Black",
    material: "Metal",
  },
];

const url = 'https://3rn4qfbv-8000.inc1.devtunnels.ms/';

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedColour, setSelectedColour] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("AccessToken"); 
      console.log("Fetched token:", token);
      if (!token) throw new Error("No token found");
  
      const response = await axios.get('https://3rn4qfbv-8000.inc1.devtunnels.ms/images/', {
              headers: {
          Authorization: `Bearer ${token}`,},
      });
  
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  const fetchImages = async () => {
    try {
      localStorage.setItem('AccessToken', response.data.access);
      if (!token) throw new Error("No token found");
      const response = await axios.get(`${url}images/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProductImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (selectedColour === "All" || product.colour.toLowerCase() === selectedColour.toLowerCase()) &&
      (selectedMaterial === "All" || product.material === selectedMaterial) &&
      product.price <= maxPrice
  );

  const getProductImage = (productId) => {
    const imageObj = productImages.find((img) => img.product === productId);
    return imageObj ? imageObj.image : "https://via.placeholder.com/400";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl flex">
      {/* Sidebar Filter Section */}
      <div className="w-1/4 p-4 border-r border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Filter by</h3>

        <label className="block font-semibold mt-2">Category</label>
        <select
  className="w-full p-2 border rounded-lg"
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="All">All</option>
  {categories.map((cat) => (
    <option key={cat.Category_id} value={cat.Category_name}>
      {cat.Category_name}
    </option>
  ))}
</select>


        

        <label className="block font-semibold mt-4">Colours</label>
        <select
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setSelectedColour(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Brown">Brown</option>
        </select>

        <label className="block font-semibold mt-4">Material</label>
        <select
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setSelectedMaterial(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Leather">Leather</option>
          <option value="Cotton">Cotton</option>
          <option value="Metal">Metal</option>
          <option value="Plastic">Plastic</option>
          <option value="Wool">Wool</option>
        </select>


        <label className="block font-semibold mt-4">Max Price: ${maxPrice}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full mt-2"
        />
      </div>

      

      {/* Product List */}
      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col p-4 bg-gray-100 shadow-md rounded-xl"
          >
            <img
              src={getProductImage(product.id)}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
            <h2 className="text-2xl font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <span className="text-xl font-semibold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
