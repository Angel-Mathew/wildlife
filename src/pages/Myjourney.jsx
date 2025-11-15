import React,{ useState } from "react";
import { Link } from 'react-router-dom';
import './MyJourney.css';
import Navbar from '../components/Navbar.jsx';
import UploadSection from './UploadSection.jsx';

const MyJourney = () => {
  const [Posts, setPosts] = useState([]);
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [currentUploadType, setCurrentUploadType] = useState('image');
  
  const handleNewUpload = (newPost) => {
    setPosts((prevPosts) => [{...newPost, id: Date.now(), liked: false},...prevPosts]);
    setShowUploadBox(false);
  };

  const handleOpenUploadBox = (type) => {
    setCurrentUploadType(type);
    setShowUploadBox(true);
  };

  const handleCloseUploadBox = () => {
    setShowUploadBox(false);
  };

  const handlelikeToggle = (id) =>{
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };
  return (
    <div className="pg_container">
      <Navbar />
      
      <div className="heading_section">
        <img src="/borderh.png" alt="hello wildlife lovers! welcome" className="heading_banner" />
        <h1 className="intro">Hello wildlife lovers! Share the harmonious essence of the wild</h1>
        <img src="elysia.png" alt="logo" className="logo_img" />
      </div>
      
      <div className="pg_content">
      <div className="upload_section">
        <div className="btns">
          <button onClick={() => handleOpenUploadBox('image')}>📷</button>
          <button onClick={() => handleOpenUploadBox('video')}>▶️</button>
          <button onClick={() => handleOpenUploadBox('text')}>📄</button>
        </div>
       
      </div>
      {showUploadBox && (
        <UploadSection
        onUpload={handleNewUpload}
        onClose={handleCloseUploadBox}
        uploadType={currentUploadType}
        />
      )}
      <div className="posts_section">
        {Posts.map((post) => (
          <div key={post.id} className="post_card">
            {post.type === 'image' && (<img src={post.content} alt={'User Post ${post.id}'} className="media" />)}
            {post.type === 'video' && (<video src={post.content} controls className="media" />)}
            {post.type === 'text' && (<p className="text_content">{post.content}</p>)}

        <div className="icons">
          <img src={post.liked?"/likefill.png":"/like.png"} alt="like" className="icon" onClick={() => handlelikeToggle(post.id)}style={{cursor:"pointer"}} />
          <img src="/comment.png" alt="comment" className="icon" style ={{cursor:'default'}} />
        </div>
          </div>
        ))}
     </div>
    </div>
    </div>
  );
};
export default MyJourney;
