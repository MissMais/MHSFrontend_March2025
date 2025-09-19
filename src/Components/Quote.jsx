import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {url} from "../App"


export default function Quote() {
    const navigate = useNavigate()
    const [quotes,setQuotes] = useState([])

    const { id }  = useParams();
    // const url = "https://5d0abf24c6ce.ngrok-free.app/"

useEffect(()=>{
    fetchquote()
},[])


 const headers = {
    //   Authorization: `Bearer ${accessToken}`,
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'application/json'
  }

    const fetchquote = async()=>{
      const response = await axios.get(`${url}quote/`,{headers})
      const data = response.data
     const randomquoteindex = Math.floor(Math.random() * data.length)

    //  console.log(randomquote)

      setQuotes(data[randomquoteindex])
       console.log(response.data)
      

    }



    setTimeout(() => {
        navigate(`/ProductDetail/${id}`);
    }, 3000)

    return (
        
            <div className="flex justify-center items-center min-h-screen px-4">
      <div className=" p-6 rounded-lg w-full">
       {quotes && (
          <h2
            className="text-center text-2xl font-bold mb-6 animate-pulse"
            style={{
              fontFamily: 'Copperplate, Papyrus, fantasy',
              color: '#666F80',
            }}
          >
            {quotes.quote}
          </h2>
        )}
         
        
        </div>
        
        </div>
    )
}
