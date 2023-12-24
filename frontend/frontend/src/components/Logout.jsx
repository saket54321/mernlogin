import React from 'react'
import { useCookies } from "react-cookie";
import { redirectDocument, useNavigate } from "react-router-dom";

function Logout() {
    const navigate=useNavigate();
     const [cookies, setCookie, removeCookie] = useCookies([]);
     const logOut = async () => {
        removeCookie("jwt");
        navigate("/login");
        // const { data } = await axios.post(
        //           "http://localhost:5000",
        //           {},
        //           {
        //             withCredentials: true,
        //           }
        //         );
        //         console.log(data);
      };
  return (
    
    
        
        <button onClick={logOut}>Log out</button>
      
  )
}

export default Logout