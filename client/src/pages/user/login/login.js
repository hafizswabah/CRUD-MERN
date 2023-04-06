
import { useState } from 'react';
import axios from 'axios'
import './login.css'
import { useDispatch } from 'react-redux';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState(null)
  const dispatch=useDispatch()

async function handleSubmit(e){
e.preventDefault()
let {data}=await axios.post("http://localhost:8888/login",
{email,password})
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
          <h1 className="signup-head">Login</h1>
          <form action="" className="signup-form"
          onSubmit={handleSubmit}
          >
            <input type="email" placeholder="Email Id"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }} />
            <button type="submit" value="signup">Sign in</button>
            <div className="loginErr">
              <p>{errMessage}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login