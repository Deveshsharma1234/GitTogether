const mongoose = require('mongoose');
const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://deveshsharma372002:4MTjvdXQBDIbsmig@namastenode.eqoucxi.mongodb.net/gitTogether");
}


module.exports =  connectDB;