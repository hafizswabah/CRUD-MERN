import { profile } from "console";
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    proffession:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
type:String,
default:"avatar.jpeg"
    }
})
const userModel=mongoose.model('users',userSchema)
export default userModel