import React, { useState } from 'react';
import './Sign.css'; // importing style of categories pages
//import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
//import jwt_decode from 'jwt-decode';
const Sign = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });
  const [showSignForm, setShowSignForm] = useState(false);
  const [user,setUser] = useState(null);

  const toggleSignForm = () => {
    setShowSignForm(!showSignForm);
  }
const handleChange = (e) =>{
setFormData({...formData, [e.target.name]: e.target.value});
};

const handleSubmit = async(e) => {
  e.preventDefault();
  
  try{
    const res = await fetch("http://localhost:5000/signup",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message || "Complete!");
    if(res.ok){
      setFormData({email:"", password:""});
      setShowSignForm(false);
    }
  }catch (error) {
    console.error("Error during sign-in:",error);
    alert("Error during sign in")
  }
};

// Google login
//const handleGoogleSuccess = async (credentialResponse) => {
 // console.log("Google Login Success!:",credentialResponse);
  //const decoded = jwt_decode(credentialResponse.credential);
  //console.log("Decoded Google Credential:",decoded);
  //setUser(decoded);

  // send Google user info to your backend

  //try{
   // const res = await fetch("http://localhost:5000/google-signin",{
     // method: "POST",
      //headers:{
       // "Content_Type": "application/json",
      //},
      //body: JSON.stringify({
        //googleId: decoded.sub,
        //email: decoded.email,
        //name: decoded.name,
        //picture:decoded.picture
      //}),
    //});
    //const data = await res.json();
    //console.log("Backend response for Google sign-in:",data);
    //if(res.ok){
       //alert(data.message || "Google Sign-in successful");
       //setShowSignForm(false);
     //} else {
      // alert(data.message || "Error proceessing Google sign in.");
     //}
    // } catch (error){
     //  console.error("Error sending Google Data:",error);
     //  alert("Error connecting")
     //}
   //};
   //const handleGoogleError = () => {
    // console.error("Google Login Failed");
    // alert("Google Sign-in failed. Please try again");
  // };


return (
  
 

    <>
    <button className='open' onClick={toggleSignForm}>Sign in</button>
    {showSignForm && ( 
    <div className="sign-form-container">
      <form className="sign-form" onSubmit={handleSubmit}>
         <input
          className='email'
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password" 
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>  
        <button type="button" className="close-btn" onClick={toggleSignForm}>Close</button> 
      </form>
      {/* <div style={{marginTop:"15px",display:"flex",justifyContent:"center"}}>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError}/>
      </div>
    */}
    </div>
      
    )}
    {user && (
      <div style={{position: "absolute",top:"10px",right:"10px",background:"white",padding:"10px",borderRadius:"5px",zIndex:"1000"}}>
        <p>Welcome,{user.name}</p>
        <img src={user.picture} alt="profile" style={{width:"40px",borderRadius:"50%"}}/>
        
      </div>
    )}
    </>
 
  );
}

export default Sign ; // This is the correct default export