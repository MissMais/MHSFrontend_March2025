import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductVariation = () => {
    const [variations, setVariations] = useState([]);
    const [formData, setFormData] = useState({ Product_Variation_id: '', Product_id: '', option_id: '', variation_name: '', product_description: '' });
    const [editId, setEditId] = useState(null);


    const fetchVariations = async () => {
        const res = await axios.get('https://qr723wq6-8000.inc1.devtunnels.ms/pro/');
        

        const mappedVariations = res.data.map((v) => ({
            Product_Variation_id: v.variation_options.id,
            Product_id: v.Product_id,
            option_id: v.option_id,
            variation_name: v.variation_options.variation.variation_name, 
            product_description: v.Products.Product_Description,    
        }));

        setVariations(mappedVariations);
    };

    useEffect(() => {
        fetchVariations();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                console.log('Updating product variation:', editId);
                const response = await axios.put(`https://qr723wq6-8000.inc1.devtunnels.ms/pro/${editId}`, formData);
                console.log('Update response:', response.data);
            } else {
                console.log('Adding new product variation');
                const response = await axios.post('https://qr723wq6-8000.inc1.devtunnels.ms/pro/', formData);
                console.log('Add response:', response.data);
            }
    
            setFormData({ Product_Variation_id: '', Product_id: '', option_id: '', variation_name: '', product_description: '' });
            setEditId(null);
            fetchVariations();
        } catch (error) {
            console.error('Error in form submission:', error);
        }
    };

    const handleEdit = (variation) => {
        console.log('Editing variation:', variation);
        setFormData({
            Product_Variation_id: variation.Product_Variation_id,
            Product_id: variation.Product_id,
            option_id: variation.option_id,
            variation_name: variation.variation_name,
            product_description: variation.product_description,
        });
        setEditId(variation.Product_Variation_id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`https://qr723wq6-8000.inc1.devtunnels.ms/pro/${id}`);
        fetchVariations();
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Product Variations</h2>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                {!editId && (
                    <input
                        name="Product_Variation_id"
                        value={formData.Product_Variation_id}
                        onChange={handleChange}
                        placeholder="Product Variation ID"
                        className="border p-2 rounded"
                    />)}

                <input
                    name="Product_id"
                    value={formData.Product_id}
                    onChange={handleChange}
                    placeholder="Product ID"
                    className="border p-2 rounded"/>
                <input
                    name="option_id"
                    value={formData.option_id}
                    onChange={handleChange}
                    placeholder="Option ID"
                    className="border p-2 rounded"/>
                <input
                    name="variation_name"
                    value={formData.variation_name}
                    onChange={handleChange}
                    placeholder="Variation Name"
                    className="border p-2 rounded"/>
                <input
                    name="product_description"
                    value={formData.product_description}
                    onChange={handleChange}
                    placeholder="Product Description"
                    className="border p-2 rounded"/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editId ? 'Update' : 'Add'}
                </button>
            </form>

            <div className="grid gap-4">
                {variations.map((v) => (
                    <div key={v.id} className="flex justify-between items-center border p-4 rounded">
                        <div>
                            <strong>Product Variation ID:</strong> {v.Product_Variation_id} <br />
                            <strong>Product ID:</strong> {v.Product_id} <br />
                            <strong>Option ID:</strong> {v.option_id} <br />
                            <strong>Variation Name:</strong> {v.variation_name} <br />
                            <strong>Product Description:</strong> {v.product_description}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(v)} className="bg-yellow-400 text-white px-2 py-1 rounded">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(v.Product_Variation_id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductVariation;
