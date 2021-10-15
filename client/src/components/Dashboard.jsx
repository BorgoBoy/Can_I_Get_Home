import "core-js/stable";
import "regenerator-runtime/runtime";
import Add from './AddButton'
import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import bike from '/client/public/bike.png'

function Dashboard(props) {

    const db = getFirestore(props.app);
    const [bikes, setBikes] = useState([])
    const [user] = useAuthState(props.auth)

    useEffect(() => {
        if (user) {
            async function getBikes() {
                const ref = collection(db, user.auth.currentUser.uid)
                //const q = query(ref, where('uid', '==', user.auth.currentUser.uid))
                await getDocs(ref).then((docs) => {
                    docs.forEach((doc) => {
                        setBikes(old => [...old, doc])
                    })
                })
            }
            
            getBikes()
        }
    }, [user])

    return (
        <div className="min-h-screen bg-gray-100 pt-6">
            <Add to="/newbike"/>
            <div style={{gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"}} className="grid gap-8 justify-items-center">
                {user && bikes.map(element => (
                    <a href={"/bike/" + element.id} key={element.id}>
                    <div className="w-80 rounded-md cursor-pointer shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 duration-500">
                        <img src={bike} alt=""/>
                        <div className="p-4 bg-white">
                        <span className="text-sm font-semibold text-red-50 bg-red-400 py-1 px-3 rounded-full">{element.data().totalKm} Km</span>
                        <h1 className="mt-4 font-bold text-2xl">{element.data().name}</h1>
                        </div>
                    </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Dashboard

//TODO: Protected route
//TODO: Maybe refactor