import React,{useRef, useState} from "react";
import "./UploadSection.css";

const UploadSection = ({onUpload,onClose,uploadType}) => {
  const fileInputRef = useRef(null);
  const [textContent,setTextContent] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpload({
         type: uploadType,
        content: reader.result,
        name:file.name,
      });
    };
    reader.onerror = () => alert("Failed to read file.");
    read.readAsDetaURL(file);
    }
  };
  const handleMainButtonClick = (e) => {
    e.preventDefault();
    if (uploadType === "text") {
      if (textContent.trim ()){
        onUpload({type:"text",content: textContent.trim()});
      } else {
        alert("write your journey");
      }
    }
    else{
      if(fileInputRef.current){
        fileInputRef.current.click();
      }
    }
  };
  return(
    <div className="upload">
      <div className="uploadingbox">
        <button onClick={onClose} className="close_btn">X</button>
        <form>
          <div className="content_area">
         {(uploadType === "image" || uploadType === "video") && (
          <input type="file"
          accept={uploadType === "image" ? "image/*" : "video/*"}
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{display:"none"}}
          />
         )}
         {uploadType === "text" && (
          <textarea 
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="share your journey..."
          className="text_input"
          rows="7"></textarea>
          )}
          <button onClick ={handleMainButtonClick} className="upload_btn">
            {uploadType === "text"? "Post" : "Upload"}
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default UploadSection;