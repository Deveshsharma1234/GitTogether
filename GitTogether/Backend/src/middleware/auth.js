const jwt = require('jsonwebtoken');
const user = require('../models/user');

// const userAuth = (req,res,next)=>{
//         if(req.path != "/signup" && req.path != "/login"){
//         try{
//             const { token } = req.cookies;
//             if (token) {
//              const decodedUser =     jwt.verify(token, "secret@Key");

//              req.user = decodedUser;
//                 console.log("from middleware : ", decodedUser);
//                 next();
//             }else{
//                 res.status(401).send("Unauthorized!! please login first!!")
//             }
    
//         }catch(err){
//             res.status(401).send({err: err.message})
    
//         }
//     }else{
//         next();
//     }
    


// }

const userAuth = async (req,res,next)=>{
    console.log("Cookies in request: ", req.cookies); // 🔍 Log cookies here
    if(req.path != "/signup" && req.path != "/login"  ){
    try{
        const { token } = req.cookies;
        if (token) {
         const decodedUser =     jwt.verify(token, "secret@Key");
         
        const {_id} = decodedUser;
            console.log("from middleware : ", decodedUser);
            const localUser = await user.findById(_id);
            // delete localUser.password;
            req.user = localUser;
            console.log("from middleware : ", localUser);
            next();
        }else{
            res.status(401).json({message : "Unauthorized!! please login first!!"})
        }

    }catch(err){
        res.status(400).send({err: err.message})

    }
}else{
    next();
}



}


module.exports = {userAuth}