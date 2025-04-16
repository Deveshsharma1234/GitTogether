
const mongoose  = require('mongoose');
const connectionRequestSchema = mongoose.Schema({
    fromUserId : {

        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        //look in documentation
        type: "string",
        required : true,
        enum :{
            values : ["ignore","interested","accepted","rejected"],
            message : `{VALUE} is not incorrect status type`
        }
    }
    


},{
    timestamps : true
})

module.exports = mongoose.model("connectionRequest",connectionRequestSchema)