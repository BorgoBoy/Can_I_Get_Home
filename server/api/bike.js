const { getFirestore, collection, addDoc } = require("firebase/firestore") 
const { initializeApp } = require("firebase/app")
const router = require('express').Router()

const firebaseConfig = {
    apiKey: "AIzaSyBgznEFJwSE7X-O7Hqzad693MxbmAU7jkA",
    authDomain: "can-i-get-home-6a0de.firebaseapp.com",
    projectId: "can-i-get-home-6a0de",
    storageBucket: "can-i-get-home-6a0de.appspot.com",
    messagingSenderId: "1015685962372",
    appId: "1:1015685962372:web:795fb4a52d54a4eb5980d1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

router.get('/newBike', (req, res) => {
    const { uid, name, totalKm } = req.body
    addDoc(collection(db, "motorbike"), { uid, name, totalKm })
    .then(() => {
        res.json({
            "status": true,
            "error": null
        })
    })
    .catch((error) => {
        res.json({
            "status": false,
            "error": error
        })
    })
})

module.exports = router