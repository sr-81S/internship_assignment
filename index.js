import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"
//router import 
import authRoute from "./routes/Auth.js"




dotenv.config()


//app.use configuration
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


//routes configuration
app.use("/auth", authRoute);




//server conncetion and DB connection
const PORT = process.env.PORT || 5001

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`the server is running at ${PORT}`);
    })
}).catch((error)=>{
    console.log(`Error:: ${error}`);
})