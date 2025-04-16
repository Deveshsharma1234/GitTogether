const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const connectionRequest = require('../models/connectionRequest');

userRouter.get("/getAllUser", async (req, res) => {

    res.send(await User.find({}));
})
userRouter.get("/getUserWithEmail", async (req, res) => {

    res.send(await User.find({ email: req.body.email }));
})

userRouter.get("/user/requests",async(req,res)=>{
try {
    const loggedInUser   =  req.user;
  const pendingRequests = await connectionRequest.find({toUserId : loggedInUser._id , status : "interested"})
  if(!pendingRequests || pendingRequests.length === 0) throw new Error("No pending requests");
  res.send( pendingRequests)
    
} catch (error) {
    res.status(400).send({err : error.message})}

})

module.exports = userRouter;
