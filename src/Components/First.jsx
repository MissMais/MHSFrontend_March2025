import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="./Index.html">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsupportedcontent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsupportedcontent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="./Index.html">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./categories.html">Categories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./contact.html">Contact</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto me-2">
            <li className="nav-item">
              <a className="nav-link active" href="./login.html">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="./Register.html">Register</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link active" href="./cart.html">Cart</a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
