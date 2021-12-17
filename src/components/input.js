import React,{useState} from 'react';
import showPwdImg from './showp.svg';
import hidePwdImg from './hidep.svg';
/*import mongoose from 'mongoose';
const { Schema } = mongoose;
const uri = "---";
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

    const passwordSchema = new Schema({
        userid: {
            type: String,
            required: true,
        },
        websitename: {
            type: String,
            required: true
        },
        username:{
            type: String
        },
        password: {
            type: String,
            required:true
        }
    })
    
    
        
    const Password = mongoose.model('passwords',passwordSchema)
    // const card = mongoose.model('cards',cardSchema)
    // const note = mongoose.model('notes',noteSchema)
    // const authentication = mongoose.model('auth_data',authSchema)*/

const Input=({user})=>{
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [hint,setHint]= useState('');//service
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    
return(     
            <div className="inputContainer">
                <h1>Password</h1>
                <input 
                    type="text"
                    placeholder="Service/Hint" 
                    autoFocus 
                    required 
                    value={hint}
                    onChange={(e)=>{ setHint(e.target.value)}}
                    
                />
                <input 
                    type="text"
                    placeholder="Username" 
                    autoFocus 
                    required 
                    value={username}
                    onChange={(e)=>{ setHint(e.target.value)}}
                    
                />
                <div className="pwd-container">
                <input 
                    type={isRevealPwd ? "text" : "password"}
                    placeholder="password"
                    autoFocus 
                    required 
                    value={password}
                    onChange={(e)=>{ setHint(e.target.value)}}
                />
                <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwd(prevState => !prevState)}/>
                </div>
                <button /*onClick={() =>{   
                    const newpassword = new Password({
                        userid: user,
                        websitename: hint,
                        username: username,
                        password: password
                    });
                    newpassword.save()  

                    //user,hint,password,username
                }}*/>Add</button>
                <h1>Add Card</h1>
                <input 
                    type="text"
                    placeholder="card number" 
                    autoFocus 
                    required 
                    
                />
                <input 
                    type="text"
                    placeholder="expiry" 
                    autoFocus 
                    required 
                    
                />
                <input 
                    type="text"
                    placeholder="cvv" 
                    autoFocus 
                    required 
                    
                />
                <button>Add</button>
            </div>)
}
export default Input;