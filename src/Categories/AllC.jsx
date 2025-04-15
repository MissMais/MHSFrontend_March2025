import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router';


export default function AllC() {
    const [C, setC] = useState([])
    const navigate = useNavigate();



    useEffect(() => {
        fetchC()
    }, [])



const editC = async(id)=>{
    console.log(id)
    navigate('/editC/'+id+'/')
}
  




    const fetchC = async () => {
        try {
            const response = await axios.get('https://qr723wq6-8000.inc1.devtunnels.ms/cat/')
            console.log(response.data)
            setC(response.data)
        }
        catch (error) {
            console.log(error)
        }

    }





    const ButtonDelete =async(id)=>{
        try {
            await axios.delete(`https://qr723wq6-8000.inc1.devtunnels.ms/cat/${id}`)
            setC(C.filter(C=>C.id!==id))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container mt-4">
            <div className="bg-white shadow-md rounded-lg">
                <div className="text-center font-bold text-xl py-4">CATEGORIES</div>
    
                <div className="p-4">
                    <ul className="space-y-4">
                        {C.map((C) => (
                            <li key={C.id} className="flex justify-between items-center border-b border-gray-200 py-3">
                                <div>
                                    <strong>category_id: </strong>{C.id}<br />
                                    <strong>category_name: </strong>{C.Category_name}
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        className="bg-blue-500 text-white text-xs py-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={() => ButtonDelete(C.id)}
                                    >
                                        DELETE
                                    </button>
                                    <button
                                        className="bg-green-500 text-white text-xs py-1 px-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        onClick={() => editC(C.id)}
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