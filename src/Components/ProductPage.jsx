import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaFilter, FaTag, FaPalette, FaCubes, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const url = "https://3rn4qfbv-8000.inc1.devtunnels.ms/";

const ProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [maxPrice, setMaxPrice] = useState(10000);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [selectedColour, setSelectedColour] = useState("All");
    const [selectedMaterial, setSelectedMaterial] = useState("All");

    useEffect(() => {
        fetchCategories();
        fetchProducts();
        fetchImages();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${url}cat/`);
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${url}product/`);
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const fetchImages = async () => {
        try {
            const res = await axios.get(`${url}images/`);
            setProductImages(res.data);
            console.log(res.data)
        } catch (err) {
            console.error("Error fetching images:", err);
        }
    };

    const getProductImage = (id) => {
        const img = productImages.find((img) => img.id === id);
        // console.log(img)
        return img ? `data:image/jpeg;base64,${img.img_path}` : "/fallback.jpg"; // Ensure fallback works
    };


    const filteredProducts = products.filter(
        (product) =>
            (selectedCategory === "All" || product.Sub_Category.Category.Category_name === selectedCategory) &&
            (selectedColour === "All" || product.Colour?.toLowerCase() === selectedColour.toLowerCase()) &&
            (selectedMaterial === "All" || product.Material?.toLowerCase() === selectedMaterial.toLowerCase()) &&
            product.Price <= maxPrice
    );

let navigate = useNavigate()
const productDetail =(id)=>{
    console.log(id)
    navigate(`/ProductDetail/${id}`);
}

    return (
        <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row bg-white shadow-xl rounded-2xl">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 p-6 border-r border-gray-200 bg-gray-50 rounded-xl mb-6 md:mb-0">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-700">
                    <FaFilter /> Filters
                </h2>

                <label className="block font-semibold text-gray-600 mb-2">Category</label>
                <select
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.Category_name}>
                            {cat.Category_name}
                        </option>
                    ))}
                </select>

                <label className="block font-semibold text-gray-600 mb-2">Colour</label>
                <select
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
                    onChange={(e) => setSelectedColour(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Brown">Brown</option>
                </select>

                <label className="block font-semibold text-gray-600 mb-2">Material</label>
                <select
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Leather">Leather</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Metal">Metal</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Wool">Wool</option>
                </select>

                <label className="block font-semibold text-gray-600 mb-2">
                    Max Price: ₹{maxPrice.toLocaleString()}
                </label>
                <input
                    type="range"
                    min="0"
                    max="10000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col bg-white border rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                    >
                        <div className="h-88 w-77 aspect-w-1 aspect-h-1 shadow-[0_6px_16px_rgba(0,0,0,0.45)] rounded-lg overflow-hidden">
                            <img
                                src={getProductImage(product.id)}
                                alt="Product"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold mb-1">{product.Product_Description}</h3>
                            <p className="text-sm text-gray-500 mb-1">
                                <FaTag className="inline mr-1" />
                                {product.Sub_Category?.Category?.Category_name}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                <FaCubes className="inline mr-1" />
                                {product.Sub_Category?.Sub_Category_Name}
                            </p>
                            <p className="text-sm text-gray-500">
                                <FaPalette className="inline mr-1" />
                                {product.Colour ?? "N/A"} | {product.Material ?? "N/A"}
                            </p>
                            <p className="text-sm mt-2 text-green-700">{product.Availability}</p>
                            <div className="mt-auto flex justify-between items-center pt-3">
                                <span className="text-xl font-semibold text-blue-700">
                                    <FaRupeeSign className="inline mr-1" />
                                    {product.Price.toLocaleString()}
                                </span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all" onClick={() => productDetail(product.id)}>
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}


            </div>

        </div>


    );
};

export default ProductPage;