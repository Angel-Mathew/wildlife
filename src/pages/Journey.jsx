import React,{ useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Journey.css';
import Navbar from '../components/Navbar.jsx';
import UploadSection from './UploadSection.jsx';

const Journey = () => {
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [currentUploadType, setCurrentUploadType] = useState('image');
  const navigate = useNavigate();

  const handleNewUpload = (newPost) => {
   const existingPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
   const updatedPosts = [{...newPost, id: Date.now(), liked:false},...existingPosts];
   localStorage.setItem('userPosts',JSON.stringify(updatedPosts));
   setShowUploadBox(false);
   navigate('/myjourney/posts');
  };

  const handleOpenUploadBox = (type) => {
    setCurrentUploadType(type);
    setShowUploadBox(true);
  };

  const handleCloseUploadBox = () => {
    setShowUploadBox(false);
  };

  
  return (
    <div className="pg_container">
      <Navbar />
      
      <div className="heading_section">
        <img src="/borderh.png" alt="hello wildlife lovers! welcome" className="heading_banner" />
        <h1 className="intro">Hello wildlife lovers! Share the harmonious essence of the wild</h1>
        <img src="/wildsoar.png" alt="logo" className="logo_img" />
      </div>
      
      <div className="pg_content">
      <div className="upload_section ">
        
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
      <div className="posts_section" style={{display:'none'}}>
        </div>
        </div>
        </div>
        
  );
};
export default Journey;
