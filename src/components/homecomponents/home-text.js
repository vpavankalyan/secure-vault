import React,{useState,useEffect} from 'react';
import Textcard from './textcard/textcard';
import Sidebar from '../Sidebar/Sidebar'; 
import { getDatabase, ref, child, get } from "firebase/database";
import CryptoJS from "crypto-js/core";
import AES, { decrypt } from "crypto-js/aes";
import '../main-home.css';
const Hometext =({user})=>{
    const [txt,setTxt]=useState([]);
    const dbRef = ref(getDatabase());
    const [dk, setDk]  = useState('');
    const [encrypted, setEncrypted]= useState(true);
    const u=user;
    useEffect(() =>{
        get(child(dbRef, `users/${user.uid}/text`)).then((snapshot) => {
            if (snapshot.exists()){
                const txts=snapshot.val();
                const txtlist = [];
                for(let id in txts){
                    txtlist.push(txts[id]);
                }
                setTxt(txtlist);

            } else{
                console.log("No Text Data Available!");
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
    
    //hint, text
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
                {txt.map((item) => {
                    return(
                        <Textcard 
                                hint={(encrypted)?item.hint:decrpt(item.hint)}
                                text={(encrypted)?item.text:decrpt(item.text)}
                                user={u}
                         />      
                    );
                })}
            
            </div>
        </div>
        );
};
export default Hometext;