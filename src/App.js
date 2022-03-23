import React, { Suspense } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar1 from "./components/Navbar1";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import './assets/styles/index.css';
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import { useSelector } from "react-redux";


const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));



const App = () => {

  return (
      <>
        <BrowserRouter basename="/">
          <Navbar/>
          <Suspense fallback={<p>...Loading page please wait</p>}>
            <Routes>
              <Route path="/"  element={<Home/>}/>
              <Route path="/login"  element={<Login/>}/>
              <Route path="/register"  element={<Register/>}/>
              <Route path="/cart"  element={<Cart/>}/>
              <Route path="/products"  element={<ProductList/>}/>
              <Route path="/product/:id"  element={<Product/>}/>
              <Route path="/success" element={<Success/>}/>
              <Route path="/profile"  element={<Profile/>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </>
  )
};

export default App;
