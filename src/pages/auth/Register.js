import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import GoogleLogin from "react-google-login";



export default function Register() {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [repassword,setRepassword] = useState("");
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const clientId = "912577134712-br4ui585rlm1k3ptrkpbkfhaqiaurmgh.apps.googleusercontent.com"

  const onSuccess = (res)=>{
    console.log("LOGIN SUCCESS !"+ res.profileObj)
  }

  const onFailure = (res)=>{
    console.log("LOGIN FAILED !"+ JSON.stringify(res))
  }



  const register = async (event)=>{
    console.log(email);
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/auth/register', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.error);
      }
    }
  }

  return(
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="px-8 py-6 mx-4 mt-1 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
            <div className="rounded-t mb-0 pt-1 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign up with
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                >
                  <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/img/facebook.svg").default}
                  />
                  Facebook
                </button>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                >

                </GoogleLogin>
                {/*<button*/}
                {/*    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"*/}
                {/*    type="button"*/}
                {/*>*/}
                {/*  <img*/}
                {/*      alt="..."*/}
                {/*      className="w-5 mr-1"*/}
                {/*      src={require("../../assets/img/google.svg").default}*/}
                {/*  />*/}
                {/*  Google*/}
                {/*</button>*/}
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="text-blueGray-400 text-center mb-3 font-bold">
              <small>Or sign up with credentials</small>
            </div>
            <form onSubmit={register}>
              <p className="has-text-centered">{msg}</p>
              <div className="mt-4">
                <div className="mt-4">
                  <label htmlFor="lastname" className="sr-only">
                    Firstname
                  </label>
                  <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      autoComplete="firstname"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Firstname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="lastname" className="sr-only">
                    Lastname
                  </label>
                  <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      autoComplete="lastname"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Lastname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                      id="confirm-password"
                      name="confirm-password"
                      type="confirm-password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm Password"
                      value={repassword}
                      onChange={(e) => setRepassword(e.target.value)}
                  />
                </div>
                <span className="text-xs text-red-400">Password must be same!</span>
                <div className="flex">
                  <button  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // type="submit"
                  >
                    Sign up
                  </button>
                </div>
                <div className="mt-6 text-grey-dark">
                  Already have an account?
                  <a className="text-blue-600 hover:underline" href="/login">
                    Log in
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>

      </>
      )


}
