import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import "../public/tailwind.css"

import Navbar from "./components/Navbar"
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import Dashboard from "./components/Dashboard"

const App = () => ( 
    <div>
        <Navbar />
        <BrowserRouter>
            <Switch>
            <Route path="/login">
                <LogIn />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            </Switch>
        </BrowserRouter>
    </div>
);

export default App;