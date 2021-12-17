import React,{useState} from 'react';
import showPwdImg from './showp.svg';
import hidePwdImg from './hidep.svg';
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc,
} from 'firebase/firestore'
import CryptoJS from "crypto-js/core";
import AES from "crypto-js/aes";
import SHA256 from "crypto-js/sha256";
import { getDatabase, ref, set } from "firebase/database";
  
const  Addpassword = ({user,pk}) =>{

    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [hint,setHint]= useState('');
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [message,setMessage]=useState('');
    const [error,setError]=useState('');
    const db = getFirestore();
    const clearInputs=()=>{
        setHint('');
        setPassword(''); 
        setUsername('');
      }
      const clearMsg=()=>{
        setMessage('');
        setError('');
      }
    function writeUserData(userid, username, password, hint) {
        
    }   
    console.log(pk);
    console.log(user);

    return(
        
    
        <div className="input-container">
        <h1>Add Password</h1>
                <input 
                    type="text"
                    placeholder="Service/Hint" 
                    autoFocus 
                    required 
                    value={hint}
                    onChange={(e)=>{clearMsg(); setHint(e.target.value)}}
                />
                <input 
                    type="text"
                    placeholder="Username" 
                    autoFocus 
                    required 
                    value={username}
                    onChange={(e)=>{clearMsg(); setUsername(e.target.value)}}
                    
                />
                <div className="pwd-container">
                <input 
                    type={isRevealPwd ? "text" : "password"}
                    placeholder="password"
                    autoFocus 
                    required 
                    value={password}
                    onChange={(e)=>{clearMsg(); setPassword(e.target.value)}}
                />
                <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwd(prevState => !prevState)}/>
                </div>
                <button
                onClick={()=>{
                    const db2 = getDatabase();
                    if((hint!="")&&(username!="")&&(password!="")){
                    set(ref(db2, 'users/' + user.uid+'/password/'+hint), {
                        hint: AES.encrypt(hint,pk).toString(),
                        username: AES.encrypt(username,pk).toString(),
                        password: AES.encrypt(password,pk).toString(),
                    })
                    .then(() => {
                        setMessage('Password Added');
                          clearInputs();
                      })
                      .catch((error) => {
                        setError(error.code);
                      });}else{
                        setError("Fields Cannot be empty");
                    }
                    /*/FireStore
                    var fd=user.uid+"/password/"+hint+"/"+hint;
                    const colRef = doc(db, fd);
                    if((hint!="")&&(username!="")&&(password!="")){
                    setDoc(colRef,{
                        username: username,
                        password: password,
                      })
                      .then(() => {
                          setMessage('Password Added');
                          clearInputs();
                      })
                      .catch((err)=>{
                          setError(err.code);
                      })}else{
                          setError("Fields Cannot be empty");
                      }*/

                      }}>Add</button>
                <p className="Msg">{message}</p>
                <p className="Error">{error}</p>
        </div>
    )
}
export default Addpassword;