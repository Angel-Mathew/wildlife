import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Start Google OAuth2Client with your GOOGLE_CLIENT_ID from .env
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
//Google Sign-in
app.post("/google-signin",async(req,res) =>{
    const{googleId,email,name,picture} = req.body;
    try{
        let user = await User.findOne({ googleId: googleId});
        if(!user){
          user = new User({
            googleId: googleId,
            email: email,
          });
          await user.save();
          console.log("Existing Google user created:",user.email);
        } else {
            console.log("Existing Google user logged in:",user.email);
        }
        res.status(200).json({message: "Google sign-in sucessful", user:user});  
        } catch (error){
            console.error("Error during Google sign-in:",error);
            res.status(500).json({message:"Server error during Google sign-in."});
        }
});

app.listen(5000,() => console.log("Server running on port 5000"));