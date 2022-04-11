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
import Verification from "./pages/Verification";
import PasswordRecovery from "./pages/auth/PasswordRecovery";
import NewPasswordRecovery from "./pages/auth/NewPasswordRecovery";
import Admin from "./layouts/Admin.js";
import Dashboard from "./pages/admin/Dashboard";
import Maps from "./pages/admin/Maps";
import Settings from "./pages/admin/Settings";
import Tables from "./pages/admin/Tables";
import ProfileSettings from './pages/Settings'
//import SupportEngine from "./components/SupportEngine";

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
              <Route path="/login/verified"  element={<Login/>}/>
              <Route path="/register"  element={<Register/>}/>
              {/*<Route path="/auth" component={Auth} />*/}

              <Route path="/admin" element={<Admin/>} />
              <Route path="/admin/dashboard"  element={<Dashboard/>} />
              <Route path="/admin/maps"  element={<Maps/>} />
              <Route path="/admin/settings"  element={<Settings/>} />
              <Route path="/admin/tables"  element={<Tables/>} />


              <Route path="/shoppingCart"  element={<Cart/>}/>
              <Route path="/cart"  element={<Cart/>}/>
              <Route path="/products"  element={<ProductList/>}/>
              <Route exact path="/products/add"  element={<AddProduct/>}/>
              <Route path="/product/:id"  element={<Product/>}/>
              <Route path="/success" element={<Success/>}/>
              <Route path="/profile"  element={<Profile/>}/>
              <Route path="/profile/:userId"  element={<Profile/>}/>
              <Route path="/verification"  element={<Verification/>}/>
              <Route path="/password-recovery"  element={<PasswordRecovery/>}/>
              <Route path="/password-recovery/:id"  element={<NewPasswordRecovery/>}/>
              <Route path="/settings"  element={<ProfileSettings/>}/>
            </Routes>
          </Suspense>
          {/*<SupportEngine/>*/}
        </BrowserRouter>
      </>
  )
};

export default App;
