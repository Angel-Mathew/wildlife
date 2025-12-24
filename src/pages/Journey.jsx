import React,{ useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Journey.css';
import Navbar from '../components/Navbar.jsx';
import UploadSection from './UploadSection.jsx';

/* --------- Journey -------------- */
const Journey = () => {
  const [showUploadBox, setShowUploadBox] = useState(false); /*--- upload popup ---*/
  const [currentUploadType, setCurrentUploadType] = useState('image');/*--- checks what type of content is bein upload ----*/
  const navigate = useNavigate();

  const handleNewUpload = async (uploadData) => {
  /*--------  Text ----------------*/
  if (uploadData.type === "text"){
   try{
    const res = await fetch('http://localhost:5000/upload-text',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ caption: uploadData.caption }),
    });
    if (res.ok){
      setShowUploadBox(false);
      navigate('/postpg');
    } else {
      alert("Upload failed");
    }
    } catch (error){
      console.error("Error uploading text post:",error);
      alert("Server error.");

   }
    return;
  }
  
  /* ----------- Image and video uploading ------------*/
  const formData = new FormData();
  formData.append('file',uploadData.file);
  try{
    const res = await fetch('http://localhost:5000/upload',{
      method: "POST",
      body: formData,
    });
    if (res.ok){
     setShowUploadBox(false);
      navigate('/postpg');
    } else {
      alert("Upload failed");
    }
    } catch (error){
      console.error("Error uploading file:",error);
      alert("Server error.");
    }
  };
  /*---------- Popup ----------*/
  const handleOpenUploadBox = (type) => {
    setCurrentUploadType(type);
    setShowUploadBox(true);
  };

  const handleCloseUploadBox = () => {
    setShowUploadBox(false);
  };

  
  return (
    <div className="pg_container">
    
      {/*------------- Heading ---------------  */ }
    <div className="heading_section">
      <div className="headings">
        <img src="/borderh.png" className="heading_banner"/>
        <div className="info">
          <img src="/wildsoar.png" className="logo_img"/>
          <h1 className="intro"> Hello wildlife lovers! Share the harmonious essence of the wild</h1>
          </div>
      </div>
    </div>
      {/*-----------Media upload Buttons such as camera btn,video btn and text btn -----------------*/ }
      <div className="pg_content">
      <div className="upload_section ">
        
        <div className="btns">
          <button onClick={() => handleOpenUploadBox('image')}>📷</button>
          <button onClick={() => handleOpenUploadBox('video')}>▶️</button>
          <button onClick={() => handleOpenUploadBox('text')}>📄</button>
        </div>

       
      </div>
      {/*-------------------- upload function and close function -------------------*/ }
      {showUploadBox && (
        <UploadSection
        onUpload={handleNewUpload}
        onClose={handleCloseUploadBox}
        uploadType={currentUploadType}
        />
      )}
      {/* ------------- post section which is hidden currently. Onces content is uploaded,the user is directed to post page to view the post -------------- */ }
      <div className="posts_section" style={{display:'none'}}>
        </div>
        </div>
        </div>
        
  );
};
export default Journey;
