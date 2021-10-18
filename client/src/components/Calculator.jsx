import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Calculator(props) {

    const db = getFirestore(props.app);
    const [bikes, setBikes] = useState([])
    const [selBike, setSelBike] = useState()
    const [user] = useAuthState(props.auth)

    const [currentKm, setCurrentKm] = useState()

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

    const Calculate = () => {
        const avg = bikes.find(x => x.id === selBike).data().totalKm / bikes.find(x => x.id === selBike).data().totalLiters
        console.log(avg)
    }

    return(
        <div>
            {user &&
            <div className="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-8 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                                <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-bold tracking-tight">
                                    Select your bike:
                                </h1>
                                <form className="p-6 flex flex-col justify-center">
                                    <div className="flex flex-col">
                                        <select onChange={(e) => Change(e)} defaultValue="DEFAULT" name="bikes" id="bikes" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 focus:border-indigo-500 focus:outline-none">
                                            <option value="DEFAULT" disabled>-- Select your Bike --</option>
                                            {bikes.map(item => {
                                                return <option key={item.id} value={item.id}>{item.data().name}</option>
                                            })}
                                        </select>
                                   </div>
                                    <div className="flex flex-col mt-2">
                                        <label htmlFor="currentKm" className="hidden">Current Km</label>
                                        <input onChange={e => {setCurrentKm(e.target.value); Calculate()}} type="number" name="currentKm" id="currentKm" placeholder="Current Km" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 focus:border-indigo-500 focus:outline-none" />
                                    </div>
                                    {/* <div className="flex flex-col mt-2">
                                        <label htmlFor="tel" className="hidden">Number</label>
                                        <input type="tel" name="tel" id="tel" placeholder="Telephone Number" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 focus:border-indigo-500 focus:outline-none" />
                                    </div> */}
                                    {/* <button onClick={() => Calculate()} type="submit" className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">
                                        Submit
                                    </button> */}
                                </form>
                            </div>
                            <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                                {/* <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                                    Get in touch
                                </h1> */}
                                <div className="flex justify-center mt-2 text-gray-600 dark:text-gray-400">
                                    <p className="text-normal text-center text-lg sm:text-xl font-small text-gray-600 dark:text-gray-400 mt-2">
                                        You have {} Km left
                                    </p>
                                </div>
                                {/* <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    +44 1234567890
                                    </div>
                                </div>
                                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    info@acme.org
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Calculator

//TODO: refactor bc this code is shit