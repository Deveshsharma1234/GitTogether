const express =  require('express');
const User = require('../models/user');
const ConnetonRequest = require('../models/connectionRequest');
const e = require('express');
const requestRouter = express.Router();
//interested or ignored api..
    requestRouter.post("/request/send/:status/:toUserId",async (req,res)=>{
        try{
            if(req.params.status !== "interested" && req.params.status !== "ignore") throw new Error("Invalid status");
            const fromUserId = req.user._id;//loged in user
            const toUserId = req.params.toUserId;
           const status = req.params.status;
           //check if existing connectioRequest
           const existingConnectionRequest = await ConnetonRequest.findOne({
            $or :[ {fromUserId,
                toUserId},
                {fromUserId : toUserId,
                    toUserId : fromUserId
                }
            ]
           
           })
           if(existingConnectionRequest) throw new Error("Connection request already exist");
           const connectionRequest = new ConnetonRequest({
            fromUserId,
            toUserId,
            status
           
           })
         const data =   await connectionRequest.save();
         res.json({
            message :status,
            data : data
         });
        }catch(err){
            res.status(400).send({err: err.message})
        }
          
    })

    requestRouter.post("/request/review/:status/:reqId",async(req,res)=>{
        //logged in user id should be toUserId and status should be interested

       try {
        if(req.params.status != "accepted" && req.params.status != "rejected")throw new Error({message:"Invalid status"});
        const loggedInUser = req.user;
        const {reqId,status} = req.params;
        const connectionRequest  = await ConnetonRequest.findOne({_id : reqId, toUserId : loggedInUser._id,status : "interested"})
        if(!connectionRequest) throw new Error("Connection request not found");
        connectionRequest.status = status;
      const updatedStatus =   await connectionRequest.save();
      res.send( {message : "connection request " + status, data : updatedStatus});
        
       } catch (error) {
        res.status(400).send({err : error.message})
       }
    
    })

    module.exports = requestRouter;