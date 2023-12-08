import jwt from "jsonwebtoken"
import User from '../Models/login.model.js';
const checkUser = (req, res, next) => {
  //console.log(req.cookies.jwt);
    const token = req.cookies.jwt;
    if (token) {
      //console.log("token");
      jwt.verify(
        token,
        "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
        async (err, decodedToken) => {
          if (err) {
            //console.log("error decoded");
            res.json({ status: false });
            next();
          } else {
           // console.log("token");
           //console.log(decodedToken);
            const user = await User.findById(decodedToken.userID);
            //console.log(user);
            if (user) res.json({ status: true, user: user.email });
            else res.json({ status: false });
            next();
          }
        }
      );
    } else {
      res.json({ status: false });
      next();
    }
  };
  export default checkUser;