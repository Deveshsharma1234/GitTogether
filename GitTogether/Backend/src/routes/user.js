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

userRouter.get("/user/requests", async (req, res) => {
    try {
        const loggedInUser = req.user;
        const pendingRequests = await connectionRequest.find({ toUserId: loggedInUser._id, status: "interested" }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "gender", "age", "skills"])
        if (!pendingRequests || pendingRequests.length === 0) throw new Error("No pending requests");
        res.json({pendingRequests: pendingRequests})

    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})

userRouter.get("/user/connections", async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await connectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        })
        .populate("fromUserId", ["firstName", "lastName", "photoUrl", "gender", "age", "skills"])
        .populate("toUserId", ["firstName", "lastName", "photoUrl", "gender", "age", "skills"]);

        if (!connections.length) throw new Error("No connections found");

        const data = connections.map(row => {
            const from = row.fromUserId;
            const to = row.toUserId;
            const isSender = from._id?.toString?.() === loggedInUser._id.toString();
            const friend = isSender ? to : from;
        
            return {
                _id: row._id,
                friend,
                status: row.status,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt
            };
        });
        

        res.json({ data });

    } catch (err) {
        res.status(400).send({ err: err.message });
    }
});


userRouter.get("/user/feed",async(req,res)=>{
    try {
        
        const loggedInUser = req.user;
        //people i dont want in my feed
        const page =parseInt( req.query.page) || 1;
        let limit = parseInt(req.query.limit )||5;
        limit = limit>5 ? 5: limit;
        const skip = (page-1)*limit
        const connections = await connectionRequest.find({ $or:[{fromUserId : loggedInUser._id},{toUserId : loggedInUser._id}]}).select("fromUserId toUserId")
        // res.json({connections : connections})

        const hideUserFromFeed = new Set();
        connections.forEach(req =>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        }) 

       const user = await User.find({
        $and :[{ _id : {$nin : Array.from(hideUserFromFeed)}},{_id : {$ne : loggedInUser._id}}]
       
       
       }).select("firstName lastName photoUrl gender age skils disc").skip(skip).limit(limit)
       res.json({user : user});



    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

module.exports = userRouter;
