import {React,useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "./Sidebar.css";
import { getDatabase, ref, child, get } from "firebase/database";
import CryptoJS from "crypto-js/core";
import AES, { decrypt } from "crypto-js/aes";
import SHA256 from "crypto-js/sha256";
import { serverTimestamp } from "@firebase/firestore";


const Sidebar=({dk,setDk,encrypted,setEncrypted,pk,user})=>{
    
    const [er,setEr]=useState('');
    const db = ref(getDatabase());
    const clrer=()=>{
        setEr('');
    }
    
    const MenuItems=[
        {
            title:"Passwords",
            cName:"sidelinks",
            content:"/home/password"
        },
        {
            title:"Cards",
            cName:"sidelinks",
            content:"/home/cards"
        },
        {
            title:"Personal Text",
            cName:"sidelinks",
            content:"/home/text"
        },
    ]
        return(
            <div className="sidebar">
                <h1 >Dashboard</h1>
                <ul>
                    {MenuItems.map((item,index) => {
                        return(
                            <li key={index}>
                                <Link to ={item.content} className={item.cName}>
                                    {item.title}
                                </Link>
                            </li>
                        );
                     })}
                </ul>
                <div className="decrypt-container">
                        <h1>Enter password to decrypt</h1>
                            <input 
                                type="password"
                                placeholder="account password" 
                                autoFocus 
                                required 
                                value={dk}
                                onChange={ (e)=>{clrer(); setDk(e.target.value);}}
                            />
                        <button onClick= {()=>{
                            
                            get(child(db, `users/${user.uid}/hash_key`)).then((snapshot) => {
                                if (snapshot.exists()) {
                                    const ck=snapshot.val();
                                    console.log(dk);
                                    console.log(ck);
                                    if(SHA256(dk).toString()+user.uid == ck){
                                        setEncrypted(false);  
                                        clrer();  
                                    }
                                    else{
                                       setEr("Wrong Password");
                                    }
                                }});
                            }}      
                        >Decrypt</button>
                        <p className="errorMsg">{er}</p>
                            
                        </div>
                
            </div>
            );

    

};
export default Sidebar;
/*

*/