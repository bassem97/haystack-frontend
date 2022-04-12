import React, {useEffect, useState} from "react";
import {LockClosedIcon} from "@heroicons/react/solid";
import axios from "axios";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import {useNavigate} from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const isVerified = window.location.href == "http://localhost:3000/login/verified";
  const navigate = useNavigate();


  useEffect(() => {
    if(isVerified){
      setMsg("Email verified !!")
    }
  });



  const Login = async (e) => {
    e.preventDefault();

      await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password,
      }).then(res => {
        if( res.data.error) setMsg(res.data.error)
        else {
          localStorage.setItem('data',JSON.stringify(res.data));
          navigate("/");


        }

      });

      // if (error.response) {
      //   setMsg(error.response.data.error);
      // }
  }
  const renderErrorMessage = function () {
    if (msg)
      return (
          <div className={`${msg=="Email verified !!"?"flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3":"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"}`} role="alert">
            <strong className="font-bold text-sm">{msg}</strong>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
          </div>
      )
    return null

  }

  const responseGoogle = async (response) => {
    console.log(response)
    const user = await axios.get('http://localhost:8080/user/email/'+response.profileObj.email);
    if(!user){
      await axios.post('http://localhost:8080/auth/register', {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        image: response.profileObj.imageUrl,
        googleId: response.profileObj.googleId,
      })
    }
    await axios.post('http://localhost:8080/auth/google/login', {email: response.profileObj.email})
        .then(res =>{
            if( res.data.error) setMsg(res.data.error)
            else{
              localStorage.setItem('data',JSON.stringify(res.data));
              navigate("/");
            }
          })
  }
  const responseFacebook = async (response) => {
    console.log(response)
    const user = await axios.get('http://localhost:8080/user/email/'+response.email);
    if(user.data){
      await axios.post('http://localhost:8080/auth/register', {
        firstName: response.name.split(' ')[0],
        lastName: response.name.split(' ')[1],
        email: response.email,
        image: response.picture.data.url,
        facebookId: response.userID,
      })
    }
    await axios.post('http://localhost:8080/auth/google/login', {email: response.email})
        .then(res =>{
          if( res.data.error) setMsg(res.data.error)
          else{
            localStorage.setItem('data',JSON.stringify(res.data));
            navigate("/");
          }
        })
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mx-4 -mt-7 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">

            <div>
              <img
                  className="mx-auto h-12 w-auto"
                  src='http://localhost:8080/files/haystack.png'
                  alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  create new account
                </a>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={Login}>
              {/*<p className="has-text-centered text-red-100">{msg}</p>*/}
              {renderErrorMessage()}


              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}

                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/password-recovery" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                  Sign in
                </button>
              </div>
              <div>
                <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="button"
                    onClick={()=>document.getElementById('facebook').click()}

                >
                  <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/img/facebook.svg").default}
                  />
                  <FacebookLogin
                      appId="1090878681476995"
                      fields="name,email,picture"
                      cssClass="my-facebook-button-class"
                      textButton="Facebook"
                      id="facebook"
                      callback={responseFacebook} />
                </button>
                    <GoogleLogin
                        clientId="912577134712-br4ui585rlm1k3ptrkpbkfhaqiaurmgh.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        buttonText="Google"
                    />
                </div>
            </form>

          </div>
        </div>

    </>
  );
}
