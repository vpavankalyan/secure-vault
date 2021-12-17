import React,{useState,useEffect} from 'react';
import Cardcard from './cardcard/cardcard';
import Sidebar from '../Sidebar/Sidebar'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";
import CryptoJS from "crypto-js/core";
import AES, { decrypt } from "crypto-js/aes";
import '../main-home.css';


const Homecards =({user,pk})=>{
    const [crd,setCrd]=useState([]);
    const dbRef = ref(getDatabase());
    const [dk, setDk]  = useState('');
    const [encrypted, setEncrypted]= useState(true);
    const [er,setEr]=useState('');
    const u=user;
    
    useEffect(() => {
        get(child(dbRef, `users/${user.uid}/card`)).then((snapshot) => {
            if (snapshot.exists()) {
                const crds=snapshot.val();
                const crdlist = [];
                for(let id in crds){
                    crdlist.push(crds[id]);
                }
                setCrd(crdlist);
            } else {
                console.log("No CARDS data available!");
            }
            }).catch((error) => {
                console.error(error);
            }); 
    })

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
                pk={pk}
                user={u}
                />
                
            </div>
            <div className="wrapper">
                {crd.map((item) => {
                     return(
                        <Cardcard 
                        title={(encrypted)?item.hint:decrpt(item.hint)}
                        cardname={(encrypted)?item.cardname:decrpt(item.cardname)}  
                        cardnum={(encrypted)?item.card_number:decrpt(item.card_number)}
                        cvv={(encrypted)?item.cvv:decrpt(item.cvv)}
                        expiry={(encrypted)?item.expiry:decrpt(item.expiry)}
                        user={u}
                        
                     />
                        );
                    })}
            </div>
        </div>
        ); 
};
export default Homecards;