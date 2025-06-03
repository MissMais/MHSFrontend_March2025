import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoCartSharp } from "react-icons/io5"

export default function ProductDetail() {
    let navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://3rn4qfbv-8000.inc1.devtunnels.ms/product/${id}`)
                setProduct(res.data)
            } catch (error) {
                console.error("Error fetching product:", error)
            }
        }

        fetchProduct()
    }, [id])



    const addToCart = () => {


        const token = localStorage.getItem("AccessToken");

        if (!token) {
            alert("Please login to add items to your cart.");
            navigate("/login");
            return;
        }
        // Save to localStorage
        const cart = JSON.parse(localStorage.getItem("cart"))
        cart.push(product); // add current product
        localStorage.setItem("cart", JSON.stringify(cart));

        // Go to cart page
        navigate("/Cart");
    };

    const OrderPage = () => {
        const token = localStorage.getItem("AccessToken");
    
        if (!token) {
            alert("Please login to continue with your order.");
            navigate("/login");
            return;
        }
    
        navigate("/OrderPage", { state: { product } });
    }
    


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Product Image */}
                    <div className="flex flex-col items-center">
                        <img src="/path/to/image.jpg" alt="image" className="rounded-lg shadow-md w-full h-auto" />
                        <div className="flex gap-2 mt-4">
                            <img src="/path/to/thumb1.jpg" alt="thumb1" className="w-20 h-14 object-cover rounded" />
                            <img src="/path/to/thumb2.jpg" alt="thumb2" className="w-20 h-14 object-cover rounded" />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {product?.Product_Description || "Product Name"}
                        </h1>

                        <p className="text-shadow-black text-lg font-bold text-3xl">
                            <span>₹</span> {product?.Price || "N/A"}
                        </p>

                        <p className="text-gray-600 text-lg">
                            <span className="font-medium">Stock:</span> {product?.Stock || "N/A"}
                        </p>
                        <div className="mb-4 text-sm text-gray-600">
                            <p>Free Shipping | 24hr Dispatch | Easy Returns</p>
                        </div>

                        <div className="mt-4 flex gap-4">
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" onClick={addToCart}>
                                <IoCartSharp className="text-xl" />
                                Add to Cart
                            </button>
                            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition" onClick={OrderPage}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
