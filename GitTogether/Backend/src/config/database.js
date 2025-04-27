const mongoose = require('mongoose');
const connectDB = async()=>{
    
    // await mongoose.connect("mongodb+srv://deveshsharma372002:4MTjvdXQBDIbsmig@namastenode.eqoucxi.mongodb.net/gitTogether");

console.log("Connecting with:", process.env.DB_CONNECTION_STRING); 
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    
    
}


module.exports =  connectDB;