import "core-js/stable";
import "regenerator-runtime/runtime";
import r1m from "/client/public/r1m.jpg";
import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function NewRecord(props) {

    const db = getFirestore(props.app);
    const [bikes, setBikes] = useState([])
    const [user] = useAuthState(props.auth)

    useEffect(() => {
        if (user) {
            async function getBikes() {
                const ref = collection(db, "motorbike")
                const q = query(ref, where('uid', '==', user.auth.currentUser.uid))
                await getDocs(q).then((docs) => {
                    docs.forEach((doc) => {
                        setBikes(old => [...old, doc])
                    })
                })
            }
            
            getBikes()
        }
    }, [user])

    return (
        <div>
            {user && 
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-contain relative items-center"
                style={{background: `url(${r1m})`}}>
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    <div className="mt-2 items-center z-10">
                        <form className="p-14 bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden p-6 space-y-10">
                            <h2 className="text-4xl font-bold text-center text-indigo-600">Login</h2>
                            <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                                <input type="email" name="email" placeholder=" "
                                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                                <label htmlFor="email"
                                    className="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0">Email</label>
                            </div>
                            <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                                <input type="password" name="password" placeholder=" "
                                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                                <label htmlFor="password"
                                    className="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0">Password</label>
                            </div>
                            <div className="block mt-2">
                                <label htmlFor="" className="flex items-center">
                                    <input type="checkbox"
                                        className="ml-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    </input>
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                            </div>
                            <div className="flex items-center flex items-center justify-end mt-4">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                    Forgot Password?
                                </a>
                                <button
                                    className="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-indigo-700 rounded-full text-white bg-indigo-600 ">
                        Log in
                    </button>
                    </div>
                </form>
                </div>
                </div>
            }
        </div>
    )
}

export default NewRecord

//TODO: try to change it