import React, {useState, useEffect} from "react";
import './PostDisplayPage.css';
import Navbar from '../components/Navbar.jsx';

const Postpg = () =>{
    const [posts, setPosts] = useState([]);

    useEffect (() => {
  const storedPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
  setPosts(storedPosts);
    },[]);

    const handlelikeToggle = (id) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
            post.id === id? {...post,liked: !post.liked} : post
    )
    );
    localStorage.setItem('userPosts',JSON.stringify(posts.map((post)=>
        post.id === id? {...post,liked: !post.liked} : post
    )));
    
    };
    return(
        <div className="post_display_container">
            <Navbar/>
            <div className="post_feed">
                {posts.length>0?(
                    posts.map((post)=>(
                        <div key={post.id} className="post_card">
                            {post.type === 'image' && (<img src ={post.content} alt ={'User Post ${post.id}'} className="post_media"/>)}
                            {post.type === 'video' && (<video src={post.content} controls className="post_video"/>) }
                            {post.type === 'text' && (<p className="post_text">{post.content}</p>)}

                            <div className="user_interaction">
                                <img
                                src={post.liked? "/likefill.png":"/like.png"}
                                alt="like"
                                className="like"
                                onClick={() => handlelikeToggle(post.id)}
                                style={{cursor:"pointer"}} />
                                <img src="/comment.png" alt="comment" className="comment" style={{cursor:'default'}}/>
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