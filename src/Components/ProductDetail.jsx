import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCartSharp } from 'react-icons/io5';

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allVariations, setAllVariations] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (allVariations.length > 0) {
      setSelectedProduct(allVariations[0]);
    }
  }, [allVariations]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get('https://modestgallery.pythonanywhere.com/custom/');
      const filtered = response.data.filter(item => item.product_id === id);
      setAllVariations(filtered);
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

const addToCart = (product) => {
  const token = localStorage.getItem("AccessToken");
  if (!token) {
    alert("Please login to add items to your cart.");
    navigate("/login");
    return;
  }
if(selectedProduct.stock > 0){
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;
  const cartKey = `cart_${username}`;


   let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingItem = cart.find(
    item => item.product_variation_id === product.product_variation_id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));

  navigate("/Cart");
}else{
  alert("Out Of Stock")
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            <img
              src={selectedProduct?.images?.[0]}
              className="rounded-lg shadow-md w-full h-auto"
              onClick={() => swapWithMain(0)}
              alt="Product"
            />
            <div className="flex gap-2 mt-4">
              {selectedProduct?.images?.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="w-20 h-14 object-cover rounded cursor-pointer"
                  onClick={() => swapWithMain(index)}
                  alt={`Thumbnail ${index}`}
                />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedProduct?.product_description || 'Product Name'}
            </h1>

            <p className="text-shadow-black text-lg font-bold text-3xl">
              ₹ {selectedProduct?.Reduced_price || 'N/A'}
            </p>

            <p className="text-gray-600 text-lg">
              <span className="font-medium">Stock:</span> {selectedProduct?.stock ?? 'N/A'}
            </p>

            <div className="mb-4 text-sm text-gray-600">
              <p>Free Shipping | 24hr Dispatch | Easy Returns</p>
            </div>

            {/* COLOR SELECTOR */}
            {allVariations.some(v => v.variation_type === 'Color') && (
              <div className="mt-4">
                <h2 className="font-semibold text-gray-700 mb-1">Choose Color:</h2>
                <div className="flex gap-2 flex-wrap">
                  {allVariations
                    .filter(v => v.variation_type === 'Color' && v.ColorCode)
                    .map((variation, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedProduct(variation)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedProduct?.product_variation_id === variation.product_variation_id
                            ? 'border-black'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: variation.ColorCode }}
                      
                      ></button>
                    ))}
                </div>
              </div>
            )}

            {/* SIZE SELECTOR */}
            {allVariations.some(v => v.variation_type === 'Size') && (
              <div className="mt-6">
                <h2 className="font-semibold text-gray-700 mb-1">Choose Size:</h2>
                <div className="flex gap-2 flex-wrap">
                  {allVariations
                    .filter(v => v.variation_type === 'Size')
                    .map((variation, index) => {
                      const isSelected =
                        selectedProduct?.product_variation_id === variation.product_variation_id;
                      const isAvailable = variation.stock;
                      return (
                        <button
                          key={index}
                          onClick={() => isAvailable && setSelectedProduct(variation)}
                          disabled={!isAvailable}
                          className={`px-4 py-1 border rounded
                            ${isSelected ? 'bg-black text-white' : ''}
                            ${!isAvailable
                              ? 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
                              : 'bg-white text-gray-700 border-gray-300'}
                          `}
                        >
                          {variation.variation_name}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="mt-4 flex gap-4">
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => addToCart(selectedProduct)}

              >
                <IoCartSharp className="text-xl" /> Add to Cart
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                onClick={goToOrderPage}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
