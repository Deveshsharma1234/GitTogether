require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser')
const connectDB = require("./config/database")
const app = express();
const { userAuth } = require('./middleware/auth');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors');




app.use(cors({
    origin:['http://localhost:3001', 'http://13.60.253.225'], // explicitly allow your frontend origin
    credentials: true,               // allow cookies to be sent
  }));
// Middlewares 
app.use(express.json());
app.use(cookieParser());//added middleware to read the cookies!!
app.use( userAuth );
app.use("/",authRouter,profileRouter,requestRouter,userRouter)








connectDB().then(
    () => {
        console.log("database connected!!")
        app.listen( process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
).catch(
    () => {
        console.log("database not connected!!")
    }
)
