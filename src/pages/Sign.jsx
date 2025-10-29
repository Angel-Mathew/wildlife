import React, { useState } from 'react';
import './Sign.css'; // importing style of categories pages

const Sign = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });
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
  }catch (error) {
    console.error("Error:",error);
  }
};
return(
  <div className='signup'>
    <h1> Sign up </h1>
    <form onSubmit={handleSubmit}>
      <input
      type='email'
      name='email'
      placeholder='Enter your email'
      onChange={handleChange}
      required />
      <br/>
      <input
      type='password'
      name='password'
      placeholder='Enter your pasword'
      onChange={handleChange}
      required
      />
      <button type='submit'> Sign Up</button>

    </form>
  </div>
)
}

export default Sign ; // This is the correct default export