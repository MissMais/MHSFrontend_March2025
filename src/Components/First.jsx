import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CgProfile } from "react-icons/cg";
import './First.css';
import { Link } from "react-router-dom";
import Header from '../Routes/Header';
import Footer from '../Routes/Footer';
import img from './../../assets/Imghome.jpg'

const Navbar = () => {
  return (
    <div>
    <Header />

      <div>
        <section>
          <div className="container py-5">
            <div className="row">
              {/* Card with content on left and image on right */}
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Text Content on Left */}
                      <div className="col-md-6">
                        <h1>Welcome to Modest Gallery</h1>
                        <p><u>Where Modesty Meets Elegance</u></p>
                        <br />
                        <p>
                          At Modest Gallery, we offer a diverse collection of modest hijabs, abayas, and accessories that blend elegance with comfort, allowing you to express your unique style with confidence. In addition to our fashion offerings, we proudly present Shaam e Roshan, our lifestyle, food, and craft exhibitions that celebrate creativity and tradition. Each event showcases exquisite crafts, delightful foods, and unique lifestyle products, creating a vibrant community space. Join us at Modest Gallery and Shaam e Roshan, where style and culture come together beautifully.
                          <br /><br />
                          Our Modest Hijab Store can be your ultimate destination for modest fashion that empowers and celebrates your unique style. We are passionate about providing a curated selection of high-quality hijabs, abayas, and hijab accessories that are not only beautiful but also thoughtfully designed to meet the needs of modern, modest women. We believe that modesty and fashion go hand in hand. Our collection is a reflection of this philosophy, offering a diverse range of styles that cater to every taste, occasion, and personality. Whether you're looking for the perfect everyday hijab, a luxurious abaya for a special event, or stylish accessories to complete your look, we've got you covered.
                          <br /><br />
                          Our Event, Shaam e Roshan, is a vibrant celebration of culture, creativity, and community. These lifestyle, food, and craft exhibitions are designed to bring people together, offering a unique experience that blends tradition with modernity. At Shaam e Roshan, we showcase an array of exquisite crafts, delectable foods, and lifestyle products that reflect the richness of our heritage and the creativity of artisans from across the region.
                        </p>
                      </div>
                      {/* Image on Right */}
                      <div className="col-md-6">
                        <img
                          src='./../../assets/Imghome.jpg'
                          alt="No Image Yet"
                          className="img-fluid"
                          style={{ objectFit: 'cover', height: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
    
  );
};

export default Navbar;
