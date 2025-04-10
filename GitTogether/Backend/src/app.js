const express = require('express');

const connectDB = require("./config/database")
const app = express();
const User = require('./models/user');
const user = require('./models/user');
const { validateSignUp } = require('./utils/validateSignUp');
const crypt = require('bcrypt');
app.use(express.json());



app.post("/signup", async (req, res) => {
const {firstName, lastName, age, email, gender, skills,
    password} = req.body;

    try {
        validateSignUp(req);

        const {password} = req.body;
        const hashedPassword = await crypt.hash(password,10);
        console.log(hashedPassword);
        req.body.password = hashedPassword;
        const user = new User({
            firstName, lastName, age, email, gender, skills,
            password:hashedPassword
        });
        

        await user.save();
        res.send(user);

    } catch (err) {
        res.status(400).send({ error: err.message });


    }



})
app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) throw new Error("User not found");
        const isPasswordCorrect = await crypt.compare(password,user.password);
        if(!isPasswordCorrect) throw new Error("Invalid password");
        res.send({
            user
        })
        

    }catch(err){
        res.status(400).send({error: err.message});
    }
    

})


app.get("/getAllUser", async (req, res) => {
    res.send(await User.find({}));
})
app.get("/getUserWithEmail", async (req, res) => {

    res.send(await User.find({ email: req.body.email }));
})

app.patch("/user/:id", async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, age, email, gender, skills } = req.body;
    try {
        const userToUpdate = await User.findById(`${id}`);
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.age = age;
        userToUpdate.email = email;
        userToUpdate.gender = gender;
        userToUpdate.skills = skills;
        await userToUpdate.save();
        res.send(userToUpdate)

    } catch (err) {
        res.status(400).send({err : err.message});

    }


},)

app.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    const userToDelete = await User.findByIdAndDelete(id);
    res.send(userToDelete);

})



connectDB().then(
    () => {
        console.log("database connected!!")
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    }
).catch(
    () => {
        console.log("database not connected!!")
    }
)
