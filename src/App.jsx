import React from 'react'
import Home from './components/Home'
import Signup from './components/Signup'
import { BrowserRouter ,Routes,Route } from 'react-router'
import Layout from "./Utils/Layout"
import Login from './components/Login'
import Variation from './components/variation'
import ProductPage from './components/ProductPage'
import ProductVariation from './components/productVariation'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route index element = {<Home/>}/>
        <Route path ="/" element={<Layout/>}/>
        <Route path="Signup" index element = {<Signup/>}/>
        <Route path='Login' index element = {<Login/>}/>
        <Route path="variation" index element = {<Variation/>}/>
        <Route path="ProductPage" index element = {<ProductPage/>}/>
        <Route path="ProductVariation" index element = {<ProductVariation/>}/>
       </Routes>
    </BrowserRouter>
    
  )
}

export default App
