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



        const res = await axios.get(`${url}notif/`, { headers })

        const filter = res.data.filter(item => item.customer_id == customerid)
        const reverse = filter.reverse()
        setNotification(reverse)
    }

    useEffect(() => {
        getNot()
    }, [])


    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div>
                <h1
                    className="text-xl font-bold mb-6"
                    style={{ fontFamily: 'Papyrus' , color: "#666F80" }}
                >
                    What’s New
                </h1>
                {(Notification.length == 0) ? (
                    <div className='flex justify-center text-xs' style={{ fontFamily: 'Papyrus' , color: "#666F80" }}>No Notification !!</div>
                ) : (
                    Notification.map((item) => (
                        <div key={item.notification_id}>
                            <div
                                className="bg-white font-semibold text-[7px] md:text-[12px] md:p-4 rounded-lg p-2 mb-6 border border-gray-200"
                                style={{ fontFamily: 'Papyrus' , color: "#666F80" }}
                            >
                                <div className="flex justify-between items-center">
                                    <span>{item.notification_msg}</span>
                                    <TbBellRingingFilled className="text-[#FB636C] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                                </div>
                            </div>


                        </div>


                    ))
                )
                }


            </div>

        </div>
    )
}
