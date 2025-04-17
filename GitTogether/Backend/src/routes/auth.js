const express = require('express');
const { validateSignUp } = require('../utils/validateSignUp');
const crypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const authRouter = express.Router();

authRouter.post("/signup",async(req,res)=>{
    const {firstName,lastName,age,email,gender,skills,password} = req.body;
    try{
        validateSignUp(req);
        const  hashedPassword = await crypt.hash(password,10);
        req.body.password = hashedPassword;
        const user = new User({
            firstName,lastName,age,email,gender,skills,
            password:hashedPassword

        });
      const savedUser  =  await user.save();
        res.send("User created successfully" +savedUser )
    }catch(err){
        res.status(400).send({error : err.message})
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
        res.cookie("token", token);
        console.log(token);
        // res.cookie("role","admin");
        delete res.password;
        res.json({
            user : user
        })


    } catch (err) {
        res.status(400).send({ error: err.message });
    }


})

authRouter.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.send("LogOut succesful..")
    
    
    
})

module.exports =    authRouter
