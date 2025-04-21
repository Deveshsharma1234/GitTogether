const express = require('express');
const { validateSignUp } = require('../utils/validateSignUp');
const crypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, age, email, gender, skils, password,photoUrl } = req.body;
    try {
        validateSignUp(req);
        const hashedPassword = await crypt.hash(password, 10);
        req.body.password = hashedPassword;
        const user = new User({
            firstName, lastName, age, email, gender, skils,photoUrl,
            password: hashedPassword

        });
        const savedUser = await user.save();
        res.json({
            message: "User Created Succesfull",
            savedUser: savedUser
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
)


authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        const isPasswordCorrect = await crypt.compare(password, user.password);
        if (!isPasswordCorrect) throw new Error("Invalid password");
        const token = await jwt.sign({ _id: user._id }, "secret@Key", { expiresIn: "1h" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set true in production with HTTPS
            sameSite: "lax", // "none" if cross-origin & secure
            path: "/", // important to match logout clearCookie
            maxAge: 60 * 60 * 1000 // 1 hour in ms (optional)
        });
        console.log(token);
        // res.cookie("role","admin");
        delete res.password;
        res.json({
            user: user
        })


    } catch (err) {
        res.status(400).json({ error: err.message });
    }


})

authRouter.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // 🔐 Set to true in production (with HTTPS)
        sameSite: "lax", // or "none" only if cross-site & over HTTPS
        path: "/" // ✅ VERY important to match cookie path
    });

    console.log("Cookies cleared");

    res.status(200).json({
        ok: true,
        message: "Logged out successfully"
    });
});

module.exports = authRouter
