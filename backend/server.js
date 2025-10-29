import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://name:An2AbSM@cluster0.wlddygt.mongodb.net/wildlifeweb?appName=Cluster0")
.then(()=> console.log("connected to MongoDB Atlas"))
.catch((err) => console.error("correction error:",err));
app.get("/",(req,res)=>{
    res.send("Backend connected successfully!");
});
app.listen(5000,() => console.log("Server running on port 5000"));