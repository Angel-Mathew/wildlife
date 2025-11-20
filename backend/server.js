import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Connected to MongoDb Atlas"))
.catch((err) => console.error("Connection error:",err));
app.get("/",(req,res)=>{
    res.send("Backend connected successfully!👏")
});
app.post("/sign",async (req,res) => {
    const { email,password } = req.body;

    try{
        let user = await User.findOne({ email });
        if (user){
            return res.status(400).json({ message: "User already exists with this email."});
        }
        user = new User({
            email,
            password,
        });

        await user.save();
        res.status(201).json({ message:"User registered successfully!👏"});
    } catch (error){
        console.error("Error during signin:",error);
        res.status(500).json({message:"Server error during signin"});
    }
    
});

app.listen(5000,() => console.log("Server running on port 5000"));