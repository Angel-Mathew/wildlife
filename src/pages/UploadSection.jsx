import React, {useRef,useEffect, useState} from "react";
import './UploadSection.css';

const UploadSection = ({ onUpload, onClose, uploadType }) => {
  const fileInputRef = useRef(null);
  const [textContent,  setTextContent] = useState('');

  useEffect(()=>{
    if (uploadType === 'image' || uploadType === 'video'){
      const timer = setTimeout(()=>{
        fileInputRef.current?.click();
      },40);
      return () => clearTimeout(timer);
    }
  },[uploadType]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadType === 'image' || uploadType === 'video') {
      const file = fileInputRef.current?.files[0];
      if (file){
        const reader = new FileReader();
        reader.onload = () => {
          onUpload({ type: uploadType, content: reader.result, name: file.name });
          onClose();
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a file to upload.');

      }
    } else if (uploadType === 'text') {
      if (textContent.trim()){
        onUpload({ type: 'text', content: textContent.trim() });
        onClose();
      } else {
        alert('Please enter some text to upload.');
      }
    }
  };
  return (
    <div className="upload">
      <div className="uploadingbox">
        <button onClick={onClose} className="close_btn">x</button>
        <form onSubmit={handleSubmit} className="upload_form">
          <div className="content_area">
            {(uploadType === 'image' || uploadType === 'video') && (
              <input
              type='file'
              accept={uploadType === 'image' ? 'image/*' : 'video/*'}
              ref={fileInputRef}
              style={{ display: 'none' }}
              />
            )}
            {uploadType === 'text' ?(
              <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="share your journey..."
              className="text_input"
              rows="9"
              ></textarea>
            ) : (
              <p className="instruction">
                {uploadType === 'image' }
                {uploadType === 'video' }
              </p>
            )}
            <button type ="submit" className="upload_btn">Upload</button>
            
            
          </div>
        </form>
      </div>
    </div>
      
  );
};
export default UploadSection;