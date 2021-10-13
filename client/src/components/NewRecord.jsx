import "core-js/stable";
import "regenerator-runtime/runtime";
import r1m from "/client/public/r1m.jpg";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";

function NewRecord(props) {

    let history = useHistory()

    const db = getFirestore(props.app);
    const [bikes, setBikes] = useState([])
    const [user] = useAuthState(props.auth)

    const [selBike, setSelBike] = useState('')
    const [liters, setLiters] = useState('')
    const [totalKM, setTotalKM] = useState('')

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

    const Change = (event) => {
        setSelBike(event.target.value);
    }

    const UpdateKM = () => {
        setDoc(doc(db, user.auth.currentUser.uid, selBike), {totalKm: totalKM}, {merge:true})
        .then(() => history.push('/dashboard'))
    }

    return (
        <div>
            {user && 
                <div className="content px-8 py-2 bg-contain bg-no-repeat h-screen" style={{background: `url(${r1m})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                    <div className="body mt-20 mx-8">
                        <div className="md:flex items-center justify-between">
                            <div className="w-full md:w-1/2 mr-auto">
                                <h1 className="text-7xl font-bold text-white tracking-wide">Add a new record</h1>
                                <br />
                                <h2 className="text-white text-xl">Select your motorbike from the menu and insert<br /> how much gas you put in and the total KM</h2>
                            </div>
                            <div className="w-full md:max-w-md mt-6">
                                <div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
                                    <div>
                                        <div className="flex items-center justify-center">
                                            <h2 className="text-2xl font-semibold tracking-wide pb-4">
                                                Add a new record:
                                            </h2> 
                                        </div>
                                        <label htmlFor="bike">Select your bike:</label>
                                        <select onChange={(e) => Change(e)} name="bikes" id="bikes" className="rounded px-4 w-full py-1 bg-gray-100  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none">
                                            <option value="" disabled selected>-- Select your Bike --</option>
                                            {bikes.map(item => {
                                                return <option key={item.id} value={item.id}>{item.data().name}</option>
                                            })}
                                        </select>
                                        <label htmlFor="liters">Enter how mych gas you put:</label>
                                        <input onChange={e => setLiters(e.target.value)} id="liters" type="text" className="rounded px-4 w-full py-1 bg-gray-100  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Password" />
                                        <label htmlFor="totalKm">Enter the total KM:</label>
                                        <input onChange={e => setTotalKM(e.target.value)} id="totalKm" type="number" className="rounded px-4 w-full py-1 bg-gray-100  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Password" />
                                        <div className="text-center pt-2">
                                            <button onClick={() => setDoc(doc(db, user.auth.currentUser.uid, selBike, "records", Date.now().toString()), { bikeData: bikes.find(x => x.id === selBike).data(), liters, totalKm: totalKM }).then(() => UpdateKM())} className="bg-gray-800 text-gray-200 px-2 py-1 rounded">Add</button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default NewRecord

//TODO: redirect to bike page
//TODO: try to change it
//TODO: if no bikes redirect to newBike
//TODO: error handle
//TODO: check if selbike = '', liters = '' and totalKM = ''
//TODO: history push not refreshing nav