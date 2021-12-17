import React, { useState } from "react";
import Navbar from './components/Navbar/Navbar';
import Addpassword from "./components/addpassword";
import Mainhome from "./components/mainhome";
import Addcard from "./components/addcard";
import Addtext from "./components/addtext";
import Homepassword from "./components/homecomponents/home-password";
import Homecards from "./components/homecomponents/home-cards";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"; 
import Hometext from "./components/homecomponents/home-text";
const Home=({handleLogout,user,pk})=>{
    const [content,setContent]=useState('home');
    return (
        <section className="home">
            <Router>
            <Navbar
            handleLogout={handleLogout}/>
            <Routes>
                <Route path="/home" element={<Mainhome/>}/>
                <Route path="/password" element={<Addpassword user={user} pk={pk}/>}/>
                <Route path="/card" element={<Addcard user={user} pk={pk}/>}/>
                <Route path="/text" element={<Addtext user={user} pk={pk}/>}/>
                <Route path="/home/password" element={<Homepassword user={user} pk={pk}/>}/>
                <Route path="/home/cards" element={<Homecards user={user} pk={pk}/>}/>
                <Route path="/home/text" element={<Hometext user={user} pk={pk} />}/>
            </Routes>    
            </Router>
        </section>
        );
};
export default Home;