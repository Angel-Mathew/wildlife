import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Postpg.css';
import Navbar from '../components/Navbar.jsx';

const Postpg = () =>{
    const [posts, setPosts] = useState([]);


    useEffect (() => {
  const storedPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
  setPosts(storedPosts);
    },[]);
    
    const handleDelete = (id) => {
        if (window.confirm("Do you want to delete this post?")) {
            const updatedPosts = posts.filter((posts) => post.id !== id);
            setPosts(updatedPosts); 
            localStorage.setItem('userPosts')
        }
    }

    const handlelikeToggle = (id) => {
        setPosts((prevPosts) =>{
        const updatedPosts= prevPosts.map((post) =>
            post.id === id? {...post,liked: !post.liked} : post
    );
    localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
    return updatedPosts;
}
    );
   
    
    };
    return(
        <div className="post_display_section">
           <Navbar/>
            <div >
                <Link to="/journey" className="add_post"> Add Post </Link>
            </div>
            <div className="feed">
                {posts.length>0?(
                    posts.map((post)=>(
                        <div key={post.id} className="individual_post_card">
                            {post.type === 'image' && post.content && (<img src ={post.content} alt ={'User Post ${post.id}'} className="mediapost"/>)}
                            {post.type === 'video' && post.content && (<video src={post.content} controls className="mediapost"/>) }
                            {post.type === 'text' && post.content && (<p className="text">{post.content}</p>)}

                            <div className="user_interaction">
                                <img
                                src={post.liked? "/likefilled.png":"/like.png"}
                                
                                className="like"
                                onClick={() => handlelikeToggle(post.id)}
                                style={{cursor:"pointer"}} />
                                <img src="/comment.png"  className="comment" style={{cursor:'default'}}/>
                                <button className="delete" onClick={() => handleDelete(post.id)} title="Delete Post">
                                 🗑️
                                 </button>
                                </div>
                                </div>
                    ))
                ):(
                    <p className="no_post_mesg">No posts.Be the first to share your adventure!</p>
                )}
            </div>
        </div>
    );


};
export default Postpg;