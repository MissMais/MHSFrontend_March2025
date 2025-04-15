import React from 'react'
// import Header from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router'
import Navbar from './Navbar'


export default function Layout() {

  return (
    <div>
      {/* <Navbar /> */}
    {/* <Header /> */}
    <Outlet />
  
    
    </div>
  )
}