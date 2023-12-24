import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userschema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message:"please enter a valid email",
    },
    password:{
        type:String,
        //require:[true,"please enter email"],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [12, 'Password cannot exceed 12 characters'],
        message:'Password must be between 6 and 12 characters long',
        
    }},
    {timeStamps:true

})
// userschema.pre('findOneAndUpdate' ,async function(next){
//     //console.log(this.password);
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })
userschema.pre("save" ,async function(next){
    console.log(this.password);
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