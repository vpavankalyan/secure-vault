import React,{useState} from 'react';
import showPwdImg from './components/showp.svg';
import hidePwdImg from './components/hidep.svg';
const  Login = (props) =>{
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    
    const {clearErrors,email,setEmail,password, setPassword,cpassword,setcPassword,handleLogin,handleSignup,hasAccount,setHasAccount,emailError,passwordError}= props;

    return(
        <section className="login">
            
            <div className="loginContainer">
                <h1>Secure Vault</h1>
                <input 
                    type="text"
                    placeholder="email" 
                    autoFocus 
                    required 
                    value={email}
                    onChange={(e)=>{clearErrors(); setEmail(e.target.value)}}
                />
                <p className="errorMsg">{emailError}</p>
                <div className="pwd-container">
                <input 
                    type={isRevealPwd ? "text" : "password"}
                    placeholder="password"
                    autoFocus 
                    required 
                    value={password}
                    onChange={(e)=>{clearErrors(); setPassword(e.target.value);}}
                />
                <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwd(prevState => !prevState)}/>
                </div>
                <div className="pwd-containerh" id='cpass'>
                <input 
                    type={isRevealPwd ? "text" : "password"}
                    placeholder="confirm password"
                    autoFocus 
                    required 
                    value={cpassword}
                    onChange={(e)=>{clearErrors(); setcPassword(e.target.value);}}
                />
                <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwd(prevState => !prevState)}/>
                </div>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount?(
                        <>
                            <button onClick={handleLogin}>Sign in</button>
                            <p>Don't have an account? <span onClick={()=> {setHasAccount(!hasAccount)
                            document.getElementById("cpass").style.visibility= "visible" ;}}>Sign up</span></p>
                        </>
                    ):(
                         <>
                            <button onClick={handleSignup}>Sign up</button>
                            <p>Have an account? <span onClick={()=> {setHasAccount(!hasAccount)
                            document.getElementById("cpass").style.visibility= "hidden" ;}}>Sign in</span></p>
                        </>

                    )}
                </div>
            </div>

        </section>)
}
export default Login;