import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [cookies] = useCookies([]);

  const navigate=useNavigate();
  const [values,setValues]=useState({email:"",password:""});
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  
    useEffect(() => {
      if (cookies.jwt) {
        navigate("/");
      }
    }, [navigate]);
   

  const change=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });

  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      //{ withCredentials: true } this is very importtant line in generating token 
    const {data}=await axios.post('http://localhost:5000/login',values, { withCredentials: true });
    console.log(data);
    if (data) {
      if (data.errors) {
        const { email, password } = data.errors;
        if (email){
          //window.alert(email);
          generateError(email);

        } 
        else if (password) generateError(password);
      } else {
        navigate("/");
      }
    }
    else{
      navigate('/register');
    }
    
    }
    catch(error){
      console.log("data is not post");
    }
  }
  return (
    <>
    <div className="container">
      <h2>Login Account</h2>
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
          Already not an account?<Link to='/register'>register</Link>
        </span>
        <span>
          forget password?<Link to='/update'>update</Link>
        </span>
      </form>
      
    </div> 
    <ToastContainer />
    </>   
  )
}

export default Login