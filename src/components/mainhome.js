import React,{useState} from 'react';
import Sidebar from './Sidebar/Sidebar';
import {BrowserRouter as  Routes, Route} from "react-router-dom"; 
import './main-home.css';

const Mainhome =({user})=>{
    return(
        <div className="main-home">
                <div>
                <Sidebar/>
                </div>
                <div className="welcome">
                        <h1>Welcome to Secure Vault</h1>
                </div>
                
        </div>
        );
};
export default Mainhome;