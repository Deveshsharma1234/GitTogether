const validate = require('validator');

const validateSignUp = (req)=>{
    const {firstName,lastName,age,email,gender,skils,password} = req.body;
    if(!firstName || !lastName || !age || !email || !gender  || !password) throw new Error("All fields are required error from backend");
    if(!validate.isEmail(email)|| !validate.isStrongPassword(password)) throw new Error("Invalid email or password");
    if(age <10 || age>100) throw new Error("Invalid age");
    if(!["male","female","other"].includes(gender)) throw new Error("Invalid gender");
        
    
}

module.exports = {validateSignUp}
