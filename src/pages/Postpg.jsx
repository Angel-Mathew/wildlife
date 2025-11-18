import React, {useState, useEffect} from "react";
import './PostPg.css';
import Navbar from '../components/Navbar.jsx';

const Postpg = () =>{
    const [posts, setPosts] = useState([]);

    useEffect (() => {
  const storedPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
  setPosts(storedPosts);
    },[]);

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
            <div className="feed">
                {posts.length>0?(
                    posts.map((post)=>(
                        <div key={post.id} className="individual_post_card">
                            {post.type === 'image' && (<img src ={post.content} alt ={'User Post ${post.id}'} className="mediapost"/>)}
                            {post.type === 'video' && (<video src={post.content} controls className="mediapost"/>) }
                            {post.type === 'text' && (<p className="text">{post.content}</p>)}

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