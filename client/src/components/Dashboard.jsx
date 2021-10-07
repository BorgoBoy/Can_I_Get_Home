import React from 'react'
import Add from './AddButton'
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, query, where } from "firebase/firestore";

import bike from '/client/public/bike.png'

function Dashboard(props) {

    const db = getFirestore(props.app);
    
    const [user] = useAuthState(props.auth)

    const bikes = query(collection(db, "motorbike"), where('uid', '==', user.auth.currentUser.uid))

    return (
        <div className="min-h-screen bg-gray-100 pt-6">
            <Add to="/newbike"/>
            <div style={{gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"}} className="grid gap-8 justify-items-center">
                {bikes.map(element => (

                <div className="w-80 rounded-md cursor-pointer shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 duration-500">
                    <img src={bike} alt=""/>
                    <div className="p-4 bg-white">
                    <spna className="text-sm font-semibold text-red-50 bg-red-400 py-1 px-3 rounded-full">{element.data.name} Km</spna>
                    <h1 className="mt-4 font-bold text-2xl">Planta Minimalista</h1>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard

//TODO: Protected route