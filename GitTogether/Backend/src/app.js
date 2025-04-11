const express = require('express');
const cookieParser = require('cookie-parser')
const connectDB = require("./config/database")
const app = express();
const User = require('./models/user');
const user = require('./models/user');
const { validateSignUp } = require('./utils/validateSignUp');
const crypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cookieParser());//added middleware to read the cookies!!
app.use((req, res,next) => {
    if(req.path != "/signup" && req.path != "/login"){
        try{
            const { token } = req.cookies;
            if (token) {
             const decodedUser =     jwt.verify(token, "secret@Key");
             req.user = decodedUser;
                console.log("from middleware : ", decodedUser);
                next();
            }else{
                res.status(401).send("Unauthorized!! please login first!!")
            }
    
        }catch(err){
            res.status(401).send({err: err.message})
    
        }
    }else{
        next();
    }
    
   
   
})

app.post("/signup", async (req, res) => {
    const { firstName, lastName, age, email, gender, skills,
        password } = req.body;

    try {
        validateSignUp(req);

        const { password } = req.body;
        const hashedPassword = await crypt.hash(password, 10);
        console.log(hashedPassword);
        req.body.password = hashedPassword;
        const user = new User({
            firstName, lastName, age, email, gender, skills,
            password: hashedPassword
        });


        await user.save();
        res.send(user);

    } catch (err) {
        res.status(400).send({ error: err.message });


    }



})
app.post("/login", async (req, res) => {
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
        res.send({
            user
        })


    } catch (err) {
        res.status(400).send({ error: err.message });
    }


})


app.get("/getAllUser", async (req, res) => {

    res.send(await User.find({}));
})
app.get("/getUserWithEmail", async (req, res) => {

    res.send(await User.find({ email: req.body.email }));
})
app.get("/getProfile",async(req,res)=>{
    console.log("get USer req by id",req.user._id)
   const user =  await User.findById(req.user._id).then(user => user.toObject());
   delete user.password
    res.send(user);

})
app.patch("/user", async (req, res) => {
    const id = req.user._id;
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
        res.status(400).send({ err: err.message });

    }


},)

app.delete("/user", async (req, res) => {
    const id = req.user._id;
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
