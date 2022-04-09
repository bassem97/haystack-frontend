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

    React.useEffect(() => {
        (async () => {
            const userData = (await axios.get(`http://localhost:8080/user/${user._id}`)).data.user
            setUser({...user, bio: userData.bio, email: userData.email, firstName: userData.firstName, lastName: userData.lastName})
        })()
    }, [])

    const changeHandler = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setColor('lightBlue')
    }

    const submitHandler = async e => {
        e.preventDefault();
        console.log(user)
        const response = await publicRequest.put(`/user/${user._id}`, user)
        
        setColor(response.status === 200 ? 'green' : 'red')
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
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
                    <div class="flex flex-wrap">
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    for="grid-password">Username
                                </label>
                                <input 
                                    type="text"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />    
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="relative w-full mb-3"><label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    for="grid-password">Email address</label>
                                    <input 
                                        type="email"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    for="grid-password"
                                >
                                    First Name
                                </label>
                                <input type="text"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    for="grid-password">Last Name
                                </label>
                                <input 
                                    type="text"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                            </div>
                        </div>
                    </div>
                    <hr class="mt-6 border-b-1 border-blueGray-300" />
                    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">About Me</h6>
                    <div class="flex flex-wrap">
                        <div class="w-full lg:w-12/12 px-4">
                            <div class="relative w-full mb-3"><label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    for="grid-password">About me</label><textarea type="text"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    rows="4">A beautiful UI Kit and Admin for React &amp; Tailwind CSS. It is Free and Open Source.</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Settings