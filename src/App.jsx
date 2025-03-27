import React from 'react'
import First from './Components/first'
 import Login from './Components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router"
import Layout from './Routes/Layout';

export default function App() {
  return (
    <div>

    
    {/* <Login /> */}

    {/* <First /> */}
    
    <BrowserRouter>
      <Routes>
      <Route index element={<First />}></Route>
      <Route path="/" element={<Layout />}>

      <Route path="/Login" index element={<Login />}></Route>

      </Route>
      </Routes>
      </BrowserRouter>
    
    </div>
  )
}






