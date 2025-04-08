const express = require('express');
const { adminAuth } = require('./middleware/adminAuth');
const app = express();

app.use("/admin",adminAuth)

app.get("/admin/getAllUser",(req,res)=>{
    console.log("data send!")
    res.send("All users data send!")
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})