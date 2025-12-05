import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import { OAuth2Client } from 'google-auth-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

mongoose.connect(process.env.MONGODB_URI) 
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const PostSchema = new mongoose.Schema({
    caption: String,
    mediaUrl: String,
    mediaType: String,
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

app.get("/",(req,res)=>{
    res.send("Backend connected successfully👏");
});
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});
app.post('/google-signin', async (req, res) => {
    const { googleId, email, name } = req.body;
    try{
        let user = await User.findOne({ googleId: googleId });
        if(!user){
            user = new User({ googleId, email });
            await user.save();
            console.log("New user created:",user.email);
        } else {
            console.log("Existing user logged in:",user.email);
        }
        res.status(200).json({ message: 'Google sign-in successful' });
    } catch (error){
        console.error("Error during Google sign-in:",error);
        res.status(500).json({ message: 'Server error during Google sign-in' });
    }
});
 app.post("/upload",upload.single('file'),async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"});
        }
        const fileType = req.file.mimetype.startsWith('video') ? 'video': 'image';

        const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        const newPost = new Post({
            caption: req.body.caption,
            mediaUrl: fileUrl,
            mediaType: fileType,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error){
        console.error("Error uploading file:",error);
        res.status(500).json({message:"upload failed"});
    }
});
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
    });
app.post('/upload-text', async (req, res) => {
    try{
        const newPost = new Post({
            caption: req.body.caption,
            mediaType: 'text',
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error){
        console.error("Error uploading text post:",error);
        res.status(500).json({message:"Upload failed"});
    }
});
    app.delete('/posts/:id', async (req, res) => {
        try{
            const { id } = req.params;
            await Post.findByIdAndDelete(id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error){
            console.error("Error deleting post:",error);
            res.status(500).json({ message: 'Error deleting post' });
        }
    });
    app.listen(5000,() => console.log('Server running on port 5000'));
