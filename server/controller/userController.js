import express from 'express'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const Router = express.Router()
var salt = bcrypt.genSaltSync(10)

export async function userSignup(req, res) {
    try {
        console.log(req.body);
        if (req.body.name == '' || req.body.email == '' || req.body.password == '') {
            const message = "Fill the required details"
            res.json({ error: true, message })
        }
        else {
            const ExistingUser = await userModel.findOne({ email: req.body.email })
            if (ExistingUser) {
                const message = "Already have an account"
                res.json({ error: true, message })
            } else {
                const hashPassword = bcrypt.hashSync(req.body.password, salt);
                const { name, email } = req.body
                const user = await userModel.create({
                    name: name,
                    email: email,
                    password: hashPassword
                })
                const token = jwt.sign({
                    id: user._id,
                    name: user.name
                }, "jwtsecretkey")

                return res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ error: false })
            }

        }

    } catch (err) {
        console.log(err);
    }
}
export async function userLogin(req, res) {

    try {
        console.log(req.body);
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        console.log(user);

        if (!user) {
            return res.json({ error: true, message: "no user found" })
        }
        const userValid = bcrypt.compareSync(password, user.password)
        if (!userValid) {
            return res.json({ error: true, message: "wrong password" })
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            "jwtsecretkey"
        )
        console.log(token)
        // const exp= new Date()+ 1000*60;
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            sameSite: "none",
        }).json({ error: false, user: user._id })
    }
    catch (err) {
        res.json({ message: "server error", error: err })
        console.log(err);
    }
}


export async function checkuserLogin(req,res) {
    try {
        console.log(req.cookies);
        const token = req.cookies?.token
        if (!token) {
            return res.json({ loggedIn: false, error: true, message: "no token" })
        }
const verifiedjwt=jwt.verify(token,"jwtsecretkey")
const user=await userModel.findById(verifiedjwt.id,{password:0})
console.log(user);
if(!user){
    return res.json({loggedIn:false})
}
return res.json({user,loggedIn:true})

    } catch (err) {
        console.log(err);
res.json({error:true,message:'intrenal'})
    }
}
export async function userLogout(req,res){
    res.cookie('token',"",{
        httpOnly:true,
        expires:new Date(0),
        secure:true,
        sameSite:"none"
    }).json({message:"Logged out",error:false})
}

