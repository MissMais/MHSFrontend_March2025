import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditC() {


    let params = useParams()
    let navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()


    useEffect(() => {
        getCat(params.id)
    }, [])


    const getCat = async (id) => {
        try {
            const data = await axios.get(`https://qr723wq6-8000.inc1.devtunnels.ms/cat/` + id)
            console.log(data.data.id)
            // console.log(params.id)

            reset({
                // id: data.data.id,
                
                Category_name: data.data.Category_name
            })


        } catch (error) {
            console.log(error)

        }
    }



    const saveData = async (data) => {
        try {
            const addCat = await axios.put('https://qr723wq6-8000.inc1.devtunnels.ms/cat/' + params.id + '/', data)
            reset()
            navigate("/allC")

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="container w-1/2 mx-auto mt-4">
            <form onSubmit={handleSubmit(saveData)}>
                {/* <div className="mb-4">
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category_id</label>
                    <input
                        {...register('category_id')}
                        type="text"
                        id="category_id"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}
                
                <div className="mb-4">
                    <label htmlFor="Category_name" className="block text-sm font-medium text-gray-700">Category Name</label>
                    <input
                        {...register('Category_name')}
                        type="text"
                        id="Category_name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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


