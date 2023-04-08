import express from 'express'
const Router=express.Router()
import { AdminLogin } from '../controller/adminController.js'
// Router.get('/add',async(req,res)=>{
//     await adminModel.create({
//         email:"admin@gmail.com",
//         password:123
//     })
//     res.json("admin Created Succesfully")
//     })

Router.post('/login',AdminLogin)
export default Router