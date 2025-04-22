import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export default function Edittable() {


    let params = useParams()
    let navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()


    useEffect(() => {
        getProductTable(params.id)
    }, [])


    const getProductTable = async (id) => {
        try {
            const data = await axios.get(`https://3rn4qfbv-8000.inc1.devtunnels.ms/product/` + id)
            // console.log(data)

            reset({
                Product_Description: data.data.Product_Description,
                Sub_Category_id: data.data.Sub_Category_id,
                Availability: data.data.Availability,
                Stock: data.data.Stock,
                Price: data.data.Price
            })


        } catch (error) {
            console.log(error)

        }
    }



    const saveData = async (data) => {
        try {
            const addProductTable = await axios.put('https://3rn4qfbv-8000.inc1.devtunnels.ms/product/'+params.id, data)
            reset()
            navigate("/alltable")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit(saveData)}>
                <div className="mb-4">
                    <label htmlFor="Product_Description" className="block text-sm font-medium text-gray-700">Product_Description</label>
                    <input
                        {...register('Product_Description', { required: true })}
                        type="text"
                        id="Product_Description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.Product_Description && <p className="text-red-500 text-sm">Product_Description is required</p>}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="Sub_Category_id" className="block text-sm font-medium text-gray-700">Sub Category Id</label>
                    <input
                        {...register('Sub_Category_id', { required: true })}
                        type="text"
                        id="Sub_Category_id"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.Sub_Category_id && <p className="text-red-500 text-sm">Sub_Category_id is required</p>}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="Availability" className="block text-sm font-medium text-gray-700">Availability</label>
                    <input
                        {...register('Availability', { required: true })}
                        type="text"
                        id="Availability"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.Availability && <p className="text-red-500 text-sm">Availability is required</p>}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="Stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        {...register('Stock', { required: true })}
                        type="number"
                        id="Stock"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.Stock && <p className="text-red-500 text-sm">Stock is required</p>}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="Price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        {...register('Price', { required: true })}
                        type="number"
                        id="Price"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.Price && <p className="text-red-500 text-sm">Price is required</p>}
                </div>
    
                <div className="flex space-x-4 mt-4">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Submit
                    </button>
                    <button type="reset" className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}    