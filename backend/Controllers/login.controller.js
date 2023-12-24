import User from "../Models/login.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
export default class usercontroller{
     static handleerror(err){
        //console.log(err.message==="User validation failed");
        //console.log(err.code);
        let errors = { email: "", password: "" };

  //console.log(err);
  if (err.message === "incorrect email") {
    //console.log("hi");
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    //console.log("hi");
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    //console.log("hi");
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    //console.log("hi");
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;

    }
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
        //console.log(users);
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
            //console.log(token);
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
        catch(err){
            //console.log(err);
            const errors = usercontroller.handleerror(err);
            //console.log(errors);
            res.json({ errors, created: false });
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
    catch(err){
        const errors = usercontroller.handleerror(err);
        res.json({ errors, created: false });
    }
    }
    static async update(req,res){
      const { email, password } = req.body;
      console.log(password);
      const salt = await bcrypt.genSalt();
    const passwords = await bcrypt.hash(password, salt);

  try {
    // Find the user and update the password
    const updatedUser = await User.findOneAndUpdate(
      { email },
       { password: passwords } ,
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      console.log(updatedUser);
      res.status(200).json({ message: 'User found and password updated successfully', user: updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
    }
}