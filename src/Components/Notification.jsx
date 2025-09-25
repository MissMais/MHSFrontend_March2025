import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { TbBellRingingFilled } from "react-icons/tb";


export default function Notification() {
    const [Notification, setNotification] = useState([])

    const headers = {
        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json'
    }

    const id = localStorage.getItem("user_id")

    const getNot = async () => {

        const res1 = await axios.get(`${url}customer/`, { headers })
        const filtereddata = res1.data.filter(item => item.User_id == id)
        const customerid = filtereddata[0].id
        console.log(customerid)


        const res = await axios.get(`${url}notif/`, { headers })
        console.log(res.data)
        const filter = res.data.filter(item => item.customer_id == customerid)
        setNotification(filter)
    }

    useEffect(() => {
        getNot()
    }, [])


    return (
        <div className="max-w-5xl mx-auto px-4 py-10 mt-20">
            <div>
                <h1
                    className="text-3xl font-bold mb-6"
                    style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
                >
                    Notifications
                </h1>
                {(Notification.length == 0) ? (
                    <div className='flex justify-center' style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>No Notification !!</div>
                ) : (
                    Notification.map((item) => (
                        <div key={item.notification_id}>
                             <div 
                            className="bg-white font-semibold text-[10px] md:text-base rounded-lg p-6 mb-6 border border-gray-200"
                            style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
                            <div className='flex justify-between'>{item.notification_msg} <TbBellRingingFilled style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#FB636C" }} /> </div>
                        </div>
                       
                        </div>
                       
                        
                    ))
                )
                }


            </div>
           
        </div>
    )
}
