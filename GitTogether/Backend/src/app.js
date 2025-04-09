const express = require('express');

const connectDB = require("./config/database")
const app = express();
const User = require('./models/user');
const user = require('./models/user');
app.use(express.json());



app.post("/signup",async(req,res)=>{
//     const{firstName,lastName,age,email,password} = req.body;
//  const user =  new User({
//     firstName: firstName,
//     lastName: lastName,
//     age: age,
//     email: email,
//     password: password,
//     })
const user = new User(req.body);

    await user.save();
    res.send(user);


})


app.get("/getAllUser",async(req,res)=>{
    res.send( await User.find({}));
})
app.get("/getUserWithEmail",async(req,res)=>{

    res.send( await User.find({email : req.body.email}));
})

app.patch("/user/:id",async(req,res)=>{
    const id = req.params.id;
    const {firstName,lastName,age,email} = req.body;
    
   const userToUpdate  = await User. findById(`${id}`);
   userToUpdate.firstName = firstName;
   userToUpdate.lastName = lastName;
   userToUpdate.age = age;
   userToUpdate.email = email;
   await userToUpdate.save();
   res.send(userToUpdate)
})

app.delete("/user/:id",async(req,res)=>{
    const id = req.params.id;
    const userToDelete = await User.findByIdAndDelete(id);
    res.send(userToDelete);

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
