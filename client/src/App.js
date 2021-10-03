import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import "../public/tailwind.css"

import Navbar from "./components/Navbar"
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import Dashboard from "./components/Dashboard"
import Settings from "./components/Settings";

const firebaseConfig = {
    apiKey: "AIzaSyBgznEFJwSE7X-O7Hqzad693MxbmAU7jkA",
    authDomain: "can-i-get-home-6a0de.firebaseapp.com",
    projectId: "can-i-get-home-6a0de",
    storageBucket: "can-i-get-home-6a0de.appspot.com",
    messagingSenderId: "1015685962372",
    appId: "1:1015685962372:web:795fb4a52d54a4eb5980d1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth()

const App = () => ( 
    <div>
        <Navbar />
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <LogIn auth={auth}/>
                </Route>
                <Route path="/signup">
                    <SignUp auth={auth}/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
);

export default App;