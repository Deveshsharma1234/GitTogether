    const mongoose = require('mongoose');
    const validator = require('validator');
    const userSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName:{
            type: String,
            
        },
        email:{
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
               if(! validator.isEmail(value))throw new Error("Invalid email");
            }
            
        },
        password:{
            type: String,
            required: true,
            // validate(value){
            //     if(!validator.isStrongPassword(value))throw new Error("Invalid password");

            // }


        },
        age:{

            type: Number,
            validate(value){
                if(!validator.isLength(value,2))throw new Error("Invalid age")
            }

        },
        gender: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
            validate(value){
                if(!["male","female","others"].includes(value)){
                    throw new Error("Invalid gender");
                }
              
            }
        },
        photoUrl:{
            type:String,
            default:"https://picsum.photos/200/300"
        },
        disc:{
            type: String,
            default:"This is my description default"
        },
        skils:{
            type: [String],
          validate(value){
            return value.length <=5;
          }
        }


    },{
        timestamps: true// add timestamp to user automatically
    }
)
    
    module.exports = mongoose.model('user', userSchema);