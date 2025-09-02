import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {

  return (
    <div>
      <Navbar />
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}

    </div>
  )
}