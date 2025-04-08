const express = require('express');

const connectDB = require("./config/database")
const app = express();
const User = require('./models/user')
app.use(express.json());



app.post("/signup",async(req,res)=>{
    const{firstName,lastName,age,email,password} = req.body;
 const user =  new User({
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
    password: password,
    })

    await user.save();
    res.send(user);


})
connectDB().then(
    ()=>{
        console.log("database connected!!")
        app.listen(3000,()=>{
            console.log('Server is running on port 3000');
        })
    }
).catch(
    ()=>{
        console.log("database not connected!!")
    }
    )
