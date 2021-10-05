import React from "react";
import h2r from "/client/public/h2r.png";

function NewBike() {
    
    return (
        <div className="w-full text-gray-900 py-36 h-full"
            style={{background: `url(${h2r})`}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                <div className="lg:w-3/6 xl:w-2/5 md:w-full bg-gray-50 p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0 rounded-md">
                    <div className="reelative mb-4">
                        <h1 className="font-medium font-sans text-4xl">Add your motorbike!</h1>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-0.5 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-0.5 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="email" id="phone" name="phone" className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-0.5 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Message</label>
                        <textarea id="message" name="message" rows="4" className="resize-none w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-0.5 px-3 leading-8 transition-colors duration-150 ease-in-out"></textarea>
                    </div>
                    <button className="text-white bg-indigo-500 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default NewBike

//TODO: Remove white space at bottom