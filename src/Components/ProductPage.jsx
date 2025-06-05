import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaFilter, FaTag, FaPalette, FaCubes, FaRupeeSign } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

const url = "https://modestgallery.pythonanywhere.com/custom/";

const ProductPage = () => {
    const [searchParams] = useSearchParams();
    const defaultCategory = searchParams.get("category") || "All";

    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [products, setProducts] = useState([]);
    const [selectedColour, setSelectedColour] = useState("All");
    const [selectedMaterial, setSelectedMaterial] = useState("All");

    const navigate = useNavigate();


    useEffect(() => {
        fetchProducts();
    }, []);


    useEffect(() => {
        const categoryFromUrl = searchParams.get("category") || "All";
        setSelectedCategory(categoryFromUrl);
    }, [searchParams, products]);



    const fetchProducts = async () => {
        try {
            const res = await axios.get(url);
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };


    const getUniqueCategories = () => {
        const unique = new Set(products.map(p => p.category_name));
        return Array.from(unique);
    };

    const getUniqueMaterial = () => {
        const unique = new Set(
            products
                .filter(p =>p.category_name === selectedCategory && p.variation_type === "Fabric")
                .map(p => p.variation_name)
        );
        return Array.from(unique);
    };



    const getUniqueColours = () => {
        const unique = new Set(
            products
                .filter(p => p.category_name === selectedCategory && p.variation_type === "Color")
                .map(p => p.variation_name)
        );
        return Array.from(unique);
    };




    const getProductImage = (product) => {
        return product.images && product.images.length > 0
            ? product.images[0]
            : "https://via.placeholder.com/300x300?text=No+Image";
    };


    const filteredProducts = products.filter(
        (product) =>
            (selectedCategory === "All" || product.category_name === selectedCategory) &&
            (selectedColour === "All" || product.variation_name?.toLowerCase() === selectedColour.toLowerCase()) &&
            (selectedMaterial === "All" || product.Material?.toLowerCase() === selectedMaterial.toLowerCase()) &&
            parseFloat(product.Reduced_price) <= maxPrice
    );


    const filteredProductsWithImages = filteredProducts.filter(
        product => product.images && product.images.length > 0 && product.images[0]
    );

    const handleProductClick = (id) => {
        console.log(id)
        navigate(`/ProductDetail/${id}`);
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
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    <option value="All">All</option>
                    {getUniqueCategories().map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>


                <label className="block font-semibold text-gray-600 mb-2">Colour</label>
                <select
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
                    onChange={(e) => setSelectedColour(e.target.value)}
                >
                    <option value="All">All</option>
                    {getUniqueColours().map((colour) => (
                        <option key={colour} value={colour}>
                            {colour}
                        </option>
                    ))}
                </select>



                <label className="block font-semibold text-gray-600 mb-2">Material</label>
                <select
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none"
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                >
                    <option value="All">All</option>
                    {getUniqueMaterial().map((mat) => (
                        <option key={mat} value={mat}>
                            {mat}
                        </option>
                    ))}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-3/4 px-4">
                {filteredProductsWithImages.map((product) => (
                    <div
                        key={product.product_variation_id}
                        className="flex flex-col bg-white border rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                    >

                        <div className="h-64 w-full shadow-[0_6px_16px_rgba(0,0,0,0.45)] rounded-t-xl overflow-hidden">
                            <img
                                src={getProductImage(product)}
                                alt="Product"
                                className="object-cover w-full h-full"
                            />
                        </div>


                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold mb-1">{product.product_description}</h3>
                            <p className="text-sm text-gray-500 mb-1">
                                <FaTag className="inline mr-1" />
                                {product.category_name}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                <FaCubes className="inline mr-1" />
                                {product.sub_category_name}
                            </p>
                            <p className="text-sm text-gray-500">
                                <FaPalette className="inline mr-1" />
                                {product.variation_name ?? "N/A"} | {product.Material ?? "N/A"}
                            </p>
                            <p className="text-sm mt-2 text-green-700">Stock: {product.stock}</p>
                            <div className="mt-auto flex justify-between items-center pt-3">
                                <span className="text-xl font-semibold text-blue-700">
                                    <FaRupeeSign className="inline mr-1" />
                                    {parseFloat(product.Reduced_price).toLocaleString()}
                                </span>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                                    onClick={() => handleProductClick(product.product_id)}
                                >
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
