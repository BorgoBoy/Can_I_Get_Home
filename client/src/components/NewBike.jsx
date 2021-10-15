import React, { useState } from "react";
import h2r from "/client/public/h2r.jpg";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function NewBike(props) {
    
    const db = getFirestore(props.app);
    
    let history = useHistory()

    const [user] = useAuthState(props.auth)

    const [name, setName] = useState('')
    const [totalKm, setTotalKm] = useState(0)

    return (
        <div>
            {user &&
            <div className="w-full text-gray-900 py-36 h-screen"
                style={{background: `url(${h2r})`}}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                    <div className="lg:w-3/6 xl:w-2/5 md:w-full bg-gray-50 p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0 rounded-md">
                        <div className="reelative mb-4">
                            <h1 className="font-medium font-sans text-4xl">Add your motorbike!</h1>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input onChange={e => setName(e.target.value)} type="text" id="name" name="name" className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-0.5 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="totalKm" className="leading-7 text-sm text-gray-600">Total Km</label>
                            <input onChange={e => setTotalKm(e.target.value)} type="number" id="totalKm" name="totalKm" className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-0.5 px-3 leading-8 transition-colors duration-150 ease-in-out"/>
                        </div>
                        <button onClick={() => addDoc(collection(db, user.auth.currentUser.uid), { uid:user.auth.currentUser.uid, name, totalKm, totalRecords: 0, totalLiters: 0 }).then(() => history.push('/dashboard'))} className="text-white bg-indigo-500 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg">Submit</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default NewBike

//TODO: Make it full screen (no scroll)
//TODO: Disable button while loading
//TODO: Error handler
//TODO: Add image