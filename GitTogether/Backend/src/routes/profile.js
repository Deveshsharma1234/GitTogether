const express = require('express');
const User = require('../models/user');
const profileRouter = express.Router();
const crypt = require('bcrypt');
const validate = require('validator')


profileRouter.get("/profile", async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
})

profileRouter.patch("/profile/update", async (req, res) => {
    const id = req.user._id;
    const { firstName, lastName, age, email, gender, skils, disc } = req.body;
    try {
        const userToUpdate = await User.findById(`${id}`);
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.age = age;
        userToUpdate.email = email;
        userToUpdate.gender = gender;
        userToUpdate.skils = skils;
        userToUpdate.disc = disc;
        await userToUpdate.save();
        res.send(userToUpdate)

    } catch (err) {
        res.status(400).send({ err: err.message });

    }


})
//Password update i user is logged in
profileRouter.patch("/update/password", async (req, res) => {
    try {
        const id = req.user._id;
        const { password ,newPassword} = req.body;

        const verifyPassword = await crypt.compare(password, req.user.password);
        if (!validate.isStrongPassword(password) && !verifyPassword) throw new Error("Invalid password!!");
        const hashedPassword = await crypt.hash(newPassword, 10);
        req.user.password = hashedPassword;
        await req.user.save();
        res.send(req.user);
   
        
       
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

profileRouter.delete("/delete", async (req, res) => {
    const id = req.user._id;
    const userToDelete = await User.findByIdAndDelete(id);
    res.send(userToDelete);
})


module.exports = profileRouter;

