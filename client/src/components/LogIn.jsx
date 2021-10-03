import React from "react"

export default class LogIn extends React.Component {
    render() {
        return (
            <div class="flex items-center justify-center h-screen">
            <div class="bg-gray-800 flex flex-col w-80 border border-gray-900 rounded-lg px-10 py-5">
            <div class="text-white mt-10">
                <h1 class="font-bold text-4xl">Welcome back!</h1>
                <br />
                <p class="font-semibold">Let's log into your account</p>
            </div>
            <form class="flex flex-col space-y-8 mt-10">
            <input type="text" placeholder="Email" class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"/>
                <input type="password" placeholder="Password" class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"/>
                <button class="border border-blue-500 bg-blue-500 text-white rounded-lg py-3 font-semibold">Log In</button>
            </form>
            </div>
            </div>
        )
    }
}
