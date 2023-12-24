import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { redirectDocument, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Spinner from "../components/Spinner"
import BooksTable from "../components/BooksTable"
import BooksCard from "../components/BooksCard"

function Home() {
  const [showtype,setshowtype]=useState('table');
  const [books,setbooks]=useState([]);
  const[Loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const[email,setEmail]=useState("");
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
          //navigate('./home');
          setLoading(true);
    axios
      .get('http://localhost:5000/books')
    // fetch('http://localhost:5000/books')
      .then((response) => {
        //console.log(response.data);
        //setBooks(response.data.data);
        setLoading(false);
        setbooks(response.data.book);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
          }
      }
    };
    verifyUser();
    
  }, [cookies, navigate, removeCookie]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get('http://localhost:5000/books')
  //   // fetch('http://localhost:5000/books')
  //     .then((response) => {
  //       //console.log(response.data);
  //       //setBooks(response.data.data);
  //       setLoading(false);
  //       setbooks(response.data.book);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);
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
 

    
 return(
  <>
  <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setshowtype('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setshowtype('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {Loading ? (
        <Spinner />
      ) : showtype === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
      <div className="fixed top-0 right-0 m-4">
  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={logOut}>
    Log out
  </button>
</div>
      
   
   </div> 
   
   </>
    
 )
}

export default Home