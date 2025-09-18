import Footer from '../Routes/Footer';

import { useEffect } from 'react';

export default function About() {

 


  return (

    <div>
      {/* <Navbar /> */}



      <section className="py-12 mt-20">
        <div className='container max-w-7xl mx-auto px-4'>
          <h1 className='text-center text-3xl font-bold mb-10' style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}
          >
            Our Story
          </h1>

          <div className='flex flex-col md:flex-row items-center gap-10'>
            <div className='md:w-1/2 bg-[#FB6D6C] p-8 rounded-2xl shadow-lg'>
              <p className='text-[10px] md:text-[20px] text-white text-justify' style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                Modest Gallery was born out of a desire to provide high-quality, stylish, and modest fashion options for women who value both fashion and tradition.
                Our founder recognized a gap in the market for modest clothing that was not only respectful of religious and cultural values but also fashionable and versatile.
                With this vision in mind, Modest Gallery was established as a one-stop shop for women seeking modest yet chic clothing and accessories.
              </p>
            </div>

            <div className='md:w-1/2 flex justify-center'>
              <img
                src="/img01.jpg"
                alt="Our Story"
                className='rounded-2xl shadow-lg w-[90%] md:w-[70%] object-cover md:ml-20'
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className='container max-w-7xl mx-auto px-4'>
          <h1 className='text-center text-4xl font-bold mb-10'
            style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
            Modest Hijab Store
          </h1>

          <div className='flex flex-col md:flex-row items-center gap-10'>
            <div className='md:w-1/2 flex justify-center'>
              <img
                src="/img02.jpg"
                alt="Our Story"
                className='rounded-2xl shadow-lg w-[90%] object-cover md:ml-20'
              />
            </div>
            <div className='md:w-2/3 bg-[#FB6D6C] p-8 rounded-2xl shadow-lg'>
              <p className='text-[10px] md:text-[20px] leading-relaxed text-white text-justify' style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                At the heart of Modest Gallery is our Modest Hijab Store, where we offer an exquisite range of hijabs,
                abayas, and accessories that cater to the needs of modern, modest women. Our hijab collection is thoughtfully
                curated to include a variety of styles, fabrics, and colors, ensuring that every woman can find something that
                suits her taste and lifestyle. Whether you're looking for a simple, everyday hijab or a luxurious, statement piece,
                our collection has something for everyone.

                Our abayas are designed with a focus on quality, comfort, and elegance. We believe that modest clothing should not
                compromise on style, which is why our abayas feature modern cuts, intricate details, and premium fabrics. From casual,
                everyday wear to more formal, occasion-specific abayas, our collection is diverse and versatile, allowing you to express your personal
                style while adhering to your values.

                In addition to hijabs and abayas, we offer a wide range of accessories that complement your modest wardrobe. From chic underscarves to
                elegant hijab pins, our accessories are designed to enhance your overall look while adding a touch of sophistication. At Modest Hijab Store,
                we are committed to providing you with products that make you feel confident, comfortable, and beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className='container max-w-7xl mx-auto px-4'>
          <h1 className='text-center text-4xl font-bold mb-10'
            style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
            Shaam e Roshan
          </h1>

          <div className='flex flex-col md:flex-row items-center gap-10'>
            <div className='md:w-1/2 bg-[#FB6D6C] p-8 rounded-2xl shadow-lg'>
              <p className='text-[10px] md:text-[20px] leading-relaxed text-white text-justify' style={{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                Modest Gallery is not just about fashion; it's about creating experiences that celebrate culture,
                creativity, and community. This is where Shaam e Roshan comes in. Shaam e Roshan is our signature series of lifestyle,
                food, and craft exhibitions that bring people together in a vibrant, festive atmosphere. These events are a celebration of
                the rich cultural heritage that inspires our brand, offering a platform for artisans, chefs, and entrepreneurs to showcase their
                talents and connect with a wider audience.

                At Shaam e Roshan, you'll find an array of beautifully crafted items, from traditional handicrafts to contemporary art,
                all reflecting the creativity and craftsmanship of the artisans. Our food stalls offer a diverse selection of culinary delights,
                giving visitors the opportunity to taste and savor flavors from different cultures. The lifestyle section of the exhibition features
                unique products that add a touch of elegance and style to everyday living.

                Each Shaam e Roshan event is carefully curated to provide a memorable experience for our visitors, whether you're shopping for unique gifts,
                enjoying delicious food, or simply soaking in the vibrant atmosphere. It's more than just an exhibition; it's a celebration of the values and traditions
                that we hold dear at Modest Gallery.
              </p>
            </div>
            <div className='md:w-1/2 flex justify-center'>
              <img
                src="/img03.jpg"
                alt="Our Story"
                className='rounded-2xl shadow-lg w-[90%] object-cover md:ml-20'
              />
            </div>
          </div>
        </div>
      </section>

      <div className='text-center px-4 md:px-0 my-10 font-bold text-[15px] md:text-[20px] leading-relaxed'>
        <h4 style={{ fontFamily: "Copperplate, Papyrus, fantasy", color: "#666F80" }}>
          Thank you for choosing Modest Gallery as your trusted source for modest fashion and cultural experiences.
          We look forward to serving you and being a part of your journey.
        </h4>
      </div>

      <section id='contact'>
        <Footer />
      </section>
    </div>
  );
}
