import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function BikePage(props) {

    const { id } = useParams()

    const db = getFirestore(props.app);
    const [bike, setBike] = useState()
    const [user] = useAuthState(props.auth)

    useEffect(() => {
        if (user) {
            async function getBike() {
                const ref = doc(db, user.auth.currentUser.uid, id)
                await getDoc(ref).then((doc) => {
                        setBike(doc.data())
                })
            }
            
            getBike()
        }
    }, [user])

    return (
        <div>
            {user && 
                <h1>{bike}</h1>
            }
        </div>
    )
}

export default BikePage