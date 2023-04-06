import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
  const dispatch=useDispatch()
  async function logout (){
    await axios.get("http://localhost:8888/logout")
    dispatch({type:"refresh"})
  }
  const user=useSelector((state)=>{
    return state.user
  })
  return (
    <div><h1>home</h1>
    <button onClick={logout}>logout</button>
    </div>
  )
}

export default Home