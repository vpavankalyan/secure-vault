import React,{useState} from 'react';
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc,setDoc
  } from 'firebase/firestore'
import { getDatabase, ref, set } from "firebase/database";
import CryptoJS from "crypto-js/core";
import AES from "crypto-js/aes";
import SHA256 from "crypto-js/sha256";
  
const Addcard =({user,pk})=>{
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [hint,setHint]= useState('');
    const [cardname,setCardname]= useState('');
    const [cardnum,setCardnum]= useState('');
    const [cvv,setCVV]= useState('');
    const [expiry,setExpiry]=useState('');
    const [message,setMessage]=useState('');
    const [error,setError]=useState('');
    const clearInputs=()=>{
        setCardname('');
        setCardnum(''); 
        setCVV('');
        setExpiry('');
        setHint('');
      }
    const clearMsg=()=>{
        setMessage('');
        setError('');
    }
    const db = getFirestore();
    const db2 = getDatabase();
    //import { doc } from "firebase/firestore"; 
    //const alovelaceDocumentRef = doc(db, 'users/alovelace');
    // const colRef = collection(db, 'books');
    return(
        <div className="input-container">
            <h1>Add Card</h1>
                <input
                    type="text"
                    placeholder="Hint" 
                    autoFocus 
                    required 
                    value = {hint}
                    onChange={(e)=>{clearMsg(); setHint(e.target.value)}}
                />
                <input
                    type="text"
                    placeholder="card holder name" 
                    autoFocus 
                    required 
                    value = {cardname}
                    onChange={(e)=>{clearMsg(); setCardname(e.target.value)}}
                />
                <input 
                    type="number"
                    placeholder="card number" 
                    autoFocus 
                    required
                    value = {cardnum}
                    onChange={(e)=>{clearMsg(); setCardnum(e.target.value)}}
                />
                
                <input 
                    type="text"
                    placeholder="expiry(MM/YY)" 
                    autoFocus 
                    required 
                    value = {expiry}
                    onChange={(e)=>{clearMsg(); setExpiry(e.target.value)}}
                    
                />
                <input 
                    type="number"
                    placeholder="cvv" 
                    autoFocus 
                    required 
                    value = {cvv}
                    onChange={(e)=>{clearMsg(); setCVV(e.target.value)}}
                />
                <button onClick={()=>{

                    if((hint!="")&&(cardnum!="")&&(cvv!="")&&(expiry!="")&&(cardname!="")){
                        
                        set(ref(db2, 'users/' + user.uid+'/card/'+hint), {
                            hint:AES.encrypt(hint,pk).toString(),
                            cardname: AES.encrypt(cardname,pk).toString(),
                            card_number: AES.encrypt(cardnum,pk).toString(),
                            expiry: AES.encrypt(expiry,pk).toString(),
                            cvv: AES.encrypt(cvv,pk).toString(),
                        })
                        .then(() => {
                            setMessage('Card Details Added');
                              clearInputs();
                          })
                          .catch((error) => {
                            console.log("Not Working!!!");
                          });
    
                        
                        // Firestore
                        // var fd=user.uid+"/cards/"+hint+"/"+hint;
                        // const colRef = doc(db, fd);
                        // setDoc(colRef, {
                        //     cardname:cardname,
                        //     card_number: cardnum,
                        //     CVV: cvv,
                        //     expiry_date: expiry
                        // })
                        // .then(() => {
                        //         setMessage("Card Added");
                        //         clearInputs(); 
                        // })
                        // .catch((err)=>{
                        //         setError(err.code);
                        // })
                    }else{
                        setError("Fields Cannot be empty");
                      }
                      }}>Add</button>
                    <p className="Msg">{message}</p>
                    <p className="Error">{error}</p>
        
        </div>
        );
};
export default Addcard;