import React, { useState } from 'react';
import './Sign.css'; // importing style of categories pages

const Sign = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });
  const [showSignForm, setShowSignForm] = useState(false);
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
    const data =await res.json();
    alert(data.message || "Complete!");
    if(res.ok){
      setFormData({email:"", password:""});
      setShowSignForm(false);
    }
  }catch (error) {
    console.error("Error:",error);
  }
};
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
    </div>
    )}
    </>
  );
}

export default Sign ; // This is the correct default export