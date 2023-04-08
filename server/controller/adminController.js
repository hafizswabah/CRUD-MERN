import adminModel from "../models/adminModel.js";
import jwt from 'jsonwebtoken'

export async function AdminLogin(req,res){
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
        if (req.body.password==admin.password) {

            const token = jwt.sign(
                {
                    id: admin._id
                },
                "jwtsecretkey"
            )
            console.log(token)
            return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
                sameSite: "none",
            }).json({ error: false, admin: admin._id })

        }else{
        return res.json({ error: true, message: "Wrong Password" })
        }
    }
    catch (err) {
        res.json({ message: "server error", error: err })
        console.log(err);
    }

}