import React from 'react'
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Index">
            Modest Gallery
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsupportedcontent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsupportedcontent">
            <ul className="navbar-nav ms-auto me-2">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/event">
                  Event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/store">
                  Store
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

              {/* Profile Dropdown */}
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
                      marginTop: '5px'
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
                    <a className="dropdown-item" href="#">
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
