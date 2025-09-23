import React from 'react';
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
import ProductDetail from './Components/ProductDetail';
import OrderPage from './Components/OrderPage';
import Cart from './Components/Cart';
import Account from './Components/Account';
import OrderHistory from './Components/History';
import Address from './Components/Address';
import AddressEdit from './Components/AddressEdit';
import ResetPassword from './Components/Resetpass';
import AddAddress from './Components/AddAddress';
import Events from './Components/Events';
import Emptycart from './Components/Emptycart';
import ForgotPassword from './Components/Forgotpass';
import ForgotPassOtp from './Components/ForgotPassOtp';
import ForgotPassChange from './Components/ForgotPassChange';
import AccountEdit from './Components/AccountEdit';
import Quote from './Components/Quote';
import Wishlist from './Components/Wishlist';
export const url = "https://045120d6d1b2.ngrok-free.app/"

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


// initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51S6QsRH2tmS5tW8J9U1kngvfEcnzixF1Xc1GhdZLeL7SzLN4ZAlbQgvnnITLqcZMYbA4VCzryAsg7HozPSi1ITeU00pRf2xhYe");



export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Elements stripe={stripePromise}>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/home" index element={<Home />} />
            <Route path="/events" index element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path='/acc' element={<PrivateRoute element={<Account />} />} />
            <Route path='/accedit' element={<PrivateRoute element={<AccountEdit />} />} />
            <Route path='/Address' element={<PrivateRoute element={<Address />} />} />
            <Route path="/addaddress" element={<PrivateRoute element={<AddAddress />} />} />
            <Route path='editadd/:id' element={<PrivateRoute element={<AddressEdit />} />} />
            <Route path='/history' element={<PrivateRoute element={<OrderHistory />} />} />
            <Route path='/Wish' element={<PrivateRoute element={<Wishlist />} />} />
            <Route path="/quote/:id" element={<Quote />} />
            <Route path="/ProductPage" element={<ProductPage />} />
            <Route path="/OrderPage" element={<OrderPage />} />
            <Route path="/ProductDetail/:id" element={<ProductDetail />} />
            <Route path="/Cart" element={<PrivateRoute element={<Cart />} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<PrivateRoute element={<ResetPassword />} />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/otp" element={<ForgotPassOtp />} />
            <Route path="/changepass" element={<ForgotPassChange />} />
            <Route path="/emptycart" element={<Emptycart />} />



            <Route path="/addC" element={<PrivateRoute element={<AddC />} />} />
            <Route path="/allC" element={<PrivateRoute element={<AllC />} />} />
            <Route path='/editC/:id' index element={<EditC />}></Route>
            <Route path="/addSC" element={<PrivateRoute element={<AddSC />} />} />
            <Route path="/allSC" element={<PrivateRoute element={<AllSC />} />} />
            <Route path='/editSC/:id' index element={<EditSC />}></Route>
            <Route path="/addtable" element={<PrivateRoute element={<Addtable />} />} />
            <Route path="/alltable" element={<PrivateRoute element={<Alltable />} />} />
            <Route path='/edittable/:id' index element={<Edittable />}></Route>
            <Route path="/allvo" element={<PrivateRoute element={<VariationOptionCRUD />} />} />


          </Route>
        </Routes>
        </Elements>
      </BrowserRouter>
    </div>
  );
}
