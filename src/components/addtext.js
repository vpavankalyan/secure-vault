import React,{useState} from 'react';
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, setDoc
  } from 'firebase/firestore'
import { getDatabase, ref, set } from "firebase/database";
import CryptoJS from "crypto-js/core";
import AES from "crypto-js/aes";
import SHA256 from "crypto-js/sha256";

const Addtext =({user,pk})=>{
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [hint,setHint]= useState('');
    const [text,setText]= useState('');
    const [message,setMessage]=useState('');
    const [error,setError]=useState('');
    const db2 = getDatabase();
    const db = getFirestore();
    const clearInputs=()=>{
        setHint('');
        setText(''); 
      }
      const clearMsg=()=>{
        setMessage('');
        setError('');
      }
    return(
        <div className="input-container">
            <h1>Add Text</h1>
                <input 
                    type="text"
                    placeholder="hint" 
                    autoFocus 
                    required
                    value={hint}
                    onChange={(e)=>{clearMsg(); setHint(e.target.value)} }
            
                />
                <input
                    type="text"
                    placeholder="text/data" 
                    autoFocus 
                    required 
                    value={text}
                    onChange={(e)=>{clearMsg(); setText(e.target.value)}}
                    
                />
                <button onClick={()=>{
                    const db2 = getDatabase();
                    if((hint!="")&&(text!="")){    
                        set(ref(db2, 'users/' + user.uid+'/text/'+hint), {
                            hint: AES.encrypt(hint,pk).toString(),
                            text: AES.encrypt(text,pk).toString(),
                        })
                        .then(() => { 
                            setMessage('Text Added');
                            clearInputs();
                        })
                        .catch((error) => {
                            setError(error.code);
                        });
                    }
                    else{
                            setError("Fields Cannot be empty");
                    }

                    //Firestore
                    // var fd=user.uid+"/texts/"+hint+"/"+hint;
                    // const colRef = doc(db, fd);
                    // if((hint!="")&&(text!="")){
                    // setDoc(colRef,{
                    //     text: text,
                    //   })
                    //   .then(() => {
                    //       setMessage('Text Added');
                    //       clearInputs();
                    //   })
                    //   .catch((err)=>{
                    //       setError(err.code);
                    //   })}else{
                    //       setError("Fields Cannot be empty");
                    //   }
                }}>Add</button>
                <p className="Msg">{message}</p>
                <p className="Error">{error}</p>
        
        </div>
        );
};
export default Addtext;