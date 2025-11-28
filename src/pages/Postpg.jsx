import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Postpg.css';
import Navbar from '../components/Navbar.jsx';

const Postpg = () =>{
    const [posts, setPosts] = useState([]);
   const [activePostId,setActivePostId] = useState(null)

    useEffect (() => {
  const storedPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
  setPosts(storedPosts);
    },[]);
    //------------------------------------Delete--------------------------
    const handleDelete = (id) => {
        if (window.confirm("Do you want to delete this post?")) {
            const updatedPosts = posts.filter((posts) => post.id !== id);
            setPosts(updatedPosts); 
            localStorage.setItem('userPosts',JSON.stringify(updatedPosts));
        }
    };
  // ------------------------------------Like --------------------------
 const handlelikeToggle = (id) => {
    setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => 
        post.id === id? {...post,liked: !post.liked} :post
    );
    localStorage.setItem('userPosts',JSON.stringify(updatedPosts));
    return updatedPosts;
    });

 };
  //------------------------------------Comment--------------------------
 const toggleCommentBox = (id) => {
    if(activePostId === id){
        setActivePostId(null);
    } else {
        setActivePostId(id);
    }
 };
    return(
        <div className="post_display_section">
           <Navbar/>
            <div >
                 {/* ------------------------------------ To display the post in Postpg --------------*/ }
                <Link to="/journey" className="add_post"> Add Post </Link>
            </div>
            <div className="feed">
                {/* --------------------------------------------- To Post --------------*/ }
                {posts.length>0?(
                    posts.map((post)=>(
                        <div key={post.id} className="individual_post_card">
                            {post.type === 'image' && post.content && (<img src ={post.content} alt ={'User Post ${post.id}'} className="mediapost"/>)}
                            {post.type === 'video' && post.content && (<video src={post.content} controls className="mediapost"/>) }
                            {post.type === 'text' && post.content && (<p className="text">{post.content}</p>)}
                            {/* ------------------------------------User interaction--------------*/ }
                            <div className="user_interaction">
                                <img
                                src={post.liked? "/likefilled.png":"/like.png"}
                                
                                className="like"
                                onClick={() => handlelikeToggle(post.id)}
                                style={{cursor:"pointer"}} />
                               <button className="delete" onClick={() => handleDelete(post.id)} title="Delete Post">
                                 🗑️
                                 </button>
                                  <span className="comment" onClick={() => toggleCommentBox(post.id)}> 💬 </span>
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