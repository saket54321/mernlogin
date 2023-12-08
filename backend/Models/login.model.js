import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userschema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"please enter email"],
        //unique:true
    },
    password:{
        type:String,
        require:[true,"please enter email"],
        
    }},
    {timeStamps:true

})
userschema.pre("save" ,async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
userschema.statics.login=async function(email,password){
    
        let user=await this.findOne({email});
        if(user){
            const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
       
const User=mongoose.model('User',userschema);
export default User;