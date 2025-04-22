import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditSC() {


    let params = useParams()
    let navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm()


useEffect(()=>{
    getSubCat(params.id)
},[])


    const getSubCat = async(id)=>{
        try {
            const data = await axios.get(`https://3rn4qfbv-8000.inc1.devtunnels.ms/subcat/`+id)
            // console.log(data)

            reset({
                sub_category_id: data.data.id,
                Sub_Category_Name: data.data.Sub_Category_Name,
                Category_id: data.data.Category_id
            })
            
            
        } catch (error) {
            console.log(error)
            
        }
    }



const saveData = async(data)=>{
            try {
                const addSubCat = await axios.put('https://3rn4qfbv-8000.inc1.devtunnels.ms/subcat/'+params.id+'/',data)
                reset()
                navigate("/allSC")
             
            } catch (error) {
                console.log(error)
            }
        }
    
        return (
            <div className="container w-1/2 mx-auto">
                <form onSubmit={handleSubmit(saveData)}>
        
                    <div className="mb-4">
                        <label htmlFor="Sub_Category_Name" className="block text-sm font-semibold text-gray-700">Sub Category Name</label>
                        <input
                            {...register('Sub_Category_Name')}
                            type="text"
                            id="Sub_Category_Name"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
        
                    <div className="mb-4">
                        <label htmlFor="Category_id" className="block text-sm font-semibold text-gray-700">Category Id</label>
                        <input
                            {...register('Category_id')}
                            type="text"
                            id="Category_id"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
        
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                        <button
                            type="reset"
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        )
    }        