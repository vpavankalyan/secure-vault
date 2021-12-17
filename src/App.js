import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';
import fire from './fire'
import Login from './login'
import Home from './Home'
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword } from "firebase/auth";
import CryptoJS from "crypto-js/core";
import AES from "crypto-js/aes";
import SHA256 from "crypto-js/sha256";


function App() {
  const [user, setUser]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [cpassword, setcPassword]= useState('');
  const [emailError, setEmailError]= useState('');
  const [passwordError, setPasswordError]= useState('');
  const [hasAccount, setHasAccount]= useState(true);
  const [pk,setPk]= useState('');

  const clearInputs=()=>{
    setEmail('');
    setcPassword('');
    setPassword('');
  }
  const clearErrors=()=>{
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = ()=>{
    
    clearErrors();
    const auth = getAuth()
    
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => { 
        const user = userCredential.user;
     

        setPk(password);
        clearInputs();
        setUser(user); 
        
      })
      .catch((err)=>{ 
        switch (err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            
            break;  
        }

      }); 
  };

  const handleSignup  = ()=>{
    clearErrors();
    
    const auth = getAuth()
    if(password==cpassword){
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => { 
        const db2 = getDatabase();
        console.log(password);
        setPk(password);
        clearInputs();
        const user = userCredential.user;
        set(ref(db2, 'users/' + user.uid), {
          hash_key:SHA256(password).toString(CryptoJS.enc.Hex)+user.uid
        });
        setUser(user);

      })
      .catch((err)=>{ 
        switch (err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;  
        }

      });
    }else {
      setPasswordError("Passwords don't match");
    }
  };
  const handleLogout=()=>{
    const auth = getAuth()
    signOut(auth)
    setUser('');
  };
  
  return (
    <div className="App">
      {user?(
      <Home
      handleLogout={handleLogout}
      user={user}
      pk={pk}
      />
      ):(
      
      <Login
      clearErrors={clearErrors}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      cpassword={cpassword}
      setcPassword={setcPassword}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      />
      )}
      
      
  
    </div>
  );
}; 

export default App;