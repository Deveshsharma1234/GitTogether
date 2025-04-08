const adminAuth = (req,res,next)=>{
    const token = "xyxyxyxyxy";
    const isAuthenticated = token==="xyxyxyxyxy";
    if(isAuthenticated)next();
    else{
      
        res.status(402).send("Not Authenticated")
    }


}

module.exports = {adminAuth}