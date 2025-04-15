import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
import Navbar from './Home';
import axios from 'axios';


const url='https://modestgallery.pythonanywhere.com/admin/MHSApp/category/'

export default function MyComponent() {

    const [categories, setCategories] = useState([]); 
  
    const headers = {
      
      'Content-Type': 'application/json',
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);



const fetchCategories = async () => {
  console.log("Fetching categories...");  // Check if this is logged
  try {
    const response = await axios.get(url, { headers });
    console.log('Fetched data:', response.data); // This should log your API data
    setCategories(response.data); // Save to state
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



const navigate = useNavigate();

const handleLogout = () => {

  localStorage.removeItem('AccessToken');
  localStorage.removeItem('RefreshToken');
  localStorage.removeItem('user');

  navigate("/login");
}


    // const navigate = useNavigate();
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light sticky-top bg-body-tertiary" style={{ zIndex: 9999 }}>
<div className="container-fluid">
  <Link className="navbar-brand" to="/">
    Modest Gallery
  </Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsupportedcontent">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarsupportedcontent">
    <ul className="navbar-nav ms-auto me-2">
      <li className="nav-item">
        <Link className="nav-link active" to="/home">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="shaam-e-roshan"
          smooth="true"
          duration={200}

        >
          Event
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/home" smooth="true" duration={200}>
          Store
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/home" smooth="true" duration={200}>
          Contact
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <CgProfile
            style={{
              fontSize: '30px',
              marginLeft: '10px',
              
            }}
          />
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/register">
              Register
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</nav> 




    </div>
  )
}
