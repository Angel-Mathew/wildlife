import React, {useRef,useEffect, useState} from "react";
import './UploadSection.css';

const UploadSection = ({ onUpload, onClose, uploadType }) => {
  const fileInputRef = useRef(null);
  const [textContent,  setTextContent] = useState('');
  const [selectedFileName,setSelectedFileName] = useState('');

  useEffect(()=>{
    if (uploadType === 'image' || uploadType === 'video'){
      const timer = setTimeout(()=>{
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      },40);
      return () => clearTimeout(timer);
    }
  },[uploadType]);
  const handleFileChange = (e) =>{
    const file = e.target.files[0];
    if (file){
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName('');
    }
  };
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
        reader.onerror = (error) => {
          console.error("FileReader error:",error)
          alert('Failed to read file.')
        }
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
             <>
             <input
              type='file'
              accept={uploadType === 'image' ? 'image/*' : 'video/*'}
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              />

              <p className="instruction">
                {selectedFileName? 'File selected: $ {selectedFileName}' : 'Please select an ${uploadType}file.'}
              </p>
              {!selectedFileName && (
                <button type="button" onClick={() => 
                  fileInputRef.current?.click()} className="reselect_btn">
                  Select file
                  </button>
                )}

              </>
            )}
            {uploadType === 'text' ?(
              <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="share your journey..."
              className="text_input"
              rows="9"
              ></textarea>
            ) : null}
            <button type ="submit" className="upload_btn">Upload</button>
            
            
          </div>
        </form>
      </div>
    </div>
      
  );
};
export default UploadSection;