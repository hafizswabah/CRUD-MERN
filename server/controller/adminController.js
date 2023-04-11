import adminModel from "../models/adminModel.js";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"; import bcrypt from 'bcryptjs'
var salt = bcrypt.genSaltSync(10)

export async function AdminLogin(req, res) {
    try {
        if (req.body.email == '' || req.body.password == '') {
            const message = "Fill the required details"
            res.json({ error: true, message })
        }
        console.log(req.body);
        const { email, password } = req.body
        const admin = await adminModel.findOne({ email })
        console.log(admin);

        if (!admin) {
            return res.json({ error: true, message: "wrong mail ID" })
        }
        if (req.body.password == admin.password) {

            const token = jwt.sign(
                {
                    id: admin._id
                },
                "jwtsecretkey"
            )
            console.log(token)

            return res.cookie("adminToken", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
                sameSite: "none",
            }).json({ error: false, admin: admin._id })

        } else {
            return res.json({ error: true, message: "Wrong Password" })
        }
    }
    catch (err) {
        res.json({ message: "server error", error: err })
        console.log(err);
    }

}
export async function getuser(req, res) {
    const users = await userModel.find({ name: new RegExp(req.query.search, 'i') }).lean()
    res.json({ users })
}
export async function finduser(req, res) {
    let user = await userModel.findById(req.params.id)
    res.json(user)
}

export async function checkauth(req, res) {
    try {
        const token = req.cookies?.adminToken
        console.log('adminToken:',token);
        if (!token) {
            return res.jsson({ loggedIn: false, error: true, message: "No Token" })
        
        }
        const verifyjwt = jwt.verify(token, "jwtsecretkey")
        const admin = await adminModel.findById(verifyjwt.id)

        if (!admin) {
            return res.json({ loggedIn: false })
        } else {
            return res.json({ admin, loggedIn: true })
        }
    }
    catch (err) {
        console.log("internal err");
        return res.json({ error: true, message: "internal error", loggedIn:false })
    }
}
export async function createUser(req, res) {
    try {
        console.log(req.body);
        if (req.body.name == '' || req.body.proffession == '' || req.body.email == '' || req.body.password == '') {
            const message = "Fill the required details"
            return res.json({ error: true, message })
        }
        else {
            const ExistingUser = await userModel.findOne({ email: req.body.email })
            if (ExistingUser) {
                const message = "Already have an account"
                return res.json({ error: true, message })
            } else {
                const hashPassword = bcrypt.hashSync(req.body.password, salt);
                const { name, email, proffession } = req.body
                const user = await userModel.create({
                    name: name,
                    proffession: proffession,
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
export async function adminLogout(req, res) {
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
}
export async function editUser(req, res){
    try
    {
        console.log(req.body);
        const {name, email, proffession, id}=req.body;
        console.log(id)
        await userModel.findByIdAndUpdate(id, {$set:{
            name, email, proffession
        }})

        return res.json({error:false})
    }
    catch(err){
        res.json({error:err, message:"Something went wrong"})
        console.log(err);
    } 
}


export async function deleteUser(req, res){
    try
    {
        const {id}=req.body;
        console.log("id :",id);
        await userModel.findByIdAndDelete(id);
        return res.json({error:false})
    }
    catch(err){
        res.json({error:err, message:"Something went wrong"})
        console.log(err);
    } 
}