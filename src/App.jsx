import React from 'react';
// import Home from './Components/Home';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Routes/Layout';
import About from './Components/About';
import PrivateRoute from './Routes/PrivateRoute';
import AddC from './Categories/AddC';
import AllC from './Categories/AllC';
import EditC from './Categories/EditC';
import AddSC from './CategoriesSub/AddSC';
import AllSC from './CategoriesSub/AllSC';
import EditSC from './CategoriesSub/EditSC';
import Addtable from './1ProductTable/Addtable';
import Alltable from './1ProductTable/Alltable';
import Edittable from './1ProductTable/Edittable';
import VariationOptionCRUD from './1VariationOption/AllVO';
import Signup from './Components/Signup';
import Home from './Components/Home';
import ProductPage from './Components/ProductPage';
// import AllVO from './1VariationOption/AllVO';
// import EditVO from './1VariationOption/EditVO';
// import AddVO from './1VariationOption/AddVO';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<Layout />}>
            <Route path="/home" index element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ProductPage" element={<ProductPage />}/>
            <Route path="/addC" element={<PrivateRoute element={<AddC />} />} />
            <Route path="/allC" element={<PrivateRoute element={<AllC />} />}/>
            <Route path='/editC/:id' index element={<EditC />}></Route>
            <Route path="/addSC" element={<PrivateRoute element={<AddSC />} />}/>
            <Route path="/allSC" element={<PrivateRoute element={<AllSC />} />} />
            <Route path='/editSC/:id' index element={<EditSC />}></Route>
            <Route path="/addtable" element={<PrivateRoute element={<Addtable />} />}/>
            <Route path="/alltable" element={<PrivateRoute element={<Alltable />} />}/>
            <Route path='/edittable/:id' index element={<Edittable />}></Route>
            <Route path="/allvo" element={<PrivateRoute element={<VariationOptionCRUD />} />}/>
            <Route path="/signup" element={<Signup />} />
          
          </Route>
        
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
