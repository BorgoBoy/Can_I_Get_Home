import React, { Component } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"

function register(auth, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

export default class SignUp extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
            <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-800 flex flex-col w-80 border border-gray-900 rounded-lg px-10 py-5">
            <div className="text-white mt-10">
                <h1 className="font-bold text-4xl">Welcome!</h1>
                <br />
                <p className="font-semibold">Let's create your account</p>
            </div>
            <form className="flex flex-col space-y-8 mt-10">
                <input type="text" placeholder="Email" className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"/>
                <input type="password" placeholder="Password" className="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"/>
                <button className="border border-blue-500 bg-blue-500 text-white rounded-lg py-3 font-semibold" onClick={() => register(this.props.auth, 'a@gmail.com', '123456789')}>Register</button>
            </form>
            </div>
            </div>
            </div>
        )
    }
}
