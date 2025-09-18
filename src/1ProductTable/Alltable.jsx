import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';


export default function Alltable() {
    const [table, settable] = useState([])
    const navigate = useNavigate();



    useEffect(() => {
        fetchtable()
    }, [])



const edittable = async(id)=>{
    console.log(id)
    navigate('/edittable/'+id)
}
  




    const fetchtable = async () => {
        try {
            const response = await axios.get('https://3rn4qfbv-8000.inc1.devtunnels.ms/product/')
            console.log(response.data)
            settable(response.data)
        }
        catch (error) {
            console.log(error)
        }

    }





    const ButtonDelete =async(id)=>{
        try {
            await axios.delete(`https://3rn4qfbv-8000.inc1.devtunnels.ms/product/${id}`)
            settable(table.filter(table=>table.id!==id))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container mt-4">
            <div className="bg-white shadow-md rounded-lg">
                <div className="text-center font-bold text-xl py-4">PRODUCT TABLE</div>
                <div className="p-4">
                    <ul className="space-y-4">
                        {table.map((table) => (
                            <li key={table.id} className="flex justify-between items-center border-b border-gray-200 py-3">
                                <div>
                                    <strong>Product_Description: </strong>{table.Product_Description}<br />
                                    <strong>sub_category_id: </strong>{table.Sub_Category_id} <br />
                                    <strong>Availability: </strong>{table.Availability} <br />
                                    <strong>Stock: </strong>{table.Stock} <br />
                                    <strong>Price: </strong>{table.Price} <br />
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        className="bg-blue-500 text-white text-xs py-1 px-3 rounded sm:text-sm md:text-base lg:text-lg sm:px-4 md:px-5"
                                        onClick={() => ButtonDelete(table.id)}
                                    >
                                        DELETE
                                    </button>
                                    <button
                                        className="bg-green-500 text-white text-xs py-1 px-3 rounded sm:text-sm md:text-base lg:text-lg sm:px-4 md:px-5"
                                        onClick={() => edittable(table.id)}
                                    >
                                        EDIT
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}    