import React,{ useState } from 'react';
import './Sign.css';
import { useGoogleLogin } from '@react-oauth/google';

const Sign = () => {
const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showSignForm, setShowSignForm] = useState(false);
  const [user,setUser] = useState(null);
  //the form
  const toggleSignForm = () => {
    setShowSignForm(!showSignForm);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };
  // Sign in using MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:5000/signup',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if(res.ok){
        alert("Registered Successfully!");
        setFormData({ email: '', password: ''});
        setShowSignForm(false);
      } else {
        alert(data.message);
      }
      } catch (error){
        console.error("Error during signup:",error);
        alert("Server error during signup.");
      }
  };

  // Sign-in using Google OAuth
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google token:",tokenResponse);
      try{
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{
          headers:{Authorization: `Bearer ${tokenResponse.access_token}`},
        });
        const userInfo = await userInfoRes.json();
        setUser(userInfo);

        await fetch('http://localhost:5000/google-signin',{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            googleId: userInfo.sub,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
          }),
        });
      } catch (error){
        console.error("Error during Google sign-in:",error);
      }
    },
    onError: (error) =>  console.log("Login Failed:",error)
  });
  return(
    <>
    {/*button*/}
    {!user && (<div className='btn_saparate'>
      <button className="Sign_in" onClick={toggleSignForm}>
        Sign in
      </button>
      <div className='line'> /</div>
      <button className='google' onClick={() => googleLogin()}>
        Google Signin
      </button>
    </div>
  )}
    
    
    {showSignForm && (
      <div className='sign_form_container'>
          <button type="close" onClick={toggleSignForm}>X</button>
          
        <form className="sign_form" onSubmit ={handleSubmit}>
          
          <input 
        
          className="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange} 
          required
          />
          
          <input
          className="password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          />
           <button type="submit">Submit</button>
         
        </form>
      </div>
    )}
    {user && (
      <div className='user_info'>
        <h3>🤗Welcome, {user.name}</h3>
        <img src={user.picture} alt="User Profile" />
        
      </div>
    )}
    </>
  );
      }


export default Sign;




































