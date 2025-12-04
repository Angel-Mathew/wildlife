import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Postpg.css';
import Navbar from '../components/Navbar.jsx';

const Postpg = () =>{
    const [posts, setPosts] = useState([]);
   const [activePostId,setActivePostId] = useState(null)

    useEffect(() => {
        const fetchPosts = async() => {
            try{
                const res =await fetch('http://localhost:5000/posts');
                const data = await res.json();
                setPosts(data);
            } catch (error){
                console.error("Error fetching posts:",error);
            }
        };
        fetchPosts();
    }, []);
                
    //------------------------------------Delete--------------------------
    const handleDelete = (id) => {
        if (window.confirm("Do you want to delete this post?")) {
            const updatedPosts = posts.filter((post) => post.id !== id);
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
                               <span className="comment" onClick={() => toggleCommentBox(post.id)}> 💬 </span>
                               <button className="delete" onClick={() => handleDelete(post.id)} title="Delete Post">
                                 🗑️
                                 </button>
                                  <img
                                src={post.liked? "/likefilled.png":"/like.png"}
                                
                                className="like"
                                onClick={() => handlelikeToggle(post.id)}
                                style={{cursor:"pointer"}} />
                                  
                                </div>
                                </div>
                    ))
                ):(
                   <div className="no_post_mesgs">
                    <p className="no_post_mesg1"> No post.</p>
                    <p className="no_post_mesg2">Be first to share!🤗</p>
                    </div>
                )}
            </div>
        </div>
    );


};
export default Postpg;