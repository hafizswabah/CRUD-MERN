import express from 'express'
const Router=express.Router()
import { AdminLogin,getuser,checkauth,finduser,createUser,adminLogout,editUser,deleteUser } from '../controller/adminController.js'
// Router.get('/add',async(req,res)=>{
//     await adminModel.create({
//         email:"admin@gmail.com",
//         password:123
//     })
//     res.json("admin Created Succesfully")
//     })

Router.post('/login',AdminLogin)
Router.post('/create-user',createUser)
Router.get('/users',getuser)
Router.get('/logout',adminLogout)
Router.get('/users:id',finduser)
Router.get('/check-auth',checkauth)
Router.post('/edit-user',editUser)
Router.post('/delete-user',deleteUser)

export default Router