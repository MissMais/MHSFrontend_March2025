import React from 'react'
import Footer from '../Routes/Footer'
import Bot from './Bot'


export default function Events() {
    return (
        <div>
            {/* Event */}
            <section
                id="shaam-e-roshan"
                className="py-10 bg-[#FB6D6C] mt-16"
                data-aos="fade-right"
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow" style={{ fontFamily: 'Papyrus', text-align: center}}>
                    <a href="www.shaameroshan.modest.co.in">Visit Site</a>
                </h1>
                
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-[5px] border-white rounded-[30px] p-2 shadow-[0_0_40px_rgba(255,255,255,0.3)]">

                        <div className="p-4 sm:p-6 mt-5">
                            {/* Header */}
                            <div className="mb-8 text-center">
                                <h1
                                    className="text-2xl sm:text-3xl font-bold text-white drop-shadow"
                                    style={{ fontFamily: 'Papyrus'  }}
                                >
                                    Shaam-E-Roshan
                                </h1>
                            </div>

                            {/* First Row of Images */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mb-6 place-items-center" data-aos="fade-left">
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img src="/Event1.jpg" alt="Shaam-e-Roshan 1" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img src="/Event2.jpg" alt="Shaam-e-Roshan 2" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img src="/Event3.jpg" alt="Shaam-e-Roshan 3" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img src="/Event4.jpg" alt="Shaam-e-Roshan 4" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Second Row of Images */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 place-items-center" data-aos="fade-left">
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img src="/Event5.jpg" alt="Shaam-e-Roshan 5" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img src="/Event6.jpg" alt="Shaam-e-Roshan 6" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img src="/Event7.jpg" alt="Shaam-e-Roshan 7" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img src="/Event8.jpg" alt="Shaam-e-Roshan 8" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <section id="contact">
                    <Footer />
                </section>

                {/* Chatbot */}
                <div className="relative bottom-0 right-4 top-60 w-[90%] max-w-[350px] z-50">
                    <Bot />
                </div>
            </div>
        </div>
    )
}
