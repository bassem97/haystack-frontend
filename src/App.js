import React, {Suspense, useEffect} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product";
import './assets/styles/index.css';
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import {gapi} from "gapi-script";


const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));

const clientId = "912577134712-br4ui585rlm1k3ptrkpbkfhaqiaurmgh.apps.googleusercontent.com"


const App = () => {

  useEffect(()=>{
    function start() {
      gapi.client.init({
        ClientId : clientId,
        scope : ""
      })
    }
    gapi.load("client:auth2" , start)
  });

  return (
      <>

        <BrowserRouter basename="/">
          <Navbar/>
          <Suspense fallback={<p>...Loading page please wait</p>}>
            <Routes>
              <Route path="/"  element={<Home/>}/>
              <Route path="/login"  element={<Login/>}/>
              <Route path="/register"  element={<Register/>}/>
              {/*<Route path="/auth" component={Auth} />*/}

              <Route path="/shoppingCart"  element={<Cart/>}/>
              <Route path="/cart"  element={<Cart/>}/>
              <Route path="/products"  element={<ProductList/>}/>
              <Route path="/products/add"  element={<AddProduct/>}/>
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
