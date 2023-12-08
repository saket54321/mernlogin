import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import router from "./Routes/login.route.js"
import cookieparser from "cookie-parser";
const app=express();
app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST"],
    credentials:true
}))

app.use(express.json());
app.use(cookieparser());
app.use('/',router);

mongoose.connect('mongodb+srv://saketmmfd1:saket12345@bookstore.7gs3ljx.mongodb.net/mern-login?retryWrites=true&w=majority')
.then(()=>{
    app.listen(5000,()=>{
        console.log("app is listen on port 5000 and database is connection");
    })

})
.catch((error)=>{
    console.log("error in connection mongodb with server");

})
