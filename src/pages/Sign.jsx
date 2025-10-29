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
  <button class="open-button" onclick="openForm()">Login</button>

<div class="pop-up" id="account_form">
  <form action="http://localhost:4000/api/users/login" method="POST" class="container">
    <h3>Login</h3>

    <label for="email"><b>Email</b></label>
    <input type="text" class="Enter Email" name="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" class="Enter Password" name="psw" required>

    <button type="submit" class="btn">Login</button>
    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
  </form>
  );
}

export default Sign ; // This is the correct default export