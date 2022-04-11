import React, { useState } from "react"
import { publicRequest } from "../requestMethods";

import axios from "axios";

const Settings = () => {
    let [user, setUser] = useState({
        _id: localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).user._id,
        bio: "", 
        email: "", 
        firstName: "", 
        lastName: "",
        password: "",
        newPassword: ""
    })
    let [color, setColor] = useState('lightBlue')
    let [prompt, setPrompt] = useState('update profile')

    React.useEffect(() => {
        (async () => {
            const userData = (await axios.get(`http://localhost:8080/user/${user._id}`)).data.user
            setUser({...user, bio: userData.bio, email: userData.email, firstName: userData.firstName, lastName: userData.lastName})
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeHandler = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setColor('lightBlue')
        setPrompt('update profile')
    }

    const submitHandler = async e => {
        e.preventDefault();
        
        publicRequest.put(`/user/${user._id}`, user)
        .then(response => {
            if(response.status === 200){
                setColor('green')
                setPrompt('✔')
            }
            else{
                setColor('red')
                setPrompt('❌')    
            }
        })
        .catch(error => {
            console.log(error)
            setColor('red')
            setPrompt('❌')    
        })
    }

    return (
        <div className="w-full px-12 mt-12">
            <form onSubmit={submitHandler}>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                            <button
                                className={`bg-${color}-500 text-white active:bg-${color}-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
                                type="submit"
                            >
                                {prompt}
                            </button>
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Old Password
                                    </label>
                                    <input
                                        type="password"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="password"
                                        value={user.password}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="newPassword"
                                        value={user.newPassword || ''}
                                        onChange={changeHandler}
                                    />
                                </div>    
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">About Me</h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        About me
                                    </label>
                                    <textarea type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-60"
                                        name="bio"
                                        value={user.bio}
                                        onChange={changeHandler}
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Settings