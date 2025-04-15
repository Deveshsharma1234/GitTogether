const express =  require('express');
const User = require('../models/user');
const ConnetonRequest = require('../models/connectionRequest');
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
           if(existingConnectionRequest) throw new Error("Connection request already sent");
           const connectionRequest = new ConnetonRequest({
            fromUserId,
            toUserId,
            status
           
           })
         const data =   await connectionRequest.save();
         res.json({
            message :"Connection request sent ",
            data : data
         });
        }catch(err){
            res.status(400).send({err: err.message})
        }
          
    })


    module.exports = requestRouter;