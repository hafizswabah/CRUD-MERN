import express from 'express'
import { userLogin,checkuserLogin,userSignup,userLogout} from '../controller/userController.js'
const Router = express.Router()


Router.post('/sign-up',userSignup)
Router.post('/login',userLogin)
Router.get('/check-auth',checkuserLogin)
Router.get('/logout',userLogout)

export default Router