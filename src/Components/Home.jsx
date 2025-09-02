import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from '../Routes/Footer';
import Navbar from '../Routes/Navbar';
import axios from 'axios';
import { scroller } from "react-scroll";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
    const navigate = useNavigate();
    const [img, setimg] = useState([])
    const [data, setdata] = useState([])


    useEffect(() => {
        AOS.init({ duration: 900, once: true });
    }, []);



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
            const response2 = await axios.get('https://06b01936de0f.ngrok-free.app/category/', { headers })
            // ('https://modestgallery.pythonanywhere.com/custom/')
            setimg(response2.data)
            console.log(response2.data)
            // const response3 = await axios.get('https://modestgallery.pythonanywhere.com/custom/')
            // setdata(response3.data)
            // console.log(response3.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchimage()
    }, [])



    return (
        <div>
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
            <section id="home" className="py-10" >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col md:flex-row items-center">
                            {/* Text Content */}
                            <div className="md:w-1/2 md:pr-8">
                                <h1 className="text-4xl font-bold font-serif text-[#FB6D6C] mb-2 ml-5" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}><span className='text-[#FB6D6C]'>Welcome to Modest Gallery</span></h1>
                                <p className="text-[21px] font-bold text-[#FB6D6C] underline mb-4 ml-20" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>Where Modesty Meets Elegance</p>

                                <p className="text-gray-700 font-sans leading-relaxed text-lg" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                                    At Modest Gallery, we offer a diverse collection of modest hijabs, abayas, and accessories that blend elegance with comfort,
                                    allowing you to express your unique style with confidence. In addition to our fashion offerings, we proudly present Shaam e Roshan,
                                    our lifestyle, food, and craft exhibitions that celebrate creativity and tradition. Each event showcases exquisite crafts,
                                    delightful foods, and unique lifestyle products, creating a vibrant community space. Join us at Modest Gallery and Shaam e Roshan,
                                    where style and culture come together beautifully.
                                    <br /><br />
                                    Our Modest Hijab Store can be your ultimate destination for modest fashion that empowers and celebrates your unique style.
                                    We are passionate about providing a curated selection of high-quality hijabs, abayas, and hijab accessories that are not only beautiful
                                    but also thoughtfully designed to meet the needs of modern, modest women. We believe that modesty and fashion go hand in hand.
                                    Our collection is a reflection of this philosophy, offering a diverse range of styles that cater to every taste, occasion, and personality.
                                    Whether you're looking for the perfect everyday hijab, a luxurious abaya for a special event, or stylish accessories to complete your look,
                                    we've got you covered.
                                    <br /><br />
                                    Our Event, Shaam e Roshan, is a vibrant celebration of culture, creativity, and community. These lifestyle, food, and craft exhibitions are
                                    designed to bring people together, offering a unique experience that blends tradition with modernity. At Shaam e Roshan, we showcase an array
                                    of exquisite crafts, delectable foods, and lifestyle products that reflect the richness of our heritage and the creativity of artisans from across the region.
                                </p>
                            </div>

                            {/* Image Content */}
                            <div className="md:w-1/2 mt-6 md:mt-0">

                                <img
                                    src="/Imghome.jpg"
                                    alt="Modest Gallery"
                                    className="w-full h-full object-cover rounded-md shadow-lg"
                                />

                            </div>
                        </div>


                    </div>
                </div>
            </section>










            {/* Store */}
            {/* Abayas  */}
            <section id="store" className="py-10 bg-white">
                <div className="max-w-7xl  px-4">
                    <div className="p-6 mt-20">

                        {/* Text Content */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}>
                                Abayas
                            </h1>
                            <br />
                            <p className="text-[21px] leading-relaxed" style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                                When it comes to abayas, <span className="text-[#FB6D6C] font-semibold">Modest Hijab Store</span> feel proud on offering pieces that are not only modest but also fashion-forward. Our abayas are designed with intricate details, luxurious fabrics, and flattering silhouettes that make you feel sophisticated and chic. Whether you prefer traditional designs or modern cuts, our collection is versatile enough to be worn for any occasion, from casual outings to formal gatherings.
                            </p>
                        </div>

                        {/* Image Grid */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-18 mt-16">
                            {img
                                // .sort(() => Math.random() - 0.5)
                                .filter((i) => i.category_name == "Abaya")
                                .slice(0, 6)
                                .flatMap((cat) =>
                                    cat.homepage_images.map((image, index) => (
                                        <div
                                            key={index}
                                            className=" h-88 w-77 shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                                            onClick={() => navigate('/ProductPage?category=Abaya')}
                                        >

                                            <img

                                                src={image}
                                                alt="Image"
                                                className='w-full h-full object-cover'
                                            />

                                        </div>
                                    ))
                                )}
                        </div>

                    </div>
                </div>
            </section>



            {/* Stoles  */}
            <section id="stoles" className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className=" p-6 mt-16">

                        {/* Text Content */}
                        <div className="mb-8">
                            <h1
                                className="text-3xl font-bold"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}
                            >
                                Stoles
                            </h1>
                            <br />
                            <p
                                className="text-[21px]"
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-18 mt-16">
                            {[...img]
                                .sort(() => Math.random() - 0.5)
                                .filter((i) => i.category_name === "Stoles")
                                .slice(0, 6)
                                .flatMap((cat) =>
                                    cat.homepage_images.map((image, index) => (
                                        <div
                                            key={index}
                                            className=" h-88 w-77 shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                                            onClick={() => navigate('/ProductPage?category=Stoles')}
                                        >

                                            <img

                                                src={image}
                                                alt="Image"
                                                className='w-full h-full object-cover'
                                            />

                                        </div>
                                    ))
                                )}
                        </div>


                    </div>
                </div>
            </section>




            {/* Accessories */}
            <section id="accessories" className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="p-6 mt-16">

                        {/* Heading + Text */}
                        <div className="mb-8">
                            <h1
                                className="text-3xl font-bold"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}
                            >
                                Accessories
                            </h1>
                            <br />
                            <p
                                className="text-[21px] text-gray-700"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                            >
                                No outfit is complete without the perfect accessories, and at
                                <span className="text-[#FB6D6C] font-semibold"> Modest Hijab Store</span>, we offer a wide range of hijab accessories that add a touch of elegance and personality to your look. From pins and brooches to underscarves and headbands, our accessories are designed to enhance your hijab-wearing experience and make styling effortless. We understand the importance of quality and durability, which is why our accessories are made from the finest materials to ensure they last.
                            </p>
                        </div>

                        {/* Image Grid */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-18 mt-16">
                            {[...img]
                                .sort(() => Math.random() - 0.5)
                                .filter((i) => i.category_name === "Accessories")
                                .slice(0, 6)
                                .flatMap((cat) =>
                                    cat.homepage_images.map((image, index) => (
                                        <div
                                            key={index}
                                            className=" h-88 w-77 shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                                            onClick={() => navigate('/ProductPage?category=Accessories')}
                                        >

                                            <img

                                                src={image}
                                                alt="Image"
                                                className='w-full h-full object-cover'
                                            />

                                        </div>
                                    ))
                                )}
                        </div>


                    </div>
                </div>
            </section>




            {/* Hijabs */}
            <section id="accessories" className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="p-6 mt-16">

                        {/* Heading + Text */}
                        <div className="mb-8">
                            <h1
                                className="text-3xl font-bold"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy', color: '#FB6D6C' }}
                            >
                                Hijabs
                            </h1>
                            <br />
                            <p
                                className="text-[21px] text-gray-700"
                                style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}
                            >
                                At <span className="text-[#FB6D6C] font-semibold">Modest Gallery</span>, our hijab collection is crafted to empower modern women with elegance, comfort, and versatility. Whether you're dressing for a casual day out, a professional setting, or a special event, we offer hijabs in a wide variety of fabrics, colors, and styles to suit every mood and moment. From breathable cotton and soft jersey to luxurious chiffon and silk, each piece is thoughtfully selected to ensure a perfect blend of modesty and fashion. </p>
                        </div>

                        {/* Image Grid */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-18 mt-16">
                            {[...img]
                                .sort(() => Math.random() - 0.5)
                                .filter((i) => i.category_name === "Hijab")
                                .slice(0, 6)
                                .flatMap((cat) =>
                                    cat.homepage_images.map((image, index) => (
                                        <div
                                            key={index}
                                            className=" h-88 w-77 shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                                            onClick={() => navigate('/ProductPage?category=Hijab')}
                                        >

                                            <img

                                                src={image}
                                                alt="Image"
                                                className='w-full h-full object-cover'
                                            />

                                        </div>
                                    ))
                                )}
                        </div>


                    </div>
                </div>
            </section>




            <section id='contact'  >
                <Footer />
            </section>

        </div>

    );
}







