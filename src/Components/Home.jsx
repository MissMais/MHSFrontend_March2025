import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from '../Routes/Footer';
import Navbar from '../Routes/Navbar';
import axios from 'axios';
import { scroller } from "react-scroll";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { url } from "../App"

import Marquee from 'react-fast-marquee';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Home() {
    const navigate = useNavigate();
    const [img, setimg] = useState([])
    const [brand, setbrand] = useState([])
    const [variety, setvariety] = useState([])

    useEffect(() => {
        AOS.init({ duration: 900, once: true });
    }, []);


    const settings = {
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // adaptiveHeight: true,
        arrows: true,

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 1,

                }
            }

        ]

    }







    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            scroller.scrollTo(id, {
                duration: 500,
                smooth: true,
                offset: -80,
            });
        }
    }, [location]);


    const headers = {

        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json'
    }

    const fetchimage = async () => {
        try {
            const response2 = await axios.get(`${url}category/`, { headers })
            // ('https://modestgallery.pythonanywhere.com/custom/')
            setimg(response2.data)
            // console.log(response2.data)

            const brand = await axios.get(`${url}brand/`, { headers })
            setbrand(brand.data)

            const variety = await axios.get(`${url}variety/`, { headers })
            setvariety(variety.data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchimage()
    }, [])

    const handleclick = async (value) => {


        const newbrand = encodeURIComponent(value)
        // console.log(newbrand)
        navigate(`/ProductPage?brand=${newbrand}`)
    }


    const handlevarclick = async (value, value2) => {

        const newbrand = encodeURIComponent(value)
        // console.log(newbrand)
        navigate(`/ProductPage?brandid=${newbrand}&varopid=${value2}`)
    }



    return (
        <div >
            {/* <Navbar /> */}
            <br />
            <br />
            <br />
            {/* <div>
                {img


                    .map((i) => (

                        <div
                            key={i.category_id}
                            className="h-88 w-77 shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                            onClick={() => navigate('/ProductPage?category=Abayas')}
                        >
                            {i.category_name}


                            {i.homepage_images.map((i) => (
                                <img
                                    // key={index}
                                    src={i}
                                    alt={i.category_name}
                                    className='w-full h-full object-cover'
                                />
                            ))}
                        </div>


                    ))}
            </div> */}


            {/* Home */}
            <section id="home" >
                <div className="max-w-7xl px-4">
                    <div className="">
                        <div className="flex flex-col md:flex-row items-center bg-white shadow-xl drop-shadow-amber-600 ">
                            {/* Text Content */}
                            <div className="md:w-1/2 p-10">
                                <div className=''>

                                    <h1 className="md:text-4xl text-[20px] font-bold font-serif text-[#FB6D6C] mb-2 ml-3" style={{ fontFamily: ' Papyrus' }}><span className='text-[#FB6D6C]'>Welcome to Modest Gallery</span></h1>
                                    <p className=" text-[12px] md:text-[21px] font-bold text-[#FB6D6C] underline mb-4 md:ml-20 ml-12" style={{ fontFamily: 'Papyrus' }}>Where Modesty Meets Elegance</p>

                                </div>
                                <p className="text-gray-700 pt-7 text-justify text-[16px] font-sans leading-relaxed md:text-lg" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                                    At Modest Gallery, we offer a diverse collection of modest hijabs, abayas, and accessories that blend elegance with comfort,
                                    allowing you to express your unique style with confidence. In addition to our fashion offerings, we proudly present Shaam e Roshan,
                                    our lifestyle, food, and craft exhibitions that celebrate creativity and tradition. Each event showcases exquisite crafts,
                                    delightful foods, and unique lifestyle products, creating a vibrant community space. Join us at Modest Gallery and Shaam e Roshan,
                                    where style and culture come together beautifully.
                                    <br /><br />
                                    {/* Our Modest Hijab Store can be your ultimate destination for modest fashion that empowers and celebrates your unique style.
                                    We are passionate about providing a curated selection of high-quality hijabs, abayas, and hijab accessories that are not only beautiful
                                    but also thoughtfully designed to meet the needs of modern, modest women. We believe that modesty and fashion go hand in hand.
                                    Our collection is a reflection of this philosophy, offering a diverse range of styles that cater to every taste, occasion, and personality.
                                    Whether you're looking for the perfect everyday hijab, a luxurious abaya for a special event, or stylish accessories to complete your look,
                                    we've got you covered.
                                    <br /><br />
                                    Our Event, Shaam e Roshan, is a vibrant celebration of culture, creativity, and community. These lifestyle, food, and craft exhibitions are
                                    designed to bring people together, offering a unique experience that blends tradition with modernity. At Shaam e Roshan, we showcase an array
                                    of exquisite crafts, delectable foods, and lifestyle products that reflect the richness of our heritage and the creativity of artisans from across the region. */}
                                </p>
                            </div>

                            {/* Image Content */}
                            <div className=" md:w-1/2 md:mt-6 md:pl-25 md:p-7 pb-7 md:pb-15">

                                <img
                                    src="/Imghome.jpg"
                                    alt="Modest Gallery"
                                    className="md:w-100 w-full md:h-full h-100 object-cover rounded-md shadow-lg"

                                />

                            </div>
                        </div>


                    </div>
                </div>
            </section>

            <section id="brand" className=" bg-white">
                <div className="mt-12">
                    <div className="max-w-7xl mx-auto px-4 ">

                        <div>
                            <h1 className="text-2xl md:text-3xl flex justify-center font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
                                Featured  Brands
                            </h1>

                        </div>
                        <div className="p-8">


                            {/* Image Grid */}

                            <div className="flex justify-center row-auto  gap-10">
                                <Marquee gradient={false} speed={30}>
                                    {brand.map((item) => (
                                        <div onClick={() => handleclick(item.Brand_name)} key={item.Brand_id} className="relative overflow-hidden
                                     m-2 md:m-3  md:gap-8 shadow-md shadow-[#FB6D6C] md:w-50 md:h-50 w-20 h-20 hover:text-lg cursor-pointer
                                     transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                                            <img src={item.Brand_image} alt="no image" className='w-full h-full object-cover' />
                                            <div style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }} className='absolute inset-0 text-white text-[9px] md:text-xl flex justify-center drop-shadow-lg drop-shadow-black items-center font-bold'>{item.Brand_name}</div>
                                        </div>
                                    ))
                                    }
                                </Marquee>
                            </div>
                            {/* <div className='flex items-center justify-between mt-4 relative bottom-34 '>

                                <button className='relative w-6 h-6 text-4xl rounded-full right-4' onClick={handlePrev}>&lt;</button>
                                <button className='relative w-6 h-6 text-4xl rounded-full left-10' onClick={handleNext}>&gt;</button>

                            </div> */}


                        </div>
                    </div>
                </div>
            </section>





            {/* Store */}

            {/* Abayas  */}
            <section id="store" className=" bg-white mt-2">
                <div className="max-w-7xl mx-auto  px-4">
                    <div className="p-6">

                        {/* Text Content */}
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
                                Abayas
                            </h1>
                            <br />
                            <p className="text-sm md:text-lg text-justify text-[#666F80] leading-relaxed" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                                When it comes to abayas, <span className="text-[#FB6D6C] font-semibold">Modest Hijab Store</span> feel proud on offering pieces that are not only modest but also fashion-forward. Our abayas are designed with intricate details, luxurious fabrics, and flattering silhouettes that make you feel sophisticated and chic. Whether you prefer traditional designs or modern cuts, our collection is versatile enough to be worn for any occasion, from casual outings to formal gatherings.
                            </p>
                        </div>

                        {/* Image Grid */}

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-18">
                            {img
                                // .sort(() => Math.random() - 0.5)
                                .filter((i) => i.category_name == "Abaya")
                                .slice(0, 6)
                                .flatMap((cat) =>
                                    cat.homepage_images.map((image, index) => (
                                        <div
                                            key={index}
                                            className=" md:h-77 md:w-66 shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-3 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                                            onClick={() => navigate('/ProductPage?category=Abaya')}
                                        >

                                            <div className="w-full aspect-[3/4]">
                                                <img
                                                    src={image}
                                                    alt="Image"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>


                                        </div>
                                    ))
                                )}
                        </div>

                    </div>
                </div>
            </section>



            {/* Stoles  */}
            <section id="stoles" className=" bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="p-6">

                        {/* Text Content */}
                        <div className="mb-8">
                            <h1
                                className="text-2xl md:text-3xl font-bold"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}
                            >
                                Stoles
                            </h1>
                            <br />
                            <p
                                className="text-sm md:text-lg text-justify leading-relaxed text-[#666F80]"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                            >
                                Our hijabs are crafted from premium fabrics, ensuring that they are comfortable,
                                breathable, and easy to style. From classic neutrals to vibrant prints, our hijabs
                                are designed to complement your wardrobe and make you feel confident and elegant.
                                We understand that every woman has her own unique style, which is why our collection
                                includes a variety of textures, lengths, and colors to suit your preferences.
                            </p>
                        </div>

                        {/* Image Grid */}

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-18">
                            {[...img]
                                .sort(() => Math.random() - 0.5)
                                .filter((i) => i.category_name === "Stoles")
                                .slice(0, 6)
                                .flatMap((cat) =>
                                    cat.homepage_images.map((image, index) => (
                                        <div
                                            key={index || ''}
                                            className=" md:h-77 md:w-66  shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-3 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                                            onClick={() => navigate('/ProductPage?category=Stoles')}
                                        >

                                            <div className="w-full aspect-[3/4]">
                                                <img
                                                    src={image}
                                                    alt="Image"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>


                                        </div>
                                    ))
                                )}
                        </div>


                    </div>
                </div>
            </section>




            {/* Accessories */}
            <section id="accessories" className=" bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="p-6">

                        {/* Heading + Text */}
                        <div className="mb-8">
                            <h1
                                className="text-2xl md:text-3xl font-bold"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}
                            >
                                Accessories
                            </h1>
                            <br />
                            <p
                                className="text-sm md:text-lg text-justify leading-relaxed text-[#666F80]"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                            >
                                No outfit is complete without the perfect accessories, and at
                                <span className="text-[#FB6D6C] font-semibold"> Modest Hijab Store</span>, we offer a wide range of hijab accessories that add a touch of elegance and personality to your look. From pins and brooches to underscarves and headbands, our accessories are designed to enhance your hijab-wearing experience and make styling effortless. We understand the importance of quality and durability, which is why our accessories are made from the finest materials to ensure they last.
                            </p>
                        </div>

                        {/* Image Grid */}

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-18">
                            {[...img]
                                .sort(() => Math.random() - 0.5)
                                .filter((i) => i.category_name === "Accessories")
                                .slice(0, 6)
                                .flatMap((cat) =>
                                    cat.homepage_images.map((image, index) => (
                                        <div
                                            key={index}
                                            className=" md:h-77 md:w-66  shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-3 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                                            onClick={() => navigate('/ProductPage?category=Accessories')}
                                        >

                                            <div className="w-full aspect-[3/4]">
                                                <img
                                                    src={image}
                                                    alt="Image"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>


                                        </div>
                                    ))
                                )}
                        </div>


                    </div>
                </div>
            </section>




            {/* Hijabs */}
            <section id="accessories" className=" bg-white">
                <div className=" max-w-7xl  mx-auto px-4">
                    <div className="p-6">

                        {/* Heading + Text */}
                        <div className="mb-8">
                            <h1
                                className="text-2xl md:text-3xl font-bold"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}
                            >
                                Hijabs
                            </h1>
                            <br />
                            <p
                                className="text-sm md:text-lg text-justify text-[#666F80] leading-relaxed"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                            >
                                At <span className="text-[#FB6D6C] font-semibold">Modest Gallery</span>, our hijab collection is crafted to empower modern women with elegance, comfort, and versatility. Whether you're dressing for a casual day out, a professional setting, or a special event, we offer hijabs in a wide variety of fabrics, colors, and styles to suit every mood and moment. From breathable cotton and soft jersey to luxurious chiffon and silk, each piece is thoughtfully selected to ensure a perfect blend of modesty and fashion. </p>
                        </div>

                        {/* Image Grid */}

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-18">
                            {[...img]
                                .sort(() => Math.random() - 0.5)
                                .filter((i) => i.category_name === "Hijab")
                                .slice(0, 6)
                                .flatMap((cat) =>
                                    cat.homepage_images.map((image, index) => (
                                        <div
                                            key={index}
                                            className=" md:h-77 md:w-66  shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-3 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                                            onClick={() => navigate('/ProductPage?category=Hijab')}
                                        >

                                            <div className="w-full aspect-[3/4]">
                                                <img
                                                    src={image}
                                                    alt="Image"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>


                                        </div>
                                    ))
                                )}
                        </div>


                    </div>
                </div>
            </section>




            {/* Variety */}
            <section id="brand">
                <div className=" mt-15">
                    <div className="bg-[#FB6D6C] max-w-7xl pt-7 mx-auto pb-4 ">

                        <div>
                            <h1 className="text-white text-2xl md:text-3xl flex justify-center font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                                Varieties
                            </h1>

                        </div>
                        <div className="p-7 md:p-10">

                            {/* Image Grid */}



                            <Slider {...settings}>
                                {variety.map((item) => (
                                    <div onClick={() => handlevarclick(item.Brand_id, item.Variation_option_id)} key={item.Variety_id || ''}
                                        className="relative overflow-hidden cursor-pointer aspect-[3/4]
                                        transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                                        <img src={item.Variety_image} alt="no image" className='w-full h-full object-cover' />
                                        {/* <div style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                                                className='absolute inset-0 text-white text-[9px] md:text-xl flex justify-center drop-shadow-lg
                                             drop-shadow-black items-center font-bold'>{item.Brand_name}</div> */}
                                    </div>
                                ))
                                }
                            </Slider>


                        </div>
                    </div>
                </div>
            </section >


            <section id='contact'  >
                <Footer />
            </section>

        </div >

    );
}







