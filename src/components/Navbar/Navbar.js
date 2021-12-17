import React from "react";
import {Link} from 'react-router-dom';
import "./Navbar.css";
const Navbar=({handleLogout,content,setContent})=>{
    const MenuItems=[
        {
            title:"Home",
            cName:"navlinks",
            content:"/home"
        },
        {
            title:"Add password",
            cName:"navlinks",
            content:"/password"
        },
        {
            title:"Add card",
            cName:"navlinks",
            content:"/card"
        },
        {
            title:"Add personal text",
            cName:"navlinks",
            content:"/text"
        },
    ]
        return(
            <nav className="nav" >
                <h1>Secure Vault</h1> 
                <ul>
                    {MenuItems.map((item,index) => {
                        return(
                        <li key={index}>
                            <Link to ={item.content} activestyle className={item.cName}>
                                {item.title}
                            </Link>
                        </li>
                        );
                    })}
                </ul>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            );

    

};
export default Navbar;