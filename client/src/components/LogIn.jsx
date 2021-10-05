import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";

function LogIn(props) {

    let history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [user] = useAuthState(props.auth)

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-800 flex flex-col w-80 border border-gray-900 rounded-lg px-10 py-5">
            <div className="text-white mt-10">
                <h1 className="font-bold text-4xl">Welcome back!</h1>
                <br />
                <p className="font-semibold">Let's log into your account</p>
            </div>
            <div className="flex flex-col space-y-8 mt-10 text-white">
                <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"/>
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"/>
                <button className="border border-blue-500 bg-blue-500 rounded-lg py-3 font-semibold" onClick={() => signInWithEmailAndPassword(props.auth, email, password).then(history.push('/'))}>Log In</button>
            </div>
            </div>
            </div>
        </div>
    )
}

export default LogIn

//TODO: Protect route (user can't access)
//TODO: Error handling