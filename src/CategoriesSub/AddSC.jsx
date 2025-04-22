import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddSC() {
    const Navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const saveData = async (data) => {
        try {
            const payload = {
                sub_category_id: data.id,
                Sub_Category_Name: data.Sub_Category_Name,
                Category_id: data.Category_id
            };

            const response = await axios.post('https://3rn4qfbv-8000.inc1.devtunnels.ms/subcat/', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('SubCategory added:', response.data);
            reset();
            Navigate('/allSC')
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit(saveData)}>
    
                <div className="mb-4">
                    <label htmlFor="Sub_Category_Name" className="block text-sm font-medium text-gray-700">Sub Category Name</label>
                    <input
                        {...register('Sub_Category_Name', { required: true })}
                        type="text"
                        id="Sub_Category_Name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.Sub_Category_Name && <p className="text-red-500 text-sm">Sub Category Name is required</p>}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="Category_id" className="block text-sm font-medium text-gray-700">Category ID</label>
                    <input
                        {...register('Category_id', { required: true })}
                        type="text"
                        id="Category_id"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.Category_id && <p className="text-red-500 text-sm">Category ID is required</p>}
                </div>
    
                <div className="flex space-x-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Submit
                    </button>
                    <button type="reset" className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => reset()}>
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}    