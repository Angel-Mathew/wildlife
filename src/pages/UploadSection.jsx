import React,{ useRef,useState } from "react";
import "./UploadSection.css";

const UploadSection = ({ onUpload,onClose,uploadType }) =>{
  const fileInputRef = useRef(null);
  const [textContent, setTextContent] = useState('');
  const [selectedFileName,setSelectedFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file){
      setSelectedFileName(file.name);
    }
  };

  const handleMainButtonClick = (e) => {
    e.preventDefault();
    //---Text---
    if(uploadType === "text"){
      if (textContent.trim()){
        onUpload({ type: "text", content:textContent.trim()});
        onClose();
      } else{
        alert('write your journey')
      }
      }
      //----Image and video----
      else{
        if(!selectedFileName){
          if (fileInputRef.current){
            fileInputRef.current.click();
          }
        }
        else {
          const file = fileInputRef.current?.files[0];
          if(file){
            const reader = new  FileReader();
            reader.onload = () => {
              onUpload({type: uploadType,content: reader.result,name:file.name});
              onClose();
            };
            reader.onerror = () => alert('Failed to read file.');
            reader.readAsDataURL(file);
          }

        }
      }
    };
    return(
    <div className="upload">
      <div className="uploadingbox">
        <button onClick={onClose} className="close_btn">X</button>
        <form className="upload_form">
          <div className="content_area">
            {(uploadType === 'image' || uploadType === 'video') && (
             
              <input 
              type = 'file' 
              accept={uploadType === 'image'?'image/*' : 'video/*'}
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display:'none'}}
            />
           )}
           {uploadType === 'text' && (
            <textarea 
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="share your journey..."
            className="text_input"
            rows="7"></textarea>
           )}
           <button onClick={handleMainButtonClick}
           className="upload_btn">
            Upload
           </button>
          </div>

        </form>
      </div>

    </div>
    );
  };
export default UploadSection;

