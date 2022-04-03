import React, {useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";


const NewPasswordRecovery = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const id = useLocation().pathname.split("/")[2];
    const navigate = useNavigate();

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };


    const renderErrorMessage = function () {
        if (msg)
            return (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert">
                    <strong className="font-bold text-sm">{msg}</strong>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 20 20"><title>Close</title><path
                      d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div>
            )
        return null
    }

    const searchEmail = async (e) => {
        if(password == "" || confirmPassword == ""){
            setMsg("passwords must not be empty");
        }else{
            if(password != confirmPassword){
                setMsg("passwords does not match !!")
            }else{
                try {
                    await axios.post('http://localhost:8080/user/changePassword/'+id, {
                        password: password,
                    })
                    navigate("/login");
                }catch (e){
                    setMsg(e)
                }

            }
        }


    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mx-4 -mt-7 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src='http://localhost:8080/files/haystack.png'
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot password</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please enter your new password for your account.
                    </p>
                </div>
                <div className="mt-8 space-y-6" >
                    {/*<p className="has-text-centered text-red-100">{msg}</p>*/}
                    {renderErrorMessage()}

                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="password" className="sr-only">
                                New password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={passwordShown ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="New password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />

                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={passwordShown ? "text" : "password"}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}

                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            onClick={togglePassword}
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Show passwords
                        </label>
                    </div>
                    <div>
                        <button
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={searchEmail}
                        >
                            Change password
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default NewPasswordRecovery;
