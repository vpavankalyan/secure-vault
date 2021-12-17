import React,{useState} from 'react';
const Decrypt=()=>{
    
return(     
            <div className="decrypt-container">
                <h1>Enter data to decrypt</h1>
                <input 
                    type="text"
                    placeholder="data" 
                    autoFocus 
                    required 
                    
                />
                <input 
                    type="text"
                    placeholder="key" 
                    autoFocus 
                    required 
                />
                <button>Add</button>
            </div>)
}
export default Decrypt;