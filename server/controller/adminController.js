import userModel from "../models/userModel";


export async function AdminLogin(){
    try {
        if (req.body.email == '' || req.body.password == '') {
            const message = "Fill the required details"
            res.json({ error: true, message })
        }
        console.log(req.body);
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        console.log(user);

        if (!user) {
            return res.json({ error: true, message: "No User found" })
        }
        const userValid = bcrypt.compareSync(password, user.password)
        if (!userValid) {
            return res.json({ error: true, message: "Wrong Password" })
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            "jwtsecretkey"
        )
        console.log(token)
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