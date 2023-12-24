import React, { useState,useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";


function Register() {
  const [cookies] = useCookies([]);
  const navigate=useNavigate();
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
    //console.log("hi");
  },[]);
  const [values,setValues]=useState({email:"",password:""});
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      //{ withCredentials: true } this is very importtant line in generating token 
    const {data}=await axios.post('http://localhost:5000/register',values, { withCredentials: true });
    console.log(data);
    if (data) {
      if (data.errors) {
        const { email, password } = data.errors;
        if (email) generateError(email);
        else if (password) generateError(password);
      } else {
        navigate("/");
      }
    }
  } 
    
    
    
    
    catch(error){
      console.log("data is not post");
    }
  }
  const change=(e)=>{
    //console.log([e.target.name]);
    //console.log(e.target.value);
    //console.log(values);
    // this is simply a email or password
    setValues({ ...values, [e.target.name]: e.target.value });

  }

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={ handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={change
              
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={change
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already an account?<Link to='/login'>login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>    
  )
}

export default Register