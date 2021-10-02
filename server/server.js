const { initializeApp } = require('firebase/app')
const express = require('express')
require('dotenv').config()

const firebaseConfig = {
    apiKey: "AIzaSyBgznEFJwSE7X-O7Hqzad693MxbmAU7jkA",
    authDomain: "can-i-get-home-6a0de.firebaseapp.com",
    projectId: "can-i-get-home-6a0de",
    storageBucket: "can-i-get-home-6a0de.appspot.com",
    messagingSenderId: "1015685962372",
    appId: "1:1015685962372:web:795fb4a52d54a4eb5980d1"
}
initializeApp(firebaseConfig)

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))