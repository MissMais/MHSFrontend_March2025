import React from 'react'
import Home from './components/Home'
import Signup from './components/Signup'
import { BrowserRouter ,Routes,Route } from 'react-router'
import Layout from "./Utils/Layout"
const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route index element = {<Home/>}/>
        <Route path ="/" element={<Layout/>}/>

        <Route path="Signup" index element = {<Signup/>}/>

        
       </Routes>
    </BrowserRouter>
    
  )
}

export default App
