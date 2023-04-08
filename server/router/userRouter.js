import express from 'express'
import { userLogin,checkuserLogin,userSignup,userLogout,editProfile} from '../controller/userController.js'
import adminModel from '../models/adminModel.js'
const Router = express.Router()
import multer from 'multer'

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/uploads')
    },filename:function (req,file,cb){
        const uniqueSuffix = Date.now()+".jpg"
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload=multer({storage:storage})

Router.post('/sign-up',userSignup)
Router.post('/login',userLogin)
Router.get('/check-auth',checkuserLogin)
Router.get('/logout',userLogout)
Router.post('/edit-profile',upload.single('file'),editProfile)


export default Router