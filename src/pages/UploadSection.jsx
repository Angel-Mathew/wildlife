import React, {useRef,useState} from "react";
import "./UploadSection.css";

/*---------------------- Upload Section ----------------- */
const UploadSection = ({onUpload,onClose,uploadType}) => {
  const fileInputRef = useRef(null);
  const [textContent, setTextContent] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload({
        type: uploadType,
        file:file,
      });
    }
  };
/*----------------------- Handles Main Button ----------------*/

const handleMainButtonClick = (e) => {
  e.preventDefault();
  /*--------------- Logic for Text Post------------------*/
  if (uploadType === "text") {
  if(textContent.trim()){
    onUpload({ type: "text",caption:textContent.trim()});
  } else {
    alert("Write your Journey!");
  }
} else {
  /*--------------- Logic for Image/Video Post------------------*/
  if (fileInputRef.current){
    fileInputRef.current.click();
  }
}
};
return(
  
  <div className="upload">
    
    <div className="uploadingbox">
      
      <form>
        <div className="content_area">
          {/*--------------- Media Input ---------------*/ }
          {(uploadType === "image" || uploadType === "video") && (
            <input
              type="file"
              accept={uploadType === "image" ? "image/*" : "video/*"}
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          )}
          {/*--------------- Text Input ---------------*/ }
          {uploadType === "text" && (
            <textarea
            value ={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Share your journey..."
            className="text_input"
            rows="7"
            ></textarea>
          )}
          {/* ------------------ Close button --------------*/ }
          <button onClick={onClose} className="close_btn">X</button>
          {/* ------------------ Upload button --------------*/ }
          <button onClick ={handleMainButtonClick} className="upload_btn">
            {uploadType === "text" ? "Upload": "Upload"}
          </button>
          
        </div>
      </form>
    </div>
  </div>
);
};
export default UploadSection;