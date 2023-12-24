import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from "axios";
import Logout from '../components/Logout';

function Showdetail() {
    const[desc,setdesc]=useState("");
    const[favor,setfavor]=useState("favourite");
    const [subje,setsubje]=useState("");
    const[dat,setdat]=useState("");
    const {id}=useParams();
    //console.log(id);
   
  const Navigate=useNavigate();
  
   
    

  
  useEffect(()=>{
  const handledelete=()=>{
    //console.log(id);
    axios.get(`http://localhost:5000/books/book/${id}`)
    .then((data)=>{
      setdesc(data.data.title)
     // console.log(data.data.title)
      setsubje(data.data.author)
      setdat(data.data.publishyear);

    })
    .catch((error)=>{
      console.log("error in showing");
    })
    
}
//console.log(desc);
handledelete();
//console.log(desc);
},[])
  return (
    <>
      <div class="dark:text-white bg-gray-800 p-4 rounded-md shadow-md">
      <span class="text-gray-300 mr-2">{desc}</span>
        <div class="text-xl font-bold mb-2">{subje}</div>
        <div class="text-gray-400 mb-4">{dat}</div>
        
      </div>
      <Logout/>
    </>
  );
}

export default Showdetail