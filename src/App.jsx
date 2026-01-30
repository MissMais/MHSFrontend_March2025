import React from 'react';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Routes/Layout';
import About from './Components/About';
import PrivateRoute from './Routes/PrivateRoute';


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
import ForgotPassword from './Components/Forgotpass';
import ForgotPassOtp from './Components/ForgotPassOtp';
import ForgotPassChange from './Components/ForgotPassChange';
import AccountEdit from './Components/AccountEdit';
// import Quote from './Components/Quote';
import Wishlist from './Components/Wishlist';
import Notification from './Components/Notification';
// import EmptyCart from './Components/Emptycart';
import { Toaster } from "react-hot-toast";


import ScrollToTop from './Components/ScrollToTop';

export const url ="https://api.modest.co.in/"
// export const url = "https://mohammadsaklen.pythonanywhere.com/"

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


// initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51S6QsRH2tmS5tW8J9U1kngvfEcnzixF1Xc1GhdZLeL7SzLN4ZAlbQgvnnITLqcZMYbA4VCzryAsg7HozPSi1ITeU00pRf2xhYe");



export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Elements stripe={stripePromise}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/home" index element={<Home />} />
            <Route path="/events" index element={<Events />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/login" element={<Login />} />
            <Route path='/acc' element={<PrivateRoute element={<Account />} />} />
            <Route path='/accedit/:id' element={<PrivateRoute element={<AccountEdit />} />} />
            <Route path='/Address' element={<PrivateRoute element={<Address />} />} />
            <Route path="/addaddress" element={<PrivateRoute element={<AddAddress />} />} />
            <Route path='editadd/:id' element={<PrivateRoute element={<AddressEdit />} />} />
            <Route path='/history' element={<PrivateRoute element={<OrderHistory />} />} />
            <Route path='/Wish' element={<PrivateRoute element={<Wishlist />} />} />
            {/* <Route path="/quote/:id"  element={<PrivateRoute element={<Quote />} />} /> */}
            <Route path="/ProductPage" element={<ProductPage />} />
            <Route path="/OrderPage"  element={<PrivateRoute element={<OrderPage />} />} />
            <Route path="/ProductDetail" element={<ProductDetail />} />
            <Route path="/Cart" element={<PrivateRoute element={<Cart />} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<PrivateRoute element={<ResetPassword />} />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/otp" element={<ForgotPassOtp />} />
            <Route path="/changepass" element={<ForgotPassChange />} />
            {/* <Route path="/emptycart"  element={<PrivateRoute element={<EmptyCart />} />} /> */}
            <Route path="/notification"  element={<PrivateRoute element={<Notification />} />} />



           

          </Route>
        </Routes>
         <Toaster position="bottom-center" reverseOrder={false} />
        </Elements>
      </BrowserRouter>
    </div>
  );
}
