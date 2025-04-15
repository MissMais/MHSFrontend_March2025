import React from 'react'
import Footer from '../Utils/Footer'
import Navbar from '../Utils/Navbar'
import ProductPage from './ProductPage'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <Navbar />
      {/* welcome section */}
      <section id="home" className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center">
              {/* Text Content */}
              <div className="md:w-1/2 md:pr-8">
                <h1 className="text-4xl font-serif text-[#FB6D6C] mb-2">Welcome to Modest Gallery</h1>
                <p className="text-lg text-[#FB6D6C] font-sans underline mb-4">Where Modesty Meets Elegance</p>

                <p className="text-gray-700 font-sans leading-relaxed text-sm">
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
                  src="./../../assets/Imghome.jpg"
                  alt="Modest Gallery"
                  className="w-full h-full object-cover rounded-md shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="shaam-e-roshan" className="py-10 bg-[#FB6D6C]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-[#FB6D6C]">Shaam-E-Roshan</h1>
            </div>

            {/* First Row of Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 place-items-center">
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Shaam-e-Roshan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Shaam-e-Roshan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Shaam-e-Roshan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Shaam-e-Roshan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Second Row of Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Shaam-e-Roshan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Shaam-e-Roshan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Shaam-e-Roshan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Shaam-e-Roshan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="store" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6">

            {/* Text Content */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold" style={{ fontFamily: 'Arial, sans-serif', color: '#FB6D6C' }}>
                Abayas
              </h1>
              <br />
              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: 'Arial, sans-serif', color: '#D86D32' }}
              >
                When it comes to abayas, <span className="text-[#FB6D6C] font-semibold">Modest Hijab Store</span> feel proud on offering pieces that are not only modest but also fashion-forward. Our abayas are designed with intricate details, luxurious fabrics, and flattering silhouettes that make you feel sophisticated and chic. Whether you prefer traditional designs or modern cuts, our collection is versatile enough to be worn for any occasion, from casual outings to formal gatherings.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Link to="/addC">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Abaya 1"
                  className="w-full h-auto shadow-[0_6px_16px_rgba(0,0,0,0.45)] rounded-lg"
                />
              </Link>
              <img
                src="./../../assets/Imghome.jpg"
                alt="Abaya 2"
                className="w-full h-auto shadow-[0_6px_16px_rgba(0,0,0,0.45)] rounded-lg"
              />
              <img
                src="./../../assets/Imghome.jpg"
                alt="Abaya 3"
                className="w-full h-auto shadow-[0_6px_16px_rgba(0,0,0,0.45)] rounded-lg"
              />
              <img
                src="./../../assets/Imghome.jpg"
                alt="Abaya 4"
                className="w-full h-auto shadow-[0_6px_16px_rgba(0,0,0,0.45)] rounded-lg"
              />
              <img
                src="./../../assets/Imghome.jpg"
                alt="Abaya 5"
                className="w-full h-auto shadow-[0_6px_16px_rgba(0,0,0,0.45)] rounded-lg"
              />
              <img
                src="./../../assets/Imghome.jpg"
                alt="Abaya 6"
                className="w-full h-auto shadow-[0_6px_16px_rgba(0,0,0,0.45)] rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="accessories" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6">

            {/* Heading + Text */}
            <div className="mb-8">
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: 'Arial, sans-serif', color: '#FB6D6C' }}
              >
                Accessories
              </h1>
              <br />
              <p
                className="text-lg text-gray-700"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                No outfit is complete without the perfect accessories, and at
                <span className="text-[#FB6D6C] font-semibold"> Modest Hijab Store</span>, we offer a wide range of hijab accessories that add a touch of elegance and personality to your look. From pins and brooches to underscarves and headbands, our accessories are designed to enhance your hijab-wearing experience and make styling effortless. We understand the importance of quality and durability, which is why our accessories are made from the finest materials to ensure they last.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Accessory 1"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Accessory 2"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Accessory 3"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Accessory 4"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Accessory 5"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Accessory 6"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      <section id="stoles" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6">

            {/* Text Content */}
            <div className="mb-8">
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: 'Arial, sans-serif', color: '#FB6D6C' }}
              >
                Stoles
              </h1>
              <br />
              <p
                className="text-lg"
                style={{ fontFamily: 'Arial, sans-serif', color: '#D86D32' }}
              >
                Our hijabs are crafted from premium fabrics, ensuring that they are comfortable,
                breathable, and easy to style. From classic neutrals to vibrant prints, our hijabs
                are designed to complement your wardrobe and make you feel confident and elegant.
                We understand that every woman has her own unique style, which is why our collection
                includes a variety of textures, lengths, and colors to suit your preferences.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Stole 1"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Stole 2"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Stole 3"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Stole 4"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Stole 5"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="./../../assets/Imghome.jpg"
                  alt="Stole 6"
                  className="h-[50vh] w-full object-cover rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

     <section id='contact'>
     <Footer />
     </section>
      
    </div>

  )
}

export default Home
