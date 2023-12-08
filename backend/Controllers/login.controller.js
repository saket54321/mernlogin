import User from "../Models/login.model.js"
import jwt from "jsonwebtoken";
export default class usercontroller{
    //let maxage=3 * 24 * 60 * 60;
    // createtoke(id){
    //     const token=jwt.sign({id},"saket suman",{
    //         expiresInres:3 * 24 * 60 * 60,
    //     })
    //     return token;
    // }
//      maxAge = 3 * 24 * 60 * 60;
//  createToken = (id) => {
//   return jwt.sign({ id }, "kishan sheth super secret key", {
//     expiresIn: maxAge,
//   });
// };

    static async register(req,res){
        try{
        const user=User(req.body);
        //console.log(user);
        const users=await user.save();
        //console.log(user);
        //const id=user._id;
       // console.log(id);
        if(user){
            const token = jwt.sign(
                {
                    //this is for unique identification
                  userID: user._id,
                  email: user.email,
                },
                // secret key
                'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                {
                    // expires
                  expiresIn: '1h',
                }
            )
            console.log(token);
            //httpOnly: false allows the cookie to be accessed by client-side JavaScript. 
            //If you set it to true, the cookie will only be accessible by the server,
            res.cookie("jwt",token,{
                     withCredentials: true,
                    httpOnly: false,
                    maxAge: 3 * 24 * 60 * 60 * 1000,
                  });
        }
       // console.log(token);
        // res.cookie("jwt",token,{
        //     withCredentials: true,
        //     httpOnly: false,
        //     maxAge: 3 * 24 * 60 * 60 * 1000,
        //   });
        res.status(200).json(user);
        }
        catch(error){
            console.log("error in register");
        }
    }
    static async login(req,res){
        const{email,password}=req.body;
        try{
        let user= await User.login(email,password);
        if(user){
            const token = jwt.sign(
                {
                    //this is for unique identification
                  userID: user._id,
                  email: user.email,
                },
                // secret key
                'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                {
                    // expires
                  expiresIn: '1h',
                }
            )
            res.cookie("jwt",token,{
                withCredentials: true,
               httpOnly: false,
               maxAge: 3 * 24 * 60 * 60 * 1000,
             });
             res.status(201).json(user)

        }
       
    }
    catch(error){
        console.log("error in login");

    }
    }
}