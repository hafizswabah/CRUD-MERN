import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import './signup.css'
import {useDispatch} from 'react-redux'

function Signup() {

  
        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [errMessage,setErrMessage]=useState(null)
        const dispatch=useDispatch()


    async function handleSubmit(e) {
        e.preventDefault()
        let { data } = await axios.post('http://localhost:8888/sign-up',
            { name, email, password })
        console.log(data);
        if(!data.error){
            dispatch({type:"refresh"})
       }else{
        setErrMessage(data.message)
       }
    }
    return (
        <div>
            <div className="signup-form-sec">
                <div className="form-border">
                    <h1 className="signup-head">Sign Up</h1>
                    <form action="" className="signup-form"
                        onSubmit={handleSubmit}>
                        <input type="text" placeholder="Your Name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <input type="email" placeholder="Email Id"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="password" placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }} />
                        <button type="submit" value="signup">Sign Up</button>
                        <div className="err-msg">
                            <h3>{errMessage}</h3>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup