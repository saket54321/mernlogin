import react from "react"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Secret from "./pages/Secret"
import Createbooks from "./pages/Createbooks"
import Deletebook from "./pages/Deletebook"
import Editbook from "./pages/EditBook.jsx"
import Home from "./pages/Home";
import Showdetail from "./pages/Showdetail";
import Updatepassword from "./pages/Updatepassword.jsx"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      
      <Route path='/' element={<Secret/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/update' element={<Updatepassword/>}/>
      
      <Route path='/books/create' element={<Createbooks />} />
    <Route path='/books/details/:id' element={<Showdetail />} />
    <Route path='/books/edit/:id' element={<Editbook />} />
      <Route path='/books/delete/:id' element={<Deletebook />} />
    </Routes>
    </BrowserRouter>
    
       
  );
}

export default App;
