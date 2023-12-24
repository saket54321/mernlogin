import React, { useEffect, useState } from "react";
import { redirectDocument, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {Link} from "react-router-dom";

function Secret() {
  const[email,setEmail]=useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000",
          {},
          {
            withCredentials: true,
          }
        );
        console.log(data);
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else{
          console.log(data.user);
          setEmail(data.user);
          //console.log(email);
          navigate('./home');
          }
      }
    };
    verifyUser();
    
  }, [cookies, navigate, removeCookie]);

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
    <div className="private">
        <Link to='/home'>all books are here</Link>
        <button onClick={logOut}>Log out</button>
      </div>
  )
}

export default Secret