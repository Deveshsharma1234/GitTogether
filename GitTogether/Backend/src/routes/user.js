const express = require('express');
const userRouter = express.Router();
const User = require('../models/user')

userRouter.get("/getAllUser", async (req, res) => {

    res.send(await User.find({}));
})
userRouter.get("/getUserWithEmail", async (req, res) => {

    res.send(await User.find({ email: req.body.email }));
})

module.exports = userRouter;