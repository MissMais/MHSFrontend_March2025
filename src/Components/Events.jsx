import React from 'react'
import Footer from '../Routes/Footer'

export default function Events() {
    return (
        <div>
            {/* Event */}
            <section id="shaam-e-roshan" className="py-10 bg-[#FB6D6C] mt-16" data-aos="fade-right">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-[5px] border-white rounded-[30px] p-2 shadow-[0_0_40px_rgba(255,255,255,0.3)]">

                        <div className=" p-6 mt-5 ">
                            {/* Header */}
                            <div className="mb-8 text-center">
                                <h1
                                    className="text-3xl font-bold text-white drop-shadow"
                                    style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                                >
                                    Shaam-E-Roshan
                                </h1>
                            </div>

                            {/* First Row of Images */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 place-items-center" data-aos="fade-left">
                                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img
                                        src="/Event1.jpg"
                                        alt="Shaam-e-Roshan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img
                                        src="/Event2.jpg"
                                        alt="Shaam-e-Roshan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img
                                        src="/Event3.jpg"
                                        alt="Shaam-e-Roshan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img
                                        src="/Event4.jpg"
                                        alt="Shaam-e-Roshan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Second Row of Images */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center" data-aos="fade-left">
                                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white  shadow-md hover:shadow-xl transition duration-300">
                                    <img
                                        src="/Event5.jpg"
                                        alt="Shaam-e-Roshan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img
                                        src="/Event6.jpg"
                                        alt="Shaam-e-Roshan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img
                                        src="/Event7.jpg"
                                        alt="Shaam-e-Roshan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition duration-300">
                                    <img
                                        src="/Event8.jpg"
                                        alt="Shaam-e-Roshan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <section id='contact'  >
                    <Footer />
                </section>
            </div>

        </div>
    )
}
