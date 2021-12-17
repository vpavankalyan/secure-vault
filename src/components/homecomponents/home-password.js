import React,{useState,useEffect} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { getDatabase, ref, child, get } from "firebase/database";
import Passwordcard from './passwordcard/passwordcard';
import '../main-home.css';
import CryptoJS from "crypto-js/core";
import AES, { decrypt } from "crypto-js/aes";
import SHA256 from "crypto-js/sha256";

const Homepassword =({user})=>{
    const [pwd,setPwd]=useState([]);
    const dbRef = ref(getDatabase());
    const [dk, setDk]  = useState('');
    const [encrypted, setEncrypted]= useState(true);
    const u=user;
    useEffect(() => {
        get(child(dbRef, `users/${user.uid}/password`)).then((snapshot) => {
            if (snapshot.exists()) {
                const pwds=snapshot.val();
                const pwdlist = [];
                for(let id in pwds){
                    pwdlist.push(pwds[id]);
                }
                setPwd(pwdlist);
            
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
                console.error(error);
            }); 
    });

    const decrpt = (text) => {
        try{
        const a=AES.decrypt(text,dk).toString(CryptoJS.enc.Utf8);
        return a;
        }catch(error){
            console.error("Wrong Password");
        }
    }


        
            return(
                <div className="main-home">
                    <div>
                        <Sidebar 
                        dk={dk}
                        setDk={setDk}
                        encrypted={encrypted}
                        setEncrypted={setEncrypted}
                        user={u}
                    />
                        
                    </div>
                    <div className="wrapper">
                        {pwd.map((item) => {
                                return(
                                <Passwordcard 
                                title={(encrypted)?item.hint:decrpt(item.hint)}
                                username={(encrypted)?item.username:decrpt(item.username)}  
                                password={(encrypted)?item.password:decrpt(item.password)}
                                user={u}  />
                                );
                            })}
                    </div>
                </div>
                ); 
};
export default Homepassword;